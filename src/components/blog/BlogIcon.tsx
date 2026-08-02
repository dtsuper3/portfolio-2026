'use client';

import React from 'react';
import * as HeroIcons from '@heroicons/react/24/outline';

interface BlogIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function BlogIcon({ name, className = 'w-4 h-4', size = 16 }: BlogIconProps) {
  const IconComponent = HeroIcons[name as keyof typeof HeroIcons] as React.ComponentType<React.SVGProps<SVGSVGElement>>;
  if (!IconComponent) {
    const Fallback = HeroIcons.DocumentTextIcon;
    return <Fallback className={className} width={size} height={size} />;
  }
  return <IconComponent className={className} width={size} height={size} />;
}
