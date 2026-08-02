import React from 'react';
import type { Metadata } from 'next';
import ClientPortfolioShell from '@/components/sections/ClientPortfolioShell';
import JsonLd from '@/components/seo/JsonLd';
import { getProjectsSchema } from '@/lib/jsonld';
import { getLatestPosts } from '@/sanity/lib/fetch';
import { Project, Experience as ExperienceType, TechCategory } from '@/types/portfolio';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Deepak Thapa | Senior Full Stack & Next.js Engineer',
  description:
    'Explore the portfolio of Deepak Thapa, a Senior Full-Stack Web Developer specialized in React, Next.js 16, TypeScript, Node.js, and Agentic AI solutions.',
  alternates: {
    canonical: '/',
  },
};

const projectsData: Project[] = [
  {
    name: 'mnai-platform',
    description:
      'Migrated a UK-based data & analytics platform from PHP to React & Next.js. Provides meaningful intelligence and analytics on all UK registered companies.',
    language: 'TypeScript',
    url: 'https://platform.mnai.tech/',
    tags: ['Next.js', 'TypeScript', 'Serverless', 'PostgreSQL'],
    period: 'Jan 2022 – Present',
  },
  {
    name: 'teacherkhoj',
    description:
      'Personal project — a digital marketplace platform connecting teachers and students across India with real-time matching.',
    language: 'TypeScript',
    url: 'https://teacherkhoj.com/',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Serverless', 'S3'],
    period: 'Aug 2021 – Present',
  },
  {
    name: 'dineout-events',
    description:
      'Event booking platform module for Dineout. Built high-converting UI layout and handled API integration for high-traffic event detail pages.',
    language: 'JavaScript',
    url: 'https://www.dineout.co.in',
    tags: ['Next.js', 'SSR', 'SASS'],
    period: 'Jul 2021 – Jan 2022',
  },
  {
    name: 'ana-pwa-erp',
    description:
      'PWA-based Enterprise Resource Planning web application for employer management featuring offline storage using IndexedDB.',
    language: 'JavaScript',
    url: 'https://anapwamobile.eastus.cloudapp.azure.com',
    tags: ['React', 'Redux', 'PWA'],
    period: 'Feb 2021 – Jul 2022',
  },
  {
    name: 'pcex-member',
    description:
      'Cryptocurrency exchange & trading portal featuring live order books, buy/sell workflows, TradingView charts, and wallet management.',
    language: 'TypeScript',
    url: 'https://www.pcexmember.in',
    tags: ['React', 'Redux', 'WebSocket'],
    period: 'Feb 2020 – May 2021',
  },
  {
    name: 'feelium-econtract',
    description:
      'Digital contract generation and signing web application featuring online KYC verification and payment gateway integration.',
    language: 'TypeScript',
    url: 'https://www.feeliumecontract.com',
    tags: ['Angular 4+', 'Bootstrap', 'TypeScript'],
    period: 'Aug 2019 – Feb 2020',
  },
];

const experienceData: ExperienceType[] = [
  {
    role: 'Software Engineer',
    company: 'Clinchinfosystems Pvt. Ltd.',
    url: 'http://clinchinfosystems.com/',
    period: '2022 – Present',
  },
  {
    role: 'Software Engineer',
    company: 'InnovationM Pvt. Ltd.',
    url: 'https://www.innovationm.com/',
    period: '2021 – 2022',
  },
  {
    role: 'Full Stack Developer',
    company: 'Panaesha Capital Pvt. Ltd.',
    url: 'https://www.panaeshacapital.com/',
    period: '2019 – 2021',
  },
  {
    role: 'React Developer',
    company: 'Transfin Pvt. Ltd.',
    url: 'https://transfin.in/',
    period: '2019',
  },
];

const techStackData: TechCategory[] = [
  { label: 'Languages', items: ['JavaScript', 'TypeScript', 'Python'] },
  {
    label: 'Frontend',
    items: ['HTML5', 'CSS3', 'React', 'Next.js', 'Angular 2+', 'React Native', 'Bootstrap', 'Material UI'],
  },
  { label: 'Backend', items: ['Node.js', 'MongoDB', 'PostgreSQL', 'MySQL', 'REST APIs'] },
  {
    label: 'DevOps & Tools',
    items: ['Docker', 'AWS EC2', 'AWS Lambda', 'S3', 'Nginx', 'PM2', 'Git'],
  },
  { label: 'State Management', items: ['Redux', 'Recoil', 'SWR', 'Context API'] },
];

export default async function HomePage() {
  const projectsSchema = getProjectsSchema(projectsData);
  const latestPosts = await getLatestPosts();

  return (
    <>
      <JsonLd data={projectsSchema} />
      <ClientPortfolioShell
        projects={projectsData}
        experience={experienceData}
        techStack={techStackData}
        latestPosts={latestPosts}
      />
    </>
  );
}
