import NavHeader from '@/components/NavHeader/NavHeader';
import AutoScrollCarousel from '@/components/AutoScrollCarousel/AutoScrollCarousel';
import CaseStudyCard from '@/components/CaseStudyCard/CaseStudyCard';
import styles from './page.module.css';

const mockCarouselImages = [
  { url: '/images/carousel-1.jpg', alt: 'Project image 1', width: 452, height: 565 },
  { url: '/images/carousel-2.jpg', alt: 'Project image 2', height: 505 },
  { url: '/images/carousel-3.jpg', alt: 'Project image 3', width: 530, height: 607 },
  { url: '/images/carousel-4.jpg', alt: 'Project image 4', width: 370, height: 463 },
];

const mockSiteConfig = {
  name: 'Abhinav Pandey',
  location: 'Mumbai, India',
  email: 'contact@example.com',
  socialLinks: [
    { platform: 'LinkedIn', url: 'https://linkedin.com' },
    { platform: 'Twitter', url: 'https://twitter.com' },
    { platform: 'GitHub', url: 'https://github.com' },
  ],
  cvFile: {
    url: '/cv.pdf',
  },
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <NavHeader siteConfig={mockSiteConfig} activeSection="work" />
          
          <div className={styles.heroContent}>
            <div className={styles.bioText}>
              <h1 className="heading-4">
                Abhinav Pandey is a Product Designer, passionate about creating wholesome experiences. Currently reinventing techno-events at Reve.
              </h1>
            </div>
            
            <CaseStudyCard
              title="STRIKER"
              subtitle="Designing for 0→1 of a new player-card-based fantasy system"
              imageUrl="/images/striker-preview.jpg"
              imageAlt="Striker project preview"
            />
          </div>
          
          <div className={styles.heroCarousel}>
            <AutoScrollCarousel images={mockCarouselImages} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main style={{ padding: 'var(--space-120)', maxWidth: '1440px', margin: '0 auto', minHeight: '100vh' }}>
        <section id="work" style={{ marginBottom: 'var(--space-160)' }}>
          <h2 className="heading-2">Work Section</h2>
          <p className="body-large" style={{ color: 'var(--color-label-secondary)' }}>
            Work sections coming soon...
          </p>
        </section>

        <section id="about" style={{ marginTop: 'var(--space-160)', paddingTop: 'var(--space-80)' }}>
          <h2 className="heading-2" style={{ marginBottom: 'var(--space-24)' }}>
            About
          </h2>
          <p className="body-large" style={{ maxWidth: '640px', color: 'var(--color-label-secondary)' }}>
            More content coming soon...
          </p>
        </section>
      </main>
    </>
  );
}
