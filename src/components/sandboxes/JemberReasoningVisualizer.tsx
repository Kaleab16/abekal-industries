import React, { useState } from 'react';
import { Play, CheckCircle2, ChevronRight, Brain, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface JemberReasoningVisualizerProps {
  isDark?: boolean;
}

interface Scenario {
  id: string;
  query: string;
  category: string;
  steps: {
    stage: string;
    description: string;
    durationMs: number;
    subNodes: string[];
  }[];
  finalInsight: string;
  totalTimeMs: number;
  confidence: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: '1',
    query: 'Synthesize optimal capital allocation for a 3-venture studio model in Addis Ababa',
    category: 'Venture Strategy',
    steps: [
      {
        stage: '01. Intent Decomposition',
        description: 'Parsed 3 active venture vectors (WaveIX, JEMBER, classflow) against runway constraints.',
        durationMs: 34,
        subNodes: ['Entity: Runway Model', 'Constraint: Foreign Exchange Risk', 'Factor: Talent Pool']
      },
      {
        stage: '02. Localized Knowledge Graph Retrieval',
        description: 'Cross-referenced Ethiopian National Bank foreign currency directives with tech venture operational benchmarks.',
        durationMs: 58,
        subNodes: ['Corpus: NBE Directives 2024-2026', 'Data: Studio Shared Primitives', 'Taxonomy: B2B vs Consumer']
      },
      {
        stage: '03. Invariant & Safety Verification',
        description: 'Verified cashflow sustainability boundary: guaranteed minimum 14-month buffer before spin-out.',
        durationMs: 22,
        subNodes: ['Rule: Min 14mo Runway', 'Validation: 0 Unfunded Dependencies']
      },
      {
        stage: '04. Structured Synthesis',
        description: 'Generated prioritized execution milestones and capital weighting (40% Core R&D, 35% Pilot Validation, 25% Reserve).',
        durationMs: 28,
        subNodes: ['Output: Weighted Matrix', 'Milestone: Q3 Gate']
      }
    ],
    finalInsight: 'Recommended 40% capital allocation to classflow pilot scaling, 35% to JEMBER reasoning benchmarks, and 25% retained for WaveIX studio client operations. Shared core primitives save ~$42k in redundant infrastructure.',
    totalTimeMs: 142,
    confidence: '98.2%'
  },
  {
    id: '2',
    query: 'Analyze low-latency message relay trees for university campus networks with 35% packet drop',
    category: 'Systems Engineering',
    steps: [
      {
        stage: '01. Protocol Decomposition',
        description: 'Deconstructed network topography into hierarchical Class Rep relay trees and edge caches.',
        durationMs: 28,
        subNodes: ['Node Model: Hierarchical CR', 'Drop Model: Gilbert-Elliott Packet Loss']
      },
      {
        stage: '02. Multi-hop Graph Traversal',
        description: 'Simulated 600 peer nodes across 4 faculties with opportunistic BLE fallback routing.',
        durationMs: 64,
        subNodes: ['Relay Graph: 4 Tier-1 Nodes', 'Hop Limit: max 3 hops', 'Storage: IndexedDB Chunking']
      },
      {
        stage: '03. Cryptographic Signature Validation',
        description: 'Validated instructor authority key without requiring round-trip cloud authentication.',
        durationMs: 19,
        subNodes: ['Ed25519 Signature Check', 'Proof: Nonce Expiration']
      },
      {
        stage: '04. Resilient Synthesis',
        description: 'Achieved 99.8% message arrival within 2.3 seconds across 40% loss simulation.',
        durationMs: 25,
        subNodes: ['Sync Convergence: 2.3s', 'Redundancy: 1.4 KB/msg']
      }
    ],
    finalInsight: 'Dual-tier relay with optimistic local verification guarantees 99.8% critical exam announcement reception, even during campus bandwidth throttling in Addis Ababa.',
    totalTimeMs: 136,
    confidence: '99.4%'
  }
];

