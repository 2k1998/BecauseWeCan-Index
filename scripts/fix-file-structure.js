const fs = require('fs');
const path = require('path');

const filesRoot = path.join(__dirname, '..', 'public', 'files');

// Move these providers from Λοιποί πάροχοι ενέργειας up to Ενέργεια directly
const toMove = ['Ζενίθ', 'Ήρων', 'enerwave', 'protergia', 'volton'];
const loipoi = path.join(filesRoot, 'Ενέργεια', 'Λοιποί πάροχοι ενέργειας');
const energia = path.join(filesRoot, 'Ενέργεια');

for (const name of toMove) {
  const src = path.join(loipoi, name);
  const dst = path.join(energia, name);
  if (fs.existsSync(src) && !fs.existsSync(dst)) {
    fs.renameSync(src, dst);
    console.log(`Moved: ${name}`);
  } else if (fs.existsSync(dst)) {
    console.log(`Already moved: ${name}`);
  } else {
    console.log(`Source not found: ${name}`);
  }
}

// Ensure empty directories exist with a .gitkeep so git tracks them
const emptyDirs = [
  'Ενέργεια/NRG',
  'Ενέργεια/Λοιποί πάροχοι ενέργειας/Eunice',
  'Ενέργεια/Λοιποί πάροχοι ενέργειας/ΦΑΕΕΕ',
  'Τηλεφωνία',
  'Τηλεφωνία/Vodafone',
  'Τηλεφωνία/Λοιποί πάροχοι τηλεφωνίας',
  'Τηλεφωνία/Λοιποί πάροχοι τηλεφωνίας/Nova',
  'Τηλεφωνία/Λοιποί πάροχοι τηλεφωνίας/Cosmote',
];

for (const rel of emptyDirs) {
  const dir = path.join(filesRoot, rel);
  fs.mkdirSync(dir, { recursive: true });
  const keep = path.join(dir, '.gitkeep');
  if (!fs.existsSync(keep)) fs.writeFileSync(keep, '');
  console.log(`Ensured: ${rel}`);
}

console.log('\nDone. Run: git add -A && git status');
