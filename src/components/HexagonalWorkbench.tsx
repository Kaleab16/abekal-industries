import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface HexagonalWorkbenchProps {
  isBlueprint?: boolean;
  onSelectVenture?: (ventureId: string) => void;
  onSelectAfripedia?: () => void;
}

interface HexNode {
  id: string;
  name: string;
  category: string;
  status: string;
  statusColor: string; // In Development nodes are GREY as requested
  cx: number;
  cy: number;
  description: string;
  metrics: { label: string; value: string };
  signalRate: string;
  isSpecial?: boolean;
}

export const HexagonalWorkbench: React.FC<HexagonalWorkbenchProps> = ({
  isBlueprint = true,
  onSelectVenture,
  onSelectAfripedia,
}) => {
  const [activeHexId, setActiveHexId] = useState<string>('core');
  const [pulseTick, setPulseTick] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseTick((prev) => (prev + 1) % 100);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  // GREY accent color for in-development projects as explicitly requested by user
  const greyColor = '#94A3B8';

  const hexNodes: HexNode[] = [
    {
      id: 'core',
      name: 'Abekal Core',
      category: 'Engineering Workshop & Hub',
      status: 'Operating Active',
      statusColor: '#00A859',
      cx: 300,
      cy: 200,
      description: 'Central engineering workshop coordinating student platforms, AI research, and African knowledge systems.',
      metrics: { label: 'System Coherence', value: '100%' },
      signalRate: 'Active Hub'
    },
    {
      id: 'book-club',
      name: 'Book Club',
      category: 'Student Reading Circles',
      status: 'In Development',
      statusColor: greyColor, // GREY as requested
      cx: 300 + 135 * Math.cos((0 * Math.PI) / 180),
      cy: 200 + 135 * Math.sin((0 * Math.PI) / 180),
      description: 'Social reading circles and peer-to-peer textbook exchange platform for university students.',
      metrics: { label: 'Reading Circles', value: 'In Design' },
      signalRate: 'P2P Mesh'
    },
    {
      id: 'sinqe-guidance',
      name: 'Upperclassmen',
      category: 'Freshmen ↔ Senior Guidance',
      status: 'In Development',
      statusColor: greyColor, // GREY as requested
      cx: 300 + 135 * Math.cos((60 * Math.PI) / 180),
      cy: 200 + 135 * Math.sin((60 * Math.PI) / 180),
      description: 'Connecting incoming university freshmen with senior students who can share experience, offer mentorship, and help them navigate university life.',
      metrics: { label: 'Mentorship Map', value: 'Cohort Prep' },
      signalRate: 'Mentorship Sync'
    },
    {
      id: 'classflow',
      name: 'classflow',
      category: 'Educational Communication',
      status: 'In Development',
      statusColor: greyColor, // GREY as requested
      cx: 300 + 135 * Math.cos((120 * Math.PI) / 180),
      cy: 200 + 135 * Math.sin((120 * Math.PI) / 180),
      description: 'Academic communication and coordination platform between students, class representatives, and teachers.',
      metrics: { label: 'Topology Engine', value: 'Protocol Test' },
      signalRate: 'Zero-Noise Relay'
    },
    {
      id: 'build-log',
      name: 'Build Log',
      category: 'Engineering & Experiments',
      status: 'Operating Active',
      statusColor: '#00A859',
      cx: 300 + 135 * Math.cos((180 * Math.PI) / 180),
      cy: 200 + 135 * Math.sin((180 * Math.PI) / 180),
      description: 'Documenting engineering hypotheses, system architectures, telemetry metrics, and reflections.',
      metrics: { label: 'Telemetry Stream', value: 'Live' },
      signalRate: 'Verified Logs'
    },
    {
      id: 'club-os',
      name: 'ClubOS',
      category: 'Campus Management System',
      status: 'In Development',
      statusColor: greyColor, // GREY as requested
      cx: 300 + 135 * Math.cos((240 * Math.PI) / 180),
      cy: 200 + 135 * Math.sin((240 * Math.PI) / 180),
      description: 'Unified management platform for university societies, budget ledgers, and event approvals.',
      metrics: { label: 'Campus Societies', value: 'In Design' },
      signalRate: 'Draft Ledger'
    },
    {
      id: 'jember',
      name: 'JEMBER',
      category: 'AI Cognitive Assistant',
      status: 'In Development',
      statusColor: greyColor, // GREY as requested
      cx: 300 + 135 * Math.cos((300 * Math.PI) / 180),
      cy: 200 + 135 * Math.sin((300 * Math.PI) / 180),
      description: 'Multi-stage cognitive reasoning assistant designed for personal productivity and multi-project workflows.',
      metrics: { label: 'Reasoning DAG', value: 'Prototyping' },
      signalRate: 'Cognitive Route'
    }
  ];

  const activeNode = hexNodes.find((n) => n.id === activeHexId) || hexNodes[0];

  // Helper to generate a flat-topped hexagon SVG points string
  const getHexPoints = (cx: number, cy: number, r: number) => {
    const points: string[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i + Math.PI / 6;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return points.join(' ');
  };

  const strokeGrid = isBlueprint ? 'rgba(56, 189, 248, 0.12)' : 'rgba(14, 41, 75, 0.08)';
  const strokeLine = isBlueprint ? 'rgba(147, 197, 253, 0.25)' : 'rgba(14, 41, 75, 0.18)';

  return (
    <div className={`relative w-full rounded-2xl border transition-all duration-300 overflow-hidden ${
      isBlueprint 
        ? 'bg-[#0E294B] border-blue-400/20 text-white shadow-xl' 
        : 'bg-white border-black/10 text-neutral-900 shadow-md'
    }`}>
      {/* Top Technical Drafting Header Bar */}
      <div className={`flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b text-xs font-mono ${
        isBlueprint ? 'border-blue-400/20 bg-[#081B33]' : 'border-black/10 bg-neutral-50'
      }`}>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00A859] animate-pulse" />
          <span className="font-bold tracking-wider uppercase">
            HEXAGONAL WORKBENCH // INITIATIVES TOPOLOGY
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] opacity-75">
          <span className="hidden sm:inline">ORIGIN: ADDIS ABABA (09°01'08" N, 38°45'42" E)</span>
          <span className="px-2 py-0.5 rounded border border-current text-[10px] uppercase font-bold text-slate-400">
            IN DEVELOPMENT (GREY)
          </span>
        </div>
      </div>

      {/* Main Grid: Hex Schematic & Inspection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
        {/* Hex Canvas (7 cols) */}
        <div className="lg:col-span-7 relative p-4 flex items-center justify-center overflow-hidden">
          <svg
            viewBox="0 0 600 400"
            className="w-full h-auto max-w-full select-none"
            style={{ minHeight: '340px' }}
          >
            <defs>
              <pattern id="hex-bg-pattern-2" width="40" height="69.28" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 20 11.55 L 0 0 L 0 23.09 L 20 34.64 L 40 23.09 Z M 0 34.64 L 20 46.19 L 40 34.64 L 40 57.74 L 20 69.28 L 0 57.74 Z"
                  fill="none"
                  stroke={strokeGrid}
                  strokeWidth="0.7"
                />
              </pattern>
            </defs>

            {/* Background Honeycomb Matrix */}
            <rect width="600" height="400" fill="url(#hex-bg-pattern-2)" />

            {/* Outer Hexagonal Boundary Ring */}
            <polygon
              points={getHexPoints(300, 200, 185)}
              fill="none"
              stroke={strokeGrid}
              strokeWidth="1.2"
              strokeDasharray="4 4"
            />

            {/* Radial Hex Traces from Center to Orbitals */}
            {hexNodes.filter((n) => n.id !== 'core').map((node) => {
              const isLinked = activeHexId === node.id || activeHexId === 'core';
              const pX = 300 + (node.cx - 300) * ((pulseTick % 100) / 100);
              const pY = 200 + (node.cy - 200) * ((pulseTick % 100) / 100);

              return (
                <g key={`trace-${node.id}`}>
                  {/* Hex Trace Line */}
                  <line
                    x1="300"
                    y1="200"
                    x2={node.cx}
                    y2={node.cy}
                    stroke={isLinked ? node.statusColor : strokeLine}
                    strokeWidth={isLinked ? '2' : '1'}
                    strokeDasharray={isLinked ? 'none' : '3 3'}
                    opacity={isLinked ? 0.9 : 0.4}
                    className="transition-all duration-300"
                  />

                  {/* Travelling Signal Pulse */}
                  <circle
                    cx={pX}
                    cy={pY}
                    r="3"
                    fill={node.statusColor}
                    className="filter drop-shadow-[0_0_3px_rgba(148,163,184,0.8)]"
                  />
                </g>
              );
            })}

            {/* Hexagon Nodes */}
            {hexNodes.map((node) => {
              const isSelected = activeHexId === node.id;
              const isCore = node.id === 'core';
              const radius = isCore ? 40 : 32;

              return (
                <g
                  key={node.id}
                  onClick={() => setActiveHexId(node.id)}
                  className="cursor-pointer group"
                >
                  {/* Outer Hex Ring if Selected */}
                  {isSelected && (
                    <polygon
                      points={getHexPoints(node.cx, node.cy, radius + 8)}
                      fill="none"
                      stroke={node.statusColor}
                      strokeWidth="1.8"
                      strokeDasharray="4 2"
                      className="animate-spin"
                      style={{
                        transformOrigin: `${node.cx}px ${node.cy}px`,
                        animationDuration: '24s'
                      }}
                    />
                  )}

                  {/* Main Hexagon Body */}
                  <polygon
                    points={getHexPoints(node.cx, node.cy, radius)}
                    fill={
                      isBlueprint
                        ? isSelected ? '#1E293B' : '#0F172A'
                        : isSelected ? '#E2E8F0' : '#F1F5F9'
                    }
                    stroke={isSelected ? node.statusColor : (isBlueprint ? 'rgba(148, 163, 184, 0.4)' : 'rgba(100, 116, 139, 0.3)')}
                    strokeWidth={isSelected ? '2.5' : '1.5'}
                    className="transition-all duration-200 group-hover:scale-105"
                    style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
                  />

                  {/* Inner Node Graphic */}
                  {isCore ? (
                    <g>
                      <polygon
                        points={getHexPoints(node.cx, node.cy, 18)}
                        fill="#00A859"
                      />
                      <circle cx={node.cx} cy={node.cy} r="4" fill="#FFFFFF" />
                    </g>
                  ) : (
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r="6"
                      fill={node.statusColor}
                      opacity={isSelected ? 1 : 0.8}
                    />
                  )}

                  {/* Node Label Text */}
                  <text
                    x={node.cx}
                    y={node.cy + radius + 15}
                    textAnchor="middle"
                    fill={isBlueprint ? '#FFFFFF' : '#111316'}
                    fontSize={isCore ? '12' : '10'}
                    fontWeight={isSelected ? '800' : '600'}
                    fontFamily="var(--font-mono)"
                    className="pointer-events-none select-none tracking-tight"
                  >
                    {node.name}
                  </text>
                  <text
                    x={node.cx}
                    y={node.cy + radius + 26}
                    textAnchor="middle"
                    fill={node.statusColor}
                    fontSize="8.5"
                    fontWeight="700"
                    fontFamily="var(--font-mono)"
                    className="pointer-events-none select-none tracking-wider uppercase"
                  >
                    {node.status}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-2 left-4 text-[10px] font-mono opacity-60">
            Click any hexagonal node to inspect project architecture
          </div>
        </div>

        {/* Inspection Details Panel (5 cols) */}
        <div className={`lg:col-span-5 p-6 border-t lg:border-t-0 lg:border-l flex flex-col justify-between ${
          isBlueprint ? 'border-blue-400/20 bg-[#0A1D37]' : 'border-black/10 bg-neutral-50'
        }`}>
          <div>
            {/* Top Node Kicker */}
            <div className="flex items-center justify-between gap-2 mb-2 font-mono">
              <span className="text-[10px] tracking-widest uppercase opacity-60">
                HEX TILE // {activeNode.id.toUpperCase()}
              </span>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase"
                style={{
                  backgroundColor: `${activeNode.statusColor}20`,
                  color: activeNode.statusColor,
                  border: `1px solid ${activeNode.statusColor}40`
                }}
              >
                {activeNode.status}
              </span>
            </div>

            {/* Name & Category */}
            <h3 className="text-2xl font-bold font-display tracking-tight mb-1 text-neutral-900 dark:text-white">
              {activeNode.name}
            </h3>
            <p className="text-xs font-mono text-slate-400 font-bold mb-4">
              {activeNode.category}
            </p>

            {/* Description */}
            <p className="text-sm font-sans leading-relaxed opacity-85 mb-6">
              {activeNode.description}
            </p>

            {/* Telemetry Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-xs">
              <div className={`p-3 rounded-lg border ${
                isBlueprint ? 'bg-[#0E294B] border-blue-400/20' : 'bg-white border-black/10'
              }`}>
                <div className="text-[10px] uppercase opacity-60 mb-1">
                  {activeNode.metrics.label}
                </div>
                <div className="text-lg font-bold" style={{ color: activeNode.statusColor }}>
                  {activeNode.metrics.value}
                </div>
              </div>

              <div className={`p-3 rounded-lg border ${
                isBlueprint ? 'bg-[#0E294B] border-blue-400/20' : 'bg-white border-black/10'
              }`}>
                <div className="text-[10px] uppercase opacity-60 mb-1">
                  Architecture Protocol
                </div>
                <div className="text-lg font-bold text-slate-400">
                  {activeNode.signalRate}
                </div>
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-4 border-t border-current/10">
            {activeNode.id === 'core' ? (
              <div className="text-xs font-mono opacity-70">
                Hub coordinates initiatives in Addis Ababa.
              </div>
            ) : activeNode.id === 'build-log' ? (
              <button
                onClick={() => onSelectAfripedia && onSelectAfripedia()}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all bg-[#00A859] hover:bg-[#028A4A] text-white shadow-sm cursor-pointer"
              >
                <span>Inspect Build Log & Experiments</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <button
                onClick={() => onSelectVenture && onSelectVenture(activeNode.id)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all bg-slate-700 hover:bg-slate-600 text-white shadow-sm cursor-pointer"
              >
                <span>Inspect {activeNode.name} & Sandbox</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
