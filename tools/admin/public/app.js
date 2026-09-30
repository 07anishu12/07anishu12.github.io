// Publishing Studio Client Application
let articles = [];
let currentArticle = null;
let currentNav = 'all';
let filterType = null;
let filterCat = null;
let searchQuery = '';

// DOM Elements
const viewDashboard = document.getElementById('view-dashboard');
const viewEditor = document.getElementById('view-editor');
const viewTitle = document.getElementById('view-title');
const listActions = document.getElementById('list-actions');
const editorActions = document.getElementById('editor-actions');
const btnBackToList = document.getElementById('btn-back-to-list');
const btnCreateNew = document.getElementById('btn-create-new');
const btnSavePublish = document.getElementById('btn-save-publish');
const btnSaveDraft = document.getElementById('btn-save-draft');
const btnPreviewModal = document.getElementById('btn-preview-modal');
const btnArchiveArticle = document.getElementById('btn-archive-article');
const btnRebuild = document.getElementById('btn-rebuild');
const searchInput = document.getElementById('search-input');
const articlesTbody = document.getElementById('articles-tbody');
const toastContainer = document.getElementById('toast-container');
const previewModal = document.getElementById('preview-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const modalPreviewBody = document.getElementById('modal-preview-body');

// Form inputs
const editTitle = document.getElementById('edit-title');
const editSlug = document.getElementById('edit-slug');
const editDesc = document.getElementById('edit-desc');
const editBody = document.getElementById('edit-body');
const editPreview = document.getElementById('edit-preview');
const editStatus = document.getElementById('edit-status');
const editCategory = document.getElementById('edit-category');
const editContentType = document.getElementById('edit-content-type');
const editDate = document.getElementById('edit-date');
const editFeatured = document.getElementById('edit-featured');
const editHeroImage = document.getElementById('edit-hero-image');
const editImageAlt = document.getElementById('edit-image-alt');
const imagePreview = document.getElementById('image-preview');
const dropzone = document.getElementById('dropzone');
const imageFileInput = document.getElementById('image-file-input');
const editSource = document.getElementById('edit-source');
const editSourceUrl = document.getElementById('edit-source-url');
const editTags = document.getElementById('edit-tags');
const editSeoTitle = document.getElementById('edit-seo-title');
const editSeoDesc = document.getElementById('edit-seo-desc');

// Tabs
const tabWrite = document.getElementById('tab-write');
const tabPreview = document.getElementById('tab-preview');

// Show notification toast
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

// Slugify helper
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Markdown to HTML renderer for preview
function renderMarkdown(md) {
  if (!md) return '';
  let html = md;
  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
    const lines = code.split('\n');
    let lang = '';
    if (lines[0] && !lines[0].includes(' ') && lines[0].length < 15) {
      lang = lines.shift().trim();
    }
    const clean = lines.join('\n').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<pre><code class="language-${lang}">${clean}</code></pre>`;
  });
  // Math blocks
  html = html.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
    return `<div class="formula-block"><code>${formula.trim()}</code></div>`;
  });
  // Inline code
  html = html.replace(/`([^`]+)`/g, (match, code) => `<code>${code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>`);
  // Headings
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  // Blockquotes
  html = html.replace(/^\> (.*$)/gim, '<blockquote><p>$1</p></blockquote>');
  // Bold & Italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  // Horizontal rule
  html = html.replace(/^---$/gim, '<hr class="editorial-divider">');

  // Paragraphs and lists
  const blocks = html.split(/\n{2,}/);
  return blocks.map(block => {
    block = block.trim();
    if (!block) return '';
    if (block.startsWith('<h') || block.startsWith('<pre') || block.startsWith('<blockquote') || block.startsWith('<div') || block.startsWith('<hr')) {
      return block;
    }
    if (block.startsWith('* ') || block.startsWith('- ')) {
      const items = block.split('\n').map(l => `<li>${l.replace(/^[\*\-]\s+/, '').trim()}</li>`).join('');
      return `<ul>${items}</ul>`;
    }
    if (/^\d+\.\s+/.test(block)) {
      const items = block.split('\n').map(l => `<li>${l.replace(/^\d+\.\s+/, '').trim()}</li>`).join('');
      return `<ol>${items}</ol>`;
    }
    return `<p>${block.replace(/\n/g, '<br>')}</p>`;
  }).join('\n\n');
}

// Fetch all articles
async function loadArticles() {
  try {
    const res = await fetch('/api/articles');
    articles = await res.json();
    renderStats();
    renderTable();
  } catch (err) {
    showToast('Failed to load articles: ' + err.message);
  }
}

// Render Stats
function renderStats() {
  const total = articles.length;
  const published = articles.filter(a => a.status === 'published').length;
  const drafts = articles.filter(a => a.status === 'draft').length;
  const featured = articles.find(a => a.featured && a.status === 'published');

  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-published').textContent = published;
  document.getElementById('stat-drafts').textContent = drafts;
  document.getElementById('stat-featured').textContent = featured ? featured.title : 'None selected';

  document.getElementById('badge-all').textContent = total;
  document.getElementById('badge-published').textContent = published;
  document.getElementById('badge-drafts').textContent = drafts;
  document.getElementById('badge-featured').textContent = articles.filter(a => a.featured).length;
}

// Filter and render articles table
function renderTable() {
  let list = [...articles];

  // Nav filter
  if (currentNav === 'published') list = list.filter(a => a.status === 'published');
  if (currentNav === 'drafts') list = list.filter(a => a.status === 'draft');
  if (currentNav === 'featured') list = list.filter(a => a.featured);

  // Type filter
  if (filterType) list = list.filter(a => a.contentType === filterType);

  // Category filter
  if (filterCat) list = list.filter(a => a.category === filterCat);

  // Search filter
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    list = list.filter(a =>
      a.title.toLowerCase().includes(q) ||
      (a.shortDescription && a.shortDescription.toLowerCase().includes(q)) ||
      (a.category && a.category.toLowerCase().includes(q)) ||
      (a.tags && a.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  document.getElementById('catalog-count-label').textContent = `Showing ${list.length} of ${articles.length} articles`;

  articlesTbody.innerHTML = '';
  if (list.length === 0) {
    articlesTbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 48px; color: var(--text-muted);">
          No articles found matching the current filter.
        </td>
      </tr>
    `;
    return;
  }

  list.forEach(article => {
    const tr = document.createElement('tr');
    const statusClass = article.status === 'published' ? 'badge-published' : (article.status === 'draft' ? 'badge-draft' : 'badge-archived');
    const slug = article.slug || article.id;

    tr.innerHTML = `
      <td>
        <span class="article-row-title">${escapeHtml(article.title)}</span>
        <div class="article-row-desc">${escapeHtml(article.shortDescription || '')}</div>
      </td>
      <td><span class="tag">${escapeHtml(article.category || 'General')}</span></td>
      <td style="font-size: 0.8125rem; color: var(--text-secondary);">${escapeHtml(article.contentType || 'Note')}</td>
      <td>
        <span class="badge ${statusClass}">
          ${article.featured ? '★ ' : ''}${escapeHtml(article.status || 'published')}
        </span>
      </td>
      <td style="font-size: 0.8125rem; color: var(--text-secondary);">${escapeHtml(article.publishedDate || '—')}</td>
      <td style="font-size: 0.8125rem; color: var(--text-muted);">${escapeHtml(article.readingTime || '3 min read')}</td>
      <td>
        <div class="article-row-actions">
          <button class="btn btn-secondary btn-sm" onclick="editArticle('${slug}')">Edit</button>
          <a class="btn btn-secondary btn-sm" href="/learnings/${slug}.html" target="_blank">Preview ↗</a>
        </div>
      </td>
    `;
    articlesTbody.appendChild(tr);
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Switch Views
function showDashboard() {
  currentArticle = null;
  viewDashboard.style.display = 'block';
  viewEditor.style.display = 'none';
  listActions.style.display = 'block';
  editorActions.style.display = 'none';
  btnBackToList.style.display = 'none';
  viewTitle.textContent = 'Knowledge Library';
  loadArticles();
}

function showEditor(article = null) {
  currentArticle = article;
  viewDashboard.style.display = 'none';
  viewEditor.style.display = 'flex';
  listActions.style.display = 'none';
  editorActions.style.display = 'flex';
  btnBackToList.style.display = 'inline-flex';
  viewTitle.textContent = article ? 'Edit Article' : 'New Article / Note';

  // Populate or reset form fields
  if (article) {
    editTitle.value = article.title || '';
    editSlug.value = article.slug || article.id || '';
    editDesc.value = article.shortDescription || '';
    editBody.value = article.body || '';
    editStatus.value = article.status || 'published';
    editCategory.value = article.category || 'AI Engineering';
    editContentType.value = article.contentType || 'Note';
    editDate.value = article.publishedDate || new Date().toISOString().slice(0, 10);
    editFeatured.checked = Boolean(article.featured);
    editHeroImage.value = article.heroImage || '';
    editImageAlt.value = article.imageAlt || '';
    editSource.value = article.source || 'LinkedIn';
    editSourceUrl.value = article.sourceUrl || '';
    editTags.value = (article.tags || []).join(', ');
    editSeoTitle.value = article.seoTitle || '';
    editSeoDesc.value = article.seoDescription || '';
    if (article.heroImage) {
      imagePreview.src = article.heroImage.startsWith('/') ? article.heroImage : `/${article.heroImage}`;
      imagePreview.style.display = 'block';
    } else {
      imagePreview.style.display = 'none';
    }
  } else {
    editTitle.value = '';
    editSlug.value = '';
    editDesc.value = '';
    editBody.value = '';
    editStatus.value = 'published';
    editCategory.value = 'AI Engineering';
    editContentType.value = 'Note';
    editDate.value = new Date().toISOString().slice(0, 10);
    editFeatured.checked = false;
    editHeroImage.value = '';
    editImageAlt.value = '';
    imagePreview.style.display = 'none';
    editSource.value = 'LinkedIn';
    editSourceUrl.value = 'https://www.linkedin.com/in/aniket-thakur-a23a9b372';
    editTags.value = '';
    editSeoTitle.value = '';
    editSeoDesc.value = '';
  }

  // Set write tab active
  setTab('write');
}

window.editArticle = function(slug) {
  const found = articles.find(a => a.slug === slug || a.id === slug);
  if (found) showEditor(found);
};

// Tabs toggle
function setTab(tab) {
  if (tab === 'write') {
    tabWrite.classList.add('active');
    tabPreview.classList.remove('active');
    editBody.style.display = 'block';
    editPreview.style.display = 'none';
  } else {
    tabPreview.classList.add('active');
    tabWrite.classList.remove('active');
    editBody.style.display = 'none';
    editPreview.style.display = 'block';
    editPreview.innerHTML = renderMarkdown(editBody.value);
  }
}

tabWrite.addEventListener('click', () => setTab('write'));
tabPreview.addEventListener('click', () => setTab('preview'));

// Slug auto-generation
editTitle.addEventListener('input', () => {
  if (!currentArticle) {
    editSlug.value = slugify(editTitle.value);
  }
});

// Formatting toolbar action handler
document.querySelectorAll('.tool-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tool = btn.dataset.tool;
    const start = editBody.selectionStart;
    const end = editBody.selectionEnd;
    const selected = editBody.value.substring(start, end);
    let replacement = '';

    switch (tool) {
      case 'h2': replacement = `\n## ${selected || 'Subheading'}\n`; break;
      case 'h3': replacement = `\n### ${selected || 'Section Heading'}\n`; break;
      case 'bold': replacement = `**${selected || 'bold text'}**`; break;
      case 'italic': replacement = `*${selected || 'italic text'}*`; break;
      case 'quote': replacement = `\n> ${selected || 'Quotation'}\n`; break;
      case 'ul': replacement = `\n* ${selected || 'List item 1'}\n* List item 2\n`; break;
      case 'ol': replacement = `\n1. ${selected || 'First item'}\n2. Second item\n`; break;
      case 'code': replacement = `\n\`\`\`\n${selected || '// code block'}\n\`\`\`\n`; break;
      case 'inline-code': replacement = `\`${selected || 'code'}\``; break;
      case 'link': replacement = `[${selected || 'link text'}](https://)`; break;
      case 'hr': replacement = `\n---\n`; break;
    }

    editBody.value = editBody.value.substring(0, start) + replacement + editBody.value.substring(end);
    editBody.focus();
    editBody.selectionStart = start + replacement.length;
    editBody.selectionEnd = start + replacement.length;
  });
});

// Image Upload handling
dropzone.addEventListener('click', () => imageFileInput.click());
dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('dragover'); });
dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzone.classList.remove('dragover');
  if (e.dataTransfer.files.length) uploadFile(e.dataTransfer.files[0]);
});
imageFileInput.addEventListener('change', () => {
  if (imageFileInput.files.length) uploadFile(imageFileInput.files[0]);
});

