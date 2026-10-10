import React from 'react';
import { ArrowDown, ArrowUpRight, Compass, Terminal, Globe, User, BookOpen, Layers } from 'lucide-react';
import { HexagonalWorkbench } from './HexagonalWorkbench';
import { InteractiveHeroCanvas } from './InteractiveHeroCanvas';

interface HeroSectionProps {
  isBlueprint?: boolean;
  onExploreVentures: () => void;
  onOpenAfripedia: () => void;
  onOpenAboutMe: () => void;
  onSelectVenture: (ventureId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isBlueprint = true,
  onExploreVentures,
  onOpenAfripedia,
  onOpenAboutMe,
  onSelectVenture,
}) => {
  return (
    <section className="relative pt-6 pb-20 sm:pt-8 sm:pb-28 overflow-hidden">
      {/* Interactive Fibonacci Spiral & Interlocking Precision Gears Background */}
      <InteractiveHeroCanvas isBlueprint={isBlueprint} />

      {/* Drafting Coordinates & Ruler Markers */}
      <div className="absolute top-4 right-6 pointer-events-none opacity-50 font-mono text-[10px] hidden sm:block z-10">
        GEAR DRAFT // 09°01'08" N, 38°45'42" E · ADDIS ABABA WORKSHOP
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Top Studio Subheader (Nav bar already has the logo, so no duplicate logo here!) */}
        <div className="mb-8 flex items-center justify-between border-b pb-3 border-current/10 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00A859] animate-pulse" />
            <span className="text-[#00A859] font-bold tracking-wider uppercase">
              ABEKAL INDUSTRIES // VENTURE STUDIO & ENGINEERING WORKSHOP
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-[11px] opacity-75 font-mono">
            <span>ADDIS ABABA, ETHIOPIA</span>
            <span>·</span>
            <span>FOUNDED BY ABEKAL YILMA</span>
          </div>
        </div>

        {/* Big Landing Page Header (Exact User Request) */}
        <div className="mb-14 max-w-4xl space-y-4">
          {/* Triad Philosophical Creed: English / Amharic */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className={`p-4 rounded-xl border backdrop-blur-sm transition-colors ${
              isBlueprint ? 'bg-[#0E294B]/70 border-blue-400/20 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-sm'
            }`}>
              <div className="text-[11px] opacity-70 uppercase tracking-widest mb-1 text-slate-500 dark:text-blue-200">
                Observation
              </div>
              <div className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white">
                i think <span className="text-[#00A859] font-sans font-bold text-lg">/ አስባለሁ።</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl border backdrop-blur-sm transition-colors ${
              isBlueprint ? 'bg-[#0E294B]/70 border-blue-400/20 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-sm'
            }`}>
              <div className="text-[11px] opacity-70 uppercase tracking-widest mb-1 text-slate-500 dark:text-blue-200">
                Perception
              </div>
              <div className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white">
                i saw <span className="text-[#38BDF8] font-sans font-bold text-lg">/ አየሁ።</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl border backdrop-blur-sm transition-colors ${
              isBlueprint ? 'bg-[#0E294B]/70 border-blue-400/20 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-sm'
            }`}>
              <div className="text-[11px] opacity-70 uppercase tracking-widest mb-1 text-slate-500 dark:text-blue-200">
                Execution
              </div>
              <div className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white">
                i build <span className="text-amber-500 font-sans font-bold text-lg">/ እገነባለሁ።</span>
              </div>
            </div>
          </div>

          {/* Core Master Headline */}
          <div className="pt-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-[1.08] text-slate-950 dark:text-white">
              CURIOSITY INTO IDEAS.
              <br />
              <span className="text-[#00A859]">IDEAS INTO REALITY.</span>
            </h1>

            <p
              style={{ backgroundColor: '#ffffff' }}
              className="text-base sm:text-lg font-sans leading-relaxed opacity-90 max-w-2xl mt-4 text-slate-800 dark:text-slate-900 px-3 py-1.5 rounded-lg"
            >
              Everything has a mechanism, and mechanisms can be understood. We explore, engineer, and build practical systems for education, technology, and African knowledge.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExploreVentures}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-[#00A859] hover:bg-[#028A4A] text-white shadow-sm transition-all cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenAboutMe}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                isBlueprint
                  ? 'border-blue-400/30 bg-[#0E294B]/70 hover:bg-[#13355E] text-white'
                  : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-900 shadow-sm'
              }`}
            >
              <User className="w-4 h-4 text-[#38BDF8]" />
              <span>About the Founder</span>
            </button>
          </div>
        </div>

        {/* Hexagonal Workbench Section */}
        <div className="pt-4">
          <div className="mb-4 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 text-[#00A859] font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-[#00A859] animate-pulse" />
              <span>Interactive Initiatives Topology (Hexagonal Hub)</span>
            </div>
            <span className="opacity-70 hidden sm:inline text-slate-600 dark:text-blue-200">
              Click any hexagon to inspect architecture
            </span>
          </div>

          <HexagonalWorkbench
            isBlueprint={isBlueprint}
            onSelectVenture={onSelectVenture}
            onSelectAfripedia={onOpenAfripedia}
          />
        </div>
      </div>
    </section>
  );
};
