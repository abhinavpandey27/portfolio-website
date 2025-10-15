import NavHeader from '@/components/NavHeader/NavHeader';

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
          <p className="body-large" style={{ maxWidth: '640px' }}>
            Portfolio website coming soon. Building a design-first experience with Next.js, Payload CMS, and Cloudflare Workers.
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
