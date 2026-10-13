import {
  BarChart3,
  Clapperboard,
  LayoutTemplate,
  Megaphone,
  Package,
  PenTool,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Hero stats — real counts drawn from the content on this site.       */
/* ------------------------------------------------------------------ */

export const stats = [
  { value: 16, suffix: "", label: "Creative & marketing disciplines" },
  { value: 4, suffix: "", label: "Flagship brand case studies" },
  { value: 18, suffix: "", label: "Responsibilities owned end to end" },
  { value: 8, suffix: "", label: "Tools in the daily stack" },
] as const;

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  statement:
    "I'm a marketing and creative executive who treats design as a business tool first. I build brands, products and campaigns that look considered — and perform measurably.",
  paragraphs: [
    "My work spans brand identity, UI/UX, graphic design, social media and the digital systems behind them. One week that means a fleet livery and an employee ID system; the next, an admin portal, a customer feedback flow or a LinkedIn pipeline for the sales team.",
    "I enjoy solving business problems through design rather than simply making attractive graphics — starting from the goal, the audience and the numbers, then crafting until every detail earns its place.",
  ],
  disciplines: [
    "Brand Identity Design",
    "UI/UX Design",
    "Graphic Design",
    "Social Media Management",
    "Content Strategy",
    "Marketing Campaigns",
    "Video Editing",
    "Corporate Branding",
    "Print Design",
    "Packaging Design",
    "Presentation Design",
    "Creative Direction",
    "LinkedIn Lead Generation",
    "Digital Systems",
    "Admin Portal Design",
    "Feedback System Design",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export const experience = {
  role: "Marketing & Creative Executive",
  company: "Ashwheelz",
  companyLegal: "Talal Othman bin Saleh Al Hamdan General Cont. Co.",
  department: "Sales & Marketing",
  location: "Lahore",
  period: "Present",
  summary:
    "Leading brand presence, creative output and digital marketing across every channel — from content calendars and campaigns to corporate identity, merchandise and the internal tools that keep teams moving.",
  highlights: [
    "Own every social channel end to end — planning, production, publishing and performance reporting.",
    "Designed and shipped a URL-based customer feedback system with a searchable admin dashboard and one-click Excel export.",
    "Built the company portfolio used in proposals, tenders and client pitches.",
  ],
  groups: [
    {
      title: "Brand & Identity",
      items: [
        "Managing company branding",
        "Corporate branding",
        "Business card design",
        "Employee ID design",
        "Merchandise design",
        "Client giveaway design",
      ],
    },
    {
      title: "Content & Social",
      items: ["Social media management", "Content planning", "Graphic design", "Video editing"],
    },
    {
      title: "Product & Systems",
      items: [
        "UI/UX design",
        "Portfolio development",
        "Feedback form development",
        "Admin portal development",
      ],
    },
    {
      title: "Growth & Strategy",
      items: [
        "Campaign strategy",
        "Digital marketing",
        "LinkedIn lead generation",
        "Marketing reports",
      ],
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  title: string;
  description: string;
  deliverables: string[];
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    title: "Brand Identity & Strategy",
    description:
      "Logos, identity systems and guidelines that give a business one confident voice — from positioning to the last business card.",
    deliverables: ["Logo & marks", "Brand guidelines", "Corporate identity", "Tone of voice"],
    icon: PenTool,
  },
  {
    title: "UI/UX & Product Design",
    description:
      "Interfaces for apps, websites, portals and internal tools — researched, wireframed and delivered as scalable design systems.",
    deliverables: ["UX research", "Wireframes & prototypes", "Design systems", "Admin & feedback tools"],
    icon: LayoutTemplate,
  },
  {
    title: "Social Media & Content",
    description:
      "Content strategy, calendars and platform-native creative that build an audience — and keep it coming back.",
    deliverables: ["Content calendars", "Post & story design", "Captions & copy", "Performance reports"],
    icon: Megaphone,
  },
  {
    title: "Marketing Campaigns",
    description:
      "Integrated campaigns from concept to report — creative, channels, boosted posts and LinkedIn lead generation tied to real goals.",
    deliverables: ["Campaign concepts", "Paid social", "LinkedIn lead gen", "Reporting"],
    icon: BarChart3,
  },
  {
    title: "Print, Packaging & Merchandise",
    description:
      "Packaging, stationery, merchandise and client gifting that carry the brand off the screen and into people's hands.",
    deliverables: ["Packaging design", "Business cards & IDs", "Branded merchandise", "Client giveaways"],
    icon: Package,
  },
  {
    title: "Motion & Presentation",
    description:
      "Video edits, motion graphics and pitch decks that make complex ideas feel simple — and memorable.",
    deliverables: ["Video editing", "Motion graphics", "Pitch decks", "Company portfolios"],
    icon: Clapperboard,
  },
];

/* ------------------------------------------------------------------ */
/* Skills & tools                                                      */
/* ------------------------------------------------------------------ */

export const skills = [
  { title: "Graphic Design", detail: "Layout, typography and image-making with a strict eye for hierarchy." },
  { title: "UI/UX Design", detail: "Research-led interfaces, user flows and design systems." },
  { title: "Brand Identity", detail: "Marks, systems and guidelines built to scale." },
  { title: "Marketing Strategy", detail: "Positioning, funnels and campaigns tied to business goals." },
  { title: "Content Marketing", detail: "Stories and formats that earn attention, not borrow it." },
  { title: "Social Media Marketing", detail: "Platform-native creative, calendars and community growth." },
  { title: "Motion Graphics", detail: "Movement that clarifies the message instead of decorating it." },
  { title: "Presentation Design", detail: "Decks that persuade boards, buyers and tender panels." },
  { title: "Packaging Design", detail: "Structure, finish and shelf presence that sells." },
  { title: "Creative Direction", detail: "One clear vision held across every touchpoint." },
] as const;

export const tools = [
  { name: "Figma", short: "Fg", use: "Interfaces & systems" },
  { name: "Adobe Photoshop", short: "Ps", use: "Imaging & retouching" },
  { name: "Adobe Illustrator", short: "Ai", use: "Vector & identity" },
  { name: "Adobe After Effects", short: "Ae", use: "Motion graphics" },
  { name: "Canva Pro", short: "Cv", use: "Rapid content production" },
  { name: "ChatGPT", short: "Gp", use: "Ideation & copy drafts" },
  { name: "Adobe Firefly", short: "Ff", use: "Generative imagery" },
  { name: "AI Design Tools", short: "AI", use: "Workflow acceleration" },
] as const;

/* ------------------------------------------------------------------ */
/* Design process                                                      */
/* ------------------------------------------------------------------ */

export const processSteps = [
  {
    title: "Discover",
    description:
      "Understand the business, the audience and the numbers before a single pixel. Stakeholder conversations, brand audits and competitor scans.",
    outputs: ["Brand audit", "Stakeholder interviews", "Competitor scan"],
  },
  {
    title: "Define",
    description:
      "Turn findings into a sharp brief: the real problem, the metric that proves success and the constraints we design within.",
    outputs: ["Creative brief", "Success metrics", "Positioning"],
  },
  {
    title: "Design",
    description:
      "Explore widely, then converge. Wireframes and systems first, then high-fidelity craft where every detail earns its place.",
    outputs: ["Wireframes", "Design system", "High-fidelity design"],
  },
  {
    title: "Deliver",
    description:
      "Production-ready files, guidelines and a clean handover — to printers, developers and social schedulers — on brand and on time.",
    outputs: ["Print & dev handoff", "Guidelines", "Launch assets"],
  },
  {
    title: "Measure",
    description:
      "Track what happens after launch, report honestly to management and iterate on what the data — not opinion — says.",
    outputs: ["Performance reports", "Feedback loops", "Iteration plan"],
  },
] as const;

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* PLACEHOLDER COPY — replace with real, approved quotes before launch. */
/* ------------------------------------------------------------------ */

export const testimonials = [
  {
    quote:
      "He doesn't just hand over designs — he arrives with a point of view on the business problem. Our brand finally looks as professional as our operation.",
    author: "Operations Director",
    context: "Logistics & Fleet",
  },
  {
    quote:
      "From the packaging to the launch posts, everything felt like one brand. Customers started photographing the box before they opened it.",
    author: "Founder",
    context: "Restaurant Brand",
  },
  {
    quote:
      "Clear thinking, fast iterations and a design system our developers genuinely enjoyed building from. Rare combination.",
    author: "Product Lead",
    context: "Food-tech Startup",
  },
] as const;
