const fs = require('fs');
const path = require('path');

// Read the roadSignsData file
const filePath = path.join(__dirname, '..', 'lib', 'roadSignsData.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace all SVG URLs with PNG URLs using the PL_road_sign format
// For warning signs (A)
content = content.replace(/imageUrl: "\/signs\/ostrzegawcze\/A-(\d+[a-z]?)\.svg"/g, 'imageUrl: "/signs/PL_road_sign_A-$1.svg.png"');

// For prohibition signs (B)
content = content.replace(/imageUrl: "\/signs\/zakazu\/B-(\d+[a-z]?)\.svg"/g, 'imageUrl: "/signs/PL_road_sign_B-$1.svg.png"');

// For mandatory signs (C)
content = content.replace(/imageUrl: "\/signs\/nakazu\/C-(\d+[a-z]?)\.svg"/g, 'imageUrl: "/signs/PL_road_sign_C-$1.svg.png"');

// For information signs (D)
content = content.replace(/imageUrl: "\/signs\/informacyjne\/D-(\d+[a-z]?)\.svg"/g, 'imageUrl: "/signs/PL_road_sign_D-$1.svg.png"');

// Write the updated content back
fs.writeFileSync(filePath, content);

console.log('Updated all image URLs to use PNG files');

// List which files are available
const signsDir = path.join(__dirname, '..', 'public', 'signs');
const files = fs.readdirSync(signsDir);
const pngFiles = files.filter(f => f.endsWith('.png'));

// Extract sign IDs from filenames
const availableSigns = {
  A: [],
  B: [],
  C: [],
  D: []
};

pngFiles.forEach(file => {
  const match = file.match(/PL_road_sign_([A-D])-([^.]+)\.svg\.png/);
  if (match) {
    const type = match[1];
    const number = match[2];
    availableSigns[type].push(`${type}-${number}`);
  }
});

console.log('\nAvailable signs:');
console.log('Warning signs (A):', availableSigns.A.sort().join(', '));
console.log('Prohibition signs (B):', availableSigns.B.sort().join(', '));
console.log('Mandatory signs (C):', availableSigns.C.sort().join(', '));
console.log('Information signs (D):', availableSigns.D.sort().join(', '));