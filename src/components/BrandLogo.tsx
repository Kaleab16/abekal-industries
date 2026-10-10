import React from 'react';

interface BrandLogoProps {
  className?: string;
  isBlueprint?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  isBlueprint = false,
  size = 'md'
}) => {
  // Height / width dimensions
  const heights = {
    sm: 30,
    md: 42,
    lg: 58,
    xl: 78,
  };

  const h = heights[size];
  const w = Math.round(h * 2.2);

  const textColor = isBlueprint ? '#FFFFFF' : '#141618';
  const greenColor = '#00A859';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 240 110"
        width={w}
        height={h}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-200 group-hover:scale-[1.02]"
      >
        {/* Slanted Group with skewX(-12deg) for dynamic forward momentum */}
        <g transform="skewX(-14) translate(14, 0)">
          {/* Top Line: ABE (Dark/White) + KAL (Green) */}
          <text
            x="8"
            y="48"
            fill={textColor}
            fontFamily="'Cabinet Grotesk', 'Arial Black', -apple-system, sans-serif"
            fontWeight="900"
            fontSize="46"
            letterSpacing="-0.5px"
          >
            ABE
          </text>
          
          <text
            x="110"
            y="48"
            fill={greenColor}
            fontFamily="'Cabinet Grotesk', 'Arial Black', -apple-system, sans-serif"
            fontWeight="900"
            fontSize="46"
            letterSpacing="-0.5px"
          >
            KAL
          </text>

          {/* Dynamic Green Blade / Arrow Divider */}
          <path
            d="M -6 58 L 196 58 L 222 66 L 190 62 L -6 62 Z"
            fill={greenColor}
          />
          {/* Sharp dynamic spear tip */}
          <polygon
            points="190,56 226,65 186,74 200,65"
            fill={greenColor}
          />

          {/* Bottom Line: INDUSTRIES (Dark/White) */}
          <text
            x="12"
            y="98"
            fill={textColor}
            fontFamily="'Cabinet Grotesk', 'Arial Black', -apple-system, sans-serif"
            fontWeight="900"
            fontSize="32"
            letterSpacing="0.5px"
          >
            INDUSTRIES
          </text>
        </g>
      </svg>
    </div>
  );
};
