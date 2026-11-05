import fs from 'node:fs/promises';
import path from 'node:path';
const source='_site', output='_legacy-site';
const origin='https://aniket.app';
async function walk(dir){const files=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())files.push(...await walk(p));else files.push(p);}return files;}
const files=(await walk(source)).filter(p=>p.endsWith('.html')&&!p.endsWith('/404.html')&&!/^google[a-z0-9]+\.html$/.test(path.basename(p)));
const mappings=[];
for(const file of files){const html=await fs.readFile(file,'utf8');const canonical=html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/)?.[1];if(!canonical)throw Error(`Missing canonical: ${file}`);const u=new URL(canonical);u.protocol='https:';u.host='aniket.app';mappings.push({file,target:u.href});}
const targets=[...new Set(mappings.map(m=>m.target))];const verified=new Map();
for(let i=0;i<targets.length;i+=8){await Promise.all(targets.slice(i,i+8).map(async target=>{const r=await fetch(target,{signal:AbortSignal.timeout(30000)});if(r.status!==200)throw Error(`${target}: ${r.status}; refusing migration`);verified.set(target,r.url);}));}
await fs.mkdir(output,{recursive:true});
await fs.cp(source,output,{recursive:true});
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
for(const m of mappings){const target=verified.get(m.target);const dest=path.join(output,path.relative(source,m.file));const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Page moved</title><link rel="canonical" href="${esc(target)}"><meta http-equiv="refresh" content="0;url=${esc(target)}"><script>const target=new URL(${JSON.stringify(target)});target.search=location.search;target.hash=location.hash;location.replace(target.href);</script></head><body><p>This page has moved to <a href="${esc(target)}">${esc(target)}</a>.</p></body></html>`;await fs.writeFile(dest,html);}
await fs.writeFile(path.join(output,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: https://aniket.app/sitemap.xml\n');
await fs.writeFile(path.join(output,'.nojekyll'),'');
await fs.writeFile('reports/seo-recovery/legacy-migration-manifest.json',JSON.stringify(mappings.map(m=>({path:path.relative(source,m.file),target:verified.get(m.target)})),null,2));
console.log(`Validated ${targets.length} destinations; generated ${mappings.length} migration pages. GitHub Pages uses immediate HTML refresh, not HTTP 301.`);
