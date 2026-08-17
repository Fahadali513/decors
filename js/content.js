/* ==========================================================================
   CONTENT.JS — default content. The admin panel (admin.html) overrides
   these values in the browser's localStorage under the "a1cms_*" keys.
   js/cms.js merges defaults + overrides at render time.
   ========================================================================== */

const SITE_DEFAULTS = {
  siteName: "A1 Event Decor Manufacturing",
  navText: "A1 Event Decor",
  tagline: "Premium Fiberglass & Event Structures",
  welcomeEnabled: true,
  welcomeTitle: "Welcome to A1 Event Decor",
  welcomeMessage: "Premium fiberglass, custom event structures, and 19+ years of manufacturing craftsmanship — thank you for visiting.",
  logo: "img/logo.png",
  phone: "+92 348-3538798",
  whatsapp: "923483538798",
  email: "a1eventdecor18@gmail.com",
  address: "Lahore Cantt, Airport Road, Bhatta Chowk, Bedian Road, Near Shalimar Cinema",
  social: {
    facebook: "#",
    twitter: "#",
    tiktok: "#",
    instagram: "#"
  }
};

const HOME_DEFAULTS = {
  heroEyebrow: "19+ Years of Manufacturing Excellence",
  heroHeadlinePrefix: "Crafting ",
  heroHeadlineAccent: "unforgettable",
  heroHeadlineSuffix: " event decor, built to last.",
  heroSub: "Premium fiberglass, custom event structures, and metal fabrication — engineered with precision and finished with care, for every celebration.",
  messageQuote: "Thank you for choosing A1 Event Decor Manufacturing. We are committed to delivering premium-quality event decor solutions with expert craftsmanship, innovative designs, and reliable service. We look forward to bringing your vision to life and building lasting relationships with our clients around the world.",
  introHeading: "Customer satisfaction, in everything we build",
  introText: "At A1 Event Decor Manufacturing, customer satisfaction is our highest priority. We believe in building long-term relationships by providing reliable service, competitive pricing, timely delivery, and exceptional products that exceed expectations.",
  missionText: "Our mission is to manufacture premium-quality event decor products with precision, creativity, and reliability while building long-term relationships with our clients through trust, innovation, and outstanding service.",
  visionText: "To become a globally recognized brand in event decor manufacturing by delivering innovative designs, exceptional craftsmanship, and world-class quality that inspires every celebration.",
  storyPreview: "A1 Event Decor Manufacturing is driven by the dream of a young boy, still in matric&hellip;",
  statCustomers: 1000,
  statArea: "All over Pakistan",
  statYears: 19,
  statSatisfaction: 100
};

const ABOUT_DEFAULTS = {
  whoWeAreText: "A1 Event Decor Manufacturing is a leading manufacturer of premium fiberglass, custom event structures, decorative products, and metal fabrication. With over 19 years of experience, we transform creative ideas into high-quality products for weddings, commercial spaces, exhibitions, and events worldwide.",
  whoImage1: "https://images.unsplash.com/photo-1478146059778-26028b07395a?q=80&w=800&auto=format&fit=crop",
  whoImage2: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop",
  sinceYear: "2006",
  aboutText1: "Welcome to A1 Event Decor Manufacturing, your trusted partner in premium event décor manufacturing. We are dedicated to creating high-quality décor products that add elegance, style, and sophistication to every celebration. With a passion for excellence, expert craftsmanship, and attention to detail, we manufacture décor solutions that meet the highest standards of quality and durability.",
  aboutText2: "Our team combines creativity with innovation to produce unique event décor for weddings, corporate events, parties, exhibitions, and special occasions. Every product is carefully crafted to ensure outstanding design, functionality, and long-lasting performance.",
  founderImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=500&auto=format&fit=crop",
  founderQuote: "Building quality, creating trust, and turning your vision into reality—one project at a time.",
  founderName: "Sarwar",
  ceoImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=500&auto=format&fit=crop",
  ceoQuote: "Inspired by my father's vision, I am committed to building A1 Event Decor Manufacturing into Pakistan's leading brand with a global presence.",
  ceoName: "Ali Sarwar",
  storyFull: "A1 Event Decor Manufacturing is driven by the dream of a young boy, still in matric, who is determined to turn his father's business into one of Pakistan's leading event decor brands and a globally recognized name. With passion, hard work, and a commitment to excellence, he continues to take every step toward making that vision a reality.",
  recentProjectsText: "From luxury wedding stages and elegant decorative structures to custom fiberglass sculptures and commercial installations, our projects showcase innovation, durability, and outstanding craftsmanship. Every project is designed and manufactured to exceed our clients' expectations."
};

