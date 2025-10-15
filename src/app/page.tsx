import NavHeader from '@/components/NavHeader/NavHeader';
import AutoScrollCarousel from '@/components/AutoScrollCarousel/AutoScrollCarousel';
import CaseStudyCard from '@/components/CaseStudyCard/CaseStudyCard';
import WorkSection from '@/components/WorkSection/WorkSection';
import styles from './page.module.css';

const mockCarouselImages = [
  { url: '/images/carousel-1.jpg', alt: 'Project image 1', width: 452, height: 565 },
  { url: '/images/carousel-2.jpg', alt: 'Project image 2', height: 505 },
  { url: '/images/carousel-3.jpg', alt: 'Project image 3', width: 530, height: 607 },
  { url: '/images/carousel-4.jpg', alt: 'Project image 4', width: 370, height: 463 },
];

const mockProject = {
  title: 'Striker',
  subtitle: 'NFT-based Cricket Fantasy Game',
  description: 'Did 0→1 for a new player-card-based fantasy system. Designed, tested, and shipped core UX and final UI under high ambiguity with rapid iteration. Balanced gamification, education, and monetization through a clean, mobile-first design approach that scaled across drops, fantasy, and crafting flows.',
  icon: '/images/striker-icon.png',
  team: '2 Designers, 2 PMs, 1 Program Manager, 1 Engineering Manager, 5 SDEs and 2 SDETs',
  categories: ['Real Money Gaming', 'Fantasy Sports', 'Web3', 'NFT'],
  role: 'Product Designer II',
  timeline: 'Q2 2022 - Q4 2022',
  outcomes: ['25K Daily Active Users', '1 Million USD Traded Volume'],
  backgroundColor: '#090e03',
  carouselImages: mockCarouselImages,
};

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

      {/* Work Section */}
      <WorkSection project={mockProject} />

      {/* About Section */}
      <section id="about" style={{ 
        minHeight: '100vh', 
        padding: 'var(--space-120)', 
        backgroundColor: 'var(--color-bg-shell)',
        transition: 'background-color var(--transition-smooth) var(--ease-default)'
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <h2 className="heading-2" style={{ marginBottom: 'var(--space-24)' }}>
            About
          </h2>
          <p className="body-large" style={{ maxWidth: '640px', color: 'var(--color-label-secondary)' }}>
            More content coming soon...
          </p>
        </div>
      </section>
    </>
  );
}
