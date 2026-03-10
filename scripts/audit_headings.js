const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'sources_fetch');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== 'cortex-cloud-appsec-combined.md').sort();

let titleAsH1 = 0;
let titleAsOther = 0;
let noTitleHeading = 0;
const titleOtherExamples = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf-8');
  const lines = content.split('\n');

  let title = '', depth = -1;
  let inFm = false, fmCount = 0;
  for (const line of lines) {
    if (line === '---') { fmCount++; inFm = fmCount === 1; continue; }
    if (inFm) {
      const tm = line.match(/^title:\s*"(.*)"/);
      if (tm) title = tm[1];
      const dm = line.match(/^depth:\s*(\d+)/);
      if (dm) depth = parseInt(dm[1]);
    }
  }

  let pastFm = false; fmCount = 0;
  let firstHeading = null;
  for (const line of lines) {
    if (line === '---') { fmCount++; if (fmCount === 2) pastFm = true; continue; }
    if (!pastFm) continue;
    const hm = line.match(/^(#{1,6})\s+(.+)$/);
    if (hm) { firstHeading = { level: hm[1].length, text: hm[2].trim() }; break; }
  }

  if (!firstHeading) { noTitleHeading++; continue; }

  const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (norm(firstHeading.text) === norm(title)) {
    if (firstHeading.level === 1) titleAsH1++;
    else {
      titleAsOther++;
      if (titleOtherExamples.length < 5) {
        titleOtherExamples.push({ file, depth, level: firstHeading.level, title });
      }
    }
  } else {
    noTitleHeading++;
  }
}

console.log('=== Title Heading Analysis ===');
console.log(`Files where title is # (h1): ${titleAsH1}`);
console.log(`Files where title is other heading: ${titleAsOther}`);
if (titleOtherExamples.length) {
  for (const e of titleOtherExamples) {
    console.log(`  ${e.file} (depth ${e.depth}): h${e.level} "${e.title}"`);
  }
}
console.log(`Files where first heading != title: ${noTitleHeading}`);
console.log();

// Pattern analysis
const pattern = {};
for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf-8');
  const lines = content.split('\n');

  let depth = -1;
  let inFm = false, fmCount = 0;
  for (const line of lines) {
    if (line === '---') { fmCount++; inFm = fmCount === 1; continue; }
    if (inFm) {
      const dm = line.match(/^depth:\s*(\d+)/);
      if (dm) depth = parseInt(dm[1]);
    }
  }

  let pastFm = false; fmCount = 0;
  const headingLevels = [];
  for (const line of lines) {
    if (line === '---') { fmCount++; if (fmCount === 2) pastFm = true; continue; }
    if (!pastFm) continue;
    const hm = line.match(/^(#{1,6})\s+/);
    if (hm) headingLevels.push(hm[1].length);
  }

  if (!pattern[depth]) pattern[depth] = { count: 0, firstLevels: {}, subLevels: {} };
  pattern[depth].count++;
  if (headingLevels.length > 0) {
    const fl = headingLevels[0];
    pattern[depth].firstLevels[fl] = (pattern[depth].firstLevels[fl] || 0) + 1;
  }
  for (const l of headingLevels.slice(1)) {
    pattern[depth].subLevels[l] = (pattern[depth].subLevels[l] || 0) + 1;
  }
}

console.log('=== Current Pattern: TOC Depth -> Heading Levels ===\n');
console.log('Depth | Files | First heading levels       | Sub-heading levels');
console.log('------|-------|-----------------------------|-------------------');
for (const d of Object.keys(pattern).sort((a,b) => a-b)) {
  const p = pattern[d];
  const first = Object.entries(p.firstLevels).map(([l,c]) => `h${l}(x${c})`).join(', ');
  const sub = Object.entries(p.subLevels).map(([l,c]) => `h${l}(x${c})`).join(', ');
  console.log(`  ${d}   |  ${String(p.count).padStart(3)} | ${first.padEnd(27)} | ${sub}`);
}
