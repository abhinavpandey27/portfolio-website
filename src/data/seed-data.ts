export const siteConfigData = {
  name: 'Abhinav Pandey',
  location: 'Mumbai, India',
  email: 'abhinavpandey027@gmail.com',
  socialLinks: [
    { platform: 'Twitter', url: 'https://twitter.com/abhinavpandey' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/abhinavpandey' },
    { platform: 'GitHub', url: 'https://github.com/abhinavpandey27' },
  ],
  cvFile: {
    url: '/cv/abhinav-pandey-resume.pdf',
  },
};

export const aboutSectionData = {
  bioLeft: '7+ years of experience in product and service design. I worked in both big corporations and small startups, always striving to turn complex things into intuitive and thoughtful ones.',
  bioRight: 'Did 0→1 for a new player-card-based fantasy system. Designed, tested, and shipped core UX and final UI under high ambiguity with rapid iteration. Balanced gamification, education, and monetization through a clean, mobile-first design approach that scaled across drops, fantasy, and crafting flows.',
  carouselImages: [
    { url: '/images/about-1.jpg', alt: 'Design work 1', width: 452, height: 565 },
    { url: '/images/about-2.jpg', alt: 'Design work 2', height: 505 },
    { url: '/images/about-3.jpg', alt: 'Design work 3', width: 530, height: 607 },
    { url: '/images/about-4.jpg', alt: 'Design work 4', width: 370, height: 463 },
  ],
};

export const projectsData = [
  {
    id: 1,
    title: 'Striker',
    subtitle: 'NFT-based Cricket Fantasy Game',
    slug: 'striker',
    description: 'Did 0→1 for a new player-card-based fantasy system. Designed, tested, and shipped core UX and final UI under high ambiguity with rapid iteration. Balanced gamification, education, and monetization through a clean, mobile-first design approach that scaled across drops, fantasy, and crafting flows.',
    role: 'Product Designer II',
    team: '2 Designers, 2 PMs, 1 Program Manager, 1 Engineering Manager, 5 SDEs and 2 SDETs',
    timeline: 'Q2 2022 - Q4 2022',
    categories: ['Real Money Gaming', 'Fantasy Sports', 'Web3', 'NFT'],
    outcomes: ['25K Daily Active Users', '1 Million USD Traded Volume'],
    heroImage: { url: '/images/striker-hero.jpg', alt: 'Striker project hero' },
    backgroundColor: '#090e03',
    carouselImages: [
      { url: '/images/striker-1.jpg', alt: 'Striker screenshot 1', width: 452, height: 565 },
      { url: '/images/striker-2.jpg', alt: 'Striker screenshot 2', height: 505 },
      { url: '/images/striker-3.jpg', alt: 'Striker screenshot 3', width: 530, height: 607 },
      { url: '/images/striker-4.jpg', alt: 'Striker screenshot 4', width: 370, height: 463 },
    ],
    icon: '/images/striker-icon.png',
    featured: true,
    order: 1,
    status: 'published',
  },
];

export const featuredCaseStudy = {
  title: 'STRIKER',
  subtitle: 'Designing for 0→1 of a new player-card-based fantasy system',
  imageUrl: '/images/striker-preview.jpg',
  imageAlt: 'Striker project preview',
};
