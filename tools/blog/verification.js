const fs = require('node:fs');
const path = require('node:path');
const { ROOT, ORIGIN, assert } = require('./content');
async function run() {
  const [command, input] = process.argv.slice(2);
  assert(['import', 'check'].includes(command) && input, 'Usage: npm run search-console -- import /exact/path/googleTOKEN.html | check googleTOKEN.html');
  const filename = path.basename(input);
  assert(/^google[a-zA-Z0-9_-]+\.html$/.test(filename), 'Expected the exact downloaded google*.html filename.');
  const dest = path.join(ROOT, filename);
  if (command === 'import') {
    const bytes = fs.readFileSync(path.resolve(input));
    assert(/^google-site-verification:\s*google[a-zA-Z0-9_-]+\.html\s*$/.test(bytes.toString('utf8')) && bytes.toString('utf8').includes(filename), 'The file is not a matching Google HTML verification document.');
    assert(!fs.existsSync(dest) || fs.readFileSync(dest).equals(bytes), 'A different file already exists at the destination; preserve it and investigate.');
    fs.writeFileSync(dest, bytes);
    console.log(`Imported exact bytes to ${dest}. Build and deploy, then run: npm run search-console -- check ${filename}`);
  } else {
    const response = await fetch(`${ORIGIN}/${filename}`, { redirect: 'manual' });
    const received = Buffer.from(await response.arrayBuffer());
    assert(response.status === 200, `Verification URL returned HTTP ${response.status}.`);
    assert(received.equals(fs.readFileSync(dest)), 'Public verification contents do not exactly match the local file.');
    console.log(`HTTP 200 and exact content confirmed: ${ORIGIN}/${filename}\nYou can click Verify for URL-prefix property ${ORIGIN}/, then submit ${ORIGIN}/sitemap.xml.`);
  }
}
run().catch(e => { console.error(e.message); process.exitCode = 1; });
