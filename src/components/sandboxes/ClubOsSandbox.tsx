import React, { useState } from 'react';
import { ShieldCheck, Calendar, DollarSign, CheckCircle2, AlertCircle, FileText, Plus, Users } from 'lucide-react';

interface ClubOsSandboxProps {
  isBlueprint?: boolean;
}

export const ClubOsSandbox: React.FC<ClubOsSandboxProps> = ({ isBlueprint = false }) => {
  const [activeTab, setActiveTab] = useState<'approvals' | 'budget'>('approvals');

  const [requests, setRequests] = useState([
    {
      id: 'REQ-101',
      club: 'AAiT Robotics & Automation Club',
      event: 'Annual Autonomous Line-Follower Competition',
      hall: 'Auditorium Hall 2',
      date: 'April 18, 2026',
      budget: '14,500 ETB',
      status: 'Dean Approved',
      approved: true
    },
    {
      id: 'REQ-102',
      club: 'Debate & International Affairs Society',
      event: 'Inter-College Model African Union Summit',
      hall: 'Conference Room 4B',
      date: 'May 02, 2026',
      budget: '8,200 ETB',
      status: 'Pending Advisor Sign-off',
      approved: false
    },
    {
      id: 'REQ-103',
      club: 'Software & Open Source Guild',
      event: '24-Hour Campus Hackathon: Local Solutions',
      hall: 'Engineering Lab 3',
      date: 'May 16, 2026',
      budget: '22,000 ETB',
      status: 'Pending Dean Review',
      approved: false
    }
  ]);

  const toggleApproval = (id: string) => {
    setRequests(prev => prev.map(r => {
      if (r.id === id) {
        return {
          ...r,
          approved: !r.approved,
          status: !r.approved ? 'Approved ✓' : 'Pending Advisor Sign-off'
        };
      }
      return r;
    }));
  };

  return (
    <div className={`rounded-xl border overflow-hidden ${
      isBlueprint ? 'bg-[#0E294B] border-blue-400/20 text-white' : 'bg-white border-black/10 text-neutral-900'
    }`}>
      {/* Top Banner */}
      <div className={`p-4 border-b flex flex-wrap items-center justify-between gap-3 ${
        isBlueprint ? 'bg-[#0A1D37] border-blue-400/20' : 'bg-neutral-50 border-black/10'
      }`}>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider">
            ClubOS // University Club Operations & Approvals
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold">
            IN DEVELOPMENT
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveTab('approvals')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'approvals'
                ? 'bg-[#38BDF8] text-slate-900 font-bold'
                : isBlueprint ? 'bg-white/10 text-blue-200' : 'bg-black/5 text-neutral-700'
            }`}
          >
            Event Approvals
          </button>
          <button
            onClick={() => setActiveTab('budget')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'budget'
                ? 'bg-[#38BDF8] text-slate-900 font-bold'
                : isBlueprint ? 'bg-white/10 text-blue-200' : 'bg-black/5 text-neutral-700'
            }`}
          >
            Budget Ledger
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 space-y-4">
        {activeTab === 'approvals' ? (
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-[11px] opacity-70 mb-2">
              <span>Campus Society Event Queue:</span>
              <span>Click to test instant advisor authorization</span>
            </div>

            {requests.map((r) => (
              <div
                key={r.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                  r.approved
                    ? isBlueprint ? 'bg-[#13355E] border-[#00A859]/50' : 'bg-emerald-50/70 border-emerald-300'
                    : isBlueprint ? 'bg-[#0F223D] border-blue-400/20' : 'bg-neutral-50 border-black/10'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] opacity-60">{r.id}</span>
                    <span className="font-bold text-sm font-sans">{r.club}</span>
                  </div>
                  <div className="text-xs opacity-90 mb-1">{r.event}</div>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] opacity-70">
                    <span>{r.hall}</span>
                    <span>·</span>
                    <span>{r.date}</span>
                    <span>·</span>
                    <span className="font-bold text-[#00A859]">{r.budget}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    r.approved ? 'text-[#00A859] bg-[#00A859]/15' : 'text-amber-500 bg-amber-500/15'
                  }`}>
                    {r.status}
                  </span>

                  <button
                    onClick={() => toggleApproval(r.id)}
                    className={`px-3 py-1.5 rounded font-bold text-xs transition-colors cursor-pointer ${
                      r.approved
                        ? 'bg-neutral-600 text-white hover:bg-neutral-700'
                        : 'bg-[#00A859] hover:bg-[#028A4A] text-white shadow-sm'
                    }`}
                  >
                    {r.approved ? 'Revoke' : 'Approve Event'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-3.5 rounded-lg border ${
                isBlueprint ? 'bg-[#13355E] border-blue-400/20' : 'bg-neutral-50 border-black/10'
              }`}>
                <div className="text-[10px] opacity-60 uppercase mb-1">Total Allocated Fund</div>
                <div className="text-lg font-bold text-[#00A859]">120,000 ETB</div>
              </div>

              <div className={`p-3.5 rounded-lg border ${
                isBlueprint ? 'bg-[#13355E] border-blue-400/20' : 'bg-neutral-50 border-black/10'
              }`}>
                <div className="text-[10px] opacity-60 uppercase mb-1">Disbursed Events</div>
                <div className="text-lg font-bold text-[#38BDF8]">44,700 ETB</div>
              </div>

              <div className={`p-3.5 rounded-lg border ${
                isBlueprint ? 'bg-[#13355E] border-blue-400/20' : 'bg-neutral-50 border-black/10'
              }`}>
                <div className="text-[10px] opacity-60 uppercase mb-1">Remaining Balance</div>
                <div className="text-lg font-bold text-amber-400">75,300 ETB</div>
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-dashed border-current/20 text-[11px] opacity-80">
              ✓ Immutable audit trail: every disbursement requires dual cryptographic signatures from Club President and Faculty Advisor.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
