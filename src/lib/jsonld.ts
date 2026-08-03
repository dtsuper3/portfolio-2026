export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://deepakthapa.dev').replace(/\/+$/, '');

export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Deepak Thapa',
    givenName: 'Deepak',
    familyName: 'Thapa',
    jobTitle: 'Senior Full-Stack & Next.js Engineer',
    description:
      'Full-Stack Developer and Software Engineer specializing in React, Next.js, TypeScript, Node.js, and Agentic AI solutions.',
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    email: 'mailto:dtsuper3@gmail.com',
    telephone: '+91-7838626816',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'New Delhi',
      addressCountry: 'India',
    },
    sameAs: [
      'https://github.com/dtsuper3',
      'https://www.linkedin.com/in/deepak-thapa-381647148',
      'https://twitter.com/Deepak13307717',
    ],
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'Full Stack Development',
      'Software Engineering',
      'Agentic AI',
      'REST APIs',
      'PostgreSQL',
      'MongoDB',
      'Web Performance Optimization',
      'Technical SEO',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Clinchinfosystems Pvt. Ltd.',
      url: 'http://clinchinfosystems.com/',
    },
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Deepak Thapa Portfolio',
    description:
      'Portfolio of Deepak Thapa, a Full-Stack Web Developer & Software Engineer specialized in React, Next.js, and Agentic AI.',
    publisher: {
      '@type': 'Person',
      name: 'Deepak Thapa',
    },
    inLanguage: 'en-US',
  };
}

export function getProjectsSchema(projects: Array<{ name: string; description: string; url: string; tags: string[]; period?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/#projects-list`,
    name: 'Featured Software Projects by Deepak Thapa',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: project.name,
        description: project.description,
        url: project.url,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        author: {
          '@type': 'Person',
          name: 'Deepak Thapa',
        },
        keywords: project.tags.join(', '),
      },
    })),
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; item: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.item.startsWith('http') ? crumb.item : `${SITE_URL}${crumb.item}`,
    })),
  };
}
