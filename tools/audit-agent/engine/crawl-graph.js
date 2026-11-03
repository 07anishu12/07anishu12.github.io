/**
 * Directed Crawl Graph & Link Architecture Analyzer
 * Builds PageRank, computes crawl depths (BFS), in-degree, out-degree,
 * detects orphan pages, weakly connected pages, and under-linked articles.
 */

export class CrawlGraph {
  constructor(origin = 'https://aniket.app') {
    this.origin = origin.replace(/\/$/, '');
    this.rootUrl = `${this.origin}/`;
    this.nodes = new Map(); // url -> { inDegree, outDegree, depth, pageRank, isOrphan, ... }
    this.edges = []; // { source, target }
    this.adjacencyList = new Map(); // url -> Set(targetUrls)
    this.reverseAdjacency = new Map(); // url -> Set(sourceUrls)
  }

  /**
   * Initializes nodes and edges from audited inventory
   */
  buildGraph(auditedUrls) {
    // 1. Add all known URLs as nodes
    for (const [url, item] of auditedUrls.entries()) {
      if (!this.nodes.has(url)) {
        this.nodes.set(url, {
          url,
          title: item.title || url,
          status: item.finalStatus,
          isSitemap: !!item.sitemapSource,
          wordCount: item.wordCount || 0,
          inDegree: 0,
          outDegree: 0,
          depth: -1,
          pageRank: 0,
          isOrphan: false,
          isWeaklyConnected: false,
          category: this.getCategory(url)
        });
        this.adjacencyList.set(url, new Set());
        this.reverseAdjacency.set(url, new Set());
      }
    }

    // 2. Add edges from internal links
    for (const [sourceUrl, item] of auditedUrls.entries()) {
      const internalLinks = item.internalLinks || [];
      for (const targetUrl of internalLinks) {
        // Ensure target is normalized and belongs to the site
        if (!targetUrl.startsWith(this.origin)) continue;

        // If target node doesn't exist yet, add it
        if (!this.nodes.has(targetUrl)) {
          this.nodes.set(targetUrl, {
            url: targetUrl,
            title: targetUrl,
            status: 200,
            isSitemap: false,
            wordCount: 0,
            inDegree: 0,
            outDegree: 0,
            depth: -1,
            pageRank: 0,
            isOrphan: false,
            isWeaklyConnected: false,
            category: this.getCategory(targetUrl)
          });
          this.adjacencyList.set(targetUrl, new Set());
          this.reverseAdjacency.set(targetUrl, new Set());
        }

        // Avoid self-loops in degree count
        if (sourceUrl !== targetUrl) {
          this.adjacencyList.get(sourceUrl).add(targetUrl);
          this.reverseAdjacency.get(targetUrl).add(sourceUrl);
          this.edges.push({ source: sourceUrl, target: targetUrl });
        }
      }
    }

    // 3. Compute In-Degree and Out-Degree
    for (const [url, node] of this.nodes.entries()) {
      node.outDegree = this.adjacencyList.get(url)?.size || 0;
      node.inDegree = this.reverseAdjacency.get(url)?.size || 0;
      node.isOrphan = node.inDegree === 0 && url !== this.rootUrl;
      node.isWeaklyConnected = node.inDegree === 1 && url !== this.rootUrl;
    }

    // 4. Compute Crawl Depth (BFS from root)
    this.computeCrawlDepth();

    // 5. Compute PageRank (Power Iteration)
    this.computePageRank();

    return this.getSummary();
  }

  getCategory(url) {
    const path = url.replace(this.origin, '');
    if (path === '/' || path === '') return 'home';
    if (path.startsWith('/blog/technology')) return 'technology';
    if (path.startsWith('/blog/auto')) return 'automotive';
    if (path.startsWith('/blog/product')) return 'product';
    if (path.startsWith('/blog/finance') || path.startsWith('/finance/')) return 'finance';
    if (path.startsWith('/projects')) return 'projects';
    if (path.startsWith('/research')) return 'research';
    if (path.startsWith('/topics')) return 'topics';
    if (path.startsWith('/author')) return 'author';
    return 'general';
  }

  /**
   * Breadth-First Search (BFS) to compute shortest crawl depth from root
   */
  computeCrawlDepth() {
    const visited = new Set();
    const queue = [{ url: this.rootUrl, depth: 0 }];
    visited.add(this.rootUrl);

    if (this.nodes.has(this.rootUrl)) {
      this.nodes.get(this.rootUrl).depth = 0;
    }

    while (queue.length > 0) {
      const { url, depth } = queue.shift();
      const outgoing = this.adjacencyList.get(url) || new Set();

      for (const nextUrl of outgoing) {
        if (!visited.has(nextUrl)) {
          visited.add(nextUrl);
          if (this.nodes.has(nextUrl)) {
            this.nodes.get(nextUrl).depth = depth + 1;
          }
          queue.push({ url: nextUrl, depth: depth + 1 });
        }
      }
    }
  }

