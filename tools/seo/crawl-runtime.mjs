import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(process.cwd()+'/package.json');
const {load}=require('cheerio');
const origin=process.argv[2]||'https://aniket.app';
const queue=['/','/sitemap.xml']; const seen=new Set(); const results=[]; const sources={};
async function visit(path){
 try {const res=await fetch(origin+path,{signal:AbortSignal.timeout(30000)}); const body=await res.text(); const $=load(body); const xml=path.includes('sitemap');
 const row={path,status:res.status,final:res.url.replace(origin,''),canonical:$('link[rel=canonical]').attr('href'),robots:$('meta[name=robots]').attr('content'),title:$('title').text(),description:$('meta[name=description]').attr('content')}; results.push(row);
 const links=xml?[...body.matchAll(/<loc>(.*?)<\/loc>/g)].map(x=>x[1]):$('a[href]').map((_,a)=>$(a).attr('href')).get();
 for(const h of links){try{const u=new URL(h,res.url);if(![origin,'https://aniket.app'].includes(u.origin))continue;u.hash='';const p=u.pathname+u.search;if(/\.(pdf|zip|png|jpg|svg|xml|json)$/.test(u.pathname)&&!p.includes('sitemap'))continue;if(p.startsWith('/api/'))continue;(sources[p]??=[]).push(path);if(!seen.has(p)&&!queue.includes(p))queue.push(p);}catch{}}
 }catch(e){results.push({path,error:e.message})}
}
while(queue.length){const batch=queue.splice(0,8).filter(p=>!seen.has(p));batch.forEach(p=>seen.add(p));await Promise.all(batch.map(visit));if(seen.size%100<8)console.log(seen.size,queue.length);if(seen.size>5000)throw Error('crawl bound');}
fs.writeFileSync(process.argv[3],JSON.stringify({origin,results,sources},null,2));console.log('Done',results.length,'broken',results.filter(x=>x.status>=400||x.error));
if(results.some(r=>r.status>=400||r.error)) process.exitCode=1;
