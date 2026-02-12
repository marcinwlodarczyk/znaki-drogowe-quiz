const fs = require('fs');
const path = require('path');

// Read the roadSignsData file
const filePath = path.join(__dirname, '..', 'lib', 'roadSignsData.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Fix all image URLs to include the category folder
content = content.replace(/imageUrl: "\/signs\/A-/g, 'imageUrl: "/signs/ostrzegawcze/A-');
content = content.replace(/imageUrl: "\/signs\/B-/g, 'imageUrl: "/signs/zakazu/B-');
content = content.replace(/imageUrl: "\/signs\/C-/g, 'imageUrl: "/signs/nakazu/C-');
content = content.replace(/imageUrl: "\/signs\/D-/g, 'imageUrl: "/signs/informacyjne/D-');

// Write the updated content back
fs.writeFileSync(filePath, content);

console.log('Fixed all image URLs in roadSignsData.ts');