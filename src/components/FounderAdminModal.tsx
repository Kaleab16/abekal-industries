import React, { useState } from 'react';
import { X, Plus, Edit3, Check, Globe, Layers } from 'lucide-react';
import { Venture, AfriPediaEntry } from '../data/studioData';

interface FounderAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'add-project' | 'edit-project' | 'add-afripedia';
  projectToEdit?: Venture | null;
  onSaveProject: (project: Venture) => void;
  onSaveAfriPedia: (entry: AfriPediaEntry) => void;
  isBlueprint?: boolean;
}

export const FounderAdminModal: React.FC<FounderAdminModalProps> = ({
  isOpen,
  onClose,
  type,
  projectToEdit,
  onSaveProject,
  onSaveAfriPedia,
  isBlueprint = false,
}) => {
  // Project Form State
  const [projName, setProjName] = useState(projectToEdit?.name || '');
  const [projTagline, setProjTagline] = useState(projectToEdit?.tagline || '');
  const [projCategory, setProjCategory] = useState<any>(projectToEdit?.category || 'Student Life');
  const [projStage, setProjStage] = useState<any>(projectToEdit?.stage || 'In Development');
  const [projProgress, setProjProgress] = useState<number>(projectToEdit?.progress || 40);
  const [projSummary, setProjSummary] = useState(projectToEdit?.summary || '');
  const [projProblem, setProjProblem] = useState(projectToEdit?.problem || '');
  const [projApproach, setProjApproach] = useState(projectToEdit?.approach || '');
  const [projStack, setProjStack] = useState(projectToEdit?.techStack.join(', ') || 'React, TypeScript, Tailwind');

  // AfriPedia Form State
  const [afriTitle, setAfriTitle] = useState('');
  const [afriAmharic, setAfriAmharic] = useState('');
  const [afriCategory, setAfriCategory] = useState<any>('Indigenous Engineering');
  const [afriRegion, setAfriRegion] = useState('');
  const [afriPeriod, setAfriPeriod] = useState('');
  const [afriSummary, setAfriSummary] = useState('');
  const [afriPrinciples, setAfriPrinciples] = useState('');
  const [afriRelevance, setAfriRelevance] = useState('');

  if (!isOpen) return null;

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projName.trim()) return;

    const newOrUpdated: Venture = {
      id: projectToEdit?.id || `proj-${Date.now()}`,
      name: projName,
      tagline: projTagline || 'Engineered platform built by Abekal Industries.',
      category: projCategory,
      stage: projStage,
      stageColor: 'slate',
      progress: Number(projProgress) || 40,
      yearFounded: projectToEdit?.yearFounded || '2026',
      location: 'Addis Ababa',
      summary: projSummary || 'Platform developed by Abekal Industries to address structural needs.',
      problem: projProblem || 'Manual processes and fragmentation.',
      targetUsers: ['University students', 'Engineers', 'Faculty'],
      approach: projApproach || 'Systematic engineering and offline-first protocols.',
      techStack: projStack.split(',').map((s) => s.trim()).filter(Boolean),
      keyMilestones: projectToEdit?.keyMilestones || [
        { quarter: '2026', title: 'Initial Prototype', description: 'Working technical model validated in Addis Ababa.', completed: true }
      ],
      accentColor: projCategory === 'Campus Infrastructure' ? '#38BDF8' : '#00A859',
      interactiveType: projectToEdit?.interactiveType || 'book-club'
    };

    onSaveProject(newOrUpdated);
    onClose();
  };

  const handleAfriPediaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!afriTitle.trim()) return;

    const newEntry: AfriPediaEntry = {
      id: `afri-${Date.now()}`,
      title: afriTitle,
      amharicTitle: afriAmharic || undefined,
      category: afriCategory,
      region: afriRegion || 'Horn of Africa',
      historicalPeriod: afriPeriod || 'Historical Archive',
      summary: afriSummary || 'Historical African innovation and systems insight.',
      keyPrinciples: afriPrinciples.split('\n').map(s => s.trim()).filter(Boolean),
      modernRelevance: afriRelevance || 'Inspires modern decentralized and resilient systems architecture.',
      detailedText: afriSummary
    };

    onSaveAfriPedia(newEntry);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

      <div className={`relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden z-10 ${
        isBlueprint ? 'bg-[#081B33] border-blue-400/30 text-white' : 'bg-white border-black/15 text-neutral-900'
      }`}>
        {/* Header */}
        <div className={`p-4 px-6 border-b flex items-center justify-between ${
          isBlueprint ? 'bg-[#0E294B] border-blue-400/20' : 'bg-neutral-50 border-black/10'
        }`}>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-[#00A859]" />
            <span className="font-bold uppercase tracking-wider">
              {type === 'add-afripedia'
                ? 'FOUNDER WORKSPACE // ADD AFRIPEDIA ENTRY'
                : projectToEdit ? 'FOUNDER WORKSPACE // EDIT PROJECT' : 'FOUNDER WORKSPACE // ADD NEW PROJECT'}
            </span>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg border border-current opacity-70 hover:opacity-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Form */}
        <div className="p-6 overflow-y-auto">
          {type === 'add-afripedia' ? (
            <form onSubmit={handleAfriPediaSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block mb-1 font-bold">Knowledge Topic Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Great Zimbabwe Granite Curve Wall Engineering"
                  value={afriTitle}
                  onChange={(e) => setAfriTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-current/20 bg-transparent text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-bold">Amharic / Vernacular Title</label>
                  <input
                    type="text"
                    placeholder="e.g. የታላቁ ዚምባብዌ ግንብ ምህንድስና"
                    value={afriAmharic}
                    onChange={(e) => setAfriAmharic(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-current/20 bg-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold">Category</label>
                  <select
                    value={afriCategory}
                    onChange={(e) => setAfriCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-current/20 bg-transparent"
                  >
                    <option value="Indigenous Engineering">Indigenous Engineering</option>
                    <option value="Philosophy & Governance">Philosophy & Governance</option>
                    <option value="Science & Astronomy">Science & Astronomy</option>
                    <option value="Writing & Scripts">Writing & Scripts</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-bold">Geographic Region</label>
                  <input
                    type="text"
                    placeholder="e.g. Masvingo Province, Southern Africa"
                    value={afriRegion}
                    onChange={(e) => setAfriRegion(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-current/20 bg-transparent"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-bold">Historical Period</label>
                  <input
                    type="text"
                    placeholder="e.g. 11th–15th Century CE"
                    value={afriPeriod}
                    onChange={(e) => setAfriPeriod(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-current/20 bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-bold">Summary & Narrative</label>
                <textarea
                  rows={3}
                  placeholder="Overview of the system, engineering mastery, or philosophical model..."
                  value={afriSummary}
                  onChange={(e) => setAfriSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-current/20 bg-transparent"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold">Key Engineering Principles (1 per line)</label>
                <textarea
                  rows={2}
                  placeholder="Dry-stone masonry without mortar&#10;Curvilinear acoustic shielding"
                  value={afriPrinciples}
                  onChange={(e) => setAfriPrinciples(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-current/20 bg-transparent"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold">Relevance to Modern Systems</label>
                <input
                  type="text"
                  placeholder="How modern architects or distributed engineers can draw principles..."
                  value={afriRelevance}
                  onChange={(e) => setAfriRelevance(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-current/20 bg-transparent"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded border border-current opacity-70">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded bg-[#00A859] text-white font-bold">
                  Save to AfriPedia
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleProjectSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block mb-1 font-bold">Project Name *</label>
                <input
                  type="text"
                  placeholder="e.g. CampusShelf / ClubOS"
                  value={projName}
                  onChange={(e) => setProjName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-current/20 bg-transparent text-sm font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block mb-1 font-bold">Category</label>
                  <select
                    value={projCategory}
                    onChange={(e) => setProjCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-current/20 bg-transparent"
                  >
                    <option value="Student Life">Student Life</option>
                    <option value="Campus Infrastructure">Campus Infrastructure</option>
                    <option value="Educational Systems">Educational Systems</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-bold">Development Stage</label>
                  <select
                    value={projStage}
                    onChange={(e) => setProjStage(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-current/20 bg-transparent"
                  >
                    <option value="In Development">In Development</option>
                    <option value="Active Pilot">Active Pilot</option>
                    <option value="Private Beta">Private Beta</option>
                    <option value="Active Prototype">Active Prototype</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-bold">Progress ({projProgress}%)</label>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={projProgress}
                    onChange={(e) => setProjProgress(Number(e.target.value))}
                    className="w-full mt-2 accent-[#00A859]"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-bold">Tagline</label>
                <input
                  type="text"
                  placeholder="One line value proposition"
                  value={projTagline}
                  onChange={(e) => setProjTagline(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-current/20 bg-transparent"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold">Problem Being Solved</label>
                <textarea
                  rows={2}
                  placeholder="What friction do university students or faculty face?"
                  value={projProblem}
                  onChange={(e) => setProjProblem(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-current/20 bg-transparent"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold">Architecture & Solution Summary</label>
                <textarea
                  rows={3}
                  placeholder="How does this system solve the problem cleanly?"
                  value={projSummary}
                  onChange={(e) => setProjSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-current/20 bg-transparent"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. React, TypeScript, Tailwind, FastAPI, PostgreSQL"
                  value={projStack}
                  onChange={(e) => setProjStack(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-current/20 bg-transparent"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded border border-current opacity-70">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded bg-[#00A859] text-white font-bold">
                  {projectToEdit ? 'Save Changes' : 'Publish Project'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
