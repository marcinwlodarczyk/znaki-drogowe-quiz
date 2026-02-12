const fs = require('fs');
const path = require('path');

// Ensure directories exist
const signCategories = ['ostrzegawcze', 'zakazu', 'nakazu', 'informacyjne'];
signCategories.forEach(category => {
  const dir = path.join(__dirname, '..', 'public', 'signs', category);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Polish Road Signs SVG Templates

// Warning Signs (Znaki ostrzegawcze)
const warningSigns = {
  'A-1': {
    name: 'Niebezpieczny zakręt w prawo',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <!-- Polish Warning Sign A-1: Dangerous curve to the right -->
  <polygon points="100,20 180,160 20,160" fill="white" stroke="#E30613" stroke-width="10"/>
  <polygon points="100,35 165,145 35,145" fill="#FFD500"/>
  <path d="M 65,110 Q 65,65 100,65 Q 135,65 135,110" fill="none" stroke="black" stroke-width="10" stroke-linecap="round"/>
  <polygon points="135,120 145,105 125,105" fill="black"/>
</svg>`
  },
  'A-2': {
    name: 'Niebezpieczny zakręt w lewo',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <!-- Polish Warning Sign A-2: Dangerous curve to the left -->
  <polygon points="100,20 180,160 20,160" fill="white" stroke="#E30613" stroke-width="10"/>
  <polygon points="100,35 165,145 35,145" fill="#FFD500"/>
  <path d="M 135,110 Q 135,65 100,65 Q 65,65 65,110" fill="none" stroke="black" stroke-width="10" stroke-linecap="round"/>
  <polygon points="65,120 55,105 75,105" fill="black"/>
</svg>`
  },
  'A-3': {
    name: 'Niebezpieczne zakręty - pierwszy w prawo',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <polygon points="100,20 180,160 20,160" fill="white" stroke="#E30613" stroke-width="10"/>
  <polygon points="100,35 165,145 35,145" fill="#FFD500"/>
  <path d="M 70,120 Q 70,95 85,95 Q 100,95 100,70 Q 100,55 115,55 Q 130,55 130,80" fill="none" stroke="black" stroke-width="8"/>
  <polygon points="130,90 140,75 120,75" fill="black"/>
</svg>`
  },
  'A-4': {
    name: 'Niebezpieczne zakręty - pierwszy w lewo',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <polygon points="100,20 180,160 20,160" fill="white" stroke="#E30613" stroke-width="10"/>
  <polygon points="100,35 165,145 35,145" fill="#FFD500"/>
  <path d="M 130,120 Q 130,95 115,95 Q 100,95 100,70 Q 100,55 85,55 Q 70,55 70,80" fill="none" stroke="black" stroke-width="8"/>
  <polygon points="70,90 60,75 80,75" fill="black"/>
</svg>`
  },
  'A-5': {
    name: 'Skrzyżowanie dróg',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <polygon points="100,20 180,160 20,160" fill="white" stroke="#E30613" stroke-width="10"/>
  <polygon points="100,35 165,145 35,145" fill="#FFD500"/>
  <line x1="100" y1="55" x2="100" y2="125" stroke="black" stroke-width="10"/>
  <line x1="65" y1="90" x2="135" y2="90" stroke="black" stroke-width="10"/>
</svg>`
  },
  'A-6a': {
    name: 'Skrzyżowanie z drogą podporządkowaną po obu stronach',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <polygon points="100,20 180,160 20,160" fill="white" stroke="#E30613" stroke-width="10"/>
  <polygon points="100,35 165,145 35,145" fill="#FFD500"/>
  <line x1="100" y1="55" x2="100" y2="125" stroke="black" stroke-width="10"/>
  <line x1="65" y1="90" x2="100" y2="90" stroke="black" stroke-width="8"/>
  <line x1="100" y1="90" x2="135" y2="90" stroke="black" stroke-width="8"/>
</svg>`
  },
  'A-7': {
    name: 'Ustąp pierwszeństwa',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <polygon points="100,160 180,20 20,20" fill="white" stroke="#E30613" stroke-width="10"/>
  <polygon points="100,145 165,35 35,35" fill="#FFD500"/>
  <polygon points="100,120 130,60 70,60" fill="none" stroke="#E30613" stroke-width="8"/>
</svg>`
  },
  'A-8': {
    name: 'Skrzyżowanie o ruchu okrężnym',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <polygon points="100,20 180,160 20,160" fill="white" stroke="#E30613" stroke-width="10"/>
  <polygon points="100,35 165,145 35,145" fill="#FFD500"/>
  <circle cx="100" cy="90" r="25" fill="none" stroke="black" stroke-width="8"/>
  <polygon points="125,75 130,85 120,80" fill="black"/>
  <polygon points="75,105 70,95 80,100" fill="black"/>
  <polygon points="115,115 105,120 110,110" fill="black"/>
</svg>`
  },
  'A-9': {
    name: 'Przejazd kolejowy z zaporami',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <polygon points="100,20 180,160 20,160" fill="white" stroke="#E30613" stroke-width="10"/>
  <polygon points="100,35 165,145 35,145" fill="#FFD500"/>
  <rect x="85" y="70" width="30" height="35" fill="black"/>
  <line x1="60" y1="90" x2="140" y2="90" stroke="black" stroke-width="6"/>
  <rect x="65" y="85" width="10" height="10" fill="black" transform="rotate(-45 70 90)"/>
  <rect x="125" y="85" width="10" height="10" fill="black" transform="rotate(-45 130 90)"/>
</svg>`
  },
  'A-10': {
    name: 'Przejazd kolejowy bez zapór',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <polygon points="100,20 180,160 20,160" fill="white" stroke="#E30613" stroke-width="10"/>
  <polygon points="100,35 165,145 35,145" fill="#FFD500"/>
  <g transform="translate(100,90)">
    <rect x="-40" y="-2" width="80" height="4" fill="black" transform="rotate(0)"/>
    <rect x="-40" y="-2" width="80" height="4" fill="black" transform="rotate(15)"/>
    <rect x="-40" y="-2" width="80" height="4" fill="black" transform="rotate(-15)"/>
    <circle cx="-25" cy="0" r="4" fill="black"/>
    <circle cx="25" cy="0" r="4" fill="black"/>
  </g>
</svg>`
  },
  // Add more warning signs...
};

// Prohibition Signs (Znaki zakazu)
const prohibitionSigns = {
  'B-1': {
    name: 'Zakaz ruchu w obu kierunkach',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="white" stroke="#E30613" stroke-width="10"/>
  <rect x="40" y="95" width="120" height="10" fill="#E30613"/>
</svg>`
  },
  'B-2': {
    name: 'Zakaz wjazdu',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#E30613"/>
  <rect x="40" y="90" width="120" height="20" fill="white"/>
</svg>`
  },
  'B-20': {
    name: 'Stop',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <polygon points="70,30 130,30 170,70 170,130 130,170 70,170 30,130 30,70" fill="#E30613"/>
  <polygon points="75,35 125,35 165,75 165,125 125,165 75,165 35,125 35,75" fill="#E30613" stroke="white" stroke-width="4"/>
  <text x="100" y="110" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="white">STOP</text>
</svg>`
  },
  'B-21': {
    name: 'Zakaz skręcania w lewo',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="white" stroke="#E30613" stroke-width="10"/>
  <path d="M 120,70 L 120,110 L 80,110" fill="none" stroke="black" stroke-width="8"/>
  <polygon points="75,105 85,110 75,115" fill="black"/>
  <line x1="40" y1="140" x2="160" y2="60" stroke="#E30613" stroke-width="10"/>
</svg>`
  },
  'B-33': {
    name: 'Ograniczenie prędkości 50',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="white" stroke="#E30613" stroke-width="10"/>
  <text x="100" y="115" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="black">50</text>
</svg>`
  },
  // Add more prohibition signs...
};

// Mandatory Signs (Znaki nakazu)
const mandatorySigns = {
  'C-1': {
    name: 'Nakaz jazdy w prawo przed znakiem',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#0066CC"/>
  <path d="M 70,120 L 70,80 L 110,80" fill="none" stroke="white" stroke-width="10"/>
  <polygon points="115,75 105,80 115,85" fill="white"/>
</svg>`
  },
  'C-2': {
    name: 'Nakaz jazdy w prawo za znakiem',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#0066CC"/>
  <path d="M 60,100 L 100,100 L 100,70" fill="none" stroke="white" stroke-width="10"/>
  <polygon points="95,65 100,75 105,65" fill="white"/>
</svg>`
  },
  'C-12': {
    name: 'Ruch okrężny',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#0066CC"/>
  <circle cx="100" cy="100" r="35" fill="none" stroke="white" stroke-width="8"/>
  <polygon points="130,85 135,95 125,90" fill="white"/>
  <polygon points="85,115 80,105 90,110" fill="white"/>
  <polygon points="115,130 105,135 110,125" fill="white"/>
</svg>`
  },
  // Add more mandatory signs...
};

// Information Signs (Znaki informacyjne)
const informationSigns = {
  'D-1': {
    name: 'Droga z pierwszeństwem',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect x="40" y="40" width="120" height="120" transform="rotate(45 100 100)" fill="#FFCC00" stroke="white" stroke-width="8"/>
</svg>`
  },
  'D-3': {
    name: 'Droga jednokierunkowa',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect x="20" y="20" width="160" height="160" fill="#0066CC"/>
  <rect x="35" y="85" width="130" height="30" fill="white"/>
  <polygon points="160,100 150,90 150,95 40,95 40,105 150,105 150,110" fill="#0066CC"/>
</svg>`
  },
  'D-6': {
    name: 'Przejście dla pieszych',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect x="20" y="20" width="160" height="160" fill="#0066CC"/>
  <rect x="35" y="35" width="130" height="130" fill="white"/>
  <g transform="translate(100,100)">
    <circle cx="0" cy="-30" r="8" fill="black"/>
    <rect x="-4" y="-22" width="8" height="20" fill="black"/>
    <path d="M -8,0 L -4,0 L -2,25 L 2,25 L 4,0 L 8,0 L 6,30 L -6,30 Z" fill="black"/>
    <rect x="-30" y="40" width="60" height="5" fill="black"/>
    <rect x="-25" y="48" width="10" height="5" fill="black"/>
    <rect x="-5" y="48" width="10" height="5" fill="black"/>
    <rect x="15" y="48" width="10" height="5" fill="black"/>
  </g>
</svg>`
  },
  'D-18': {
    name: 'Parking',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect x="20" y="20" width="160" height="160" fill="#0066CC"/>
  <rect x="35" y="35" width="130" height="130" fill="white"/>
  <text x="100" y="125" text-anchor="middle" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="#0066CC">P</text>
</svg>`
  },
  // Add more information signs...
};

// Write all SVG files
function writeSVGFiles() {
  // Warning signs
  Object.keys(warningSigns).forEach(signId => {
    const filePath = path.join(__dirname, '..', 'public', 'signs', 'ostrzegawcze', `${signId}.svg`);
    fs.writeFileSync(filePath, warningSigns[signId].svg);
    console.log(`Created: ${filePath}`);
  });

  // Prohibition signs
  Object.keys(prohibitionSigns).forEach(signId => {
    const filePath = path.join(__dirname, '..', 'public', 'signs', 'zakazu', `${signId}.svg`);
    fs.writeFileSync(filePath, prohibitionSigns[signId].svg);
    console.log(`Created: ${filePath}`);
  });

  // Mandatory signs
  Object.keys(mandatorySigns).forEach(signId => {
    const filePath = path.join(__dirname, '..', 'public', 'signs', 'nakazu', `${signId}.svg`);
    fs.writeFileSync(filePath, mandatorySigns[signId].svg);
    console.log(`Created: ${filePath}`);
  });

  // Information signs
  Object.keys(informationSigns).forEach(signId => {
    const filePath = path.join(__dirname, '..', 'public', 'signs', 'informacyjne', `${signId}.svg`);
    fs.writeFileSync(filePath, informationSigns[signId].svg);
    console.log(`Created: ${filePath}`);
  });
}

writeSVGFiles();
console.log('All road sign SVG files created successfully!');