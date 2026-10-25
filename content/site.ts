/**
 * Public site URL: explicit env var first, then Vercel's production domain
 * (picks up a custom domain automatically), then local dev.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/**
 * Single source of truth for personal details.
 *
 * TODO: replace the LinkedIn and Instagram URLs below with your profiles.
 */
export const siteConfig = {
  name: "Sheheryar Chaudhary",
  firstName: "Sheheryar",
  initials: "SC",
  role: "Marketing & Creative Executive",
  roles: [
    "Marketing & Creative Executive",
    "Graphic Designer",
    "UI/UX Designer",
    "Brand Strategist",
  ],
  tagline: "Creating Brands, Digital Experiences & Marketing That Drive Results.",
  /** Short titles for the hero's rotating serif line. */
  heroRoles: ["Creative Executive", "Graphic Designer", "UI/UX Designer", "Brand Strategist"],
  /**
   * Cut-out portrait for the hero (transparent PNG in /public), e.g.
   * { src: "/portrait.png", width: 1200, height: 1500 }. While null, the hero
   * centres on the 3D clay sculpture instead.
   */
  portrait: null as null | { src: string; width: number; height: number },
  /** Brands from the case studies, shown as wordmarks under the hero. */
  brands: [
    { name: "Ashwheelz", logo: { src: "/brands/ashwheelz-logo.webp", width: 963, height: 831 } },
    { name: "Sultan Yakhni Pulao", logo: { src: "/brands/sultan-logo.webp", width: 150, height: 150 } },
    { name: "MealWheelz", logo: { src: "/brands/mealwheelz-logo.svg", width: 120, height: 80 } },
    { name: "Digivora", logo: null },
  ] as { name: string; logo: { src: string; width: number; height: number } | null }[],
  description:
    "Sheheryar Chaudhary is a Lahore-based Marketing & Creative Executive, graphic designer, UI/UX designer and brand strategist who combines branding, product design and marketing strategy to build brands that perform.",
  keywords: [
    "Sheheryar Chaudhary",
    "Marketing & Creative Executive",
    "Graphic Designer Lahore",
    "UI/UX Designer Pakistan",
    "Brand Strategist",
    "Brand Identity Design",
    "Packaging Design",
    "Social Media Marketing",
    "Creative Direction",
    "Portfolio",
  ],
  location: "Lahore, Pakistan",
  timeZone: "Asia/Karachi",
  timeZoneLabel: "PKT",
  url: siteUrl,
  email: "sheheryarchaudhary03@gmail.com",
  resume: {
    pdf: "/resume.pdf",
    page: "/resume",
  },
  currently: {
    role: "Marketing & Creative Executive",
    company: "Ashwheelz",
  },
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "GitHub", href: "https://github.com/sheheryarchaudhary03" },
  ],
} as const;

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
] as const;
