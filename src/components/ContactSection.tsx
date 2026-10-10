import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Send, CheckCircle2, Clock, Globe, Linkedin, Github, Send as TelegramIcon, Twitter, Edit3, Check, X } from 'lucide-react';
import { SocialLinks, INITIAL_SOCIAL_LINKS } from '../data/studioData';

interface ContactSectionProps {
  isBlueprint?: boolean;
  isFounderMode?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  isBlueprint = true,
  isFounderMode = false,
}) => {
  // Social media links state with persistence
  const [socials, setSocials] = useState<SocialLinks>(() => {
    const saved = localStorage.getItem('abekal_social_links');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_SOCIAL_LINKS;
      }
    }
    return INITIAL_SOCIAL_LINKS;
  });

  const [isEditingSocials, setIsEditingSocials] = useState(false);
  const [tempSocials, setTempSocials] = useState<SocialLinks>(socials);

  const saveSocials = (e: React.FormEvent) => {
    e.preventDefault();
    setSocials(tempSocials);
    localStorage.setItem('abekal_social_links', JSON.stringify(tempSocials));
    setIsEditingSocials(false);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: 'Campus Partnership',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your full name or representative title.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please provide a valid professional or academic email address.');
      return;
    }
    if (!formData.message.trim() || formData.message.length < 15) {
      setStatus('error');
      setErrorMessage('Please provide a brief description of your inquiry (at least 15 characters).');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      organization: '',
      inquiryType: 'Campus Partnership',
      message: '',
    });
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <section id="contact" className={`py-20 border-t transition-colors ${
      isBlueprint ? 'border-blue-400/20 bg-[#081B33]' : 'border-slate-200 bg-[#F8FAFC]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Studio Information */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#00A859] uppercase tracking-wider mb-2 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#00A859]" />
                <span>Office of Studio Partnerships</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight mb-4 text-slate-950 dark:text-white">
                Build what matters, together.
              </h2>

              <p className="text-base font-sans leading-relaxed opacity-90 text-slate-700 dark:text-slate-300">
                Whether you are exploring a university pilot for the Book Club Platform or Upperclassmen, discussing student mentorship networks, or contributing to AfriPedia, our workshop doors are open.
              </p>
            </div>

            {/* Social Media Channels Box */}
            <div className={`p-5 rounded-2xl border ${
              isBlueprint ? 'bg-[#0E294B] border-blue-400/20 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
            }`}>
              <div className="flex items-center justify-between mb-3 font-mono text-xs">
                <span className="font-bold uppercase tracking-wider text-[#00A859]">
                  Connect & Social Channels
                </span>
              </div>

              {isEditingSocials ? (
                /* Founder Editor Form for Social Links */
                <form onSubmit={saveSocials} className="space-y-3 font-mono text-xs pt-1">
                  <div>
                    <label className="block text-[10px] opacity-75 mb-1 font-bold">LinkedIn URL:</label>
                    <input
                      type="url"
                      value={tempSocials.linkedin}
                      onChange={(e) => setTempSocials({ ...tempSocials, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full px-2.5 py-1.5 rounded border border-current/20 bg-transparent text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] opacity-75 mb-1 font-bold">GitHub URL:</label>
                    <input
                      type="url"
                      value={tempSocials.github}
                      onChange={(e) => setTempSocials({ ...tempSocials, github: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-2.5 py-1.5 rounded border border-current/20 bg-transparent text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] opacity-75 mb-1 font-bold">Telegram Handle / URL:</label>
                    <input
                      type="text"
                      value={tempSocials.telegram}
                      onChange={(e) => setTempSocials({ ...tempSocials, telegram: e.target.value })}
                      placeholder="https://t.me/..."
                      className="w-full px-2.5 py-1.5 rounded border border-current/20 bg-transparent text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] opacity-75 mb-1 font-bold">X (Twitter) URL:</label>
                    <input
                      type="url"
                      value={tempSocials.twitter}
                      onChange={(e) => setTempSocials({ ...tempSocials, twitter: e.target.value })}
                      placeholder="https://x.com/..."
                      className="w-full px-2.5 py-1.5 rounded border border-current/20 bg-transparent text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] opacity-75 mb-1 font-bold">Direct Email:</label>
                    <input
                      type="email"
                      value={tempSocials.email}
                      onChange={(e) => setTempSocials({ ...tempSocials, email: e.target.value })}
                      placeholder="abekal@abekal.industries"
                      className="w-full px-2.5 py-1.5 rounded border border-current/20 bg-transparent text-xs"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingSocials(false)}
                      className="px-3 py-1 rounded border border-current/30 text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3.5 py-1 rounded bg-[#00A859] text-white font-bold text-xs"
                    >
                      Save Links
                    </button>
                  </div>
                </form>
              ) : (
                /* Public Social Media Buttons */
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
                  {socials.linkedin && (
                    <a
                      href={socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all ${
                        isBlueprint 
                          ? 'bg-[#13355E] border-blue-400/20 hover:border-blue-400/50 hover:bg-[#1A3F70]' 
                          : 'bg-slate-50 border-slate-200 hover:border-slate-400 hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <Linkedin className="w-4 h-4 text-[#38BDF8]" />
                      <span className="font-medium truncate">LinkedIn</span>
                    </a>
                  )}

                  {socials.github && (
                    <a
                      href={socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all ${
                        isBlueprint 
                          ? 'bg-[#13355E] border-blue-400/20 hover:border-blue-400/50 hover:bg-[#1A3F70]' 
                          : 'bg-slate-50 border-slate-200 hover:border-slate-400 hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <Github className="w-4 h-4 text-emerald-400" />
                      <span className="font-medium truncate">GitHub</span>
                    </a>
                  )}

                  {socials.telegram && (
                    <a
                      href={socials.telegram.startsWith('http') ? socials.telegram : `https://t.me/${socials.telegram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all ${
                        isBlueprint 
                          ? 'bg-[#13355E] border-blue-400/20 hover:border-blue-400/50 hover:bg-[#1A3F70]' 
                          : 'bg-slate-50 border-slate-200 hover:border-slate-400 hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <TelegramIcon className="w-4 h-4 text-sky-400" />
                      <span className="font-medium truncate">Telegram</span>
                    </a>
                  )}

                  {socials.twitter && (
                    <a
                      href={socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all ${
                        isBlueprint 
                          ? 'bg-[#13355E] border-blue-400/20 hover:border-blue-400/50 hover:bg-[#1A3F70]' 
                          : 'bg-slate-50 border-slate-200 hover:border-slate-400 hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <Twitter className="w-4 h-4 text-sky-400" />
                      <span className="font-medium truncate">X / Twitter</span>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Studio Coordinates & Office Readout */}
            <div className={`p-6 rounded-2xl border space-y-4 font-mono text-xs ${
              isBlueprint ? 'bg-[#0E294B] border-blue-400/20 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
            }`}>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#00A859] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-950 dark:text-white uppercase">
                    Addis Ababa Workshop HQ
                  </div>
                  <div className="opacity-80 text-slate-700 dark:text-slate-300">
                    Sub-City Bole / Dembel Corridor, Addis Ababa, Ethiopia
                  </div>
                  <div className="text-[10px] opacity-60 mt-0.5">
                    09°01'08" N, 38°45'42" E · 2,355m Elev.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-current/10">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-950 dark:text-white">
                    East Africa Time (EAT, UTC+3)
                  </div>
                  <div className="opacity-80 text-slate-700 dark:text-slate-300">
                    Studio Desk: 08:30 – 18:00 EAT (Mon – Fri)
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-current/10">
                <Mail className="w-4 h-4 text-[#00A859] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-950 dark:text-white">
                    Direct Contact
                  </div>
                  <div className="select-all font-mono text-[11px] text-[#00A859] font-bold">
                    {socials.email || 'abekal@abekal.industries'}
                  </div>
                  <div className="text-[10px] opacity-60">
                    Founder: Abekal Yilma
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-2xl border ${
              isBlueprint ? 'bg-[#0E294B] border-blue-400/20 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
            }`}>
              {status === 'success' ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#00A859]/20 text-[#00A859] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold font-display tracking-tight text-slate-950 dark:text-white">
                    Inquiry Dispatched to Studio Desk
                  </h3>
                  <p className="text-sm font-sans max-w-md mx-auto opacity-90 leading-relaxed text-slate-700 dark:text-slate-300">
                    Thank you, <strong>{formData.name}</strong>. Your correspondence regarding <strong>{formData.inquiryType}</strong> has been logged. Abekal Yilma will respond to <strong>{formData.email}</strong> shortly.
                  </p>
                  <div className="pt-4 font-mono text-xs">
                    <button
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-xl border border-current text-xs font-bold uppercase tracking-wider transition-colors hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div className="border-b pb-3 mb-2 border-current/10">
                    <h3 className="text-xl font-bold font-display tracking-tight text-slate-950 dark:text-white">
                      Initiate Direct Correspondence
                    </h3>
                  </div>

                  {status === 'error' && (
                    <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1.5 font-bold text-slate-800 dark:text-slate-200">Your Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Dawit Kebede"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                          isBlueprint ? 'bg-[#081B33] border-blue-400/30 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block mb-1.5 font-bold text-slate-800 dark:text-slate-200">Email Address *</label>
                      <input
                        type="email"
                        placeholder="you@university.edu.et"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                          isBlueprint ? 'bg-[#081B33] border-blue-400/30 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1.5 font-bold text-slate-800 dark:text-slate-200">University / Organization</label>
                      <input
                        type="text"
                        placeholder="e.g. Addis Ababa University / Student Club"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                          isBlueprint ? 'bg-[#081B33] border-blue-400/30 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block mb-1.5 font-bold text-slate-800 dark:text-slate-200">Nature of Inquiry</label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs cursor-pointer ${
                          isBlueprint ? 'bg-[#081B33] border-blue-400/30 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      >
                        <option value="Book Club Platform">Book Club Platform Collaboration</option>
                        <option value="Upperclassmen Mentorship">Upperclassmen Mentorship Network</option>
                        <option value="ClubOS Pilot">ClubOS Student Society Pilot</option>
                        <option value="AfriPedia Contribution">AfriPedia Research & Contribution</option>
                        <option value="General Collaboration">General Studio Collaboration</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1.5 font-bold text-slate-800 dark:text-slate-200">Message / Project Scope *</label>
                    <textarea
                      rows={4}
                      placeholder="Share details of your inquiry or how you would like to collaborate..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm resize-none ${
                        isBlueprint ? 'bg-[#081B33] border-blue-400/30 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-[#00A859] hover:bg-[#028A4A] text-white shadow-sm transition-all cursor-pointer disabled:opacity-60"
                    >
                      <span>{status === 'submitting' ? 'Transmitting...' : 'Dispatch Message'}</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
