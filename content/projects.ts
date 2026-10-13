/**
 * Case studies. Visuals for each project live in components/art/<slug>.tsx.
 *
 * TODO before launch: years and outcome metrics marked `placeholder: true`
 * are illustrative — replace them with your verified figures.
 */

export const categories = ["All", "Branding", "UI/UX", "Marketing", "Packaging"] as const;
export type Category = Exclude<(typeof categories)[number], "All">;

export type Metric = { value: number; suffix?: string; prefix?: string; label: string };

export type Project = {
  slug: string;
  title: string;
  /** One-line hook used on cards and as the case study subtitle. */
  tagline: string;
  summary: string;
  client: string;
  sector: string;
  year: string;
  role: string;
  categories: Category[];
  services: string[];
  /** Tones used to theme the case study and its cover. */
  theme: { background: string; foreground: string; accent: string };
  problem: { headline: string; body: string };
  research: { body: string; methods: string[]; insights: { title: string; body: string }[] };
  process: { title: string; body: string }[];
  wireframes: { body: string };
  designSystem: {
    body: string;
    colors: { name: string; hex: string; role: string }[];
    typography: { display: string; body: string; note: string };
    principles: string[];
  };
  finalDesign: { body: string; highlights: string[] };
  outcome: { body: string; metrics: Metric[]; placeholder?: boolean };
};

