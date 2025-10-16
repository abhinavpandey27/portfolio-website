import NavHeader from '@/components/NavHeader/NavHeader';
import AutoScrollCarousel from '@/components/AutoScrollCarousel/AutoScrollCarousel';
import WorkSection from '@/components/WorkSection/WorkSection';
import AboutSection from '@/components/AboutSection/AboutSection';
import {
  getProjects,
  getSiteConfig,
  getAboutSection,
  type PayloadProject,
  type PayloadSiteConfig,
  type PayloadAboutSection,
} from '@/lib/payload';
import styles from './page.module.css';

// Temporary type definitions until Payload generates them
interface Project {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  role: string;
  team: string;
  timeline: string;
  categories: string[];
  outcomes: string[];
  heroImage?: { url: string; alt?: string };
  backgroundColor: string;
  carouselImages: Array<{ image?: { url: string; alt?: string } }>;
  featured: boolean;
  order: number;
  status: string;
}

interface SocialLinkData {
  platform: string;
  url: string;
  label?: string;
}

const mapCategories = (categories?: PayloadProject['categories']) => {
  if (!categories) return []
  return categories
    .map((category) => {
      if (!category) return null
      if (typeof category === 'string') return category
      return category.name ?? null
    })
    .filter((value): value is string => typeof value === 'string' && value.length > 0)
}

const mapProjectCarouselImages = (
  carouselImages?: PayloadProject['carouselImages'],
  title?: string,
) => {
  if (!carouselImages) return []
  const mapped = carouselImages
    .map((item) => {
      if (!item?.image?.url) return null
      return {
        image: {
          url: item.image.url,
          alt: item.image.alt || title || 'Project image',
        },
      }
    })
    .filter(Boolean)

  return mapped as Array<{ image: { url: string; alt?: string } }>
}

const mapAboutCarouselImages = (carouselImages?: PayloadAboutSection['imageCarousel']) => {
  if (!carouselImages) return []
  const mapped = carouselImages
    .map((item) => {
      if (!item?.image?.url) return null
      return {
        url: item.image.url,
        alt: item.image.alt || 'About carousel image',
      }
    })
    .filter(Boolean)

  return mapped as Array<{ url: string; alt: string }>
}

const normalizeProject = (project: PayloadProject): Project => {
  return {
    id: project.id || project.slug || crypto.randomUUID(),
    title: project.title || 'Untitled project',
    subtitle: project.subtitle || '',
    slug: project.slug || '',
    description: project.description || '',
    role: project.role || '',
    team: project.team || '',
    timeline: project.timeline || '',
    categories: mapCategories(project.categories),
    outcomes: (project.outcomes || [])
      .map((item) => (typeof item === 'string' ? item : item?.text || null))
      .filter((text): text is string => Boolean(text)),
    heroImage: project.heroImage?.url
      ? { url: project.heroImage.url, alt: project.heroImage.alt }
      : undefined,
    backgroundColor: project.backgroundColor || '#0b0c11',
    carouselImages: mapProjectCarouselImages(project.carouselImages, project.title),
    featured: Boolean(project.featured),
    order: Number.isFinite(project.order) ? Number(project.order) : 0,
    status: project.status || 'draft',
  }
}

// Transform Payload project data to match component expectations
function transformProjectForWorkSection(project: Project) {
  return {
    ...project,
    carouselImages: project.carouselImages
      .filter(item => item.image)
      .map(item => ({
        url: item.image!.url,
        alt: item.image!.alt || project.title,
      })),
  };
}

export default async function Home() {
  // Fetch data from Payload CMS
  const [projectsResult, siteConfig, aboutSection] = await Promise.all([
    getProjects(),
    getSiteConfig(),
    getAboutSection(),
  ]);

  // Transform Payload data to match component expectations
  const rawProjects = (projectsResult.docs || []) as PayloadProject[];
  const projectsData: Project[] = rawProjects.map(normalizeProject);

  const typedSiteConfig = siteConfig as PayloadSiteConfig;
  const mappedSocialLinks: SocialLinkData[] = Array.isArray(typedSiteConfig.socialLinks)
    ? (typedSiteConfig.socialLinks
        .map((link) => {
          if (!link || typeof link !== 'object') return null;
          const platform = 'platform' in link && typeof link.platform === 'string' ? link.platform : 'custom';
          const url = 'url' in link && typeof link.url === 'string' ? link.url : '';
          if (!url) return null;
          const label = 'label' in link && typeof link.label === 'string' ? link.label : undefined;
          return { platform, url, label } as SocialLinkData;
        })
        .filter(Boolean) as SocialLinkData[])
    : [];
  const siteConfigData = {
    name: typedSiteConfig.name || 'Abhinav Pandey',
    location: typedSiteConfig.location || 'Mumbai, India',
    email: typedSiteConfig.email || 'abhinavpandey027@gmail.com',
    socialLinks: mappedSocialLinks,
    cvFile: {
      url:
        typedSiteConfig.cvFile && typedSiteConfig.cvFile.url
          ? typedSiteConfig.cvFile.url
          : '/cv/abhinav-pandey-resume.pdf',
    },
  };

  const typedAboutSection = aboutSection as PayloadAboutSection;
  const aboutSectionData = {
    bioLeft:
      typedAboutSection.bioLeft ||
      '7+ years of experience in product and service design. I worked in both big corporations and small startups, always striving to turn complex things into intuitive and thoughtful ones.',
    bioRight:
      typedAboutSection.bioRight ||
      'Did 0→1 for a new player-card-based fantasy system. Designed, tested, and shipped core UX and final UI under high ambiguity with rapid iteration. Balanced gamification, education, and monetization through a clean, mobile-first design approach that scaled across drops, fantasy, and crafting flows.',
    carouselImages: mapAboutCarouselImages(typedAboutSection.imageCarousel),
  };
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

            {/* Featured project will be added back when CMS is connected */}
          </div>
          
          <div className={styles.heroCarousel}>
            <AutoScrollCarousel images={aboutSectionData.carouselImages} />
          </div>
        </div>
      </section>

      {/* Work Sections */}
      {projectsData.filter((p: Project) => p.status === 'published').map((project: Project) => (
        <WorkSection key={project.id} project={transformProjectForWorkSection(project)} />
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