function uploadFile(file) {
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const base64 = reader.result;
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: base64, filename: file.name })
      });
      const data = await res.json();
      if (data.success) {
        editHeroImage.value = data.path;
        imagePreview.src = `/${data.path}`;
        imagePreview.style.display = 'block';
        showToast('Image uploaded successfully!');
      } else {
        showToast('Upload failed: ' + data.error);
      }
    } catch (err) {
      showToast('Error uploading: ' + err.message);
    }
  };
  reader.readAsDataURL(file);
}

// Save Article
async function saveArticle(forceStatus = null) {
  const title = editTitle.value.trim();
  const body = editBody.value.trim();
  const desc = editDesc.value.trim();

  if (!title) {
    showToast('Please enter an article title');
    editTitle.focus();
    return;
  }
  if (!body) {
    showToast('Please enter article content');
    editBody.focus();
    return;
  }
  if (!desc) {
    showToast('Please add a short summary');
    editDesc.focus();
    return;
  }

  const payload = {
    id: currentArticle ? currentArticle.id : undefined,
    slug: editSlug.value.trim() || slugify(title),
    title: title,
    contentType: editContentType.value,
    category: editCategory.value,
    shortDescription: desc,
    body: body,
    publishedDate: editDate.value || new Date().toISOString().slice(0, 10),
    featured: editFeatured.checked,
    status: forceStatus || editStatus.value,
    heroImage: editHeroImage.value.trim(),
    imageAlt: editImageAlt.value.trim(),
    source: editSource.value,
    sourceUrl: editSourceUrl.value.trim(),
    tags: editTags.value.split(',').map(t => t.trim()).filter(Boolean),
    seoTitle: editSeoTitle.value.trim(),
    seoDescription: editSeoDesc.value.trim()
  };

  try {
    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    if (result.success) {
      showToast(`Article "${title}" saved & static pages updated!`);
      showDashboard();
    } else {
      showToast('Save failed: ' + result.error);
    }
  } catch (err) {
    showToast('Network error saving article: ' + err.message);
  }
}

