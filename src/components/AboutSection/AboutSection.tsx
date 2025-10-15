import AutoScrollCarousel from '../AutoScrollCarousel/AutoScrollCarousel';
import styles from './AboutSection.module.css';

interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

interface AboutSectionProps {
  bioLeft: string;
  bioRight: string;
  carouselImages: Array<{ url: string; alt: string; width?: number; height?: number }>;
  socialLinks: SocialLink[];
  email: string;
  cvUrl?: string;
}

export default function AboutSection({
  bioLeft,
  bioRight,
  carouselImages,
  socialLinks,
  email,
  cvUrl,
}: AboutSectionProps) {
  return (
    <section className={styles.section} id="about">
      <div className={styles.container}>
        {/* Top: Bio Text + Menu Button */}
        <div className={styles.top}>
          <div className={styles.bioContainer}>
            <p className={`${styles.bioLeft} heading-4`}>{bioLeft}</p>
            <p className={`${styles.bioRight} body-large`} style={{ color: 'var(--color-label-secondary)' }}>
              {bioRight}
            </p>
          </div>
          <button className={styles.menuButton}>
            <span className="button-text-large">MENU</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8H14M8 2L14 8L8 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Middle: Carousel */}
        <div className={styles.carouselSection}>
          <AutoScrollCarousel images={carouselImages} />
        </div>

        {/* Bottom: Colophon, Thank You, Social Links */}
        <div className={styles.bottom}>
          <div className={styles.footerContent}>
            <div className={styles.footerColumn}>
              <span className={`${styles.footerLabel} body-medium`}>Colophon</span>
              <p className={`${styles.footerText} body-medium`}>
                The font used on this site is our custom creation, DBCo. Metaphor. Our frontend code is open-sourced and can be found here. We utilize Nuxt/Vue 3 and Sanity to bring this site to life.
              </p>
            </div>
            <div className={styles.footerColumn}>
              <span className={`${styles.footerLabel} body-medium`}>Thank You</span>
              <p className={`${styles.footerText} body-medium`}>
                The font used on this site is our custom creation, DBCo. Metaphor. Our frontend code is open-sourced and can be found here. We utilize Nuxt/Vue 3 and Sanity to bring this site to life.
              </p>
            </div>
          </div>
          
          <div className={styles.socialLinks}>
            <div className={styles.socialColumn}>
              <a href={socialLinks.find(l => l.platform.toLowerCase() === 'twitter')?.url || '#'} target="_blank" rel="noopener noreferrer" className={`${styles.socialLink} body-medium`}>
                Twitter ↗
              </a>
              <a href={`mailto:${email}`} className={`${styles.socialLink} body-medium`}>
                E-Mail ↗
              </a>
            </div>
            <div className={styles.socialColumn}>
              <a href={socialLinks.find(l => l.platform.toLowerCase() === 'linkedin')?.url || '#'} target="_blank" rel="noopener noreferrer" className={`${styles.socialLink} body-medium`}>
                LinkedIn ↗
              </a>
              {cvUrl && (
                <a href={cvUrl} download className={`${styles.socialLink} body-medium`}>
                  Resume ↓
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
