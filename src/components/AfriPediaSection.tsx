import React, { useState } from 'react';
import { Globe, Search, BookOpen, Compass, ArrowUpRight, X, Plus, ShieldCheck, Sparkles } from 'lucide-react';
import { AfriPediaEntry, INITIAL_AFRIPEDIA_ENTRIES } from '../data/studioData';

interface AfriPediaSectionProps {
  isBlueprint?: boolean;
  isFounderMode?: boolean;
  onAddEntryPrompt?: () => void;
  entries?: AfriPediaEntry[];
}

export const AfriPediaSection: React.FC<AfriPediaSectionProps> = ({
  isBlueprint = false,
  isFounderMode = false,
  onAddEntryPrompt,
  entries = INITIAL_AFRIPEDIA_ENTRIES
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [readingEntry, setReadingEntry] = useState<AfriPediaEntry | null>(null);

  const categories = [
    'all',
    'Indigenous Engineering',
    'Philosophy & Governance',
    'Science & Astronomy',
    'Writing & Scripts'
  ];

  const filteredEntries = entries.filter((e) => {
    const matchesCategory = selectedCategory === 'all' || e.category === selectedCategory;
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.amharicTitle && e.amharicTitle.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="afripedia" className={`py-20 border-t transition-colors ${
      isBlueprint ? 'border-blue-400/20 bg-[#081B33]' : 'border-black/10 bg-[#F8FAFC]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00A859] uppercase tracking-wider mb-2">
              <Globe className="w-4 h-4" />
              <span>Open Knowledge Repository</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-neutral-900 dark:text-white">
              AfriPedia: The Encyclopedia of African Knowledge.
            </h2>

            <p className="text-base font-sans opacity-85 mt-3 leading-relaxed">
              A semantic repository documenting African indigenous engineering, mathematics, astronomical systems, democratic philosophies, and writing orthographies—connecting historical mastery to contemporary systems engineering.
            </p>
          </div>

          {/* Founder Mode: Add Entry Button */}
          {isFounderMode && (
            <button
              onClick={onAddEntryPrompt}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00A859] hover:bg-[#028A4A] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Knowledge Entry</span>
            </button>
          )}
        </div>

        {/* Search & Category Filter Controls */}
        <div className={`p-4 rounded-2xl border mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 ${
          isBlueprint ? 'bg-[#0E294B] border-blue-400/20' : 'bg-white border-black/10 shadow-sm'
        }`}>
          {/* Search Bar */}
          <div className="relative grow max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
            <input
              type="text"
              placeholder="Search African engineering, Gadaa, Ishango, scripts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs font-mono border focus:outline-none ${
                isBlueprint
                  ? 'bg-[#0A1D37] border-blue-400/30 text-white placeholder-blue-300/40'
                  : 'bg-neutral-50 border-black/15 text-neutral-900'
              }`}
            />
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#00A859] text-white font-bold'
                    : isBlueprint
                    ? 'bg-white/5 hover:bg-white/10 text-blue-200'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                {cat === 'all' ? 'All Heritage' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Entries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              onClick={() => setReadingEntry(entry)}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-all duration-200 cursor-pointer group ${
                isBlueprint
                  ? 'bg-[#0E294B] border-blue-400/20 hover:border-blue-400/50 hover:bg-[#13355E]'
                  : 'bg-white border-black/10 hover:border-black/25 hover:shadow-md'
              }`}
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="text-[#00A859] font-bold uppercase text-[10px] tracking-wider">
                    {entry.category}
                  </span>
                  <span className="opacity-60 text-[10px]">{entry.historicalPeriod}</span>
                </div>

                {/* Title and Amharic script */}
                <h3 className="text-xl font-bold font-display tracking-tight mb-1 group-hover:text-[#00A859] transition-colors">
                  {entry.title}
                </h3>
                {entry.amharicTitle && (
                  <div className="text-xs font-mono text-[#38BDF8] opacity-90 mb-3">
                    {entry.amharicTitle}
                  </div>
                )}

                <div className="text-xs font-mono opacity-60 mb-3">
                  Region: {entry.region}
                </div>

                <p className="text-sm font-sans leading-relaxed opacity-85 line-clamp-3 mb-4">
                  {entry.summary}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-current/10 flex items-center justify-between font-mono text-xs">
                <span className="text-[11px] opacity-70">
                  {entry.keyPrinciples.length} Engineering Principles
                </span>

                <div className="flex items-center gap-1 text-[#00A859] font-bold group-hover:translate-x-1 transition-transform">
                  <span>Read Archive</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Entry Reading Modal */}
        {readingEntry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div
              onClick={() => setReadingEntry(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <div className={`relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden z-10 ${
              isBlueprint
                ? 'bg-[#081B33] border-blue-400/30 text-white'
                : 'bg-white border-black/15 text-neutral-900'
            }`}>
              {/* Header */}
              <div className={`p-6 border-b flex items-start justify-between gap-4 ${
                isBlueprint ? 'bg-[#0E294B] border-blue-400/20' : 'bg-neutral-50 border-black/10'
              }`}>
                <div>
                  <div className="text-xs font-mono text-[#00A859] font-bold uppercase mb-1">
                    AFRIPEDIA ARCHIVE // {readingEntry.category}
                  </div>
                  <h3 className="text-2xl font-bold font-display tracking-tight">
                    {readingEntry.title}
                  </h3>
                  {readingEntry.amharicTitle && (
                    <div className="text-sm font-mono text-[#38BDF8] mt-1">
                      {readingEntry.amharicTitle}
                    </div>
                  )}
                  <div className="text-xs font-mono opacity-70 mt-2">
                    {readingEntry.region} · {readingEntry.historicalPeriod}
                  </div>
                </div>

                <button
                  onClick={() => setReadingEntry(null)}
                  className="p-1.5 rounded-lg border border-current opacity-70 hover:opacity-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase text-[#00A859] mb-2">
                    Historical Overview & Excavation
                  </h4>
                  <p className="text-sm sm:text-base font-sans leading-relaxed opacity-90">
                    {readingEntry.detailedText}
                  </p>
                </div>

                {/* Key Principles */}
                <div className={`p-5 rounded-xl border ${
                  isBlueprint ? 'bg-[#0E294B] border-blue-400/20' : 'bg-neutral-50 border-black/10'
                }`}>
                  <h4 className="text-xs font-mono font-bold uppercase text-[#38BDF8] mb-3">
                    Core Technical & Systems Principles
                  </h4>
                  <ul className="space-y-2 font-mono text-xs">
                    {readingEntry.keyPrinciples.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#00A859] font-bold">•</span>
                        <span className="opacity-90">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Modern Relevance */}
                <div className="p-5 rounded-xl border border-[#00A859]/30 bg-[#00A859]/10">
                  <h4 className="text-xs font-mono font-bold uppercase text-[#00A859] mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Relevance for Modern Software & Systems Builders
                  </h4>
                  <p className="text-xs sm:text-sm font-sans leading-relaxed opacity-90">
                    {readingEntry.modernRelevance}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className={`p-4 px-6 border-t flex items-center justify-between font-mono text-xs ${
                isBlueprint ? 'bg-[#0E294B] border-blue-400/20' : 'bg-neutral-50 border-black/10'
              }`}>
                <span className="opacity-60 text-[11px]">
                  AfriPedia Curated by Abekal Industries · Addis Ababa
                </span>
                <button
                  onClick={() => setReadingEntry(null)}
                  className="px-4 py-1.5 rounded bg-[#00A859] text-white font-bold"
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
