'use client';

import { useState, useEffect } from 'react';
import styles from './NavHeader.module.css';

interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

interface SiteConfig {
  name: string;
  location: string;
  email: string;
  socialLinks: SocialLink[];
  cvFile?: {
    url: string;
  };
}

interface NavHeaderProps {
  siteConfig: SiteConfig;
  activeSection?: string;
}

export default function NavHeader({ siteConfig, activeSection }: NavHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Left: Name & Location */}
        <div className={styles.left}>
          <span className={`${styles.name} body-medium-bold`}>{siteConfig.name}</span>
          <span className={`${styles.location} body-small`}>{siteConfig.location}</span>
        </div>

        {/* Center: Navigation Links */}
        <nav className={styles.nav}>
          <button
            onClick={() => scrollToSection('work')}
            className={`${styles.navLink} label-large ${activeSection === 'work' ? styles.active : ''}`}
            aria-current={activeSection === 'work' ? 'page' : undefined}
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className={`${styles.navLink} label-large ${activeSection === 'about' ? styles.active : ''}`}
            aria-current={activeSection === 'about' ? 'page' : undefined}
          >
            About
          </button>
        </nav>

        {/* Right: Social Links & CV */}
        <div className={styles.right}>
          <div className={styles.socialLinks}>
            {siteConfig.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialLink} label-small`}
                aria-label={link.label || link.platform}
              >
                {link.platform}
              </a>
            ))}
          </div>
          {siteConfig.cvFile && (
            <a
              href={siteConfig.cvFile.url}
              download
              className={`${styles.cvButton} button-text-large`}
              aria-label="Download CV"
            >
              CV
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