const WHY_CHOOSE_US_DEFAULTS = [
  "19+ Years of Manufacturing Experience",
  "Premium Quality Materials",
  "Skilled In-House Manufacturing Team",
  "Fully Customized Solutions",
  "Modern Production Techniques",
  "Timely Delivery",
  "Competitive Pricing",
  "Trusted by Hundreds of Clients",
  "Strong Commitment to Quality & Customer Satisfaction"
];

const SERVICES_DEFAULTS = [
  "Fiberglass Manufacturing",
  "Custom Event Stage Manufacturing",
  "Wedding Decor Structures",
  "Fiberglass Statues & Sculptures",
  "Decorative Pillars, Pots & Props",
  "Iron Fabrication & Metal Works",
  "Custom Design & Product Development",
  "Commercial & Event Decoration Solutions"
];

const PROCESS_DEFAULTS = [
  "Consultation & Requirement Discussion",
  "Concept & Design Development",
  "Material Selection",
  "Precision Manufacturing",
  "Quality Inspection",
  "Professional Finishing",
  "Secure Packaging",
  "On-Time Delivery"
];

const VALUES_DEFAULTS = [
  { title: "Craftsmanship", text: "Every seam checked by hand." },
  { title: "Sustainability", text: "Responsibly sourced materials." },
  { title: "Integrity", text: "Honest pricing, honest timelines, every time." },
  { title: "Innovation", text: "New techniques applied to timeless designs." }
];

const HERO_SLIDES_DEFAULTS = [
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1478146059778-26028b07395a?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1600&auto=format&fit=crop"
];

const TESTIMONIALS_DEFAULTS = [
  { name: "Abdullah", city: "Lahore", rating: 5, review: "Our experience with A1 Event Decor Manufacturing was outstanding. The quality, finishing, and professionalism exceeded our expectations." },
  { name: "Shahid", city: "Lahore", rating: 5, review: "Reliable team, excellent craftsmanship, and timely delivery. Highly recommended for custom event decor manufacturing." },
  { name: "Raheem Khan", city: "Lahore", rating: 5, review: "We were impressed by their attention to detail and ability to turn our ideas into reality." }
];

const PRODUCTS_DEFAULTS = [
  {
    id: "p1", name: "Fiberglass Wedding Arch", category: "Stages",
    tagline: "Where every entrance becomes iconic",
    shortDesc: "Hand-finished fiberglass arches engineered for grand wedding entrances and photo moments.",
    fullDesc: "A statement centrepiece for wedding stages and walkways, built on a precision fiberglass mould for a flawless finish that holds up night after night, event after event. Finished in your choice of colour and detailing to match the event theme.",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop"
    ],
    featured: true, popular: true, comingSoon: false
  },
  {
    id: "p2", name: "Modular Stage Steps", category: "Stairs",
    tagline: "Built to carry every grand entrance",
    shortDesc: "Reinforced modular staircases for stages, ramps, and elevated event platforms.",
    fullDesc: "Engineered from fabricated metal and finished panels, our modular stage steps assemble quickly on-site and are rated for repeated commercial use across weddings, exhibitions, and corporate stages.",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000&auto=format&fit=crop"
    ],
    featured: false, popular: true, comingSoon: false
  },
  {
    id: "p3", name: "Decorative Fiberglass Pillars", category: "Stages",
    tagline: "Classical elegance, modern durability",
    shortDesc: "Column-style pillars used to frame stages, entrances, and photo backdrops.",
    fullDesc: "Cast from durable fiberglass with a smooth architectural finish, these pillars are lightweight enough for quick setup and strike, yet sturdy enough for repeated commercial rental use.",
    images: [
      "https://images.unsplash.com/photo-1478146059778-26028b07395a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1000&auto=format&fit=crop"
    ],
    featured: true, popular: false, comingSoon: false
  },
  {
    id: "p4", name: "Custom Iron Stage Frame", category: "Stages",
    tagline: "The structure behind every showstopping stage",
    shortDesc: "Fabricated metal stage framing built to your exact venue dimensions.",
    fullDesc: "Every venue is different — this stage frame is fabricated to order in iron and steel, with a professional finish and load-tested joinery, ready to be dressed with drapery, lighting, and decor.",
    images: ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000&auto=format&fit=crop"],
    featured: false, popular: false, comingSoon: true
  },
  {
    id: "p5", name: "Spiral Display Stairs", category: "Stairs",
    tagline: "A statement staircase for statement events",
    shortDesc: "Compact spiral staircase for elevated stages and exhibition displays.",
    fullDesc: "A space-efficient spiral staircase finished to a premium standard, ideal for exhibitions and stages where floor space is limited but visual impact still matters.",
    images: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop"
    ],
    featured: false, popular: false, comingSoon: false
  }
];

const CATEGORIES_DEFAULTS = ["All", "Stairs", "Stages"];
