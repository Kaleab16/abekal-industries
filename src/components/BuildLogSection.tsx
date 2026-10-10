import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { INITIAL_BUILD_LOGS, BuildLogEntry } from '../data/studioData';

interface BuildLogSectionProps {
  isBlueprint?: boolean;
}

export const BuildLogSection: React.FC<BuildLogSectionProps> = ({ isBlueprint = false }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('log-01');

  const filteredLogs = INITIAL_BUILD_LOGS.filter((entry) => {
    if (activeCategory === 'all') return true;
    return entry.category.toLowerCase().includes(activeCategory.toLowerCase());
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="build-log" className={`py-20 border-t transition-colors ${
      isBlueprint ? 'border-blue-400/20 bg-[#0A1D37]' : 'border-black/10 bg-[#FFFFFF]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00A859] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#00A859]" />
              <span>Studio Build Log & Engineering Field Notes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-neutral-900 dark:text-white">
              Field discoveries, system notes, and architecture logs.
            </h2>
            <p className="text-base font-sans opacity-80 mt-3">
              Honest technical documentation on building for university cohorts in Addis Ababa, decentralizing student resource distribution, and cataloging African knowledge.
            </p>
          </div>

          {/* Category Tabs */}
          <div className={`flex flex-wrap items-center gap-1 p-1 rounded-xl border font-mono text-xs ${
            isBlueprint ? 'border-blue-400/20 bg-[#0E294B]' : 'border-black/10 bg-neutral-100'
          }`}>
            {['all', 'engineering', 'student systems', 'afripedia'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#00A859] text-white font-bold'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Build Log Entries */}
        <div className="space-y-6">
          {filteredLogs.map((entry) => {
            const isExpanded = expandedId === entry.id;

            return (
              <article
                key={entry.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isBlueprint
                    ? 'bg-[#0E294B] border-blue-400/20 hover:border-blue-400/40'
                    : 'bg-neutral-50 border-black/10 hover:border-black/20'
                }`}
              >
                {/* Entry Header */}
                <div
                  onClick={() => toggleExpand(entry.id)}
                  className="p-6 sm:p-8 cursor-pointer flex flex-col md:flex-row md:items-start justify-between gap-6"
                >
                  <div className="space-y-3 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono opacity-70">
                      <span className="text-[#00A859] font-bold">{entry.category}</span>
                      <span>·</span>
                      <span>{entry.date}</span>
                      <span>·</span>
                      <span>{entry.readingTime}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-neutral-900 dark:text-white">
                      {entry.title}
                    </h3>

                    <p className="text-sm font-sans leading-relaxed opacity-85">
                      {entry.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-start">
                    <span className="text-xs font-mono text-[#00A859] font-bold hidden sm:inline">
                      {isExpanded ? 'Collapse' : 'Read Note'}
                    </span>
                    <div className="p-2 rounded-xl border border-current/20">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#00A859]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#00A859]" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className={`px-6 sm:px-8 pb-8 pt-4 border-t space-y-6 ${
                    isBlueprint ? 'border-blue-400/20 bg-[#081B33]' : 'border-black/10 bg-white'
                  }`}>
                    <div className="space-y-4 max-w-3xl font-sans text-sm sm:text-base leading-relaxed opacity-90">
                      {entry.body.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>

                    {/* Key Takeaways */}
                    <div className={`p-5 rounded-xl border max-w-3xl font-mono text-xs ${
                      isBlueprint ? 'bg-[#0E294B] border-[#00A859]/30' : 'bg-neutral-50 border-[#00A859]/30'
                    }`}>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#00A859] mb-3">
                        Key Architecture Learnings
                      </div>
                      <ul className="space-y-2">
                        {entry.keyLearnings.map((learning, lIdx) => (
                          <li key={lIdx} className="flex items-start gap-2">
                            <span className="text-[#38BDF8] font-bold">0{lIdx + 1}.</span>
                            <span className="opacity-90">{learning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