export const projects: Project[] = [
  {
    slug: "ashwheelz",
    title: "Ashwheelz",
    tagline: "A fleet brand built to be recognised at 80 km/h.",
    summary:
      "Corporate identity, fleet livery, merchandise, social presence and the company portfolio for a logistics and contracting business — unified into one system.",
    client: "Ashwheelz",
    sector: "Logistics & General Contracting",
    year: "2025",
    role: "Marketing & Creative Executive",
    categories: ["Branding", "Marketing"],
    services: ["Corporate Fleet Branding", "Brand Identity", "Social Media Marketing", "Portfolio Design", "Corporate Merchandise"],
    theme: { background: "#121212", foreground: "#F4F4F2", accent: "#F1692D" },
    problem: {
      headline: "The company had outgrown its brand.",
      body: "Vehicles, stationery, social channels and client gifts each told a slightly different story. Logo usage drifted from one touchpoint to the next, the sales team had no portfolio to send with a tender, and customer feedback lived in anecdotes rather than data. The operation looked smaller than it really was.",
    },
    research: {
      body: "I started with a full audit of every place the brand appears — on the road, in a client's hands, in their feed and in the inbox — and sat with the sales team to understand what actually wins work.",
      methods: ["Touchpoint audit", "Competitor fleet scan", "Sales team interviews", "Social analytics review"],
      insights: [
        {
          title: "The fleet is the biggest billboard",
          body: "Vehicles are the most-seen media the company owns — seen daily across the city, yet carrying almost no brand story.",
        },
        {
          title: "Consistency beats novelty",
          body: "The logo was fine. What hurt recognition was inconsistent colour, spacing and placement across every touchpoint.",
        },
        {
          title: "Sales needed proof, not photos",
          body: "Proposals went out with loose images. A curated, always-current portfolio would do more for tenders than any ad.",
        },
      ],
    },
    process: [
      { title: "Audit", body: "Catalogued every touchpoint, scored it for consistency and mapped where the brand was leaking." },
      { title: "System", body: "Refined the identity into a strict toolkit — one orange, one typeface family, one grid for print, fleet and social." },
      { title: "Rollout", body: "Livery, business cards, employee IDs, merchandise and client giveaway boxes — produced and quality-checked." },
      { title: "Amplify", body: "Content calendar, social templates, a living company portfolio and a feedback system to close the loop." },
    ],
    wireframes: {
      body: "Livery placement studies, collateral templates and social grid layouts were all resolved in grayscale first — so hierarchy and legibility at distance were proven before colour entered the conversation.",
    },
    designSystem: {
      body: "A deliberately small toolkit that any vendor — printer, vehicle wrapper or social scheduler — can apply without a designer in the room.",
      colors: [
        { name: "Ash Orange", hex: "#F1692D", role: "Signal & accent" },
        { name: "Graphite", hex: "#111111", role: "Primary" },
        { name: "Asphalt", hex: "#2B2B2B", role: "Surfaces" },
        { name: "Concrete", hex: "#F4F4F2", role: "Background" },
      ],
      typography: { display: "Inter Bold", body: "Inter Regular", note: "Tight tracking for headlines; generous size for anything read at a distance." },
      principles: [
        "Orange is a signal, never a background.",
        "Big, simple and readable at 80 km/h.",
        "One grid for print, fleet and social.",
      ],
    },
    finalDesign: {
      body: "A disciplined livery, corporate stationery, employee IDs, merchandise and a social system — all running off one grid and one orange. Behind the scenes, a URL-based customer feedback form and admin dashboard turned delivery feedback into structured data.",
      highlights: [
        "Fleet livery",
        "Business cards & employee IDs",
        "Merchandise & client giveaway boxes",
        "Social media templates",
        "Company portfolio",
        "Feedback form & admin portal",
      ],
    },
    outcome: {
      body: "The brand now shows up the same way on the road, in a client's hands and in their feed. Sales has a living portfolio for tenders, and management reviews structured customer feedback — rated across time, safety, driver, hygiene and service — instead of anecdotes.",
      metrics: [
        { value: 6, label: "Collateral lines redesigned on one system" },
        { value: 5, label: "Service dimensions now tracked in feedback" },
        { value: 1, label: "Click to export every response to Excel" },
      ],
    },
  },
  {
    slug: "sultan-yakhni-pulao",
    title: "Sultan Yakhni Pulao",
    tagline: "Patience, served hot.",
    summary:
      "Restaurant identity, packaging and launch campaign for a Lahore yakhni pulao brand — heritage flavour with a modern, premium finish.",
    client: "Sultan Yakhni Pulao",
    sector: "Food & Restaurant",
    year: "2024",
    role: "Brand & Packaging Designer",
    categories: ["Branding", "Packaging", "Marketing"],
    services: ["Restaurant Branding", "Packaging Design", "Campaign Design", "Social Media Marketing"],
    theme: { background: "#F3EADB", foreground: "#2A1A14", accent: "#B8792A" },
    problem: {
      headline: "Great pulao. Forgettable brand.",
      body: "Yakhni pulao is a crowded, price-driven category where most outlets look the same. Sultan had a recipe worth paying more for — slow-cooked stock, aged rice, family spice — but nothing in the brand gave customers a reason to believe it, and nothing made the box worth remembering.",
    },
    research: {
      body: "I studied how people actually choose pulao in Lahore — at the counter, on delivery apps and through family WhatsApp groups — and what quality cues they look for.",
      methods: ["Competitor visits", "Delivery-app listing audit", "Conversations with regulars", "Packaging teardown"],
      insights: [
        {
          title: "Slow-cooked is the story",
          body: "Customers equate a patient, slow yakhni with quality — yet no competitor was telling that story.",
        },
        {
          title: "The box is the brand",
          body: "On delivery apps the thumbnail and the packaging are the first — and often only — brand experience.",
        },
        {
          title: "Built for family orders",
          body: "Weekend orders are large and shared. Packaging had to stack, seal and travel without leaking.",
        },
      ],
    },
    process: [
      { title: "Position", body: "Defined the brand as royal, but never stiff — heritage cues delivered with modern restraint." },
      { title: "Identity", body: "Designed a crest and seal, a warm serif wordmark and a saffron-and-pomegranate palette." },
      { title: "Packaging", body: "Built a modular system — rice boxes, raita and salad cups, carry bags and a tamper seal." },
      { title: "Launch", body: "Campaign line, posters, menu and a social launch grid anchored on “Patience, served hot.”" },
    ],
    wireframes: {
      body: "Packaging started as dielines and fold studies — testing seal placement, stacking and how the crest reads at thumbnail size before any artwork was applied.",
    },
    designSystem: {
      body: "Warm, heritage-led and restrained: the seal does the heavy lifting so everything else can stay quiet.",
      colors: [
        { name: "Saffron", hex: "#B8792A", role: "Accent & seal" },
        { name: "Pomegranate", hex: "#7A1F1F", role: "Primary" },
        { name: "Ivory", hex: "#F3EADB", role: "Background" },
        { name: "Clove", hex: "#2A1A14", role: "Type" },
      ],
      typography: { display: "High-contrast Serif", body: "Inter", note: "Serif for the voice of heritage; Inter for menus, prices and anything functional." },
      principles: [
        "Heritage cues, modern restraint.",
        "The seal is the signature.",
        "Designed for the delivery bag, not just the counter.",
      ],
    },
    finalDesign: {
      body: "A packaging family that looks as considered as the food tastes, a seal that turns every order into a reveal, and a launch campaign that sells patience as the premium ingredient.",
      highlights: ["Crest & wordmark", "Rice box & cup system", "Tamper seal", "Carry bag", "Launch posters", "Social launch grid"],
    },
    outcome: {
      placeholder: true,
      body: "Sultan now looks like the premium choice it always was. The packaging is photographed and shared before it's opened — turning every order into free, organic reach.",
      metrics: [
        { value: 4, label: "Packaging formats in one system" },
        { value: 24, label: "Launch campaign assets" },
        { value: 1, label: "Signature seal across every touchpoint" },
      ],
    },
  },
  {
    slug: "mealwheelz",
    title: "MealWheelz",
    tagline: "Dinner, ordered faster than you can decide.",
    summary:
      "A restaurant ordering app designed from research to design system — instant reorders, honest pricing and a checkout in three taps.",
    client: "MealWheelz",
    sector: "Food-tech",
    year: "2024",
    role: "UI/UX Designer",
    categories: ["UI/UX"],
    services: ["UI/UX Design", "Mobile App Design", "Design System", "Prototyping"],
    theme: { background: "#ECEEEA", foreground: "#111111", accent: "#0E7C66" },
    problem: {
      headline: "Ordering dinner shouldn't feel like work.",
      body: "Local restaurants were losing orders to clunky menus, surprise fees and checkouts that asked too much. MealWheelz needed an ordering experience simple enough for first-timers and fast enough for regulars — and a design system a small dev team could actually ship.",
    },
    research: {
      body: "I mapped how people decide what to eat, where they hesitate and why they abandon — then benchmarked the leading delivery apps against those moments.",
      methods: ["Competitive teardown", "User interviews", "Checkout task analysis", "Card sorting"],
      insights: [
        {
          title: "Most orders are re-orders",
          body: "Regulars order the same few meals — yet reordering was buried three screens deep in most apps.",
        },
        {
          title: "Surprise fees kill carts",
          body: "Delivery and service fees revealed at checkout were the most-cited reason for abandoning an order.",
        },
        {
          title: "People browse by craving",
          body: "Users think “something spicy” before they think “which restaurant” — discovery had to start there.",
        },
      ],
    },
    process: [
      { title: "Flows", body: "Mapped the five critical journeys: discover, customise, reorder, checkout and track." },
      { title: "Wireframes", body: "Low-fidelity screens tested with users to cut steps and surface pricing early." },
      { title: "System", body: "Tokens, components and patterns built in Figma with variants for every state." },
      { title: "Prototype", body: "High-fidelity, interactive prototype and a developer-ready handoff." },
    ],
    wireframes: {
      body: "Five core flows were wireframed and tested before any visual design. The biggest win came early: moving reorder to the home screen and showing the all-in price on every item card.",
    },
    designSystem: {
      body: "A compact, thumb-first system: one primary action per screen, honest prices everywhere and components with every state designed.",
      colors: [
        { name: "Basil", hex: "#0E7C66", role: "Primary action" },
        { name: "Ink", hex: "#111111", role: "Type" },
        { name: "Paprika", hex: "#F1692D", role: "Offers & alerts" },
        { name: "Cloud", hex: "#F4F5F2", role: "Background" },
      ],
      typography: { display: "Inter Semibold", body: "Inter Regular", note: "A tight 6-step type scale tuned for small screens and fast scanning." },
      principles: [
        "One primary action per screen.",
        "The first price you see is the price you pay.",
        "Thumb-first: key actions live in the bottom third.",
      ],
    },
    finalDesign: {
      body: "Home starts with your cravings and your last order. Item cards show the all-in price. Checkout is three taps, and live tracking replaces “where's my food?” calls with a single, calm screen.",
      highlights: ["Craving-led home", "One-tap reorder", "Item customisation", "Three-tap checkout", "Live order tracking", "Component library"],
    },
    outcome: {
      placeholder: true,
      body: "The result is a complete, developer-ready design system and prototype that removes the friction points users named most — from hidden fees to buried reorders.",
      metrics: [
        { value: 3, label: "Taps from cart to confirmed order" },
        { value: 40, suffix: "+", label: "Reusable components with all states" },
        { value: 5, label: "Core flows tested and prototyped" },
      ],
    },
  },
  {
    slug: "digivora",
    title: "Digivora",
    tagline: "Growth, with an appetite.",
    summary:
      "Logo, identity system and website concept for a digital marketing agency — built on geometry, a confident voice and results-first storytelling.",
    client: "Digivora",
    sector: "Digital Marketing Agency",
    year: "2023",
    role: "Brand Designer",
    categories: ["Branding", "UI/UX"],
    services: ["Logo Design", "Brand Identity", "Website Concept"],
    theme: { background: "#0B0B0F", foreground: "#F7F7F5", accent: "#6D5BFF" },
    problem: {
      headline: "Every agency promises growth. Few look like they mean it.",
      body: "Digivora was entering a market full of agencies selling “growth” with the same gradients, stock rockets and buzzwords. It needed an identity that felt sharp, credible and hungry — and a website that let results do the talking.",
    },
    research: {
      body: "I audited how regional and global agencies present themselves, ran a positioning workshop with the founders and mapped the questions prospects ask before they reply to an email.",
      methods: ["Agency brand audit", "Founder workshop", "Audience mapping", "Naming analysis"],
      insights: [
        {
          title: "A sea of the same blue",
          body: "Agency brands cluster around identical gradients — dark, high-contrast restraint stands out immediately.",
        },
        {
          title: "The website is the pitch",
          body: "Prospects check the website before they answer a cold email. It had to prove capability in seconds.",
        },
        {
          title: "The name is the idea",
          body: "Digital + voracious. The appetite in the name was the brand's most ownable asset.",
        },
      ],
    },
    process: [
      { title: "Position", body: "Defined Digivora as the hungry, numbers-first partner for ambitious brands." },
      { title: "Explore", body: "Sketched and tested dozens of marks — from monograms to abstract growth forms." },
      { title: "Construct", body: "Built the final mark on a strict circle-and-square grid for perfect reproduction." },
      { title: "Express", body: "Extended into stationery, social templates and a results-first website concept." },
    ],
    wireframes: {
      body: "The mark was constructed on a geometric grid; the website concept was wireframed around one idea — show the results before the adjectives.",
    },
    designSystem: {
      body: "Geometry over decoration. One bold violet used sparingly against deep neutrals, with Inter carrying a confident, editorial voice.",
      colors: [
        { name: "Volt Violet", hex: "#6D5BFF", role: "Signature" },
        { name: "Void", hex: "#0B0B0F", role: "Primary" },
        { name: "Lilac Mist", hex: "#C9C2FF", role: "Support" },
        { name: "Paper", hex: "#F7F7F5", role: "Background" },
      ],
      typography: { display: "Inter Display Semibold", body: "Inter Regular", note: "Large, tightly tracked headlines; numbers set big — results are the hero." },
      principles: [
        "Geometry over decoration.",
        "One bold colour, used sparingly.",
        "Results first, adjectives last.",
      ],
    },
    finalDesign: {
      body: "A geometric mark that scales from favicon to billboard, a monochrome-first identity with a single electric accent, and a website concept that leads with case results.",
      highlights: ["Primary logo & mark", "Construction grid", "Stationery", "Social templates", "Website concept", "Brand guidelines"],
    },
    outcome: {
      placeholder: true,
      body: "Digivora launched with an identity that looks established from day one — distinct from the category, consistent across every channel and ready to scale.",
      metrics: [
        { value: 24, label: "Logo concepts explored" },
        { value: 3, label: "Lockups delivered for every context" },
        { value: 6, label: "Website pages concepted" },
      ],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}
