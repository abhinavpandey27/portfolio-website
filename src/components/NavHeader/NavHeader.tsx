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
          <span className={`${styles.name} body-medium`}>{siteConfig.name}</span>
          <span className={`${styles.location} body-medium`}>Now in {siteConfig.location}</span>
        </div>

        {/* Center: Navigation Links */}
        <nav className={styles.nav}>
          <button
            onClick={() => scrollToSection('work')}
            className={`${styles.navLink} body-medium ${activeSection === 'work' ? styles.active : ''}`}
            aria-current={activeSection === 'work' ? 'page' : undefined}
          >
            ☩ Work
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className={`${styles.navLink} body-medium ${activeSection === 'about' ? styles.active : ''}`}
            aria-current={activeSection === 'about' ? 'page' : undefined}
          >
            ☩ About
          </button>
        </nav>

        {/* Right: Social Links & Menu */}
        <div className={styles.right}>
          <div className={styles.socialLinks}>
            <div className={styles.socialColumn}>
              <a
                href={siteConfig.socialLinks.find(l => l.platform.toLowerCase() === 'twitter')?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialLink} body-medium`}
              >
                Twitter ↗
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className={`${styles.socialLink} body-medium`}
              >
                E-Mail ↗
              </a>
            </div>
            <div className={styles.socialColumn}>
              <a
                href={siteConfig.socialLinks.find(l => l.platform.toLowerCase() === 'linkedin')?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialLink} body-medium`}
              >
                LinkedIn ↗
              </a>
              {siteConfig.cvFile && (
                <a
                  href={siteConfig.cvFile.url}
                  download
                  className={`${styles.socialLink} body-medium`}
                >
                  Resume ↓
                </a>
              )}
            </div>
          </div>
          <button className={`${styles.menuButton} button-text-large`} aria-label="Open menu">
            MENU
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8H14M8 2L14 8L8 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
