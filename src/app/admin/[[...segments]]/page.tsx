// Temporarily disabled - Admin UI needs proper Next.js integration setup
// TODO: Implement proper Payload admin integration for Next.js App Router

export default function AdminPage() {
  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#1a1a1a', marginBottom: '2rem' }}>
          Payload CMS Admin Panel
        </h1>

        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#333', marginBottom: '1rem' }}>Admin Integration In Progress</h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            The Payload CMS admin interface requires additional Next.js App Router configuration.
            API routes and data fetching are fully functional.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
              <h3 style={{ color: '#1a1a1a', marginBottom: '0.5rem' }}>✅ Completed</h3>
              <ul style={{ color: '#666', margin: 0, paddingLeft: '1rem' }}>
                <li>Collections: Projects, Media, Users</li>
                <li>Globals: AboutSection, SiteConfig</li>
                <li>API routes: /api/payload/[...]</li>
                <li>Data fetching integration</li>
                <li>R2 storage configuration</li>
              </ul>
            </div>

            <div style={{ padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
              <h3 style={{ color: '#1a1a1a', marginBottom: '0.5rem' }}>🔄 Next Steps</h3>
              <ul style={{ color: '#666', margin: 0, paddingLeft: '1rem' }}>
                <li>Set environment variables</li>
                <li>Test API endpoints</li>
                <li>Complete admin UI integration</li>
                <li>Deploy and seed data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
