import React, { useState } from 'react';
import { Compass, Users, MessageSquare, Award, Sparkles, CheckCircle2, HeartHandshake, HelpCircle } from 'lucide-react';

interface SinqeGuidanceSandboxProps {
  isBlueprint?: boolean;
}

export const SinqeGuidanceSandbox: React.FC<SinqeGuidanceSandboxProps> = ({ isBlueprint = false }) => {
  const [activePillar, setActivePillar] = useState<'match' | 'qna'>('match');
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);

  const mentors = [
    {
      id: 'm1',
      name: 'Yared Tesfaye',
      year: 'Year 5 Senior · Electrical & Computer Eng',
      gpaBadge: 'Top 5% Cohort',
      focus: 'Department Selection, Calculus & Circuits Survival, Tech Internships',
      bio: 'Switched from Pre-Med to Engineering in 2nd year. Happy to guide freshmen on navigating intense exam seasons, balancing campus life, and applying for remote internships.',
      openSlots: 2
    },
    {
      id: 'm2',
      name: 'Bethlehem Alemu',
      year: 'Year 4 Senior · Computer Science & Data',
      gpaBadge: 'Google Dev Lead',
      focus: 'Programming Fundamentals, Overcoming Dorm Isolation, Final Year Projects',
      bio: 'From Jimma originally, struggled during my freshman year with campus adaptation. I mentor students on study routines, mental wellness, and building software portfolios.',
      openSlots: 1
    },
    {
      id: 'm3',
      name: 'Dawit Kassahun',
      year: 'Year 4 Senior · Mechanical & Mechatronics',
      gpaBadge: 'Student Council Rep',
      focus: 'Engineering Mechanics, Senior Project Sponsorships, Life Direction',
      bio: 'Mentoring freshmen on navigating university administration, choosing technical clubs, and setting 4-year career trajectories.',
      openSlots: 3
    }
  ];

  const qnaList = [
    {
      question: 'How do I choose between Computer Engineering vs Computer Science after freshman common courses?',
      author: 'Freshman #412 · Pre-Engineering',
      seniorAnswer: 'Comp Eng focuses heavily on hardware architectures, microprocessors, and signals alongside software. CS is deeper into algorithmic theory, compilers, and distributed systems. If you enjoy physical labs, CE is great; if pure coding and mathematics, CS is optimal.',
      seniorAuthor: 'Yared T. (Senior CE)'
    },
    {
      question: 'What are the best strategies to handle dormitory life and study when rooms are noisy?',
      author: 'Freshman #189 · Natural Sciences',
      seniorAnswer: 'Establish early study schedules at the university central library early in the morning (06:30–09:00 AM) and secure a designated study corner with headphones. Set clear quiet hours mutually with your roommates.',
      seniorAuthor: 'Bethlehem A. (Senior CS)'
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
          <HeartHandshake className="w-4 h-4 text-[#00A859]" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider">
            Sinqe Mentorship // Freshmen ↔ Senior Guidance Navigator
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setActivePillar('match')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activePillar === 'match'
                ? 'bg-[#00A859] text-white font-bold'
                : isBlueprint ? 'bg-white/10 text-blue-200' : 'bg-black/5 text-neutral-700'
            }`}
          >
            Find a Senior Mentor
          </button>
          <button
            onClick={() => setActivePillar('qna')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activePillar === 'qna'
                ? 'bg-[#00A859] text-white font-bold'
                : isBlueprint ? 'bg-white/10 text-blue-200' : 'bg-black/5 text-neutral-700'
            }`}
          >
            Freshman Q&A Circle
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 space-y-4">
        {activePillar === 'match' ? (
          <div className="space-y-3">
            <div className="text-xs font-mono opacity-70 mb-2">
              Verified Senior Student Mentors Ready for 1-on-1 Guidance:
            </div>

            {mentors.map((m) => (
              <div
                key={m.id}
                className={`p-4 rounded-xl border transition-all ${
                  isBlueprint
                    ? 'bg-[#13355E] border-blue-400/20'
                    : 'bg-neutral-50 border-black/10'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-bold text-sm font-sans">{m.name}</h4>
                    <p className="text-xs font-mono opacity-75 text-[#38BDF8]">{m.year}</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00A859]/20 text-[#00A859] font-bold">
                    {m.gpaBadge}
                  </span>
                </div>

                <div className="text-xs font-mono text-amber-400 mb-2">
                  Key Guidance Areas: {m.focus}
                </div>

                <p className="text-xs font-sans opacity-85 leading-relaxed mb-3">
                  "{m.bio}"
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-current/10 font-mono text-xs">
                  <span className="text-[11px] opacity-70">
                    {m.openSlots} mentorship slots available this term
                  </span>

                  <button
                    onClick={() => setSelectedMentor(m.name)}
                    className="px-3 py-1.5 rounded bg-[#00A859] hover:bg-[#028A4A] text-white font-bold text-xs transition-colors"
                  >
                    {selectedMentor === m.name ? 'Connected ✓' : 'Request Guidance'}
                  </button>
                </div>
              </div>
            ))}

            {selectedMentor && (
              <div className="p-3 rounded-lg bg-[#00A859]/15 border border-[#00A859]/30 text-xs font-mono text-[#00A859] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Mentorship request dispatched to {selectedMentor}! Orientation meeting scheduled for this week.</span>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3 font-mono text-xs">
            <div className="text-xs opacity-70 mb-2">
              Real Questions from Freshmen, Answered by Experienced Seniors:
            </div>

            {qnaList.map((q, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border space-y-2.5 ${
                  isBlueprint ? 'bg-[#13355E] border-blue-400/20' : 'bg-neutral-50 border-black/10'
                }`}
              >
                <div className="flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm text-neutral-900 dark:text-white font-sans">{q.question}</div>
                    <div className="text-[10px] opacity-60 mt-0.5">{q.author}</div>
                  </div>
                </div>

                <div className="pl-6 border-l-2 border-[#00A859] py-1 text-xs opacity-90 leading-relaxed font-sans">
                  {q.seniorAnswer}
                  <div className="text-[10px] font-mono text-[#00A859] font-bold mt-1">
                    — {q.seniorAuthor}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
