const fs = require('fs');
const path = require('path');

// Create all missing road signs based on our data

const additionalWarningSigns = {
  'A-11': {
    name: 'Nierówna droga',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <polygon points="100,20 180,160 20,160" fill="white" stroke="#E30613" stroke-width="10"/>
  <polygon points="100,35 165,145 35,145" fill="#FFD500"/>
  <path d="M 50,100 Q 65,85 80,100 T 100,100 T 120,100 T 150,100" fill="none" stroke="black" stroke-width="8"/>
</svg>`
  },
  'A-11a': {
    name: 'Próg zwalniający',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <polygon points="100,20 180,160 20,160" fill="white" stroke="#E30613" stroke-width="10"/>
  <polygon points="100,35 165,145 35,145" fill="#FFD500"/>
  <path d="M 50,100 L 70,100 L 80,85 L 120,85 L 130,100 L 150,100" fill="none" stroke="black" stroke-width="8"/>
</svg>`
  },
  'A-12a': {
    name: 'Zwężenie jezdni - dwustronne',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <polygon points="100,20 180,160 20,160" fill="white" stroke="#E30613" stroke-width="10"/>
  <polygon points="100,35 165,145 35,145" fill="#FFD500"/>
  <path d="M 70,60 L 70,120 M 130,60 L 130,120 M 85,60 L 85,120 M 115,60 L 115,120" stroke="black" stroke-width="8"/>
</svg>`
  },
  'A-14': {
    name: 'Roboty drogowe',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <polygon points="100,20 180,160 20,160" fill="white" stroke="#E30613" stroke-width="10"/>
  <polygon points="100,35 165,145 35,145" fill="#FFD500"/>
  <g transform="translate(100,90)">
    <circle cx="0" cy="-15" r="6" fill="black"/>
    <rect x="-4" y="-9" width="8" height="15" fill="black"/>
    <path d="M -8,6 L -4,6 L -2,25 L 2,25 L 4,6 L 8,6 L 6,30 L -6,30 Z" fill="black"/>
    <rect x="10" y="0" width="4" height="30" fill="black"/>
    <rect x="10" y="0" width="15" height="4" fill="black"/>
  </g>
</svg>`
  },
  'A-15': {
    name: 'Śliska jezdnia',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <polygon points="100,20 180,160 20,160" fill="white" stroke="#E30613" stroke-width="10"/>
  <polygon points="100,35 165,145 35,145" fill="#FFD500"/>
  <g transform="translate(100,90)">
    <rect x="-25" y="-10" width="50" height="25" rx="5" fill="black"/>
    <circle cx="-15" cy="15" r="8" fill="black"/>
    <circle cx="15" cy="15" r="8" fill="black"/>
    <path d="M 30,-5 Q 35,0 30,5" fill="none" stroke="black" stroke-width="3"/>
    <path d="M 30,10 Q 35,15 30,20" fill="none" stroke="black" stroke-width="3"/>
  </g>
</svg>`
  },
  'A-16': {
    name: 'Przejście dla pieszych',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <polygon points="100,20 180,160 20,160" fill="white" stroke="#E30613" stroke-width="10"/>
  <polygon points="100,35 165,145 35,145" fill="#FFD500"/>
  <g transform="translate(100,80)">
    <circle cx="0" cy="0" r="6" fill="black"/>
    <rect x="-3" y="6" width="6" height="15" fill="black"/>
    <path d="M -6,21 L -3,21 L -1,40 L 1,40 L 3,21 L 6,21 L 4,45 L -4,45 Z" fill="black"/>
    <rect x="-20" y="50" width="40" height="3" fill="black"/>
    <rect x="-18" y="55" width="8" height="3" fill="black"/>
    <rect x="-4" y="55" width="8" height="3" fill="black"/>
    <rect x="10" y="55" width="8" height="3" fill="black"/>
  </g>
</svg>`
  },
  'A-17': {
    name: 'Dzieci',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <polygon points="100,20 180,160 20,160" fill="white" stroke="#E30613" stroke-width="10"/>
  <polygon points="100,35 165,145 35,145" fill="#FFD500"/>
  <g transform="translate(100,85)">
    <g transform="translate(-15,0)">
      <circle cx="0" cy="0" r="5" fill="black"/>
      <rect x="-2" y="5" width="4" height="12" fill="black"/>
      <path d="M -4,17 L -2,17 L -1,30 L 1,30 L 2,17 L 4,17 L 3,35 L -3,35 Z" fill="black"/>
    </g>
    <g transform="translate(15,5) scale(0.8)">
      <circle cx="0" cy="0" r="5" fill="black"/>
      <rect x="-2" y="5" width="4" height="12" fill="black"/>
      <path d="M -4,17 L -2,17 L -1,30 L 1,30 L 2,17 L 4,17 L 3,35 L -3,35 Z" fill="black"/>
    </g>
  </g>
</svg>`
  },
  'A-18a': {
    name: 'Zwierzęta gospodarskie',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <polygon points="100,20 180,160 20,160" fill="white" stroke="#E30613" stroke-width="10"/>
  <polygon points="100,35 165,145 35,145" fill="#FFD500"/>
  <g transform="translate(100,90)">
    <ellipse cx="0" cy="0" rx="25" ry="15" fill="black"/>
    <rect x="-20" y="10" width="4" height="15" fill="black"/>
    <rect x="-10" y="10" width="4" height="15" fill="black"/>
    <rect x="6" y="10" width="4" height="15" fill="black"/>
    <rect x="16" y="10" width="4" height="15" fill="black"/>
    <ellipse cx="-25" cy="-5" rx="10" ry="8" fill="black"/>
    <polygon points="-30,-10 -28,-15 -26,-10" fill="black"/>
  </g>
</svg>`
  },
  'A-18b': {
    name: 'Zwierzęta dzikie',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <polygon points="100,20 180,160 20,160" fill="white" stroke="#E30613" stroke-width="10"/>
  <polygon points="100,35 165,145 35,145" fill="#FFD500"/>
  <g transform="translate(100,90)">
    <ellipse cx="0" cy="0" rx="20" ry="12" fill="black"/>
    <rect x="-15" y="8" width="3" height="20" fill="black"/>
    <rect x="-5" y="8" width="3" height="20" fill="black"/>
    <rect x="5" y="8" width="3" height="20" fill="black"/>
    <rect x="15" y="8" width="3" height="20" fill="black"/>
    <ellipse cx="-20" cy="-5" rx="8" ry="10" fill="black"/>
    <path d="M -25,-15 L -20,-5 L -15,-15" fill="none" stroke="black" stroke-width="3"/>
  </g>
</svg>`
  },
  'A-30': {
    name: 'Inne niebezpieczeństwo',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <polygon points="100,20 180,160 20,160" fill="white" stroke="#E30613" stroke-width="10"/>
  <polygon points="100,35 165,145 35,145" fill="#FFD500"/>
  <rect x="96" y="60" width="8" height="50" fill="black"/>
  <circle cx="100" cy="120" r="5" fill="black"/>
</svg>`
  }
};

