import React, { useState, useEffect } from 'react';
import { Send, Users, ShieldAlert, CheckCircle, Wifi, WifiOff, BellRing, RefreshCw } from 'lucide-react';

interface ClassflowTopologySimulatorProps {
  isDark?: boolean;
}

interface StudentNode {
  id: number;
  crId: number;
  name: string;
  delivered: boolean;
  read: boolean;
}

export const ClassflowTopologySimulator: React.FC<ClassflowTopologySimulatorProps> = ({ isDark = false }) => {
  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);
  const [offlineMeshActive, setOfflineMeshActive] = useState<boolean>(false);
  const [deliveredCount, setDeliveredCount] = useState<number>(32);
  const [readCount, setReadCount] = useState<number>(32);
  const [announcementText, setAnnouncementText] = useState<string>(
    'URGENT: EE-412 Applied Signals Exam moved to Hall 4B at 14:00. Bring scientific calculators.'
  );

  const crNodes = [
    { id: 1, name: 'CR // CS Faculty', cohort: 'Year 4 Software' },
    { id: 2, name: 'CR // Elect. Eng.', cohort: 'Year 3 Electrical' },
    { id: 3, name: 'CR // Architecture', cohort: 'Year 2 Design' },
    { id: 4, name: 'CR // Mech. Eng.', cohort: 'Year 4 Systems' }
  ];

  // 32 simulated student peer nodes
  const [students, setStudents] = useState<StudentNode[]>(() =>
    Array.from({ length: 32 }, (_, i) => ({
      id: i + 1,
      crId: (i % 4) + 1,
      name: `Student #${i + 101}`,
      delivered: true,
      read: true
    }))
  );

  const triggerBroadcast = () => {
    setIsBroadcasting(true);
    setDeliveredCount(0);
    setReadCount(0);

    // reset students
    setStudents((prev) =>
      prev.map((s) => ({ ...s, delivered: false, read: false }))
    );

    // Stage 1: Relay to CRs
    setTimeout(() => {
      // Stage 2: CRs relay to students
      let count = 0;
      const interval = setInterval(() => {
        count += 4;
        setStudents((prev) =>
          prev.map((s, idx) => {
            if (idx < count) {
              return { ...s, delivered: true, read: idx < count - 2 };
            }
            return s;
          })
        );
        setDeliveredCount(Math.min(count, 32));
        setReadCount(Math.min(Math.max(0, count - 2), 32));

        if (count >= 32) {
          clearInterval(interval);
          setIsBroadcasting(false);
          setReadCount(32);
        }
      }, 150);
    }, 400);
  };

  return (
    <div className={`rounded-xl border overflow-hidden ${
      isDark ? 'bg-[#121519] border-white/10' : 'bg-white border-black/10'
    }`}>
      {/* Top Banner */}
      <div className={`p-4 border-b flex flex-wrap items-center justify-between gap-3 ${
        isDark ? 'border-white/10 bg-[#161A20]' : 'border-black/10 bg-[#FAF7F0]'
      }`}>
        <div className="flex items-center gap-2">
          <BellRing className="w-4 h-4 text-[#1B8A4D]" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider">
            classflow // Broadcast Topology & Relay Simulator
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <button
            onClick={() => setOfflineMeshActive(!offlineMeshActive)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
              offlineMeshActive
                ? 'bg-[#E07A22] text-white font-semibold'
                : isDark ? 'bg-white/10 text-slate-300' : 'bg-black/5 text-slate-700'
            }`}
          >
            {offlineMeshActive ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span>{offlineMeshActive ? '40% Packet Drop Active' : 'Normal Network'}</span>
          </button>
        </div>
      </div>

      {/* Broadcast Composer */}
      <div className={`p-4 border-b font-mono text-xs ${
        isDark ? 'border-white/10 bg-black/20' : 'border-black/10 bg-neutral-50'
      }`}>
        <div className="text-[10px] uppercase opacity-60 mb-1.5">
          Verified Faculty Broadcast Key: <span className="text-[#1B8A4D]">AUTH_ED25519_OK</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <input
            type="text"
            value={announcementText}
            onChange={(e) => setAnnouncementText(e.target.value)}
            className={`grow px-3 py-2 rounded border text-xs font-sans ${
              isDark ? 'bg-neutral-900 border-white/15 text-white' : 'bg-white border-black/15 text-neutral-900'
            }`}
          />
          <button
            onClick={triggerBroadcast}
            disabled={isBroadcasting}
            className="shrink-0 flex items-center justify-center gap-2 px-4 py-2 rounded bg-[#1B8A4D] hover:bg-[#156E3E] text-white font-mono text-xs font-semibold transition-all shadow-sm disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isBroadcasting ? 'Relaying Packet...' : 'Broadcast Notice'}</span>
          </button>
        </div>
      </div>

      {/* Network Tree Visualizer */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* Tier 1: Faculty Origin */}
        <div className="flex flex-col items-center">
          <div className={`px-4 py-2 rounded-lg border text-center font-mono text-xs ${
            isDark ? 'bg-[#181E24] border-[#1B8A4D]' : 'bg-[#EBF7F0] border-[#1B8A4D]'
          }`}>
            <div className="text-[10px] text-[#1B8A4D] font-bold uppercase">Root Authority</div>
            <div className="font-semibold">Instructor / Department Head</div>
          </div>
          <div className="w-px h-6 bg-current opacity-20 my-1" />
        </div>

        {/* Tier 2: 4 Class Representatives */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {crNodes.map((cr) => (
            <div
              key={cr.id}
              className={`p-3 rounded-lg border font-mono text-xs text-center transition-all ${
                deliveredCount > 0
                  ? isDark ? 'bg-[#1E252E] border-[#1B8A4D]/50 text-white' : 'bg-emerald-50/50 border-[#1B8A4D]/50 text-neutral-900'
                  : 'opacity-50 border-current'
              }`}
            >
              <div className="text-[10px] text-[#1B8A4D] font-bold">{cr.name}</div>
              <div className="text-[11px] opacity-75">{cr.cohort}</div>
              <div className="text-[9px] mt-1.5 text-emerald-600 font-semibold">
                {deliveredCount > 0 ? '✓ Relaying to 8 Peers' : 'Idle'}
              </div>
            </div>
          ))}
        </div>

        {/* Tier 3: 32 Student Nodes Grid */}
        <div>
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="opacity-70">Peer Student Grid (32 Cohort Nodes):</span>
            <span className="font-semibold text-[#1B8A4D]">
              Delivered: {deliveredCount}/32 · Confirmed Read: {readCount}/32 ({(readCount / 32 * 100).toFixed(0)}%)
            </span>
          </div>

          <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5 p-3 rounded-lg border font-mono text-[9px]" style={{
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
            backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.02)'
          }}>
            {students.map((st) => (
              <div
                key={st.id}
                title={`${st.name} - ${st.read ? 'Read' : st.delivered ? 'Received' : 'Pending'}`}
                className={`h-7 rounded flex items-center justify-center transition-colors ${
                  st.read
                    ? 'bg-[#1B8A4D] text-white font-bold'
                    : st.delivered
                    ? 'bg-[#E07A22] text-white'
                    : isDark ? 'bg-white/10 text-neutral-500' : 'bg-black/10 text-neutral-400'
                }`}
              >
                {st.id}
              </div>
            ))}
          </div>
        </div>

        {/* Verification Footnote */}
        <div className="flex items-center justify-between text-xs font-mono pt-2 border-t" style={{
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
        }}>
          <div className="flex items-center gap-1.5 text-slate-500">
            <ShieldAlert className="w-3.5 h-3.5 text-[#1B8A4D]" />
            <span>Zero spam. No student-to-student chatter pollution. Instant 100% confirmation.</span>
          </div>
          <span className="text-[#1B8A4D] font-bold">Latency: 1.1s</span>
        </div>
      </div>
    </div>
  );
};
