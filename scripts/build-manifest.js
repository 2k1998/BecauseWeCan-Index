const fs = require('fs');
const path = require('path');

function walk(dir, relPath = '') {
  let results = [];
  const list = fs.readdirSync(dir);
  
  // Sort folders first, then alphabetically
  list.sort((a, b) => {
    const aIsDir = fs.statSync(path.join(dir, a)).isDirectory();
    const bIsDir = fs.statSync(path.join(dir, b)).isDirectory();
    if (aIsDir && !bIsDir) return -1;
    if (!aIsDir && bIsDir) return 1;
    return a.localeCompare(b, 'el'); // Greek sorting
  });

  list.forEach(function(file) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    const newRelPath = relPath ? `${relPath}/${file}` : file;

    if (stat && stat.isDirectory()) {
      results.push({
        name: file,
        type: 'directory',
        path: newRelPath,
        children: walk(filePath, newRelPath)
      });
    } else if (file.toLowerCase().endsWith('.pdf')) {
      results.push({
        name: file,
        type: 'file',
        path: newRelPath
      });
    }
  });
  return results;
}

const rootDir = path.join(__dirname, '../public/files');
if (!fs.existsSync(rootDir)) {
    fs.mkdirSync(rootDir, { recursive: true });
}

const manifest = walk(rootDir);
fs.writeFileSync(path.join(__dirname, '../public/manifest.json'), JSON.stringify(manifest, null, 2));
console.log('✅ Generated manifest.json successfully.');
