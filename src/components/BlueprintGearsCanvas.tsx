import React, { useEffect, useRef } from 'react';

interface BlueprintGearsCanvasProps {
  isBlueprint?: boolean;
}

export const BlueprintGearsCanvas: React.FC<BlueprintGearsCanvasProps> = ({ isBlueprint = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;

    // Define interconnected gear systems
    const gears = [
      { x: 0.82, y: 0.35, radius: 120, teeth: 24, speed: 0.003, clockwise: true },
      { x: 0.58, y: 0.22, radius: 80, teeth: 16, speed: -0.0045, clockwise: false },
      { x: 0.92, y: 0.75, radius: 150, teeth: 30, speed: -0.0024, clockwise: false },
      { x: 0.68, y: 0.65, radius: 95, teeth: 18, speed: 0.0038, clockwise: true },
      { x: 0.45, y: 0.78, radius: 70, teeth: 14, speed: -0.0051, clockwise: false },
      { x: 0.25, y: 0.88, radius: 110, teeth: 22, speed: 0.0032, clockwise: true },
    ];

    const drawGear = (
      cx: number,
      cy: number,
      radius: number,
      teeth: number,
      angle: number,
      strokeColor: string,
      accentColor: string
    ) => {
      const toothDepth = radius * 0.16;
      const innerRadius = radius - toothDepth;
      const holeRadius = radius * 0.38;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      // Outer teeth path
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

      // Pitch circle / pitch diameter guideline
      ctx.beginPath();
      ctx.arc(0, 0, radius - toothDepth * 0.5, 0, Math.PI * 2);
      ctx.setLineDash([3, 4]);
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 0.8;
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
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Center shaft hole
      ctx.beginPath();
      ctx.arc(0, 0, holeRadius * 0.38, 0, Math.PI * 2);
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Spokes (4 to 6 spokes)
      const spokeCount = teeth > 20 ? 6 : 4;
      for (let s = 0; s < spokeCount; s++) {
        const sAngle = (Math.PI * 2 / spokeCount) * s;
        ctx.beginPath();
        ctx.moveTo(Math.cos(sAngle) * (holeRadius + 4), Math.sin(sAngle) * (holeRadius + 4));
        ctx.lineTo(Math.cos(sAngle) * (innerRadius * 0.8 - 2), Math.sin(sAngle) * (innerRadius * 0.8 - 2));
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Spoke lightening cutouts
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
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 0.6;
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();
    };

    const render = () => {
      rotation += 1;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const strokeColor = isBlueprint
        ? 'rgba(255, 255, 255, 0.35)'
        : 'rgba(14, 41, 75, 0.28)';

      const accentColor = isBlueprint
        ? 'rgba(56, 189, 248, 0.45)'
        : 'rgba(0, 168, 89, 0.35)';

      // Draw all meshing gears
      gears.forEach((g) => {
        const cx = width * g.x;
        const cy = height * g.y;
        const currentAngle = rotation * g.speed;
        drawGear(cx, cy, g.radius, g.teeth, currentAngle, strokeColor, accentColor);
      });

      // Technical blueprint dimension annotations
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = isBlueprint ? 'rgba(147, 197, 253, 0.45)' : 'rgba(14, 41, 75, 0.35)';

      const wX = width * 0.82;
      const wY = height * 0.35;
      ctx.fillText(`Ø 240.0mm [MOD 5.0]`, wX - 50, wY + 140);
      ctx.fillText(`GEAR MESH TOLERANCE: ±0.02mm`, wX - 60, wY + 155);

      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    handleResize();
    render();

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isBlueprint]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-40 sm:opacity-50"
    />
  );
};
