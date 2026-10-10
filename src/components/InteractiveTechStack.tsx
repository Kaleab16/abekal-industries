import React, { useState } from 'react';
import { Terminal, Cpu, Cloud, Database, Shield, Palette, Sparkles, CheckCircle2 } from 'lucide-react';

interface TechCategory {
  id: string;
  name: string;
  icon: typeof Terminal;
  skills: { name: string; tag?: string; note?: string }[];
}

interface InteractiveTechStackProps {
  isBlueprint?: boolean;
}

export const InteractiveTechStack: React.FC<InteractiveTechStackProps> = ({ isBlueprint = true }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<{ name: string; category: string; tag?: string; note?: string } | null>({
    name: 'Python',
    category: 'Programming & Software Engineering',
    tag: 'Core Stack',
    note: 'Primary language for software development, systems logic, and AI workflows.'
  });

  const categories: TechCategory[] = [
    {
      id: 'software',
      name: 'Programming & Software Engineering',
      icon: Terminal,
      skills: [
        { name: 'Python', tag: 'Core Stack', note: 'Primary language for software development, systems logic, and AI workflows.' },
        { name: 'Rust', tag: 'Exploring', note: 'Investigating high-performance systems programming, memory safety, and tooling.' },
        { name: 'Git', tag: 'Version Control', note: 'Distributed version control, branching strategies, and collaboration workflows.' },
        { name: 'Linux / WSL', tag: 'Operating System', note: 'Command line fluency, bash scripting, and developer environment workflows.' },
        { name: 'REST APIs', tag: 'Web Architecture', note: 'Stateless protocol design, endpoints, payloads, and integration standards.' }
      ]
    },
    {
      id: 'ai',
      name: 'Artificial Intelligence & Agents',
      icon: Cpu,
      skills: [
        { name: 'Generative AI', tag: 'Core Domain', note: 'Multimodal generation, prompt architecture, and foundation model utilization.' },
        { name: 'LLMs', tag: 'Architectures', note: 'Large language model prompting, context engineering, and domain adaptation.' },
        { name: 'AI Agents', tag: 'Active Pursuit', note: 'Autonomous multi-step planning, tool-calling pipelines, and execution graphs.' },
        { name: 'RAG', tag: 'Retrieval Augmented', note: 'Semantic vector search, embeddings, document chunking, and grounded responses.' },
        { name: 'Amazon Bedrock', tag: 'Cloud AI', note: 'Unified API access to top foundation models with enterprise security.' },
        { name: 'Amazon Bedrock AgentCore', tag: 'Agentic Systems', note: 'Building autonomous agents that orchestrate multi-step business logic.' }
      ]
    },
    {
      id: 'cloud',
      name: 'Cloud & Infrastructure',
      icon: Cloud,
      skills: [
        { name: 'AWS', tag: 'Primary Cloud', note: 'Amazon Web Services cloud computing, resources, and distributed infrastructure.' },
        { name: 'AWS Lambda', tag: 'Serverless', note: 'Event-driven compute executing backend functions at scale without servers.' },
        { name: 'API Gateway', tag: 'API Management', note: 'Routing, securing, and throttling backend HTTP & WebSocket endpoints.' },
        { name: 'IAM', tag: 'Access Governance', note: 'Fine-grained permissions, roles, and principle of least privilege.' },
        { name: 'CloudFormation', tag: 'Infrastructure as Code', note: 'Declarative templates for provisioning and managing cloud stacks.' },
        { name: 'CI/CD', tag: 'Automation', note: 'Automated continuous integration and deployment delivery pipelines.' }
      ]
    },
    {
      id: 'data',
      name: 'Data & Databases',
      icon: Database,
      skills: [
        { name: 'SQL', tag: 'Learning', note: 'Relational data modeling, table normalization, and SQL querying.' },
        { name: 'Supabase', tag: 'Backend Platform', note: 'PostgreSQL-backed auth, real-time databases, and storage APIs.' },
        { name: 'Data Analysis', tag: 'Insight Generation', note: 'Extracting patterns from quantitative datasets and metric monitoring.' },
        { name: 'Data Science', tag: 'Exploring', note: 'Exploring exploratory data analysis and statistical modeling.' }
      ]
    },
    {
      id: 'security',
      name: 'Cybersecurity',
      icon: Shield,
      skills: [
        { name: 'Linux Security', tag: 'Host Hardening', note: 'File permissions, firewall configurations, and system hardening.' },
        { name: 'Networking Fundamentals', tag: 'Core Theory', note: 'TCP/IP model, DNS, HTTP/HTTPS protocols, subnets, and packet flow.' },
        { name: 'IAM & Access Control', tag: 'Security Policies', note: 'Role-based access control (RBAC), multi-factor authentication, key rotation.' },
        { name: 'Security Fundamentals', tag: 'Defense in Depth', note: 'Threat modeling, encryption at rest/transit, and OWASP safety standards.' }
      ]
    },
    {
      id: 'design',
      name: 'Design & Digital Product Development',
      icon: Palette,
      skills: [
        { name: 'Graphic Design', tag: 'Photoshop · Illustrator · Affinity', note: 'Visual communication, vector illustration, and publication layouts.' },
        { name: 'Brand Identity', tag: 'Identity Systems', note: 'Logomarks, design guidelines, typography palettes, and brand perception.' },
        { name: 'UI/UX Design', tag: 'Interface Craft', note: 'User journey mapping, wireframing, high-fidelity prototypes, and usability.' },
        { name: 'Prototyping', tag: 'Interactive Models', note: 'Clickable interactive simulations and mechanical drafting schematics.' },
        { name: 'Digital Marketing', tag: 'Audience Strategy', note: 'Understanding user motivation, distribution channels, and message resonance.' }
      ]
    }
  ];

  const filteredCategories = activeCategory === 'all'
    ? categories
    : categories.filter((c) => c.id === activeCategory);

  return (
    <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
      isBlueprint ? 'bg-[#0E294B] border-blue-400/20 text-white' : 'bg-white border-black/10 text-neutral-900 shadow-sm'
    }`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-current/10 font-mono">
        <div>
          <span className="text-xs text-[#00A859] font-bold uppercase tracking-wider block mb-1">
            TECHNICAL CAPABILITIES MATRIX
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-neutral-900 dark:text-white">
            Abekal’s Interactive Tech Stack
          </h3>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#00A859] text-white font-bold'
                : 'bg-black/5 dark:bg-white/5 opacity-70 hover:opacity-100'
            }`}
          >
            All Disciplines
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                activeCategory === c.id
                  ? 'bg-[#00A859] text-white font-bold'
                  : 'bg-black/5 dark:bg-white/5 opacity-70 hover:opacity-100'
              }`}
            >
              {c.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              className={`p-4 rounded-xl border transition-all ${
                isBlueprint ? 'bg-[#13355E] border-blue-400/20 hover:border-blue-400/40' : 'bg-neutral-50 border-black/10 hover:border-black/20'
              }`}
            >
              <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold text-[#38BDF8]">
                <Icon className="w-4 h-4 text-[#00A859]" />
                <span className="leading-tight">{cat.name}</span>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => {
                  const isSelected = selectedSkill?.name === skill.name;
                  return (
                    <button
                      key={skill.name}
                      onClick={() => setSelectedSkill({ ...skill, category: cat.name })}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-all text-left cursor-pointer ${
                        isSelected
                          ? 'bg-[#00A859] text-white font-bold ring-1 ring-white/50 shadow-sm scale-105'
                          : isBlueprint
                          ? 'bg-[#0A1D37] text-blue-100 hover:bg-[#1A3F70]'
                          : 'bg-white text-neutral-800 border border-black/10 hover:bg-neutral-100'
                      }`}
                    >
                      <span>{skill.name}</span>
                      {skill.tag && skill.tag.includes('exploring') && (
                        <span className="ml-1 text-[9px] opacity-60 italic text-amber-300">
                          (exploring)
                        </span>
                      )}
                      {skill.tag && skill.tag.includes('learning') && (
                        <span className="ml-1 text-[9px] opacity-60 italic text-amber-300">
                          (learning)
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Skill Detail Inspector HUD */}
      {selectedSkill && (
        <div className={`mt-6 p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs ${
          isBlueprint ? 'bg-[#0A1D37] border-blue-400/30 text-white' : 'bg-emerald-50/70 border-emerald-300 text-neutral-900'
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] text-[#00A859] font-bold uppercase">{selectedSkill.category}</span>
              <span>·</span>
              <span className="px-1.5 py-0.2 rounded bg-[#00A859]/20 text-[#00A859] font-bold text-[10px]">{selectedSkill.tag}</span>
            </div>
            <div className="font-bold text-base text-neutral-900 dark:text-white font-sans">{selectedSkill.name}</div>
            <p className="text-xs opacity-85 mt-1 font-sans">{selectedSkill.note}</p>
          </div>

          <div className="text-[11px] opacity-75 shrink-0 sm:text-right">
            Verified Stack Parameter · Active Workbench
          </div>
        </div>
      )}
    </div>
  );
};
