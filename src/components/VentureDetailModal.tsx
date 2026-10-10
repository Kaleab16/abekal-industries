import React, { useEffect } from 'react';
import { X, CheckCircle2, Circle, ArrowUpRight, ShieldCheck, MapPin, Calendar, Terminal } from 'lucide-react';
import { Venture } from '../data/studioData';
import { CampusShelfSandbox } from './sandboxes/CampusShelfSandbox';
import { ClubOsSandbox } from './sandboxes/ClubOsSandbox';
import { SinqeGuidanceSandbox } from './sandboxes/SinqeGuidanceSandbox';
import { ClassflowTopologySimulator } from './sandboxes/ClassflowTopologySimulator';
import { JemberReasoningVisualizer } from './sandboxes/JemberReasoningVisualizer';
import { AfriPediaArchiveSandbox } from './sandboxes/AfriPediaArchiveSandbox';

interface VentureDetailModalProps {
  venture: Venture | null;
  onClose: () => void;
  isBlueprint?: boolean;
}

export const VentureDetailModal: React.FC<VentureDetailModalProps> = ({
  venture,
  onClose,
  isBlueprint = false
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!venture) return null;

  const renderSandbox = () => {
    switch (venture.interactiveType) {
      case 'book-club':
        return <CampusShelfSandbox isBlueprint={isBlueprint} />;
      case 'club-management':
        return <ClubOsSandbox isBlueprint={isBlueprint} />;
      case 'mentorship':
        return <SinqeGuidanceSandbox isBlueprint={isBlueprint} />;
      case 'classflow-topology':
        return <ClassflowTopologySimulator isDark={isBlueprint} />;
      case 'jember-reasoning':
        return <JemberReasoningVisualizer isDark={isBlueprint} />;
      case 'afripedia-archive':
        return <AfriPediaArchiveSandbox isBlueprint={isBlueprint} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden z-10 transition-colors ${
        isBlueprint 
          ? 'bg-[#081B33] border-blue-400/25 text-white' 
          : 'bg-[#FFFFFF] border-black/15 text-neutral-900'
      }`}>
        {/* Top Header Bar */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${
          isBlueprint ? 'border-blue-400/20 bg-[#0E294B]' : 'border-black/10 bg-neutral-50'
        }`}>
          <div className="flex items-center gap-3">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: venture.accentColor }}
            />
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="font-bold uppercase tracking-wider">{venture.name}</span>
              <span className="opacity-40">/</span>
              <span className="opacity-70">{venture.category}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold uppercase tracking-wider"
              style={{
                backgroundColor: `${venture.accentColor}20`,
                color: venture.accentColor,
                border: `1px solid ${venture.accentColor}40`
              }}
            >
              {venture.stage}
            </span>
            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg border transition-colors ${
                isBlueprint
                  ? 'border-blue-400/20 hover:bg-white/10 text-white'
                  : 'border-black/10 hover:bg-black/5 text-neutral-700'
              }`}
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Hero Header */}
          <div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono opacity-70 mb-3">
              <span className="flex items-center gap-1 text-[#00A859] font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                {venture.location}, Ethiopia
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                Initiated {venture.yearFounded}
              </span>
              <span>·</span>
              <span className="font-semibold text-[#00A859]">
                Status: {venture.stage}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight mb-3">
              {venture.name}
            </h2>
            <p className="text-base sm:text-lg font-sans leading-relaxed opacity-90 max-w-3xl">
              {venture.summary}
            </p>
          </div>

          {/* Interactive Live Sandbox */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00A859]" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider">
                  Interactive Sandbox & System Preview
                </h3>
              </div>
              <span className="text-[11px] font-mono opacity-60">
                Live In-Browser Simulation
              </span>
            </div>

            {renderSandbox()}
          </div>

          {/* Deep Dive Grid: Problem, Target Users, Approach */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-current/10">
            {/* The Problem */}
            <div className={`p-5 rounded-xl border ${
              isBlueprint ? 'bg-[#0E294B] border-blue-400/20 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500 mb-2">
                Problem Solving:
              </h4>
              <p className="text-sm leading-relaxed opacity-90 text-slate-700 dark:text-slate-200">
                {venture.problem}
              </p>
            </div>

            {/* Target Users */}
            <div className={`p-5 rounded-xl border ${
              isBlueprint ? 'bg-[#0E294B] border-blue-400/20' : 'bg-neutral-50 border-black/10'
            }`}>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00A859] mb-2">
                Intended Users & Cohorts
              </h4>
              <ul className="space-y-2 text-sm opacity-85">
                {venture.targetUsers.map((user) => (
                  <li key={user} className="flex items-start gap-2">
                    <span className="text-[#00A859] font-bold mt-0.5">•</span>
                    <span>{user}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Architectural Approach & Tech Stack */}
          <div className={`p-5 rounded-xl border ${
            isBlueprint ? 'bg-[#0E294B] border-blue-400/20' : 'bg-neutral-50 border-black/10'
          }`}>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#38BDF8] mb-2">
              Engineering Architecture & Approach
            </h4>
            <p className="text-sm leading-relaxed opacity-85 mb-4">
              {venture.approach}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-current/10 font-mono text-xs">
              <span className="opacity-60 text-[11px] uppercase tracking-wider mr-2">Core Stack:</span>
              {venture.techStack.map((tech) => (
                <span
                  key={tech}
                  className={`px-2.5 py-1 rounded text-xs font-mono ${
                    isBlueprint ? 'bg-white/10 text-white' : 'bg-white text-neutral-800 border border-black/10'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Roadmap Milestones */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider mb-4">
              Development Milestones & Roadmap
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
              {venture.keyMilestones.map((m) => (
                <div
                  key={m.title}
                  className={`p-3.5 rounded-lg border ${
                    m.completed
                      ? isBlueprint ? 'bg-[#00A859]/15 border-[#00A859]/40' : 'bg-emerald-50/70 border-emerald-300'
                      : isBlueprint ? 'bg-white/5 border-blue-400/10 opacity-70' : 'bg-neutral-100 border-black/10 opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-[#00A859]">{m.quarter}</span>
                    {m.completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00A859]" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 opacity-40" />
                    )}
                  </div>
                  <div className="font-semibold mb-1 font-sans">{m.title}</div>
                  <div className="text-[11px] opacity-75 leading-tight">{m.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 px-6 border-t flex flex-wrap items-center justify-between gap-3 text-xs font-mono ${
          isBlueprint ? 'border-blue-400/20 bg-[#0E294B]' : 'border-black/10 bg-neutral-50'
        }`}>
          <div className="flex items-center gap-2 opacity-70 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00A859]" />
            <span>Abekal Industries · Engineering Workshop & Venture Studio</span>
          </div>

          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg font-mono transition-colors ${
              isBlueprint ? 'bg-white/10 hover:bg-white/15 text-white' : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-800'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
