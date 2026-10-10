import React, { useState } from 'react';
import { Globe, Search, BookOpen, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AfriPediaEntry, INITIAL_AFRIPEDIA_ENTRIES } from '../../data/studioData';

interface AfriPediaArchiveSandboxProps {
  isBlueprint?: boolean;
}

export const AfriPediaArchiveSandbox: React.FC<AfriPediaArchiveSandboxProps> = ({ isBlueprint = true }) => {
  const [search, setSearch] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<AfriPediaEntry>(INITIAL_AFRIPEDIA_ENTRIES[0]);

  const filtered = INITIAL_AFRIPEDIA_ENTRIES.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.category.toLowerCase().includes(search.toLowerCase()) ||
    e.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`rounded-xl border overflow-hidden ${
      isBlueprint ? 'bg-[#0E294B] border-blue-400/20 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
    }`}>
      {/* Top Banner */}
      <div className={`p-4 border-b flex flex-wrap items-center justify-between gap-3 ${
        isBlueprint ? 'bg-[#081B33] border-blue-400/20' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase">
          <Globe className="w-4 h-4 text-[#00A859]" />
          <span>AfriPedia // Knowledge Archive Sandbox</span>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Filter archives..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`px-3 py-1 rounded text-xs font-mono border focus:outline-none ${
              isBlueprint ? 'bg-[#0A1D37] border-blue-400/30 text-white placeholder-blue-300/40' : 'bg-white border-slate-300 text-slate-900'
            }`}
          />
        </div>
      </div>

      {/* Main Grid: Archives list (left) & Detail reader (right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
        {/* Left List (5 cols) */}
        <div className="md:col-span-5 border-r border-current/10 p-3 space-y-2 overflow-y-auto max-h-[420px] font-mono text-xs">
          {filtered.map((entry) => {
            const isSelected = selectedEntry.id === entry.id;
            return (
              <button
                key={entry.id}
                onClick={() => setSelectedEntry(entry)}
                className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? isBlueprint
                      ? 'bg-[#1A3F70] border-[#00A859] text-white shadow-sm'
                      : 'bg-emerald-50 border-[#00A859] text-slate-950 font-bold shadow-sm'
                    : isBlueprint
                    ? 'bg-[#0A1D37] border-blue-400/10 text-slate-300 hover:bg-[#13355E]'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-1 opacity-75">
                  <span className="text-[#00A859] font-bold uppercase">{entry.category}</span>
                  <span>{entry.historicalPeriod}</span>
                </div>
                <div className="font-bold text-xs font-sans line-clamp-1">{entry.title}</div>
                {entry.amharicTitle && (
                  <div className="text-[10px] opacity-70 text-[#38BDF8] line-clamp-1 mt-0.5">
                    {entry.amharicTitle}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Reader (7 cols) */}
        <div className="md:col-span-7 p-5 space-y-4 overflow-y-auto max-h-[420px]">
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-1 text-slate-500 dark:text-blue-300">
              <span className="text-[#00A859] font-bold">{selectedEntry.category}</span>
              <span>{selectedEntry.region}</span>
            </div>
            <h4 className="text-lg font-bold font-display text-slate-950 dark:text-white">
              {selectedEntry.title}
            </h4>
            {selectedEntry.amharicTitle && (
              <div className="text-xs font-mono text-[#38BDF8] mt-0.5">
                {selectedEntry.amharicTitle}
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm font-sans leading-relaxed opacity-90 text-slate-700 dark:text-slate-200">
            {selectedEntry.detailedText}
          </p>

          {/* Key Principles */}
          <div className={`p-3.5 rounded-lg border font-mono text-xs ${
            isBlueprint ? 'bg-[#081B33] border-blue-400/20 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'
          }`}>
            <div className="font-bold uppercase text-[10px] text-[#00A859] mb-2">
              Engineering & Systems Principles:
            </div>
            <ul className="space-y-1.5">
              {selectedEntry.keyPrinciples.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-[11px]">
                  <span className="text-[#00A859] font-bold">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Modern Relevance */}
          <div className="p-3 rounded-lg bg-[#00A859]/10 border border-[#00A859]/30 text-xs font-sans text-slate-800 dark:text-slate-100">
            <span className="font-bold text-[#00A859] font-mono mr-1">Relevance:</span>
            {selectedEntry.modernRelevance}
          </div>
        </div>
      </div>
    </div>
  );
};
