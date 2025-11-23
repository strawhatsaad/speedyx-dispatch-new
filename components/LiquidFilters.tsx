"use client";

export default function LiquidFilters() {
  return (
    <svg className="hidden fixed">
      <defs>
        <filter id="goo">
          {/* Increase stdDeviation to make it 'stickier' */}
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            /* This matrix bumps the Alpha channel way up, creating a hard edge */
            values="1 0 0 0 0  
                    0 1 0 0 0  
                    0 0 1 0 0  
                    0 0 0 35 -10"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}