const additionalProhibitionSigns = {
  'B-3': {
    name: 'Zakaz wjazdu pojazdów silnikowych',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="white" stroke="#E30613" stroke-width="10"/>
  <g transform="translate(100,100)">
    <rect x="-30" y="-15" width="60" height="25" rx="5" fill="black"/>
    <circle cx="-20" cy="15" r="8" fill="black"/>
    <circle cx="20" cy="15" r="8" fill="black"/>
    <rect x="-35" y="-10" width="10" height="15" fill="black"/>
  </g>
  <line x1="40" y1="140" x2="160" y2="60" stroke="#E30613" stroke-width="10"/>
</svg>`
  },
  'B-3a': {
    name: 'Zakaz wjazdu autobusów',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="white" stroke="#E30613" stroke-width="10"/>
  <g transform="translate(100,100)">
    <rect x="-35" y="-20" width="70" height="35" rx="5" fill="black"/>
    <rect x="-30" y="-15" width="15" height="15" fill="white"/>
    <rect x="-10" y="-15" width="15" height="15" fill="white"/>
    <rect x="10" y="-15" width="15" height="15" fill="white"/>
  </g>
  <line x1="40" y1="140" x2="160" y2="60" stroke="#E30613" stroke-width="10"/>
</svg>`
  },
  'B-4': {
    name: 'Zakaz wjazdu motocykli',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="white" stroke="#E30613" stroke-width="10"/>
  <g transform="translate(100,100)">
    <circle cx="-20" cy="10" r="10" fill="none" stroke="black" stroke-width="4"/>
    <circle cx="20" cy="10" r="10" fill="none" stroke="black" stroke-width="4"/>
    <path d="M -20,0 L 0,-10 L 20,0" fill="none" stroke="black" stroke-width="4"/>
    <rect x="-3" y="-20" width="6" height="15" fill="black"/>
    <rect x="-10" y="-20" width="20" height="4" fill="black"/>
  </g>
  <line x1="40" y1="140" x2="160" y2="60" stroke="#E30613" stroke-width="10"/>
</svg>`
  },
  'B-5': {
    name: 'Zakaz wjazdu samochodów ciężarowych',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="white" stroke="#E30613" stroke-width="10"/>
  <g transform="translate(100,100)">
    <rect x="-20" y="-15" width="40" height="25" fill="black"/>
    <rect x="-35" y="-10" width="15" height="20" fill="black"/>
    <circle cx="-15" cy="15" r="6" fill="black"/>
    <circle cx="15" cy="15" r="6" fill="black"/>
  </g>
  <line x1="40" y1="140" x2="160" y2="60" stroke="#E30613" stroke-width="10"/>
</svg>`
  },
  'B-9': {
    name: 'Zakaz wjazdu rowerów',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="white" stroke="#E30613" stroke-width="10"/>
  <g transform="translate(100,100)">
    <circle cx="-20" cy="15" r="12" fill="none" stroke="black" stroke-width="4"/>
    <circle cx="20" cy="15" r="12" fill="none" stroke="black" stroke-width="4"/>
    <path d="M -20,15 L 0,-10 L 20,15" fill="none" stroke="black" stroke-width="4"/>
    <path d="M 0,-10 L 0,-20" stroke="black" stroke-width="4"/>
    <path d="M -8,-20 L 8,-20" stroke="black" stroke-width="4"/>
  </g>
  <line x1="40" y1="140" x2="160" y2="60" stroke="#E30613" stroke-width="10"/>
</svg>`
  },
  'B-22': {
    name: 'Zakaz skręcania w prawo',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="white" stroke="#E30613" stroke-width="10"/>
  <path d="M 80,70 L 80,110 L 120,110" fill="none" stroke="black" stroke-width="8"/>
  <polygon points="125,105 115,110 125,115" fill="black"/>
  <line x1="160" y1="140" x2="40" y2="60" stroke="#E30613" stroke-width="10"/>
</svg>`
  },
  'B-23': {
    name: 'Zakaz zawracania',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="white" stroke="#E30613" stroke-width="10"/>
  <path d="M 70,120 L 70,80 Q 70,60 90,60 Q 110,60 110,80 L 110,110" fill="none" stroke="black" stroke-width="8"/>
  <polygon points="105,115 110,105 115,115" fill="black"/>
  <line x1="40" y1="140" x2="160" y2="60" stroke="#E30613" stroke-width="10"/>
</svg>`
  },
  'B-25': {
    name: 'Zakaz wyprzedzania',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="white" stroke="#E30613" stroke-width="10"/>
  <rect x="50" y="90" width="35" height="20" rx="3" fill="#E30613"/>
  <rect x="115" y="90" width="35" height="20" rx="3" fill="none" stroke="black" stroke-width="4"/>
</svg>`
  },
  'B-35': {
    name: 'Zakaz postoju',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#0066CC" stroke="#E30613" stroke-width="10"/>
  <line x1="45" y1="145" x2="155" y2="55" stroke="#E30613" stroke-width="10"/>
</svg>`
  },
  'B-36': {
    name: 'Zakaz zatrzymywania się',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#0066CC" stroke="#E30613" stroke-width="10"/>
  <line x1="45" y1="145" x2="155" y2="55" stroke="#E30613" stroke-width="10"/>
  <line x1="45" y1="55" x2="155" y2="145" stroke="#E30613" stroke-width="10"/>
</svg>`
  }
};

