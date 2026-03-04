export interface Project {
  name: string;
  description: string;
  language: string;
  url: string;
  tags: string[];
  period: string;
}

export interface Experience {
  role: string;
  company: string;
  url: string;
  period: string;
}

export interface TechCategory {
  label: string;
  items: string[];
}