  /**
   * Google PageRank iterative power method
   * Damping factor d = 0.85
   */
  computePageRank(damping = 0.85, maxIterations = 50, epsilon = 1e-6) {
    const N = this.nodes.size;
    if (N === 0) return;

    let pr = new Map();
    const initialPr = 1.0 / N;
    for (const url of this.nodes.keys()) {
      pr.set(url, initialPr);
    }

    for (let iter = 0; iter < maxIterations; iter++) {
      let nextPr = new Map();
      let diff = 0;

      // Handle dangling nodes (nodes with out-degree 0)
      let danglingSum = 0;
      for (const [url, score] of pr.entries()) {
        if (this.adjacencyList.get(url)?.size === 0) {
          danglingSum += score;
        }
      }

      for (const url of this.nodes.keys()) {
        const inlinks = this.reverseAdjacency.get(url) || new Set();
        let inlinkSum = 0;

        for (const inUrl of inlinks) {
          const outDegree = this.adjacencyList.get(inUrl)?.size || 1;
          inlinkSum += (pr.get(inUrl) || 0) / outDegree;
        }

        const score = ((1 - damping) / N) + (damping * (inlinkSum + (danglingSum / N)));
        nextPr.set(url, score);
        diff += Math.abs(score - (pr.get(url) || 0));
      }

      pr = nextPr;
      if (diff < epsilon) break;
    }

    // Scale PageRank to a 0 - 100 log-friendly index
    const maxPr = Math.max(...Array.from(pr.values()));
    for (const [url, score] of pr.entries()) {
      const node = this.nodes.get(url);
      if (node) {
        node.pageRank = maxPr > 0 ? parseFloat(((score / maxPr) * 100).toFixed(2)) : 0;
      }
    }
  }

  getSummary() {
    const allNodes = Array.from(this.nodes.values());
    const orphanPages = allNodes.filter(n => n.isOrphan);
    const weaklyConnected = allNodes.filter(n => n.isWeaklyConnected);

    // High value pages with insufficient internal links
    const underLinkedImportantPages = allNodes.filter(n =>
      n.wordCount > 600 && (n.inDegree < 2 || n.depth >= 3)
    );

    // Depth distribution
    const depthDistribution = {};
    for (const n of allNodes) {
      const d = n.depth === -1 ? 'Unreachable' : `Depth ${n.depth}`;
      depthDistribution[d] = (depthDistribution[d] || 0) + 1;
    }

    // Top PageRank URLs
    const topPageRank = [...allNodes].sort((a, b) => b.pageRank - a.pageRank).slice(0, 20);

    return {
      totalNodes: this.nodes.size,
      totalEdges: this.edges.length,
      orphanPagesCount: orphanPages.length,
      orphanPages: orphanPages.map(o => ({ url: o.url, title: o.title, isSitemap: o.isSitemap, category: o.category })),
      weaklyConnectedCount: weaklyConnected.length,
      underLinkedImportantPagesCount: underLinkedImportantPages.length,
      underLinkedImportantPages: underLinkedImportantPages.slice(0, 30).map(u => ({
        url: u.url,
        title: u.title,
        inDegree: u.inDegree,
        depth: u.depth,
        wordCount: u.wordCount
      })),
      depthDistribution,
      topPageRank: topPageRank.map(t => ({ url: t.url, title: t.title, pageRank: t.pageRank, inDegree: t.inDegree, depth: t.depth }))
    };
  }

  /**
   * Export dataset for interactive force-directed graph visualizer
   */
  exportVisualGraph(maxNodes = 250) {
    // Select top nodes by PageRank and all orphans to show topology clearly
    const sorted = Array.from(this.nodes.values())
      .sort((a, b) => b.pageRank - a.pageRank);

    const selectedNodes = new Map();
    // Always include root
    if (this.nodes.has(this.rootUrl)) selectedNodes.set(this.rootUrl, this.nodes.get(this.rootUrl));

    // Include top PageRank nodes
    for (const node of sorted) {
      if (selectedNodes.size >= maxNodes) break;
      selectedNodes.set(node.url, node);
    }

    // Include sample of orphans
    const orphans = Array.from(this.nodes.values()).filter(n => n.isOrphan).slice(0, 30);
    for (const o of orphans) {
      selectedNodes.set(o.url, o);
    }

    const graphNodes = Array.from(selectedNodes.values()).map(n => ({
      id: n.url,
      label: n.title.length > 30 ? n.title.slice(0, 28) + '...' : n.title,
      category: n.category,
      depth: n.depth,
      pageRank: n.pageRank,
      inDegree: n.inDegree,
      isOrphan: n.isOrphan,
      status: n.status
    }));

    const nodeIds = new Set(graphNodes.map(n => n.id));
    const graphEdges = this.edges
      .filter(e => nodeIds.has(e.source) && nodeIds.has(e.target))
      .slice(0, 600);

    return { nodes: graphNodes, edges: graphEdges };
  }
}