const additionalMandatorySigns = {
  'C-3': {
    name: 'Nakaz jazdy w lewo przed znakiem',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#0066CC"/>
  <path d="M 130,120 L 130,80 L 90,80" fill="none" stroke="white" stroke-width="10"/>
  <polygon points="85,75 95,80 85,85" fill="white"/>
</svg>`
  },
  'C-4': {
    name: 'Nakaz jazdy w lewo za znakiem',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#0066CC"/>
  <path d="M 140,100 L 100,100 L 100,70" fill="none" stroke="white" stroke-width="10"/>
  <polygon points="95,65 100,75 105,65" fill="white"/>
</svg>`
  },
  'C-5': {
    name: 'Nakaz jazdy prosto',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#0066CC"/>
  <line x1="100" y1="140" x2="100" y2="60" stroke="white" stroke-width="10"/>
  <polygon points="95,55 100,65 105,55" fill="white"/>
</svg>`
  },
  'C-6': {
    name: 'Nakaz jazdy prosto lub w prawo',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#0066CC"/>
  <line x1="100" y1="140" x2="100" y2="60" stroke="white" stroke-width="10"/>
  <polygon points="95,55 100,65 105,55" fill="white"/>
  <path d="M 100,100 L 140,100" fill="none" stroke="white" stroke-width="10"/>
  <polygon points="145,95 135,100 145,105" fill="white"/>
</svg>`
  },
  'C-7': {
    name: 'Nakaz jazdy prosto lub w lewo',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#0066CC"/>
  <line x1="100" y1="140" x2="100" y2="60" stroke="white" stroke-width="10"/>
  <polygon points="95,55 100,65 105,55" fill="white"/>
  <path d="M 100,100 L 60,100" fill="none" stroke="white" stroke-width="10"/>
  <polygon points="55,95 65,100 55,105" fill="white"/>
</svg>`
  },
  'C-8': {
    name: 'Nakaz jazdy w prawo lub w lewo',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#0066CC"/>
  <line x1="60" y1="100" x2="140" y2="100" stroke="white" stroke-width="10"/>
  <polygon points="55,95 65,100 55,105" fill="white"/>
  <polygon points="145,95 135,100 145,105" fill="white"/>
</svg>`
  },
  'C-9': {
    name: 'Nakaz jazdy z prawej strony znaku',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#0066CC"/>
  <rect x="95" y="60" width="10" height="80" fill="white"/>
  <path d="M 105,80 L 125,100 L 105,120" fill="none" stroke="white" stroke-width="8"/>
</svg>`
  },
  'C-10': {
    name: 'Nakaz jazdy z lewej strony znaku',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#0066CC"/>
  <rect x="95" y="60" width="10" height="80" fill="white"/>
  <path d="M 95,80 L 75,100 L 95,120" fill="none" stroke="white" stroke-width="8"/>
</svg>`
  },
  'C-13': {
    name: 'Droga dla rowerów',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#0066CC"/>
  <g transform="translate(100,100)" fill="white">
    <circle cx="-25" cy="20" r="15" fill="none" stroke="white" stroke-width="4"/>
    <circle cx="25" cy="20" r="15" fill="none" stroke="white" stroke-width="4"/>
    <path d="M -25,20 L 0,-10 L 25,20" fill="none" stroke="white" stroke-width="4"/>
    <path d="M 0,-10 L 0,-25" stroke="white" stroke-width="4"/>
    <path d="M -10,-25 L 10,-25" stroke="white" stroke-width="4"/>
    <circle cx="0" cy="-35" r="5" fill="white"/>
  </g>
</svg>`
  },
  'C-13a': {
    name: 'Koniec drogi dla rowerów',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#0066CC"/>
  <g transform="translate(100,100)" fill="white">
    <circle cx="-25" cy="20" r="15" fill="none" stroke="white" stroke-width="4"/>
    <circle cx="25" cy="20" r="15" fill="none" stroke="white" stroke-width="4"/>
    <path d="M -25,20 L 0,-10 L 25,20" fill="none" stroke="white" stroke-width="4"/>
    <path d="M 0,-10 L 0,-25" stroke="white" stroke-width="4"/>
    <path d="M -10,-25 L 10,-25" stroke="white" stroke-width="4"/>
  </g>
  <line x1="45" y1="145" x2="155" y2="55" stroke="#E30613" stroke-width="8"/>
</svg>`
  },
  'C-14': {
    name: 'Prędkość minimalna 30',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#0066CC"/>
  <text x="100" y="115" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white">30</text>
</svg>`
  },
  'C-16': {
    name: 'Droga dla pieszych',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="80" fill="#0066CC"/>
  <g transform="translate(100,85)" fill="white">
    <circle cx="0" cy="0" r="8" fill="white"/>
    <rect x="-4" y="8" width="8" height="20" fill="white"/>
    <path d="M -8,28 L -4,28 L -2,55 L 2,55 L 4,28 L 8,28 L 6,60 L -6,60 Z" fill="white"/>
  </g>
</svg>`
  }
};

