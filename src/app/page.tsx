import NavHeader from '@/components/NavHeader/NavHeader';
import AutoScrollCarousel from '@/components/AutoScrollCarousel/AutoScrollCarousel';

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
      <NavHeader siteConfig={mockSiteConfig} activeSection="work" />
      
      <main style={{ padding: 'var(--space-120)', maxWidth: '1440px', margin: '0 auto', minHeight: '200vh' }}>
        <section id="work" style={{ marginBottom: 'var(--space-160)' }}>
          <h1 className="heading-1" style={{ marginBottom: 'var(--space-24)' }}>
            Abhinav Pandey
          </h1>
          <p className="heading-4" style={{ color: 'var(--color-label-secondary)', marginBottom: 'var(--space-64)' }}>
            Product Designer
          </p>
          <p className="body-large" style={{ maxWidth: '640px', marginBottom: 'var(--space-64)' }}>
            Portfolio website coming soon. Building a design-first experience with Next.js, Payload CMS, and Cloudflare Workers.
          </p>
          
          {/* Carousel Demo */}
          <AutoScrollCarousel images={mockCarouselImages} />
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
