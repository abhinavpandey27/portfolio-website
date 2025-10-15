import NavHeader from '@/components/NavHeader/NavHeader';
import AutoScrollCarousel from '@/components/AutoScrollCarousel/AutoScrollCarousel';
import CaseStudyCard from '@/components/CaseStudyCard/CaseStudyCard';
import WorkSection from '@/components/WorkSection/WorkSection';
import AboutSection from '@/components/AboutSection/AboutSection';
import { siteConfigData, aboutSectionData, projectsData, featuredCaseStudy } from '@/data/seed-data';
import styles from './page.module.css';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abhinav Pandey',
    jobTitle: 'Product Designer',
    url: 'https://portfolio-website.pages.dev',
    sameAs: [
      'https://twitter.com/abhinavpandey',
      'https://linkedin.com/in/abhinavpandey',
      'https://github.com/abhinavpandey27',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressCountry: 'India',
    },
    alumniOf: 'Product Designer',
    description: '7+ years of experience in product and service design. Currently reinventing techno-events at Reve.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <section className={styles.heroSection} id="main-content">
        <div className={styles.heroContainer}>
          <NavHeader siteConfig={siteConfigData} activeSection="work" />
          
          <div className={styles.heroContent}>
            <div className={styles.bioText}>
              <h1 className="heading-4">
                Abhinav Pandey is a Product Designer, passionate about creating wholesome experiences. Currently reinventing techno-events at Reve.
              </h1>
            </div>
            
            <CaseStudyCard
              title={featuredCaseStudy.title}
              subtitle={featuredCaseStudy.subtitle}
              imageUrl={featuredCaseStudy.imageUrl}
              imageAlt={featuredCaseStudy.imageAlt}
            />
          </div>
          
          <div className={styles.heroCarousel}>
            <AutoScrollCarousel images={aboutSectionData.carouselImages} />
          </div>
        </div>
      </section>

      {/* Work Sections */}
      {projectsData.filter(p => p.status === 'published').map((project) => (
        <WorkSection key={project.id} project={project} />
      ))}

      {/* About Section */}
      <AboutSection
        bioLeft={aboutSectionData.bioLeft}
        bioRight={aboutSectionData.bioRight}
        carouselImages={aboutSectionData.carouselImages}
        socialLinks={siteConfigData.socialLinks}
        email={siteConfigData.email}
        cvUrl={siteConfigData.cvFile.url}
      />
    </>
  );
}
