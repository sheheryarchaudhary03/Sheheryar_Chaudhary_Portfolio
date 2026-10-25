/**
 * Case studies. Visuals for each project live in components/art/<slug>.tsx.
 *
 * TODO before launch: years and outcome metrics marked `placeholder: true`
 * are illustrative — replace them with your verified figures. Add live or
 * store links to `links` (e.g. MealWheelz app-store pages) when available.
 */

export const categories = ["All", "Branding", "UI/UX", "Web & Automation", "Marketing", "Packaging"] as const;
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
  /** Client logo shown on the case study (transparent image in /public). */
  logo?: { src: string; width: number; height: number; alt: string };
  /** Live sites, app-store pages or other public links. */
  links?: { label: string; href: string }[];
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
    logo: { src: "/brands/ashwheelz-logo.webp", width: 963, height: 831, alt: "Ashwheelz logo" },
    links: [],
    categories: ["Branding", "Marketing"],
    services: ["Corporate Fleet Branding", "Brand Identity", "Social Media Marketing", "Portfolio Design", "Corporate Merchandise"],
    theme: { background: "#161414", foreground: "#F4F4F2", accent: "#FD8109" },
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
        { name: "Ash Orange", hex: "#FD8109", role: "Signal & accent" },
        { name: "Graphite", hex: "#211F1F", role: "Primary" },
        { name: "Ash Grey", hex: "#4C4C4A", role: "Wordmark & secondary" },
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
      body: "A disciplined livery, corporate stationery, employee IDs, merchandise and a social system — all running off one grid and one orange. Behind the scenes, a one-link customer feedback system turned delivery feedback into structured data — see the Ashwheelz Feedback System case study.",
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
    slug: "mealwheelz",
    title: "MealWheelz",
    tagline: "One order, three apps, zero confusion.",
    summary:
      "A food-delivery platform designed as three connected apps — customers order, restaurants prepare and riders deliver — all speaking one brand and one design language.",
    client: "MealWheelz",
    sector: "Food Delivery",
    year: "2025",
    role: "UI/UX Designer",
    logo: { src: "/brands/mealwheelz-logo.svg", width: 120, height: 80, alt: "MealWheelz logo" },
    links: [],
    categories: ["UI/UX"],
    services: ["UI/UX Design", "Mobile App Design", "Design System", "Brand Application"],
    theme: { background: "#FBF3EA", foreground: "#1E1E1E", accent: "#F5891F" },
    problem: {
      headline: "Delivery is three jobs happening at once.",
      body: "A customer is hungry, a kitchen is busy and a rider is on the road — each needs a different screen, at a different moment, with no room for confusion. MealWheelz needed one platform that worked for all three and still felt like one brand.",
    },
    research: {
      body: "I mapped the order journey from all three sides — what each person is doing, what they need to see and how much attention they can spare — before designing a single screen.",
      methods: ["Role mapping", "Order-journey mapping", "Kitchen workflow review", "Rider task analysis"],
      insights: [
        {
          title: "One primary action per role",
          body: "Customers browse and order, restaurants accept and prepare, riders claim and deliver. Each app leads with exactly that.",
        },
        {
          title: "Status is the product",
          body: "New, processing and delivered have to read the same in every app, so an order never gets lost between them.",
        },
        {
          title: "Busy hands glance, they don't read",
          body: "Kitchens and riders work on the move — big tabs, clear counters and high-contrast actions beat dense screens.",
        },
      ],
    },
    process: [
      { title: "Map", body: "Mapped one order's life across customer, restaurant and rider — every state, hand-off and notification." },
      { title: "System", body: "Built a shared design language: MealWheelz orange for action, charcoal for structure, friendly illustration for warmth." },
      { title: "Design", body: "Customer: discovery, restaurants, search and guest checkout. Restaurant: new, processing, delivered. Rider: new orders, my orders, delivered." },
      { title: "Ship", body: "Delivered app icons, splash screens and production-ready screens for all three apps." },
    ],
    wireframes: {
      body: "The order lifecycle was wireframed end to end across all three apps before any visual design — so a single order reads the same from checkout, to kitchen, to doorstep.",
    },
    designSystem: {
      body: "One orange, one charcoal and one friendly illustration style, applied across three very different jobs.",
      colors: [
        { name: "MealWheelz Orange", hex: "#F5891F", role: "Actions & active states" },
        { name: "Charcoal", hex: "#1E1E1E", role: "Navigation & type" },
        { name: "Cream", hex: "#FBF3EA", role: "Surfaces" },
        { name: "Fresh Green", hex: "#3BA55C", role: "Illustration & success" },
      ],
      typography: {
        display: "Geometric Sans Bold",
        body: "Geometric Sans Regular",
        note: "Order IDs, counters and timers set large — readable at arm's length in a kitchen or on a bike.",
      },
      principles: ["One primary action per role.", "Order status reads the same in every app.", "Big targets for busy hands."],
    },
    finalDesign: {
      body: "Customers get a warm welcome, guest checkout and discovery by restaurant or search. Restaurants run service from three tabs — new, processing, delivered — with an online switch and notifications. Riders claim orders with a single “Assign me” tap and track what's theirs and what's delivered.",
      highlights: ["Customer app", "Restaurant partner app", "Rider app", "Shared order states", "Online & availability toggles", "App icons & splash"],
    },
    outcome: {
      body: "MealWheelz runs as three live apps on one design language — restaurant partners such as Sultan Restaurant Lahore manage incoming orders, riders claim deliveries, and customers order as guests or with an account.",
      metrics: [
        { value: 3, label: "Connected apps — customer, restaurant and rider" },
        { value: 3, label: "Shared order states: new, processing, delivered" },
        { value: 1, label: "Design language across every screen" },
      ],
    },
  },
  {
    slug: "ashwheelz-feedback",
    title: "Ashwheelz Feedback System",
    tagline: "Every delivery, rated in under a minute.",
    summary:
      "A one-link customer feedback form and a secure admin portal that turned delivery feedback from conversations into searchable, exportable data — prototyped as an automation, then rebuilt as a production web app.",
    client: "Ashwheelz",
    sector: "Logistics · Internal tools",
    year: "2026",
    role: "Product Designer & Builder",
    logo: { src: "/brands/ashwheelz-logo.webp", width: 963, height: 831, alt: "Ashwheelz logo" },
    links: [],
    categories: ["Web & Automation", "UI/UX"],
    services: ["Feedback Form", "Admin Portal", "Workflow Automation", "Web Development"],
    theme: { background: "#211F1F", foreground: "#F4F4F2", accent: "#FD8109" },
    problem: {
      headline: "Feedback was informal — and impossible to measure.",
      body: "Comments about deliveries were scattered across conversations. Management couldn't see how the service was really performing — on time, safety, driver conduct, hygiene or overall service — and had nothing structured to act on.",
    },
    research: {
      body: "I mapped what management needed to see, and what a customer will realistically do on a phone straight after a delivery.",
      methods: ["Stakeholder interviews", "Service-quality mapping", "Mobile form testing", "Reporting audit"],
      insights: [
        {
          title: "No logins, ever",
          body: "One link, opened from WhatsApp, SMS, email — or a QR code printed on the delivery slip.",
        },
        {
          title: "Five things matter",
          body: "Delivery time, safety, driver, hygiene and service — each with room for a suggestion.",
        },
        {
          title: "Reports live in Excel",
          body: "Management works in spreadsheets, so getting the data out had to be a single click.",
        },
      ],
    },
    process: [
      { title: "Prototype", body: "Shipped v1 as an automation: a Google Apps Script web form writing every response to a Google Sheet, with an Excel download menu." },
      { title: "Structure", body: "Modelled forms, sections and question types — stars, choice and NPS — so questions can change without touching the form." },
      { title: "Build", body: "Rebuilt it as a production web app: FastAPI and PostgreSQL on Vercel, with rate limiting and secure admin sessions." },
      { title: "Operate", body: "An admin portal to search, filter and mark responses reviewed or actioned — and export everything to Excel." },
    ],
    wireframes: {
      body: "The customer form was wireframed thumb-first for phones; the admin portal around a single table with filters, statuses and one export button.",
    },
    designSystem: {
      body: "Ashwheelz orange carries every action and every star, on calm, high-contrast surfaces built for quick answers.",
      colors: [
        { name: "Ash Orange", hex: "#FD8109", role: "Actions & ratings" },
        { name: "Graphite", hex: "#211F1F", role: "Type & navigation" },
        { name: "Ash Grey", hex: "#4C4C4A", role: "Secondary text" },
        { name: "Concrete", hex: "#F4F4F2", role: "Background" },
      ],
      typography: { display: "Inter Semibold", body: "Inter Regular", note: "Large tap targets and star controls sized for one-handed use on a phone." },
      principles: ["One link, no login.", "Every question has a suggestion box.", "Bad data is refused at the door."],
    },
    finalDesign: {
      body: "Customers rate each part of the delivery with stars, add suggestions and an overall score. Behind it, the admin portal lists every response with search, filters and statuses — and exports to Excel in one click.",
      highlights: ["Mobile feedback form", "Star, choice & NPS questions", "Admin dashboard", "Review & action statuses", "One-click Excel export", "Google Sheets prototype (v1)"],
    },
    outcome: {
      body: "Feedback is now structured data management can act on — rated across five service dimensions, tracked from new to actioned, and exported for reporting in seconds.",
      metrics: [
        { value: 5, label: "Service dimensions rated per delivery" },
        { value: 3, label: "Question types: stars, choice and NPS" },
        { value: 4, label: "Response statuses, from new to archived" },
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
    logo: { src: "/brands/sultan-logo.webp", width: 150, height: 150, alt: "Sultan Yakhni Pulao logo" },
    links: [],
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
      { title: "Identity", body: "A royal turban emblem in a framed badge, a serif SULTAN wordmark and a saffron-and-pomegranate palette." },
      { title: "Packaging", body: "Built a modular system — rice boxes, raita and salad cups, carry bags and a tamper seal." },
      { title: "Launch", body: "Campaign line, posters, menu and a social launch grid anchored on “Patience, served hot.”" },
    ],
    wireframes: {
      body: "Packaging started as dielines and fold studies — testing seal placement, stacking and how the crest reads at thumbnail size before any artwork was applied.",
    },
    designSystem: {
      body: "Warm, heritage-led and restrained: the emblem does the heavy lifting so everything else can stay quiet.",
      colors: [
        { name: "Saffron", hex: "#B8792A", role: "Accent & seal" },
        { name: "Pomegranate", hex: "#7A1F1F", role: "Primary" },
        { name: "Ivory", hex: "#F3EADB", role: "Background" },
        { name: "Clove", hex: "#2A1A14", role: "Type" },
      ],
      typography: { display: "High-contrast Serif", body: "Inter", note: "Serif for the voice of heritage; Inter for menus, prices and anything functional." },
      principles: [
        "Heritage cues, modern restraint.",
        "The emblem is the signature.",
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
  {
    slug: "attendance-register",
    title: "Attendance Register",
    tagline: "Roll call in seconds, reports in one click.",
    summary:
      "A zero-install web tool for teachers to mark attendance by class, batch and subject, review records and export them to Excel — running entirely in the browser.",
    client: "Internal tool",
    sector: "Education",
    year: "2026",
    role: "Designer & Builder",
    links: [],
    categories: ["Web & Automation", "UI/UX"],
    services: ["Web App", "UX Design", "Excel Automation"],
    theme: { background: "#F3F5F8", foreground: "#18202E", accent: "#2346A8" },
    problem: {
      headline: "Paper registers don't add up.",
      body: "Attendance kept on paper or in loose spreadsheets is slow to mark, easy to lose and painful to total at the end of the month. Teachers needed something they could open and use immediately — no accounts, no installs, no training.",
    },
    research: {
      body: "I designed around the moment a teacher stands in front of a class with a few minutes to spare.",
      methods: ["Teacher walkthroughs", "Register audit", "Timing the roll call", "Report requirements"],
      insights: [
        {
          title: "Marking must take seconds",
          body: "One tap per student for present, absent or leave — plus an “All present” shortcut for the common case.",
        },
        {
          title: "Rosters rarely change",
          body: "Classes, batches, subjects and students are saved once, then picked from a list every day.",
        },
        {
          title: "Reports end up in Excel",
          body: "Records filter by date range, class, batch and subject, then download as a real .xlsx file.",
        },
      ],
    },
    process: [
      { title: "Roster", body: "Classes, batches, subjects and students (roll number and name) are set up once." },
      { title: "Mark", body: "Present, absent or leave per student, with all-present and all-absent shortcuts and a live tally." },
      { title: "Review", body: "Records filtered by date, class, batch and subject — editable, with a confirm step before deleting." },
      { title: "Export", body: "One click turns any filtered view into an Excel workbook." },
    ],
    wireframes: {
      body: "Three tabs — Mark attendance, Records & Excel, Classes & students — each sketched around a single job, so nothing competes with the roll call.",
    },
    designSystem: {
      body: "A calm, utilitarian system where status is carried by colour and a letter, so it never relies on colour alone.",
      colors: [
        { name: "Register Blue", hex: "#2346A8", role: "Primary actions" },
        { name: "Present", hex: "#1D7A46", role: "P status" },
        { name: "Absent", hex: "#B4292F", role: "A status" },
        { name: "Leave", hex: "#9A6200", role: "L status" },
      ],
      typography: { display: "System UI Semibold", body: "System UI", note: "Monospaced numerals for roll numbers and tallies, so columns line up." },
      principles: ["Works offline, no account needed.", "Status never relies on colour alone.", "Every destructive action asks twice."],
    },
    finalDesign: {
      body: "A single-file web app with light and dark themes. Teachers pick a class, tap through the roll and save; the register keeps a running tally, and every record can be filtered, edited and exported.",
      highlights: ["Mark attendance (P / A / L)", "Class & roster manager", "Filtered records", "Excel (.xlsx) export", "Light & dark themes", "Offline-first storage"],
    },
    outcome: {
      body: "Taking attendance now takes a few taps, and month-end reports are a download rather than a project.",
      metrics: [
        { value: 3, label: "Statuses: present, absent and leave" },
        { value: 4, label: "Record filters: dates, class, batch, subject" },
        { value: 1, label: "Click to export to Excel" },
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
