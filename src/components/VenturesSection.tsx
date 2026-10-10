import React, { useState } from 'react';
import { ArrowUpRight, BookOpen, ShieldCheck, HeartHandshake, Radio, Cpu, Plus, Edit3, Terminal, Activity } from 'lucide-react';
import { Venture } from '../data/studioData';

interface VenturesSectionProps {
  isBlueprint?: boolean;
  isFounderMode?: boolean;
  ventures: Venture[];
  onSelectVenture: (venture: Venture) => void;
  onEditVenture?: (venture: Venture) => void;
  onAddVenture?: () => void;
}

export const VenturesSection: React.FC<VenturesSectionProps> = ({
  isBlueprint = true,
  isFounderMode = false,
  ventures,
  onSelectVenture,
  onEditVenture,
  onAddVenture,
}) => {
  const [filter, setFilter] = useState<string>('all');

  const filteredVentures = ventures.filter((v) => {
    if (filter === 'all') return true;
    if (filter === 'student') return v.category === 'Student Life';
    if (filter === 'campus') return v.category === 'Campus Infrastructure' || v.category === 'Educational Systems';
    if (filter === 'ai') return v.category === 'Artificial Intelligence';
    return true;
  });

  const getVentureIcon = (type: string) => {
    switch (type) {
      case 'book-club':
        return BookOpen;
      case 'club-management':
        return ShieldCheck;
      case 'mentorship':
        return HeartHandshake;
      case 'classflow-topology':
        return Radio;
      case 'jember-reasoning':
        return Cpu;
      default:
        return Terminal;
    }
  };

  return (
    <section id="ventures" className={`py-20 border-t transition-colors ${
      isBlueprint ? 'border-blue-400/20 bg-[#0A1D37]' : 'border-slate-200 bg-[#F8FAFC]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00A859] uppercase tracking-wider mb-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#00A859]" />
              <span>Initiatives & Campus Platforms</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-slate-950 dark:text-white">
              Engineered platforms solving real student and system challenges.
            </h2>
            <p className="text-base font-sans opacity-90 mt-3 leading-relaxed text-slate-700 dark:text-slate-300">
              We design and build systems for higher education cohorts, student leadership, peer-to-peer sharing, and cognitive intelligence.
            </p>
          </div>

          {/* Action Row & Filter */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
            {isFounderMode && (
              <button
                onClick={onAddVenture}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#00A859] hover:bg-[#028A4A] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            )}

            {/* Filter Tabs */}
            <div className={`flex items-center gap-1 p-1 rounded-xl border font-mono text-xs ${
              isBlueprint ? 'border-blue-400/20 bg-[#0E294B]' : 'border-slate-300 bg-white shadow-sm'
            }`}>
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  filter === 'all'
                    ? 'bg-[#00A859] text-white font-bold'
                    : isBlueprint ? 'text-blue-200 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({ventures.length})
              </button>
              <button
                onClick={() => setFilter('student')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  filter === 'student'
                    ? 'bg-[#00A859] text-white font-bold'
                    : isBlueprint ? 'text-blue-200 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Student Life
              </button>
              <button
                onClick={() => setFilter('campus')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  filter === 'campus'
                    ? 'bg-[#00A859] text-white font-bold'
                    : isBlueprint ? 'text-blue-200 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Campus Systems
              </button>
              <button
                onClick={() => setFilter('ai')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  filter === 'ai'
                    ? 'bg-[#00A859] text-white font-bold'
                    : isBlueprint ? 'text-blue-200 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                AI Assistant
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVentures.map((venture) => {
            const Icon = getVentureIcon(venture.interactiveType);
            const progressVal = venture.progress || 40;

            return (
              <div
                key={venture.id}
                className={`group relative rounded-2xl border p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                  isBlueprint
                    ? 'bg-[#0E294B] border-blue-400/20 hover:border-blue-400/50 hover:bg-[#13355E] text-white'
                    : 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-md text-slate-900'
                }`}
              >
                <div>
                  {/* Top Metadata Line */}
                  <div className="flex items-center justify-between gap-3 text-xs font-mono mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full bg-slate-400"
                      />
                      <span className="opacity-80 font-medium text-slate-600 dark:text-blue-200">{venture.category}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Grey "In Development" badge as requested */}
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                        isBlueprint 
                          ? 'bg-slate-700/60 text-slate-300 border border-slate-500/40' 
                          : 'bg-slate-100 text-slate-700 border border-slate-300'
                      }`}>
                        In Development
                      </span>

                      {/* Founder Edit Button */}
                      {isFounderMode && onEditVenture && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditVenture(venture);
                          }}
                          className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 text-amber-500"
                          title="Edit this project"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Title & Click to Inspect */}
                  <div
                    onClick={() => onSelectVenture(venture)}
                    className="flex items-start justify-between gap-3 mb-2"
                  >
                    <h3 className="text-2xl font-bold font-display tracking-tight text-slate-950 dark:text-white group-hover:text-[#00A859] transition-colors">
                      {venture.name}
                    </h3>
                    <div className="p-1.5 rounded-lg border border-current/20 opacity-60 group-hover:opacity-100 group-hover:border-[#00A859] transition-all">
                      <ArrowUpRight className="w-4 h-4 text-current group-hover:text-[#00A859]" />
                    </div>
                  </div>

                  <p className="text-xs font-mono text-[#00A859] font-bold mb-3">
                    {venture.tagline}
                  </p>

                  <p className="text-sm font-sans leading-relaxed opacity-90 mb-5 line-clamp-3 text-slate-700 dark:text-slate-300">
                    {venture.summary}
                  </p>

                  {/* Progress Bar (User Request: add prograss bars for each) */}
                  <div className={`p-3.5 rounded-xl border mb-5 font-mono text-xs ${
                    isBlueprint ? 'bg-[#081B33] border-blue-400/20' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-bold uppercase text-slate-600 dark:text-blue-200 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-[#00A859]" />
                        <span>Development Progress</span>
                      </span>
                      <span className="font-bold text-[#00A859]">{progressVal}%</span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#00A859] to-[#38BDF8] rounded-full transition-all duration-500"
                        style={{ width: `${progressVal}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] opacity-60 mt-1.5">
                      <span>Architecture Phase</span>
                      <span>Targeting Q3 2026</span>
                    </div>
                  </div>

                  {/* Problem Callout */}
                  <div className={`p-3 rounded-xl border text-xs mb-5 ${
                    isBlueprint ? 'bg-[#081B33] border-blue-400/10' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="font-mono text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 mb-1">
                      Problem Solving:
                    </div>
                    <div className="opacity-90 line-clamp-2 text-slate-700 dark:text-slate-300">
                      {venture.problem}
                    </div>
                  </div>
                </div>

                {/* Card Bottom / Stack */}
                <div
                  onClick={() => onSelectVenture(venture)}
                  className="pt-4 border-t border-current/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono"
                >
                  <div className="flex flex-wrap items-center gap-1.5 opacity-80 text-[11px] text-slate-600 dark:text-slate-300">
                    {venture.techStack.slice(0, 3).map((tech) => (
                      <span key={tech}>{tech} ·</span>
                    ))}
                  </div>

                  <span className="font-bold text-[#00A859] flex items-center gap-1">
                    <span>Inspect Sandbox</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
