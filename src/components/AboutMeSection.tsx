import React from 'react';
import { User, MapPin, Wrench, Shield, Heart, GraduationCap, Lightbulb, Compass, ArrowRight, Mail } from 'lucide-react';
import { InteractiveTechStack } from './InteractiveTechStack';

interface AboutMeSectionProps {
  isBlueprint?: boolean;
  onContactClick?: () => void;
  onNavigateProjects?: () => void;
}

export const AboutMeSection: React.FC<AboutMeSectionProps> = ({
  isBlueprint = true,
  onContactClick,
  onNavigateProjects,
}) => {
  return (
    <section id="about-me" className={`py-24 border-t transition-colors ${
      isBlueprint ? 'border-blue-400/20 bg-[#081B33]' : 'border-black/10 bg-[#FFFFFF]'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Label */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00A859] uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00A859]" />
            <span>FOUNDER MEMOIR & CREED</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-neutral-900 dark:text-white">
            About the Founder
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[#38BDF8] mt-2">
            Engineering ideas. Understanding systems. Building what matters.
          </h2>
        </div>

        {/* Introduction Cards */}
        <div className="space-y-8 font-sans text-base sm:text-lg leading-relaxed opacity-95">
          <p className="text-lg sm:text-xl font-medium leading-relaxed">
            I’m Abekal — a designer, software engineering and marketing management student, ALX alumnus, and founder based in Addis Ababa, Ethiopia.
          </p>

          {/* Parents & Mechanic Origin Callout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 font-sans">
            <div className={`p-6 rounded-2xl border ${
              isBlueprint ? 'bg-[#0E294B] border-blue-400/20 text-blue-50' : 'bg-[#F8FAFC] border-black/10 text-neutral-900'
            }`}>
              <div className="flex items-center gap-2 text-xs font-mono text-[#00A859] uppercase font-bold mb-3">
                <Wrench className="w-4 h-4" />
                <span>The Mechanic's Garage</span>
              </div>
              <p className="text-sm leading-relaxed opacity-90">
                I’m a kid from Addis Ababa who grew up around cars and the man who kept them running. My dad is a mechanic. Watching engines come apart and come back together taught me something that stayed with me: <strong>everything has a mechanism, and mechanisms can be understood.</strong>
              </p>
            </div>

            <div className={`p-6 rounded-2xl border ${
              isBlueprint ? 'bg-[#0E294B] border-blue-400/20 text-blue-50' : 'bg-[#F8FAFC] border-black/10 text-neutral-900'
            }`}>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase font-bold mb-3">
                <Heart className="w-4 h-4" />
                <span>Discipline & Commitment</span>
              </div>
              <p className="text-sm leading-relaxed opacity-90">
                My mom was the other force that shaped me. I call her a <em>discipline sergeant with a heart of gold</em>. She believed in excellence, refused to make excuses for giving up, and taught me that discipline means showing up even when things get difficult. From her, I learned that curiosity might get you started, but commitment is what keeps you going.
              </p>
            </div>
          </div>

          {/* Section: From Curiosity to Creation */}
          <div className="space-y-4 pt-4">
            <h3 className="text-2xl font-bold font-display tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="text-[#00A859]">01.</span>
              <span>From Curiosity to Creation</span>
            </h3>

            <p>
              I was never the brightest student in the room or the person who seemed naturally ahead of everyone else. I was somewhere in the middle, figuring things out while navigating ADHD and learning how to work with my own mind rather than let it define my limits.
            </p>

            <p>
              My relationship with technology changed that journey. AI, software, and the wider world of technology opened up new ways for me to learn, explore ideas, and understand problems. What began as curiosity became something much bigger: a desire to understand how things work and to build things of my own.
            </p>

            <p>
              My path moved from engines to design, from design to code, and from code toward entrepreneurship. The instinct remained the same: take something apart, understand its mechanisms, question its limitations, and imagine how it could work better.
            </p>

            <p>
              Design taught me to see. Software engineering is teaching me to build. Marketing helps me understand people, markets, and decisions. My interest in psychology, systems thinking, and artificial intelligence keeps pushing me to ask better questions.
            </p>

            {/* Academic pursuit highlight */}
            <div className={`p-4 rounded-xl border my-4 font-mono text-xs ${
              isBlueprint ? 'bg-[#13355E] border-blue-400/30 text-white' : 'bg-neutral-100 border-black/10 text-neutral-800'
            }`}>
              <div className="flex items-center gap-2 font-bold text-[#38BDF8] mb-1">
                <GraduationCap className="w-4 h-4" />
                <span>Dual Academic Exploration · Addis Ababa</span>
              </div>
              <div>
                Pursuing Software Engineering at <strong>Frontier Institute of Technology</strong> and Marketing Management at <strong>St. Mary’s University</strong> while working as a graphic designer and developing my ideas as a founder.
              </div>
            </div>

            <p>
              I don't believe I need to be the most naturally gifted person in the room. I believe in learning deliberately, doing the work, and getting better through practice. I'm still figuring things out, but I'm no longer waiting until I know everything to start building.
            </p>
          </div>

          {/* Section: Abekal Industries */}
          <div className="space-y-4 pt-6 border-t border-current/10">
            <h3 className="text-2xl font-bold font-display tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="text-[#00A859]">02.</span>
              <span>Abekal Industries</span>
            </h3>

            <p>
              I founded <strong>Abekal Industries</strong> as an independent venture studio and engineering workshop — a place to explore ideas, develop digital products, and turn problems worth solving into practical systems.
            </p>

            <p>
              My focus is on the intersection of technology, education, knowledge, and human potential. I want to build things that are not only technically interesting but genuinely useful to the people they serve.
            </p>

            <p className="font-semibold text-neutral-900 dark:text-white">
              My current projects reflect that ambition:
            </p>

            {/* Project Bullets */}
            <div className="space-y-3 pl-2 sm:pl-4">
              <div className={`p-4 rounded-xl border ${
                isBlueprint ? 'bg-[#0E294B] border-blue-400/20' : 'bg-[#F8FAFC] border-black/10'
              }`}>
                <div className="font-bold text-base text-[#00A859]">AfriPedia</div>
                <p className="text-sm opacity-90 mt-1">
                  An initiative to build an encyclopedia of African knowledge, making African histories, ideas, discoveries, cultures, and intellectual contributions more accessible and better represented.
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${
                isBlueprint ? 'bg-[#0E294B] border-blue-400/20' : 'bg-[#F8FAFC] border-black/10'
              }`}>
                <div className="font-bold text-base text-[#38BDF8]">classflow</div>
                <p className="text-sm opacity-90 mt-1">
                  A platform concept exploring better academic communication and coordination between students, class representatives, and teachers.
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${
                isBlueprint ? 'bg-[#0E294B] border-blue-400/20' : 'bg-[#F8FAFC] border-black/10'
              }`}>
                <div className="font-bold text-base text-amber-400">Upperclass</div>
                <p className="text-sm opacity-90 mt-1">
                  A platform concept designed to connect university freshmen with senior students who can share experience, offer mentorship, and help them navigate university life.
                </p>
              </div>
            </div>

            <p className="pt-2">
              These projects are at different stages of development. They represent problems I'm actively exploring, systems I'm working to build, and lessons I'm learning along the way. I don't consider an idea successful simply because it sounds ambitious. It has to work, serve real people, and earn its place in their lives.
            </p>
          </div>

          {/* Section: How I Think About Building */}
          <div className="space-y-4 pt-6 border-t border-current/10">
            <h3 className="text-2xl font-bold font-display tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="text-[#00A859]">03.</span>
              <span>How I Think About Building</span>
            </h3>

            <p>
              I'm fascinated by the mechanisms beneath things: how technology works, how people think, how organizations function, and how small changes in a system can produce meaningful results.
            </p>

            <p>
              I like connecting disciplines that are often treated separately. Design and engineering. Technology and human behavior. Business and systems thinking. African knowledge and modern tools.
            </p>

            <p>
              I approach building by asking questions, studying problems, testing assumptions, and improving what I create. I value thoughtful design, sound engineering, honest feedback, and the discipline to keep working when the excitement of a new idea fades.
            </p>

            <p>
              I'm still learning. I will make mistakes, change my mind, and encounter problems I don't yet know how to solve. That's part of the work. I'd rather acknowledge what I don't know and work to understand it than pretend to have all the answers.
            </p>
          </div>

          {/* Section: The Long Game */}
          <div className="space-y-4 pt-6 border-t border-current/10">
            <h3 className="text-2xl font-bold font-display tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="text-[#00A859]">04.</span>
              <span>The Long Game</span>
            </h3>

            <p>I want my work to matter beyond me.</p>

            <p>
              I want to build useful technology, contribute to the preservation and accessibility of African knowledge, create opportunities for students, and help the people around me move forward. I want to become the kind of engineer and founder who doesn't just identify problems but takes responsibility for solving them.
            </p>

            <p>
              Abekal Industries is one expression of that ambition. The larger mission is a lifetime of learning, building, and creating things that leave people and systems better than I found them.
            </p>

            {/* Central Manifesto Banner */}
            <div className="p-6 rounded-2xl bg-[#00A859]/15 border-2 border-[#00A859] my-6 font-mono text-center">
              <p className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white leading-relaxed">
                "My goal is to turn curiosity into understanding, understanding into systems, and systems into something that matters — something that improves lives, opens possibilities, and outlasts me."
              </p>
            </div>

            <p className="font-medium text-lg">
              I'm here to do the work, keep learning, and see how far I can take it.
            </p>

            <p className="text-xl sm:text-2xl font-black font-display text-[#00A859]">
              And I'm committed to that pursuit for the rest of my life.
            </p>
          </div>

          {/* Abekal's Interactive Tech Stack Section */}
          <div className="pt-8 border-t border-current/10">
            <InteractiveTechStack isBlueprint={isBlueprint} />
          </div>

          {/* Connect Footer */}
          <div className="pt-8 border-t border-current/10 flex flex-wrap items-center justify-between gap-4">
            <div className="font-mono text-xs opacity-75">
              <span>Addis Ababa, Ethiopia · </span>
              <span className="text-[#00A859] font-bold">abekal@abekal.industries</span>
            </div>

            <button
              onClick={onContactClick}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00A859] hover:bg-[#028A4A] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Initiate Conversation</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
