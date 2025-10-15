export default function Home() {
  return (
    <main style={{ padding: 'var(--space-120)', maxWidth: '1440px', margin: '0 auto' }}>
      <h1 className="heading-1" style={{ marginBottom: 'var(--space-24)' }}>
        Abhinav Pandey
      </h1>
      <p className="heading-4" style={{ color: 'var(--color-label-secondary)', marginBottom: 'var(--space-64)' }}>
        Product Designer
      </p>
      <p className="body-large" style={{ maxWidth: '640px' }}>
        Portfolio website coming soon. Building a design-first experience with Next.js, Payload CMS, and Cloudflare Workers.
      </p>
    </main>
  );
}