btnSavePublish.addEventListener('click', () => saveArticle('published'));
btnSaveDraft.addEventListener('click', () => saveArticle('draft'));

// Archive
btnArchiveArticle.addEventListener('click', async () => {
  if (!currentArticle) return;
  if (!confirm(`Are you sure you want to archive "${currentArticle.title}"?`)) return;

  try {
    const res = await fetch(`/api/articles/${currentArticle.slug || currentArticle.id}`, { method: 'DELETE' });
    const result = await res.json();
    if (result.success) {
      showToast('Article archived.');
      showDashboard();
    }
  } catch (err) {
    showToast('Error archiving: ' + err.message);
  }
});

// Preview Modal
btnPreviewModal.addEventListener('click', () => {
  const title = editTitle.value || 'Untitled Note';
  const desc = editDesc.value || '';
  const bodyHtml = renderMarkdown(editBody.value);
  const cat = editCategory.value;
  const type = editContentType.value;
  const date = editDate.value;
  const hero = editHeroImage.value;
  const alt = editImageAlt.value;

  modalPreviewBody.innerHTML = `
    <article class="article-container" style="padding: 0;">
      <header class="article-header">
        <nav class="article-breadcrumb">
          <span>Notes</span> / <span>${cat}</span> / <span>${type}</span>
        </nav>
        <h1 class="article-title">${title}</h1>
        ${desc ? `<p class="article-lead">${desc}</p>` : ''}
        <div class="article-meta-row">
          <div class="article-author-info">
            <span class="author-name">Aniket Thakur</span> · <time>${date}</time>
          </div>
        </div>
      </header>
      ${hero ? `<div class="article-hero-media"><img src="${hero.startsWith('/') ? hero : '/' + hero}" alt="${alt}"></div>` : ''}
      <div class="article-body">
        ${bodyHtml}
      </div>
    </article>
  `;
  previewModal.style.display = 'flex';
});

