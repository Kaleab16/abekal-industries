import React from 'react';
import { ArrowUp, MapPin, Globe, Shield, Terminal, User } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  isBlueprint?: boolean;
  onNavigate: (sectionId: string) => void;
  onToggleBlueprint: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  isBlueprint = false,
  onNavigate,
  onToggleBlueprint,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t transition-colors duration-300 ${
      isBlueprint ? 'border-blue-400/20 bg-[#061529] text-white' : 'border-black/10 bg-[#F1F5F9] text-[#111316]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand & Statement (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <BrandLogo size="md" isBlueprint={isBlueprint} />

            <p className="text-sm font-sans opacity-80 leading-relaxed max-w-sm pt-2">
              Engineering workshop and venture studio founded by Abekal Yilma in Addis Ababa, Ethiopia.
            </p>

            <div className="font-mono text-xs text-[#00A859] font-bold tracking-wide">
              Think deeply. Engineer precisely. Build what matters.
            </div>
          </div>

          {/* Projects Links (2 cols) */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <div className="font-bold uppercase tracking-wider opacity-60 mb-2">
              Platforms
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('ventures')} className="hover:text-[#00A859] transition-colors cursor-pointer">
                  Book Club Platform
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ventures')} className="hover:text-[#00A859] transition-colors cursor-pointer">
                  ClubOS (Club Manager)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ventures')} className="hover:text-[#00A859] transition-colors cursor-pointer">
                  Upperclassmen (Mentorship)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ventures')} className="hover:text-[#00A859] transition-colors cursor-pointer">
                  classflow (Academic Relay)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ventures')} className="hover:text-[#00A859] transition-colors cursor-pointer">
                  JEMBER (AI Assistant)
                </button>
              </li>
            </ul>
          </div>

          {/* Studio Links (2 cols) */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <div className="font-bold uppercase tracking-wider opacity-60 mb-2">
              Studio
            </div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('about-me')} className="hover:text-[#00A859] transition-colors cursor-pointer">
                  About Abekal Yilma
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('build-log')} className="hover:text-[#00A859] transition-colors cursor-pointer">
                  Build Log
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#00A859] transition-colors cursor-pointer">
                  Direct Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Theme (3 cols) */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <div className="font-bold uppercase tracking-wider opacity-60 mb-2">
              Addis Ababa HQ
            </div>
            <div className="space-y-1 opacity-80 text-[11px]">
              <div>Bole / Dembel, Addis Ababa, Ethiopia</div>
              <div>East Africa Time (EAT, UTC+3)</div>
              <div>Coordinates: 09°01'08" N, 38°45'42" E</div>
            </div>

            <div className="pt-2">
              <button
                onClick={onToggleBlueprint}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                  isBlueprint
                    ? 'border-[#38BDF8] text-[#38BDF8] bg-white/5'
                    : 'border-black/20 text-neutral-800 bg-white hover:bg-neutral-100'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Switch to {isBlueprint ? 'Drafting (White)' : 'Blueprint (Blue)'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-current/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs opacity-70">
          <div>
            © {new Date().getFullYear()} Abekal Industries. Founded by Abekal Yilma. Addis Ababa, Ethiopia.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-[#00A859] transition-colors cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
