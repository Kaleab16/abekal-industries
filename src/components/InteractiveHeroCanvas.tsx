import React, { useEffect, useRef, useState } from 'react';
import { Settings2, RotateCw, Sparkles, Compass } from 'lucide-react';

interface InteractiveHeroCanvasProps {
  isBlueprint?: boolean;
}

export const InteractiveHeroCanvas: React.FC<InteractiveHeroCanvasProps> = ({ isBlueprint = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // User interactive mode selection
  const [activePattern, setActivePattern] = useState<'hybrid' | 'fibonacci' | 'gears'>('hybrid');
  const [isRotating, setIsRotating] = useState(true);

  // Mouse & interaction tracking
  const mouseRef = useRef<{ x: number; y: number; isHovering: boolean; targetSpeed: number }>({
    x: 0,
    y: 0,
    isHovering: false,
    targetSpeed: 1,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let rotationAngle = 0;
    let mouseInfluenceAngle = 0;

    // Interlocking gear geometry definitions
    const gears = [
      { relX: 0.85, relY: 0.28, radius: 135, teeth: 24, baseSpeed: 0.0035, clockwise: true, label: 'DRIVE PINION // Ø270mm' },
      { relX: 0.64, relY: 0.18, radius: 85, teeth: 16, baseSpeed: -0.0055, clockwise: false, label: 'IDLER SHAFT // Ø170mm' },
      { relX: 0.92, relY: 0.72, radius: 165, teeth: 30, baseSpeed: -0.0028, clockwise: false, label: 'FLYWHEEL GEAR // Ø330mm' },
      { relX: 0.71, relY: 0.62, radius: 105, teeth: 20, baseSpeed: 0.0044, clockwise: true, label: 'REDUCTION HUB // Ø210mm' },
      { relX: 0.48, relY: 0.78, radius: 75, teeth: 14, baseSpeed: -0.0062, clockwise: false, label: 'OUTPUT CAM // Ø150mm' },
      { relX: 0.24, relY: 0.86, radius: 115, teeth: 22, baseSpeed: 0.0041, clockwise: true, label: 'SECONDARY DRIVE // Ø230mm' },
    ];

    const drawSingleGear = (
      cx: number,
      cy: number,
      radius: number,
      teeth: number,
      angle: number,
      strokeColor: string,
      accentColor: string,
      dashedColor: string,
      gearLabel: string
    ) => {
      const toothDepth = radius * 0.16;
      const innerRadius = radius - toothDepth;
      const holeRadius = radius * 0.38;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      // 1. Teeth and pitch circle
      ctx.beginPath();
      const step = (Math.PI * 2) / teeth;
      for (let i = 0; i < teeth; i++) {
        const a1 = i * step;
        const a2 = a1 + step * 0.28;
        const a3 = a1 + step * 0.55;
        const a4 = a1 + step * 0.82;

        ctx.lineTo(Math.cos(a1) * innerRadius, Math.sin(a1) * innerRadius);
        ctx.lineTo(Math.cos(a2) * radius, Math.sin(a2) * radius);
        ctx.lineTo(Math.cos(a3) * radius, Math.sin(a3) * radius);
        ctx.lineTo(Math.cos(a4) * innerRadius, Math.sin(a4) * innerRadius);
      }
      ctx.closePath();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Pitch guideline circle
      ctx.beginPath();
      ctx.arc(0, 0, radius - toothDepth * 0.5, 0, Math.PI * 2);
      ctx.setLineDash([3, 4]);
      ctx.strokeStyle = dashedColor;
      ctx.lineWidth = 0.9;
      ctx.stroke();
      ctx.setLineDash([]);

      // Inner rim circle
      ctx.beginPath();
      ctx.arc(0, 0, innerRadius * 0.82, 0, Math.PI * 2);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Center hub
      ctx.beginPath();
      ctx.arc(0, 0, holeRadius, 0, Math.PI * 2);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Shaft keyway center
      ctx.beginPath();
      ctx.arc(0, 0, holeRadius * 0.38, 0, Math.PI * 2);
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Spokes and lightening holes
      const spokeCount = teeth > 20 ? 6 : 4;
      for (let s = 0; s < spokeCount; s++) {
        const sAngle = (Math.PI * 2 / spokeCount) * s;
        ctx.beginPath();
        ctx.moveTo(Math.cos(sAngle) * (holeRadius + 3), Math.sin(sAngle) * (holeRadius + 3));
        ctx.lineTo(Math.cos(sAngle) * (innerRadius * 0.8 - 2), Math.sin(sAngle) * (innerRadius * 0.8 - 2));
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // Lightening holes
        ctx.beginPath();
        const midA = sAngle + (Math.PI / spokeCount);
        const midR = (holeRadius + innerRadius * 0.78) / 2;
        ctx.arc(Math.cos(midA) * midR, Math.sin(midA) * midR, radius * 0.08, 0, Math.PI * 2);
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Drafting alignment crosshairs
      ctx.beginPath();
      ctx.moveTo(-radius * 1.15, 0);
      ctx.lineTo(radius * 1.15, 0);
      ctx.moveTo(0, -radius * 1.15);
      ctx.lineTo(0, radius * 1.15);
      ctx.setLineDash([2, 5]);
      ctx.strokeStyle = dashedColor;
      ctx.lineWidth = 0.6;
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();

      // Dimension callout for larger gears
      if (radius > 110) {
        ctx.save();
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = dashedColor;
        ctx.fillText(gearLabel, cx - radius * 0.8, cy + radius + 14);
        ctx.restore();
      }
    };

    // Golden Ratio / Fibonacci Spiral Renderer
    const drawFibonacciSystem = (
      width: number,
      height: number,
      primaryColor: string,
      accentColor: string,
      goldenColor: string
    ) => {
      // Golden spiral origin anchor (centered on right-center quadrant)
      const originX = width * 0.72;
      const originY = height * 0.42;

      // Golden ratio phi ≈ 1.6180339887
      const phi = 1.6180339887;
      const baseScale = Math.min(width, height) * 0.016;

      // Mouse interactive tilt / morph
      const mx = mouseRef.current.isHovering ? (mouseRef.current.x - originX) * 0.0003 : 0;
      const my = mouseRef.current.isHovering ? (mouseRef.current.y - originY) * 0.0003 : 0;
      const pulse = 1 + Math.sin(time * 0.02) * 0.03;

      ctx.save();
      ctx.translate(originX, originY);
      ctx.rotate(time * 0.003 + mx + my);

      // Fibonacci sequence terms: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
      const fibSequence = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

      // Draw Golden Rectangles & Subdivisions
      let curX = 0;
      let curY = 0;
      const directions = [
        [1, 0],   // Right
        [0, 1],   // Down
        [-1, 0],  // Left
        [0, -1],  // Up
      ];

      // 1. Draw logarithmic continuous spiral curve
      ctx.beginPath();
      const maxTheta = 7 * Math.PI;
      const a = 1.4 * baseScale;
      const b = 0.30635; // ln(phi) / (pi / 2) ≈ 0.3063489

      for (let theta = 0; theta <= maxTheta; theta += 0.04) {
        const r = a * Math.exp(b * theta) * pulse;
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        if (theta === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = goldenColor;
      ctx.lineWidth = 2.0;
      ctx.stroke();

      // 2. Draw golden ratio ray partitions & angle steps
      for (let k = 0; k < 12; k++) {
        const rayAngle = (k * Math.PI) / 6;
        const rMax = a * Math.exp(b * (k * (Math.PI / 2))) * pulse;
        if (rMax < Math.min(width, height) * 0.9) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(rayAngle) * rMax, Math.sin(rayAngle) * rMax);
          ctx.setLineDash([2, 6]);
          ctx.strokeStyle = primaryColor;
          ctx.lineWidth = 0.7;
          ctx.stroke();
          ctx.setLineDash([]);

          // Golden node markers
          ctx.beginPath();
          ctx.arc(Math.cos(rayAngle) * rMax, Math.sin(rayAngle) * rMax, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = goldenColor;
          ctx.fill();
        }
      }

      // 3. Technical annotations along the golden logarithmic spiral
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = goldenColor;
      ctx.fillText(`Φ = 1.6180339... (GOLDEN RATIO SPIRAL)`, 20, -35);
      ctx.fillStyle = primaryColor;
      ctx.fillText(`r(θ) = a · e^(0.30635·θ) [NATURAL GROWTH EQUATION]`, 20, -20);
      ctx.fillText(`FIBONACCI HARMONIC CONVERGENCE [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]`, 20, -5);

      ctx.restore();
    };

    // Render loop
    const render = () => {
      time += 1;
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      // Color palettes adapting to Blueprint vs Drafting mode
      const strokeColor = isBlueprint
        ? 'rgba(255, 255, 255, 0.32)'
        : 'rgba(15, 23, 42, 0.25)';

      const accentColor = isBlueprint
        ? 'rgba(56, 189, 248, 0.55)'
        : 'rgba(2, 132, 199, 0.45)';

      const dashedColor = isBlueprint
        ? 'rgba(147, 197, 253, 0.42)'
        : 'rgba(100, 116, 139, 0.45)';

      const goldenColor = isBlueprint
        ? 'rgba(251, 191, 36, 0.65)' // Golden Amber on blueprint
        : 'rgba(217, 119, 6, 0.65)';  // Deep Amber on drafting

      // Dynamic rotation speed affected by hover & toggle
      const baseRotationIncrement = isRotating ? 0.8 : 0.15;
      const mouseSpeedMultiplier = mouseRef.current.isHovering ? 1.8 : 1.0;
      rotationAngle += baseRotationIncrement * mouseSpeedMultiplier;

      // Draw Fibonacci System if active
      if (activePattern === 'fibonacci' || activePattern === 'hybrid') {
        drawFibonacciSystem(width, height, strokeColor, accentColor, goldenColor);
      }

      // Draw Interconnected Gears System if active
      if (activePattern === 'gears' || activePattern === 'hybrid') {
        gears.forEach((gear) => {
          const cx = width * gear.relX;
          const cy = height * gear.relY;

          // Mouse proximity acceleration
          let distMultiplier = 1.0;
          if (mouseRef.current.isHovering) {
            const dx = mouseRef.current.x - cx;
            const dy = mouseRef.current.y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < gear.radius * 2) {
              distMultiplier = 2.2 - (dist / (gear.radius * 2));
            }
          }

          const currentGearAngle = rotationAngle * gear.baseSpeed * distMultiplier;
          drawSingleGear(
            cx,
            cy,
            gear.radius,
            gear.teeth,
            currentGearAngle,
            strokeColor,
            accentColor,
            dashedColor,
            gear.label
          );
        });
      }

      // Technical Drafting Coordinate Grid & Caliper marks
      ctx.save();
      ctx.strokeStyle = isBlueprint ? 'rgba(56, 189, 248, 0.15)' : 'rgba(148, 163, 184, 0.2)';
      ctx.lineWidth = 0.5;
      ctx.setLineDash([1, 8]);

      // Crosshair markers at quarter coordinates
      [0.25, 0.5, 0.75].forEach((px) => {
        const x = width * px;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      });

      [0.25, 0.5, 0.75].forEach((py) => {
        const y = height * py;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      ctx.restore();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    handleResize();
    render();

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isBlueprint, activePattern, isRotating]);

  // Handle interactive mouse moves over the canvas
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovering: true,
      targetSpeed: 1.5,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.isHovering = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden select-none"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 sm:opacity-75 transition-opacity"
      />

      {/* Floating Interactive Controls Badge (Geometric Selector) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1.5 rounded-xl border backdrop-blur-md shadow-md text-[11px] font-mono transition-all bg-white/80 border-slate-200 text-slate-800 dark:bg-[#0E294B]/80 dark:border-blue-400/25 dark:text-blue-100">
        <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 text-[10px] text-slate-500 dark:text-blue-300 font-semibold uppercase tracking-wider border-r border-current/15">
          <Compass className="w-3.5 h-3.5 text-[#00A859]" />
          <span>Geometry:</span>
        </div>

        <button
          type="button"
          onClick={() => setActivePattern('hybrid')}
          className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold ${
            activePattern === 'hybrid'
              ? 'bg-[#00A859] text-white shadow-sm'
              : 'hover:bg-black/5 dark:hover:bg-white/10 opacity-80'
          }`}
          title="Fibonacci Spiral & Precision Gears Combined"
        >
          Hybrid
        </button>

        <button
          type="button"
          onClick={() => setActivePattern('fibonacci')}
          className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold ${
            activePattern === 'fibonacci'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'hover:bg-black/5 dark:hover:bg-white/10 opacity-80'
          }`}
          title="Golden Ratio Fibonacci Logarithmic Spiral"
        >
          Fibonacci Φ
        </button>

        <button
          type="button"
          onClick={() => setActivePattern('gears')}
          className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold ${
            activePattern === 'gears'
              ? 'bg-[#38BDF8] text-slate-900 shadow-sm'
              : 'hover:bg-black/5 dark:hover:bg-white/10 opacity-80'
          }`}
          title="Intermeshing Precision Machine Gears"
        >
          Gears
        </button>

        <button
          type="button"
          onClick={() => setIsRotating(!isRotating)}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ml-0.5 ${
            isRotating
              ? 'text-[#00A859] hover:bg-[#00A859]/10'
              : 'opacity-50 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10'
          }`}
          title={isRotating ? 'Pause rotation' : 'Resume rotation'}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
        </button>
      </div>

      {/* Interactive mouse hint indicator */}
      <div className="absolute bottom-3 right-6 pointer-events-none opacity-40 hover:opacity-80 transition-opacity font-mono text-[9px] hidden lg:block z-10 text-slate-600 dark:text-blue-300">
        [INTERACTIVE // MOVE CURSOR OVER GEARS & SPIRAL TO ACCELERATE / ROTATE]
      </div>
    </div>
  );
};