const additionalInformationSigns = {
  'D-2': {
    name: 'Koniec drogi z pierwszeństwem',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect x="40" y="40" width="120" height="120" transform="rotate(45 100 100)" fill="#FFCC00" stroke="white" stroke-width="8"/>
  <line x1="50" y1="100" x2="150" y2="100" stroke="black" stroke-width="8"/>
  <line x1="60" y1="110" x2="140" y2="110" stroke="black" stroke-width="4"/>
  <line x1="60" y1="90" x2="140" y2="90" stroke="black" stroke-width="4"/>
</svg>`
  },
  'D-4a': {
    name: 'Droga bez przejazdu',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect x="20" y="20" width="160" height="160" fill="#0066CC"/>
  <rect x="35" y="35" width="130" height="130" fill="white"/>
  <rect x="95" y="50" width="10" height="80" fill="black"/>
  <rect x="70" y="120" width="60" height="10" fill="#E30613"/>
</svg>`
  },
  'D-5': {
    name: 'Pierwszeństwo na zwężonym odcinku drogi',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect x="20" y="20" width="160" height="160" fill="white" stroke="black" stroke-width="4"/>
  <polygon points="100,60 130,90 130,110 100,140 70,110 70,90" fill="white" stroke="black" stroke-width="4"/>
  <polygon points="90,85 110,85 110,75 125,100 110,125 110,115 90,115" fill="#E30613"/>
  <polygon points="90,125 80,115 90,105" fill="white" stroke="black" stroke-width="3"/>
</svg>`
  },
  'D-6a': {
    name: 'Przejazd dla rowerzystów',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect x="20" y="20" width="160" height="160" fill="#0066CC"/>
  <rect x="35" y="35" width="130" height="130" fill="white"/>
  <g transform="translate(100,90)">
    <circle cx="-20" cy="20" r="12" fill="none" stroke="black" stroke-width="3"/>
    <circle cx="20" cy="20" r="12" fill="none" stroke="black" stroke-width="3"/>
    <path d="M -20,20 L 0,-5 L 20,20" fill="none" stroke="black" stroke-width="3"/>
    <path d="M 0,-5 L 0,-15" stroke="black" stroke-width="3"/>
    <path d="M -8,-15 L 8,-15" stroke="black" stroke-width="3"/>
  </g>
  <rect x="50" y="140" width="100" height="4" fill="black"/>
  <rect x="60" y="148" width="15" height="4" fill="black"/>
  <rect x="92" y="148" width="15" height="4" fill="black"/>
  <rect x="125" y="148" width="15" height="4" fill="black"/>
</svg>`
  },
  'D-6b': {
    name: 'Przejście dla pieszych i przejazd dla rowerzystów',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect x="20" y="20" width="160" height="160" fill="#0066CC"/>
  <rect x="35" y="35" width="130" height="130" fill="white"/>
  <g transform="translate(75,80)">
    <circle cx="0" cy="0" r="6" fill="black"/>
    <rect x="-3" y="6" width="6" height="12" fill="black"/>
    <path d="M -5,18 L -3,18 L -1,35 L 1,35 L 3,18 L 5,18 L 4,40 L -4,40 Z" fill="black"/>
  </g>
  <g transform="translate(125,90) scale(0.8)">
    <circle cx="-15" cy="15" r="10" fill="none" stroke="black" stroke-width="3"/>
    <circle cx="15" cy="15" r="10" fill="none" stroke="black" stroke-width="3"/>
    <path d="M -15,15 L 0,-5 L 15,15" fill="none" stroke="black" stroke-width="3"/>
  </g>
</svg>`
  },
  'D-7': {
    name: 'Droga ekspresowa',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect x="20" y="20" width="160" height="160" fill="#006F35"/>
  <g transform="translate(100,100)" fill="white">
    <rect x="-60" y="-5" width="50" height="4" fill="white"/>
    <rect x="-60" y="1" width="50" height="4" fill="white"/>
    <rect x="10" y="-5" width="50" height="4" fill="white"/>
    <rect x="10" y="1" width="50" height="4" fill="white"/>
    <polygon points="-10,0 0,-20 10,0" fill="white"/>
  </g>
</svg>`
  },
  'D-8': {
    name: 'Koniec drogi ekspresowej',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect x="20" y="20" width="160" height="160" fill="#006F35"/>
  <g transform="translate(100,100)" fill="white">
    <rect x="-60" y="-5" width="50" height="4" fill="white"/>
    <rect x="-60" y="1" width="50" height="4" fill="white"/>
    <rect x="10" y="-5" width="50" height="4" fill="white"/>
    <rect x="10" y="1" width="50" height="4" fill="white"/>
    <polygon points="-10,0 0,-20 10,0" fill="white"/>
  </g>
  <line x1="35" y1="165" x2="165" y2="35" stroke="#E30613" stroke-width="8"/>
</svg>`
  },
  'D-9': {
    name: 'Autostrada',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect x="20" y="20" width="160" height="160" fill="#006F35"/>
  <g transform="translate(100,100)" fill="white">
    <rect x="-60" y="-10" width="50" height="3" fill="white"/>
    <rect x="-60" y="-4" width="50" height="3" fill="white"/>
    <rect x="-60" y="2" width="50" height="3" fill="white"/>
    <rect x="10" y="-10" width="50" height="3" fill="white"/>
    <rect x="10" y="-4" width="50" height="3" fill="white"/>
    <rect x="10" y="2" width="50" height="3" fill="white"/>
    <polygon points="-10,-3 0,-25 10,-3" fill="white"/>
  </g>
</svg>`
  },
  'D-10': {
    name: 'Koniec autostrady',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect x="20" y="20" width="160" height="160" fill="#006F35"/>
  <g transform="translate(100,100)" fill="white">
    <rect x="-60" y="-10" width="50" height="3" fill="white"/>
    <rect x="-60" y="-4" width="50" height="3" fill="white"/>
    <rect x="-60" y="2" width="50" height="3" fill="white"/>
    <rect x="10" y="-10" width="50" height="3" fill="white"/>
    <rect x="10" y="-4" width="50" height="3" fill="white"/>
    <rect x="10" y="2" width="50" height="3" fill="white"/>
    <polygon points="-10,-3 0,-25 10,-3" fill="white"/>
  </g>
  <line x1="35" y1="165" x2="165" y2="35" stroke="#E30613" stroke-width="8"/>
</svg>`
  },
  'D-18a': {
    name: 'Parking - miejsce zastrzeżone',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect x="20" y="20" width="160" height="160" fill="#0066CC"/>
  <rect x="35" y="35" width="130" height="130" fill="white"/>
  <text x="100" y="90" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#0066CC">P</text>
  <g transform="translate(100,125)">
    <circle cx="0" cy="0" r="20" fill="none" stroke="#0066CC" stroke-width="3"/>
    <circle cx="0" cy="-10" r="5" fill="#0066CC"/>
    <rect x="-3" y="-5" width="6" height="10" fill="#0066CC"/>
    <rect x="-8" y="5" width="16" height="4" fill="#0066CC"/>
    <rect x="-6" y="9" width="12" height="10" fill="none" stroke="#0066CC" stroke-width="2"/>
  </g>
</svg>`
  },
  'D-19': {
    name: 'Postój taksówek',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect x="20" y="20" width="160" height="160" fill="#0066CC"/>
  <rect x="35" y="35" width="130" height="130" fill="white"/>
  <text x="100" y="110" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="black">TAXI</text>
</svg>`
  },
  'D-21': {
    name: 'Szpital',
    svg: `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <rect x="20" y="20" width="160" height="160" fill="#0066CC"/>
  <rect x="35" y="35" width="130" height="130" fill="white"/>
  <rect x="90" y="60" width="20" height="80" fill="#E30613"/>
  <rect x="60" y="90" width="80" height="20" fill="#E30613"/>
</svg>`
  }
};

// Write additional SVG files
Object.keys(additionalWarningSigns).forEach(signId => {
  const filePath = path.join(__dirname, '..', 'public', 'signs', 'ostrzegawcze', `${signId}.svg`);
  fs.writeFileSync(filePath, additionalWarningSigns[signId].svg);
  console.log(`Created: ${filePath}`);
});

Object.keys(additionalProhibitionSigns).forEach(signId => {
  const filePath = path.join(__dirname, '..', 'public', 'signs', 'zakazu', `${signId}.svg`);
  fs.writeFileSync(filePath, additionalProhibitionSigns[signId].svg);
  console.log(`Created: ${filePath}`);
});

Object.keys(additionalMandatorySigns).forEach(signId => {
  const filePath = path.join(__dirname, '..', 'public', 'signs', 'nakazu', `${signId}.svg`);
  fs.writeFileSync(filePath, additionalMandatorySigns[signId].svg);
  console.log(`Created: ${filePath}`);
});

Object.keys(additionalInformationSigns).forEach(signId => {
  const filePath = path.join(__dirname, '..', 'public', 'signs', 'informacyjne', `${signId}.svg`);
  fs.writeFileSync(filePath, additionalInformationSigns[signId].svg);
  console.log(`Created: ${filePath}`);
});

console.log('All additional road sign SVG files created successfully!');