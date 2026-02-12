'use client';

interface RoadSignSVGProps {
  signId: string;
  category: string;
}

export default function RoadSignSVG({ signId, category }: RoadSignSVGProps) {
  // Detailed SVG representations of actual Polish road signs

  const getSignContent = () => {
    const signCode = signId.split('-')[0]; // Get the letter part (A, B, C, D)
    const signNumber = signId.split('-')[1]; // Get the number part

    // Base SVG structure based on category
    if (category === 'ostrzegawcze') {
      // Warning signs - triangular with red border
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Triangle background */}
          <polygon
            points="100,25 175,155 25,155"
            fill="white"
            stroke="#E30613"
            strokeWidth="10"
          />
          <polygon
            points="100,35 165,145 35,145"
            fill="#FFCC00"
          />

          {/* Sign-specific content */}
          {signId === 'A-1' && (
            // Right curve
            <path d="M 80,80 Q 120,80 120,120" stroke="black" strokeWidth="8" fill="none" />
          )}
          {signId === 'A-2' && (
            // Left curve
            <path d="M 120,80 Q 80,80 80,120" stroke="black" strokeWidth="8" fill="none" />
          )}
          {signId === 'A-3' && (
            // Multiple curves, first right
            <>
              <path d="M 70,70 Q 90,70 90,90 T 110,110" stroke="black" strokeWidth="6" fill="none" />
              <path d="M 110,110 Q 130,110 130,130" stroke="black" strokeWidth="6" fill="none" />
            </>
          )}
          {signId === 'A-4' && (
            // Multiple curves, first left
            <>
              <path d="M 130,70 Q 110,70 110,90 T 90,110" stroke="black" strokeWidth="6" fill="none" />
              <path d="M 90,110 Q 70,110 70,130" stroke="black" strokeWidth="6" fill="none" />
            </>
          )}
          {signId === 'A-5' && (
            // Intersection
            <>
              <line x1="100" y1="60" x2="100" y2="130" stroke="black" strokeWidth="8" />
              <line x1="70" y1="95" x2="130" y2="95" stroke="black" strokeWidth="8" />
            </>
          )}
          {signId === 'A-6a' && (
            // T-junction
            <>
              <line x1="100" y1="60" x2="100" y2="130" stroke="black" strokeWidth="8" />
              <line x1="70" y1="95" x2="100" y2="95" stroke="black" strokeWidth="8" />
              <line x1="100" y1="95" x2="130" y2="95" stroke="black" strokeWidth="8" />
            </>
          )}
          {signId === 'A-7' && (
            // Yield ahead - inverted triangle
            <polygon
              points="100,120 120,80 80,80"
              fill="none"
              stroke="#E30613"
              strokeWidth="4"
            />
          )}
          {signId === 'A-8' && (
            // Roundabout
            <>
              <circle cx="100" cy="95" r="25" fill="none" stroke="black" strokeWidth="6" />
              <polygon points="120,80 125,90 115,85" fill="black" />
              <polygon points="80,110 75,100 85,105" fill="black" />
              <polygon points="115,115 105,120 110,110" fill="black" />
            </>
          )}
          {(signId === 'A-9' || signId === 'A-10' || signId === 'A-11' || signId === 'A-11a' ||
            signId === 'A-12a' || signId === 'A-14' || signId === 'A-15' || signId === 'A-16' ||
            signId === 'A-17' || signId === 'A-18a' || signId === 'A-18b' || signId === 'A-30') && (
            // Generic symbol for other warning signs
            <text x="100" y="105" textAnchor="middle" fontSize="16" fontWeight="bold" fill="black">
              {signId}
            </text>
          )}
        </svg>
      );
    } else if (category === 'zakazu') {
      // Prohibition signs - circular with red border
      if (signId === 'B-20') {
        // STOP sign - octagon
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <polygon
              points="70,30 130,30 170,70 170,130 130,170 70,170 30,130 30,70"
              fill="#E30613"
            />
            <text x="100" y="110" textAnchor="middle" fontSize="32" fontWeight="bold" fill="white">
              STOP
            </text>
          </svg>
        );
      }

      return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="75" fill="white" stroke="#E30613" strokeWidth="10" />
          <circle cx="100" cy="100" r="65" fill="white" />

          {signId === 'B-1' && (
            // No entry both directions
            <rect x="40" y="95" width="120" height="10" fill="#E30613" />
          )}
          {signId === 'B-2' && (
            // No entry
            <rect x="40" y="90" width="120" height="20" fill="white" stroke="#E30613" strokeWidth="2" />
          )}
          {signId === 'B-21' && (
            // No left turn
            <>
              <path d="M 120,80 L 120,110 L 80,110" stroke="black" strokeWidth="8" fill="none" />
              <polygon points="75,105 85,110 75,115" fill="black" />
              <line x1="40" y1="140" x2="160" y2="60" stroke="#E30613" strokeWidth="10" />
            </>
          )}
          {signId === 'B-22' && (
            // No right turn
            <>
              <path d="M 80,80 L 80,110 L 120,110" stroke="black" strokeWidth="8" fill="none" />
              <polygon points="125,105 115,110 125,115" fill="black" />
              <line x1="160" y1="140" x2="40" y2="60" stroke="#E30613" strokeWidth="10" />
            </>
          )}
          {signId === 'B-33' && (
            // Speed limit
            <text x="100" y="115" textAnchor="middle" fontSize="48" fontWeight="bold" fill="black">
              50
            </text>
          )}
          {(signId === 'B-3' || signId === 'B-3a' || signId === 'B-4' || signId === 'B-5' ||
            signId === 'B-9' || signId === 'B-23' || signId === 'B-25' || signId === 'B-35' ||
            signId === 'B-36') && (
            // Generic for other prohibition signs
            <text x="100" y="110" textAnchor="middle" fontSize="16" fontWeight="bold" fill="black">
              {signId}
            </text>
          )}
        </svg>
      );
    } else if (category === 'nakazu') {
      // Mandatory signs - circular blue with white symbols
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="75" fill="#0066CC" />

          {signId === 'C-1' && (
            // Turn right ahead
            <>
              <path d="M 80,120 L 80,80 L 110,80" stroke="white" strokeWidth="10" fill="none" />
              <polygon points="115,75 105,80 115,85" fill="white" />
            </>
          )}
          {signId === 'C-2' && (
            // Turn right after sign
            <>
              <path d="M 70,100 L 100,100 L 100,80" stroke="white" strokeWidth="10" fill="none" />
              <polygon points="95,75 100,85 105,75" fill="white" />
            </>
          )}
          {signId === 'C-3' && (
            // Turn left ahead
            <>
              <path d="M 120,120 L 120,80 L 90,80" stroke="white" strokeWidth="10" fill="none" />
              <polygon points="85,75 95,80 85,85" fill="white" />
            </>
          )}
          {signId === 'C-4' && (
            // Turn left after sign
            <>
              <path d="M 130,100 L 100,100 L 100,80" stroke="white" strokeWidth="10" fill="none" />
              <polygon points="95,75 100,85 105,75" fill="white" />
            </>
          )}
          {signId === 'C-5' && (
            // Straight ahead
            <>
              <line x1="100" y1="130" x2="100" y2="70" stroke="white" strokeWidth="10" />
              <polygon points="95,65 100,75 105,65" fill="white" />
            </>
          )}
          {signId === 'C-12' && (
            // Roundabout
            <>
              <circle cx="100" cy="100" r="30" fill="none" stroke="white" strokeWidth="8" />
              <polygon points="125,85 130,95 120,90" fill="white" />
              <polygon points="85,115 80,105 90,110" fill="white" />
              <polygon points="115,125 105,130 110,120" fill="white" />
            </>
          )}
          {(signId === 'C-6' || signId === 'C-7' || signId === 'C-8' || signId === 'C-9' ||
            signId === 'C-10' || signId === 'C-13' || signId === 'C-13a' || signId === 'C-14' ||
            signId === 'C-16') && (
            // Generic for other mandatory signs
            <text x="100" y="110" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">
              {signId}
            </text>
          )}
        </svg>
      );
    } else if (category === 'informacyjne') {
      // Information signs - various shapes and colors
      if (signId === 'D-1') {
        // Priority road - yellow diamond
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <rect x="40" y="40" width="120" height="120" transform="rotate(45 100 100)" fill="#FFCC00" stroke="white" strokeWidth="8" />
            <rect x="50" y="50" width="100" height="100" transform="rotate(45 100 100)" fill="#FFCC00" />
          </svg>
        );
      }

      return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <rect x="25" y="25" width="150" height="150" fill="#0066CC" />

          {signId === 'D-3' && (
            // One way
            <>
              <rect x="40" y="85" width="120" height="30" fill="white" />
              <polygon points="155,100 145,90 145,95 45,95 45,105 145,105 145,110" fill="#0066CC" />
            </>
          )}
          {signId === 'D-6' && (
            // Pedestrian crossing
            <>
              <rect x="40" y="40" width="120" height="120" fill="white" />
              <circle cx="100" cy="70" r="8" fill="black" />
              <rect x="96" y="78" width="8" height="20" fill="black" />
              <polygon points="92,98 100,98 100,125 108,98 116,98 108,125 108,135 100,135 100,125 92,125" fill="black" />
              <rect x="60" y="140" width="80" height="6" fill="black" />
              <rect x="65" y="148" width="15" height="6" fill="black" />
              <rect x="92" y="148" width="15" height="6" fill="black" />
              <rect x="120" y="148" width="15" height="6" fill="black" />
            </>
          )}
          {signId === 'D-18' && (
            // Parking
            <>
              <rect x="40" y="40" width="120" height="120" fill="white" />
              <text x="100" y="120" textAnchor="middle" fontSize="64" fontWeight="bold" fill="#0066CC">
                P
              </text>
            </>
          )}
          {(signId === 'D-2' || signId === 'D-4a' || signId === 'D-5' || signId === 'D-6a' ||
            signId === 'D-6b' || signId === 'D-7' || signId === 'D-8' || signId === 'D-9' ||
            signId === 'D-10' || signId === 'D-18a' || signId === 'D-19' || signId === 'D-21') && (
            // Generic for other information signs
            <text x="100" y="110" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">
              {signId}
            </text>
          )}
        </svg>
      );
    }

    // Default fallback
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <rect x="25" y="25" width="150" height="150" fill="#ccc" />
        <text x="100" y="110" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#666">
          {signId}
        </text>
      </svg>
    );
  };

  return getSignContent();
}