export const JemberReasoningVisualizer: React.FC<JemberReasoningVisualizerProps> = ({ isDark = false }) => {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<number>(4);

  const scenario = SCENARIOS[activeScenarioIndex];

  const runSimulation = () => {
    setIsRunning(true);
    setCompletedSteps(0);

    const stepInterval = setInterval(() => {
      setCompletedSteps((prev) => {
        if (prev >= 4) {
          clearInterval(stepInterval);
          setIsRunning(false);
          return 4;
        }
        return prev + 1;
      });
    }, 400);
  };

  return (
    <div className={`rounded-xl border overflow-hidden ${
      isDark ? 'bg-[#121519] border-white/10' : 'bg-white border-black/10'
    }`}>
      {/* Top Header */}
      <div className={`p-4 border-b flex flex-wrap items-center justify-between gap-3 ${
        isDark ? 'border-white/10 bg-[#161A20]' : 'border-black/10 bg-[#FAF7F0]'
      }`}>
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-[#E07A22]" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider">
            JEMBER // Cognitive Reasoning DAG Engine
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="opacity-60 hidden sm:inline">Scenario:</span>
          {SCENARIOS.map((sc, i) => (
            <button
              key={sc.id}
              onClick={() => {
                setActiveScenarioIndex(i);
                setCompletedSteps(4);
                setIsRunning(false);
              }}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeScenarioIndex === i
                  ? 'bg-[#E07A22] text-white font-semibold'
                  : isDark ? 'bg-white/10 text-slate-300' : 'bg-black/5 text-slate-700'
              }`}
            >
              {sc.category}
            </button>
          ))}
        </div>
      </div>

      {/* Query Bar */}
      <div className={`p-4 border-b font-mono text-xs flex items-center justify-between gap-4 ${
        isDark ? 'border-white/10 bg-black/30' : 'border-black/10 bg-neutral-50'
      }`}>
        <div className="flex items-start gap-2 text-neutral-800 dark:text-neutral-200">
          <span className="text-[#E07A22] font-bold">PROMPT &gt;</span>
          <span className="font-medium italic">{scenario.query}</span>
        </div>

        <button
          onClick={runSimulation}
          disabled={isRunning}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#E07A22] hover:bg-[#D66C1E] text-white font-mono text-xs font-semibold transition-all shadow-sm disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isRunning ? 'Traversing DAG...' : 'Re-run Graph'}</span>
        </button>
      </div>

      {/* Multi-stage DAG Pipeline */}
      <div className="p-4 sm:p-6 space-y-4 font-mono">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {scenario.steps.map((step, idx) => {
            const isDone = completedSteps > idx;
            const isCurrent = completedSteps === idx && isRunning;

            return (
              <div
                key={step.stage}
                className={`p-3.5 rounded-lg border transition-all duration-300 ${
                  isDone
                    ? isDark ? 'bg-[#181E24] border-[#E07A22]/40 text-white' : 'bg-amber-50/50 border-[#E07A22]/40 text-neutral-900'
                    : isCurrent
                    ? 'border-[#E07A22] bg-amber-500/10 animate-pulse text-neutral-900 dark:text-white'
                    : isDark ? 'border-white/5 bg-white/5 opacity-40' : 'border-black/5 bg-neutral-100 opacity-40'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="font-bold text-[#E07A22]">{step.stage.split('.')[0]}</span>
                  <span className="text-[10px] opacity-75">{step.durationMs}ms</span>
                </div>

                <div className="text-xs font-semibold mb-2 leading-tight">
                  {step.stage.split('. ')[1]}
                </div>

                <div className="text-[11px] opacity-75 leading-relaxed mb-3">
                  {step.description}
                </div>

                {/* Sub-node tags */}
                <div className="space-y-1 pt-2 border-t border-black/5 dark:border-white/5">
                  {step.subNodes.map((node) => (
                    <div key={node} className="text-[9px] truncate opacity-60">
                      • {node}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Synthesis Result Card */}
        {completedSteps >= 4 && (
          <div className={`p-4 rounded-lg border ${
            isDark ? 'bg-[#1B221B] border-[#1B8A4D]/40 text-white' : 'bg-[#EBF7F0] border-[#1B8A4D]/40 text-neutral-900'
          }`}>
            <div className="flex items-center justify-between gap-2 mb-2 text-xs">
              <div className="flex items-center gap-1.5 text-[#1B8A4D] font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Deterministic Synthesis Verified</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-neutral-600 dark:text-neutral-400">
                <span>Latency: {scenario.totalTimeMs}ms</span>
                <span>Confidence: {scenario.confidence}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-sans leading-relaxed">
              {scenario.finalInsight}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
