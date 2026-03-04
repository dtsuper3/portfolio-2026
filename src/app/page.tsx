'use client';

import React, { useState } from 'react';
import { Project, Experience as ExperienceType, TechCategory } from '@/types/portfolio';

// Section Components
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import TechStack from '@/components/sections/TechStack';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import BootScreen from '@/components/sections/BootScreen';

const projectsData: Project[] = [
  {
    name: 'mnai-platform',
    description: 'Migrated a UK-based data & analytics platform from PHP to React. Provides meaningful insight into all UK companies.',
    language: 'TypeScript',
    url: 'https://platform.mnai.tech/',
    tags: ['Next.js', 'TypeScript', 'Serverless', 'PostgreSQL'],
    period: 'Jan 2022 – Present',
  },
  {
    name: 'teacherkhoj',
    description: 'Personal project — a marketplace for finding and connecting teachers and students across India.',
    language: 'TypeScript',
    url: 'https://teacherkhoj.com/',
    tags: ['Next.js', 'Node.js', 'MongoDB', "Serverless", "S3"],
    period: 'Aug 2021 – Present',
  },
  {
    name: 'dineout-events',
    description: 'Event booking feature for Dineout. Built UI design and handled API integration for the event detail page.',
    language: 'JavaScript',
    url: 'https://www.dineout.co.in',
    tags: ['Next.js', 'SSR', 'SASS'],
    period: 'Jul 2021 – Jan 2022',
  },
  {
    name: 'ana-pwa-erp',
    description: 'PWA-based Enterprise Resource Planning app for employer management. Implemented offline feature using IndexedDB.',
    language: 'JavaScript',
    url: 'https://anapwamobile.eastus.cloudapp.azure.com',
    tags: ['React', 'Redux', 'PWA'],
    period: 'Feb 2021 – Jul 2022',
  },
  {
    name: 'pcex-member',
    description: 'Cryptocurrency exchange & trading platform. Implemented live crypto market view, buy/sell, TradingView Chart, wallets.',
    language: 'TypeScript',
    url: 'https://www.pcexmember.in',
    tags: ['React', 'Redux', 'Socket'],
    period: 'Feb 2020 – May 2021',
  },
  {
    name: 'feelium-econtract',
    description: 'Platform for creating digital contracts online. Implemented digital KYC and payment gateway integration.',
    language: 'TypeScript',
    url: 'https://www.feeliumecontract.com',
    tags: ['Angular 4+', 'Bootstrap', 'TypeScript'],
    period: 'Aug 2019 – Feb 2020',
  },
];

const experienceData: ExperienceType[] = [
  { role: 'Software Engineer', company: 'Clinchinfosystems Pvt. Ltd.', url: 'http://clinchinfosystems.com/', period: '2022 – Present' },
  { role: 'Software Engineer', company: 'InnovationM Pvt. Ltd.', url: 'https://www.innovationm.com/', period: '2021 – 2022' },
  { role: 'Full Stack Developer', company: 'Panaesha Capital Pvt. Ltd.', url: 'https://www.panaeshacapital.com/', period: '2019 – 2021' },
  { role: 'React Developer', company: 'Transfin Pvt. Ltd.', url: 'https://transfin.in/', period: '2019' },
];

const techStackData: TechCategory[] = [
  { label: 'Languages', items: ['JavaScript', 'TypeScript', "Python"] },
  { label: 'Frontend', items: ['HTML5', 'CSS3', 'React', 'Next.js', 'Angular 2+', 'React Native', 'Bootstrap', 'Material UI'] },
  { label: 'Backend', items: ['Node.js', 'MongoDB', "PostgreSQL", 'MySQL', 'REST APIs'] },
  { label: 'DevOps & Tools', items: ['Docker', 'AWS EC2', 'AWS Lambda', 'S3', 'Nginx', 'PM2', 'Git'] },
  { label: 'State Management', items: ['Redux', 'Recoil', 'SWR', 'Context API'] },
];

export default function HomePage() {
  const [bootDone, setBootDone] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!bootDone) {
    return <BootScreen onBootDone={() => setBootDone(true)} />;
  }

  return (
    <div className="crt-screen min-h-screen flicker">
      <div className="scanline" />

      <Navbar activeSection={activeSection} scrollTo={scrollTo} />

      <main>
        <Hero scrollTo={scrollTo} />
        <Projects projects={projectsData} />
        <Experience experience={experienceData} />
        <TechStack techStack={techStackData} />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
