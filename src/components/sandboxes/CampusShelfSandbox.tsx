import React, { useState } from 'react';
import { BookOpen, Users, Bookmark, MessageSquare, QrCode, CheckCircle2, Search, ArrowRight, Share2 } from 'lucide-react';

interface CampusShelfSandboxProps {
  isBlueprint?: boolean;
}

export const CampusShelfSandbox: React.FC<CampusShelfSandboxProps> = ({ isBlueprint = false }) => {
  const [activeTab, setActiveTab] = useState<'circles' | 'lending'>('circles');
  const [borrowedBook, setBorrowedBook] = useState<string | null>(null);

  const books = [
    {
      id: '1',
      title: 'Operating Systems: Three Easy Pieces',
      author: 'Remzi H. Arpaci-Dusseau',
      course: 'CoSc 3012 · Computer Systems',
      readersCount: 28,
      sharedCopies: 4,
      available: true,
      currentChapter: 'Ch 14: Virtual Memory Paging',
      annotations: 34
    },
    {
      id: '2',
      title: 'Oromia & Ethiopia: State Formation & Ethnonational Conflict',
      author: 'Asafa Jalata',
      course: 'General Elective · African Studies',
      readersCount: 42,
      sharedCopies: 2,
      available: true,
      currentChapter: 'Ch 3: The Gadaa System & Social Structures',
      annotations: 58
    },
    {
      id: '3',
      title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      author: 'Gang of Four',
      course: 'CoSc 2021 · Software Architecture',
      readersCount: 31,
      sharedCopies: 0,
      available: false,
      currentChapter: 'Ch 4: Structural Patterns',
      annotations: 19
    }
  ];

  return (
    <div className={`rounded-xl border overflow-hidden ${
      isBlueprint ? 'bg-[#0E294B] border-blue-400/20 text-white' : 'bg-white border-black/10 text-neutral-900'
    }`}>
      {/* Top Banner */}
      <div className={`p-4 border-b flex flex-wrap items-center justify-between gap-3 ${
        isBlueprint ? 'bg-[#0A1D37] border-blue-400/20' : 'bg-neutral-50 border-black/10'
      }`}>
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#00A859]" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider">
            CampusShelf // Reading Circles & Peer Lending Simulator
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab('circles')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'circles'
                ? 'bg-[#00A859] text-white font-bold'
                : isBlueprint ? 'bg-white/10 text-blue-200' : 'bg-black/5 text-neutral-700'
            }`}
          >
            Reading Circles
          </button>
          <button
            onClick={() => setActiveTab('lending')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'lending'
                ? 'bg-[#00A859] text-white font-bold'
                : isBlueprint ? 'bg-white/10 text-blue-200' : 'bg-black/5 text-neutral-700'
            }`}
          >
            P2P Book Lending
          </button>
        </div>
      </div>

      {/* Main Sandbox View */}
      <div className="p-4 sm:p-6 space-y-4">
        {activeTab === 'circles' ? (
          <div className="space-y-3">
            <div className="text-xs font-mono opacity-70 mb-2">
              Active University Study Cohorts & Annotation Highlights:
            </div>

            {books.map((book) => (
              <div
                key={book.id}
                className={`p-4 rounded-xl border transition-all ${
                  isBlueprint
                    ? 'bg-[#13355E] border-blue-400/20 hover:border-blue-400/40'
                    : 'bg-neutral-50 border-black/10 hover:border-black/20'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                  <div>
                    <h4 className="font-bold text-sm">{book.title}</h4>
                    <p className="text-xs font-mono opacity-75">{book.author} · {book.course}</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00A859]/20 text-[#00A859] font-bold">
                    {book.readersCount} Active Readers
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-current/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2 opacity-80">
                    <Bookmark className="w-3.5 h-3.5 text-[#00A859]" />
                    <span>{book.currentChapter}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 opacity-70">
                      <MessageSquare className="w-3 h-3" />
                      {book.annotations} margin notes
                    </span>
                    <button
                      onClick={() => alert(`Joined reading circle for "${book.title}"!`)}
                      className="px-2.5 py-1 rounded bg-[#00A859] hover:bg-[#028A4A] text-white font-bold text-[11px] transition-colors"
                    >
                      Join Circle
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-dashed border-[#00A859]/40 bg-[#00A859]/5 text-xs font-mono">
              <div className="font-bold text-[#00A859] mb-1 flex items-center gap-1.5">
                <QrCode className="w-4 h-4" />
                Physical Campus QR Handshake Protocol
              </div>
              <p className="opacity-80">
                To borrow or return a textbook without rental fees, simply scan the holder’s peer QR code inside the campus library or student lounge.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {books.map((b) => (
                <div
                  key={b.id}
                  className={`p-3.5 rounded-lg border font-mono text-xs ${
                    isBlueprint ? 'bg-[#13355E] border-blue-400/20' : 'bg-neutral-50 border-black/10'
                  }`}
                >
                  <div className="font-bold text-sm mb-1">{b.title}</div>
                  <div className="opacity-70 text-[11px] mb-3">{b.course}</div>

                  <div className="flex items-center justify-between pt-2 border-t border-current/10">
                    <span className={`text-[10px] font-bold ${b.available ? 'text-[#00A859]' : 'text-amber-500'}`}>
                      {b.available ? `${b.sharedCopies} copies in Dorms` : 'All checked out'}
                    </span>

                    <button
                      disabled={!b.available || borrowedBook === b.id}
                      onClick={() => setBorrowedBook(b.id)}
                      className="px-2.5 py-1 rounded bg-[#00A859] hover:bg-[#028A4A] text-white font-bold text-[10px] disabled:opacity-40 transition-colors"
                    >
                      {borrowedBook === b.id ? 'Requested ✓' : 'Scan to Borrow'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {borrowedBook && (
              <div className="p-3 rounded-lg bg-[#00A859]/15 border border-[#00A859]/30 text-xs font-mono text-[#00A859] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Encrypted handshake generated! Meet peer holder at AAiT Library 2nd Floor.</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