btnCloseModal.addEventListener('click', () => {
  previewModal.style.display = 'none';
});

previewModal.addEventListener('click', (e) => {
  if (e.target === previewModal) previewModal.style.display = 'none';
});

// Rebuild Static Site
btnRebuild.addEventListener('click', async () => {
  btnRebuild.disabled = true;
  btnRebuild.textContent = '⏳ Rebuilding...';
  try {
    const res = await fetch('/api/build', { method: 'POST' });
    const result = await res.json();
    showToast(result.message || 'Static pages rebuilt successfully!');
  } catch (err) {
    showToast('Error rebuilding: ' + err.message);
  } finally {
    btnRebuild.disabled = false;
    btnRebuild.textContent = '⚡ Rebuild Static Site';
  }
});

// Navigation handlers
btnBackToList.addEventListener('click', showDashboard);
btnCreateNew.addEventListener('click', () => showEditor(null));

document.querySelectorAll('[data-nav]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.studio-sidebar .nav-item').forEach(i => i.classList.remove('active'));
    btn.classList.add('active');
    currentNav = btn.dataset.nav;
    filterType = null;
    filterCat = null;
    showDashboard();
  });
});

document.querySelectorAll('[data-filter-type]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.studio-sidebar .nav-item').forEach(i => i.classList.remove('active'));
    btn.classList.add('active');
    currentNav = 'all';
    filterType = btn.dataset.filterType;
    filterCat = null;
    showDashboard();
  });
});

document.querySelectorAll('[data-filter-cat]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.studio-sidebar .nav-item').forEach(i => i.classList.remove('active'));
    btn.classList.add('active');
    currentNav = 'all';
    filterType = null;
    filterCat = btn.dataset.filterCat;
    showDashboard();
  });
});

searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderTable();
});

function handleHashRoute() {
  const hash = window.location.hash;
  if (hash === '#new') {
    showEditor(null);
  } else if (hash.startsWith('#edit/')) {
    const slug = hash.replace('#edit/', '');
    const found = articles.find(a => a.slug === slug || a.id === slug);
    if (found) showEditor(found);
  } else {
    showDashboard();
  }
}

window.addEventListener('hashchange', handleHashRoute);

// Initial boot
loadArticles().then(() => {
  if (window.location.hash) {
    handleHashRoute();
  }
});
