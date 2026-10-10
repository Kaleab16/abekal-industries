import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isBlueprint: boolean;
  onToggleBlueprint?: () => void;
  isFounderMode?: boolean;
  onToggleFounderMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  isBlueprint,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addisTime, setAddisTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const eatTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Addis_Ababa',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
      setAddisTime(eatTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { id: 'ventures', label: 'Projects' },
    { id: 'about-me', label: 'About the Founder' },
    { id: 'build-log', label: 'Build Log' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-40 w-full transition-colors duration-300 border-b backdrop-blur-md ${
      isBlueprint 
        ? 'bg-[#081B33]/90 border-blue-400/20 text-white' 
        : 'bg-[#F8FAFC]/90 border-black/10 text-neutral-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('hero')}
          className="group flex items-center text-left focus:outline-none cursor-pointer"
          aria-label="Abekal Industries Home"
        >
          <BrandLogo size="md" isBlueprint={isBlueprint} />
        </button>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative text-xs uppercase tracking-wider font-mono py-1 transition-colors cursor-pointer ${
                  isActive 
                    ? 'text-[#00A859] font-bold' 
                    : isBlueprint 
                    ? 'text-blue-200/80 hover:text-white' 
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00A859]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Info: Addis Ababa Live Time */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono opacity-80 px-3 py-1.5 rounded-lg border border-current/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A859] animate-pulse" />
            <span className="text-[#00A859] font-bold">ADDIS</span>
            <span>{addisTime || 'EAT'}</span>
          </div>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-current opacity-80 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t px-6 py-5 space-y-4 ${
          isBlueprint ? 'bg-[#0A1D37] border-blue-400/20' : 'bg-white border-black/10'
        }`}>
          <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-current/10">
            <span>ADDIS ABABA, ETHIOPIA</span>
            <span>{addisTime}</span>
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-sm font-mono uppercase tracking-wider py-2 cursor-pointer ${
                  activeSection === link.id ? 'text-[#00A859] font-bold' : 'opacity-80'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
