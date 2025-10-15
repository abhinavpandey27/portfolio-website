'use client';

import { useEffect, useRef, useState } from 'react';
import WorkSectionHeader from './WorkSectionHeader';
import AutoScrollCarousel from '../AutoScrollCarousel/AutoScrollCarousel';
import styles from './WorkSection.module.css';

interface WorkSectionProps {
  project: {
    title: string;
    subtitle: string;
    description: string;
    icon?: string;
    team?: string;
    categories: string[];
    role: string;
    timeline: string;
    outcomes?: string[];
    backgroundColor: string;
    carouselImages: Array<{ url: string; alt: string; width?: number; height?: number }>;
  };
}

export default function WorkSection({ project }: WorkSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          document.body.style.backgroundColor = project.backgroundColor;
          document.body.style.transition = 'background-color var(--transition-smooth) var(--ease-default)';
        } else {
          setIsActive(false);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [project.backgroundColor]);

  return (
    <section 
      ref={sectionRef}
      className={styles.section}
      data-section="work"
      data-active={isActive}
      style={{ backgroundColor: project.backgroundColor }}
    >
      <div className={styles.wrapper}>
        <WorkSectionHeader
          icon={project.icon}
          title={project.title}
          subtitle={project.subtitle}
          description={project.description}
          team={project.team}
          categories={project.categories}
          role={project.role}
          timeline={project.timeline}
          outcomes={project.outcomes}
        />
        
        <div className={styles.carouselWrapper}>
          <AutoScrollCarousel images={project.carouselImages} />
        </div>
      </div>
    </section>
  );
}
