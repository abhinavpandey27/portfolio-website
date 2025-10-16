'use client'

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
<h2 style={{ color: '#333', marginBottom: '1rem' }}>Full Integration In Progress</h2>
<p style={{ color: '#666', marginBottom: '2rem' }}>
The Payload CMS admin interface is being configured. R2 storage and authentication are now set up.
</p>

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
<div style={{ padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
  <h3 style={{ color: '#1a1a1a', marginBottom: '0.5rem' }}>📁 Collections</h3>
<ul style={{ color: '#666', margin: 0, paddingLeft: '1rem' }}>
    <li><strong>Projects</strong> - Portfolio case studies</li>
                <li><strong>Media</strong> - Images and file uploads (R2)</li>
    <li><strong>Users</strong> - Admin authentication</li>
</ul>
</div>

<div style={{ padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
<h3 style={{ color: '#1a1a1a', marginBottom: '0.5rem' }}>🌐 Globals</h3>
<ul style={{ color: '#666', margin: 0, paddingLeft: '1rem' }}>
<li><strong>SiteConfig</strong> - Site-wide settings</li>
  <li><strong>AboutSection</strong> - About page content</li>
              </ul>
</div>

<div style={{ padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
<h3 style={{ color: '#1a1a1a', marginBottom: '0.5rem' }}>🗄️ Storage & Auth</h3>
<ul style={{ color: '#666', margin: 0, paddingLeft: '1rem' }}>
<li><strong>R2 Storage</strong> - Configured</li>
  <li><strong>D1 Database</strong> - Ready</li>
                <li><strong>OAuth</strong> - Pending setup</li>
</ul>
</div>
</div>

<div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#e8f5e8', borderRadius: '4px', border: '1px solid #4caf50' }}>
<h3 style={{ color: '#2e7d32', marginBottom: '0.5rem' }}>✅ Progress Made</h3>
<ul style={{ color: '#2e7d32', margin: '0.5rem 0 0 1rem' }}>
<li>R2 storage adapter configured</li>
  <li>Image variants (thumbnail, card, large) set up</li>
              <li>WebP conversion with 85% quality</li>
  <li>5MB file size limit</li>
<li>API routes ready for data operations</li>
</ul>
</div>
</div>
</div>
</div>
)
}
