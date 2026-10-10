import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VenturesSection } from './components/VenturesSection';
import { AboutMeSection } from './components/AboutMeSection';
import { BuildLogSection } from './components/BuildLogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { VentureDetailModal } from './components/VentureDetailModal';
import { FounderAdminModal } from './components/FounderAdminModal';
import { INITIAL_VENTURES, INITIAL_AFRIPEDIA_ENTRIES, Venture, AfriPediaEntry } from './data/studioData';
import { Terminal, Shield, Plus, Edit3 } from 'lucide-react';

export default function App() {
  // Theme: Builder Blueprint (Blue) vs Drafting Paper (White)
  const [isBlueprint, setIsBlueprint] = useState<boolean>(() => {
    const saved = localStorage.getItem('abekal_theme_blueprint');
    return saved !== null ? saved === 'true' : true; // Default to builder blueprint blue!
  });

  // Access Mode: Founder Mode (Edit & Add) vs Client View (Presentation)
  // Default to false so clients and visitors always see the clean, unedited client view
  const [isFounderMode, setIsFounderMode] = useState<boolean>(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'client' || params.get('mode') === 'client') {
      return false;
    }
    if (params.get('view') === 'founder' || params.get('mode') === 'founder' || params.get('edit') === 'true') {
      return true;
    }
    const saved = localStorage.getItem('abekal_founder_mode');
    return saved === 'true';
  });

  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedVenture, setSelectedVenture] = useState<Venture | null>(null);

  // Dynamic projects list with local storage persistence
  const [ventures, setVentures] = useState<Venture[]>(() => {
    const saved = localStorage.getItem('abekal_ventures_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_VENTURES;
      }
    }
    return INITIAL_VENTURES;
  });

  // Dynamic AfriPedia list with local storage persistence
  const [afriEntries, setAfriEntries] = useState<AfriPediaEntry[]>(() => {
    const saved = localStorage.getItem('abekal_afripedia');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_AFRIPEDIA_ENTRIES;
      }
    }
    return INITIAL_AFRIPEDIA_ENTRIES;
  });

  // Founder Workspace Modal state
  const [adminModalState, setAdminModalState] = useState<{
    isOpen: boolean;
    type: 'add-project' | 'edit-project' | 'add-afripedia';
    projectToEdit?: Venture | null;
  }>({
    isOpen: false,
    type: 'add-project',
  });

  // Persist settings
  useEffect(() => {
    localStorage.setItem('abekal_theme_blueprint', String(isBlueprint));
  }, [isBlueprint]);

  useEffect(() => {
    localStorage.setItem('abekal_founder_mode', String(isFounderMode));
  }, [isFounderMode]);

  useEffect(() => {
    localStorage.setItem('abekal_ventures_v3', JSON.stringify(ventures));
  }, [ventures]);

  useEffect(() => {
    localStorage.setItem('abekal_afripedia', JSON.stringify(afriEntries));
  }, [afriEntries]);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
        return;
      }

      if (e.key === 'b' || e.key === 'B') {
        setIsBlueprint((prev) => !prev);
      } else if (e.key === 'f' || e.key === 'F') {
        setIsFounderMode((prev) => !prev);
      } else if (e.key === '1') {
        scrollToSection('hero');
      } else if (e.key === '2') {
        scrollToSection('ventures');
      } else if (e.key === '3') {
        scrollToSection('afripedia');
      } else if (e.key === '4') {
        scrollToSection('about-me');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectVentureById = (ventureId: string) => {
    const found = ventures.find((v) => v.id === ventureId);
    if (found) {
      setSelectedVenture(found);
    }
  };

  // Founder actions
  const handleSaveProject = (savedProj: Venture) => {
    setVentures((prev) => {
      const exists = prev.some((p) => p.id === savedProj.id);
      if (exists) {
        return prev.map((p) => (p.id === savedProj.id ? savedProj : p));
      }
      return [savedProj, ...prev];
    });
  };

  const handleSaveAfriPedia = (newEntry: AfriPediaEntry) => {
    setAfriEntries((prev) => [newEntry, ...prev]);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isBlueprint
        ? 'bg-[#081B33] text-neutral-100 bg-blueprint-grid'
        : 'bg-[#F8FAFC] text-[#111316] bg-vellum-grid'
    }`}>
      {/* Top Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        isBlueprint={isBlueprint}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section with Hexagonal Workbench */}
        <div id="hero">
          <HeroSection
            isBlueprint={isBlueprint}
            onExploreVentures={() => scrollToSection('ventures')}
            onOpenAfripedia={() => scrollToSection('build-log')}
            onOpenAboutMe={() => scrollToSection('about-me')}
            onSelectVenture={handleSelectVentureById}
          />
        </div>

        {/* Featured Projects (Book Club, ClubOS, Mentorship, classflow, JEMBER) */}
        <VenturesSection
          isBlueprint={isBlueprint}
          isFounderMode={isFounderMode}
          ventures={ventures}
          onSelectVenture={(venture) => setSelectedVenture(venture)}
          onEditVenture={(venture) => {
            setAdminModalState({
              isOpen: true,
              type: 'edit-project',
              projectToEdit: venture
            });
          }}
          onAddVenture={() => {
            setAdminModalState({
              isOpen: true,
              type: 'add-project',
              projectToEdit: null
            });
          }}
        />

        {/* About Me Section (Abekal Yilma) */}
        <AboutMeSection
          isBlueprint={isBlueprint}
          onContactClick={() => scrollToSection('contact')}
        />

        {/* Studio Build Log */}
        <BuildLogSection
          isBlueprint={isBlueprint}
        />

        {/* Contact Section */}
        <ContactSection
          isBlueprint={isBlueprint}
          isFounderMode={isFounderMode}
        />
      </main>

      {/* Footer */}
      <Footer
        isBlueprint={isBlueprint}
        onNavigate={scrollToSection}
        onToggleBlueprint={() => setIsBlueprint(!isBlueprint)}
      />

      {/* Venture Detail Modal */}
      <VentureDetailModal
        venture={selectedVenture}
        onClose={() => setSelectedVenture(null)}
        isBlueprint={isBlueprint}
      />

      {/* Founder Workspace Modal (Add/Edit Projects & AfriPedia) */}
      <FounderAdminModal
        isOpen={adminModalState.isOpen}
        onClose={() => setAdminModalState({ ...adminModalState, isOpen: false })}
        type={adminModalState.type}
        projectToEdit={adminModalState.projectToEdit}
        onSaveProject={handleSaveProject}
        onSaveAfriPedia={handleSaveAfriPedia}
        isBlueprint={isBlueprint}
      />
    </div>
  );
}
