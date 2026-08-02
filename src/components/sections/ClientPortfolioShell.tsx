'use client';

import React, { useState } from 'react';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import TechStack from '@/components/sections/TechStack';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
// import BootScreen from '@/components/sections/BootScreen';
import LatestBlogSection from '@/components/blog/LatestBlogSection';
import { Project, Experience as ExperienceType, TechCategory } from '@/types/portfolio';
import { BlogPost } from '@/types/blog';

interface ClientPortfolioShellProps {
  projects: Project[];
  experience: ExperienceType[];
  techStack: TechCategory[];
  latestPosts?: BlogPost[];
}

export default function ClientPortfolioShell({
  projects,
  experience,
  techStack,
  latestPosts = [],
}: ClientPortfolioShellProps) {
  // const [showBoot, setShowBoot] = useState<boolean>(false);
  // const [isMounted, setIsMounted] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  // useEffect(() => {
  //   setIsMounted(true);
  //   const hasBooted = sessionStorage.getItem('portfolio_booted');
  //   if (!hasBooted) {
  //     setShowBoot(true);
  //   }
  // }, []);

  // const handleBootDone = () => {
  //   setShowBoot(false);
  //   sessionStorage.setItem('portfolio_booted', 'true');
  // };

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="crt-screen min-h-screen flicker">
      {/* {isMounted && showBoot && <BootScreen onBootDone={handleBootDone} />} */}

      <Navbar activeSection={activeSection} scrollTo={scrollTo} />

      <main>
        <Hero scrollTo={scrollTo} />
        <Projects projects={projects} />
        <Experience experience={experience} />
        <TechStack techStack={techStack} />
        {latestPosts.length > 0 && <LatestBlogSection posts={latestPosts} />}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
