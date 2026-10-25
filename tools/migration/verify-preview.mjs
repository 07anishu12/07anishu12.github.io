import fs from 'node:fs';
import assert from 'node:assert/strict';
const origin = process.argv[2];
if (!origin || !/^https?:\/\//.test(origin)) throw new Error('Provide the preview origin');
const xml = await (await fetch(new URL('/sitemap.xml', origin))).text();
const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
const failures=[];
let cursor=0;
await Promise.all(Array.from({length:4}, async()=>{
  while(cursor<paths.length) {
    const path=paths[cursor++];
    const response=await fetch(new URL(path,origin));
    if(response.status!==200) failures.push({path,status:response.status});
    await response.body?.cancel();
  }
}));
const missing=await fetch(new URL('/this-route-must-not-exist-synthetic/',origin));
assert.equal(missing.status,404,'Unknown routes must return a genuine 404');
const migrated=await fetch(new URL('/about.html',origin),{redirect:'manual'});
assert.ok([301,308].includes(migrated.status),'Legacy about URL must redirect permanently');
const result={routes:paths.length,failures,unknownStatus:missing.status,legacyRedirect:migrated.status};
fs.mkdirSync('.validation',{recursive:true});
fs.writeFileSync('.validation/route-audit.json',JSON.stringify(result,null,2));
console.log(JSON.stringify(result));
assert.equal(failures.length,0,'Sitemap contains failing routes');
