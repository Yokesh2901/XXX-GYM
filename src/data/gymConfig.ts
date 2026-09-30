export interface GymConfig {
  brand: {
    name: string;
    shortName: string;
    tagline: string;
    establishedYearText: string;
    yearsOfLegacy: string;
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    whatsappNumber: string; // international format without + or spaces for api.whatsapp.com
    whatsappDisplay: string;
    address: string;
    city: string;
    hours: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
    googleMapsUrl: string;
    googleMapsEmbedSrc?: string;
  };
  socials: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}

export const GYM_CONFIG: GymConfig = {
  brand: {
    name: "XXX GYM",
    shortName: "XXX GYM",
    tagline: "20+ Years of Pure Iron, Strength & Discipline",
    establishedYearText: "ESTABLISHED OVER 20 YEARS AGO",
    yearsOfLegacy: "20+",
  },
  contact: {
    phone: "+918610906060",
    phoneDisplay: "+91 86109 06060",
    whatsappNumber: "918610906060",
    whatsappDisplay: "+91 86109 06060",
    address: "Main Road, Near Landmark",
    city: "Tamil Nadu",
    hours: {
      weekdays: "Morning: 05:00 AM – 12:00 PM | Evening: 04:00 PM – 10:00 PM",
      saturday: "Morning: 05:00 AM – 12:00 PM | Evening: 04:00 PM – 10:00 PM",
      sunday: "Morning: 06:00 AM – 12:00 PM",
    },
    googleMapsUrl: "https://maps.google.com/?q=XXX+GYM",
    googleMapsEmbedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.00!2d80.20!3d13.04!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAyJzI0LjAiTiA4MMKwMTInMDAuMCJF!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s",
  },
  socials: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
};

export interface GymImage {
  id: string;
  src: string;
  title: string;
  description: string;
  category: "Floor" | "Equipment" | "Strength" | "Exterior";
  aspectRatio: "aspect-[4/3]" | "aspect-[3/4]" | "aspect-[16/10]";
}

export const AUTHENTIC_GYM_IMAGES: GymImage[] = [
  {
    id: "img-floor",
    src: "/images/gym/hero-gym-floor.jpg",
    title: "Main Training Arena",
    description: "High-ceiling industrial warehouse with dedicated bench stations, cable towers, and raw iron free-weights.",
    category: "Floor",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-exterior-front",
    src: "/images/gym/exterior-front.jpg",
    title: "XXX GYM Entrance & Facade",
    description: "Authentic street entrance featuring the official XXX GYM banner, iron shutter, and two-wheeler parking.",
    category: "Exterior",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "img-leg-press",
    src: "/images/gym/equipment-leg-press.jpg",
    title: "Heavy 45° Leg Press & Cast Iron Stack",
    description: "Industrial strength leg press with heavy-gauge yellow steel framing and circular vintage grip plates.",
    category: "Equipment",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-lever-press",
    src: "/images/gym/equipment-lever-press.jpg",
    title: "Standing Lever Shoulder & Chest Station",
    description: "Heavy-duty dual-arm Body Structure apparatus with diamond-plate steel base for heavy compound sets.",
    category: "Strength",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-exterior-angle",
    src: "/images/gym/exterior-angle.jpg",
    title: "Lane View & Gym Signboard",
    description: "Clear approach view showing XXX GYM branding and convenient bike parking directly outside.",
    category: "Exterior",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: "img-seated-calf",
    src: "/images/gym/equipment-seated-calf.jpg",
    title: "Seated Lever & Multi-Machine Rows",
    description: "Dedicated lower body machine line alongside stacks of Olympic multi-hole iron plates.",
    category: "Equipment",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-arm-station",
    src: "/images/gym/equipment-arm-station.jpg",
    title: "Isolated Compound Machine & Training Mirror",
    description: "Heavy lever row / press station positioned facing full-length mirrors to monitor posture and form.",
    category: "Strength",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: "img-exterior-street",
    src: "/images/gym/exterior-street.jpg",
    title: "Street View & Landmark Sign",
    description: "The street entrance pillar with official XXX GYM sign, contact number and daily operating hours.",
    category: "Exterior",
    aspectRatio: "aspect-[3/4]",
  },
];

export const WHY_CHOOSE_US_ITEMS = [
  {
    iconName: "History",
    title: "20+ YEARS EXPERIENCE",
    description: "Decades of practical fitness experience built on time-tested principles, not passing fitness fads.",
    badge: "Legacy",
  },
  {
    iconName: "Dumbbell",
    title: "QUALITY EQUIPMENT",
    description: "A dedicated environment with heavy-gauge steel machinery and cast iron plates engineered for serious training.",
    badge: "Authentic Iron",
  },
  {
    iconName: "Flame",
    title: "STRENGTH FOCUSED",
    description: "Train with purpose and consistency under an environment that respects honest, progressive hard work.",
    badge: "Core Discipline",
  },
  {
    iconName: "HeartHandshake",
    title: "BEGINNER FRIENDLY",
    description: "A welcoming, ego-free environment for people starting their fitness journey with supportive guidance.",
    badge: "Supportive",
  },
  {
    iconName: "Target",
    title: "GOAL ORIENTED",
    description: "Train toward your personal fitness goals with structured direction, tracking, and tangible milestones.",
    badge: "Results Driven",
  },
  {
    iconName: "Users",
    title: "COMMUNITY",
    description: "A gym environment built around consistency, mutual respect, and people who show up every single day.",
    badge: "Iron Family",
  },
];

export const PROGRAMS_ITEMS = [
  {
    id: "strength-training",
    title: "STRENGTH TRAINING",
    tagline: "Build strength, power and consistency.",
    description: "Master compound movements and progressive overload using authentic heavy iron, free weights, and dedicated lifting stations.",
    imageSrc: "/images/gym/equipment-leg-press.jpg",
    highlights: ["Progressive Overload", "Form Mastery", "Heavy Free-Weights"],
  },
  {
    id: "muscle-building",
    title: "MUSCLE BUILDING",
    tagline: "Structured training focused on muscle development.",
    description: "Targeted hypertrophy routines with lever-based machines, isolated dumbbell stations, and controlled tension for muscle mass.",
    imageSrc: "/images/gym/equipment-lever-press.jpg",
    highlights: ["Hypertrophy Protocols", "Lever Machines", "Isolation Precision"],
  },
  {
    id: "weight-management",
    title: "WEIGHT MANAGEMENT",
    tagline: "Training designed to support a healthier lifestyle.",
    description: "High-density resistance sessions combined with metabolic conditioning to burn fat, build metabolic rate, and build endurance.",
    imageSrc: "/images/gym/hero-gym-floor.jpg",
    highlights: ["Metabolic Conditioning", "Sustainable Habits", "Body Composition"],
  },
  {
    id: "general-fitness",
    title: "GENERAL FITNESS",
    tagline: "Improve strength, mobility and overall fitness.",
    description: "Full-body functional work designed for daily resilience, joint health, cardiovascular stamina, and overall vitality.",
    imageSrc: "/images/gym/equipment-seated-calf.jpg",
    highlights: ["Functional Movement", "Mobility & Posture", "Everyday Stamina"],
  },
  {
    id: "personal-training",
    title: "PERSONAL TRAINING",
    tagline: "More focused guidance for individual goals.",
    description: "One-on-one attention with experienced trainers who provide personalized programming, feedback, and accountability.",
    imageSrc: "/images/gym/equipment-arm-station.jpg",
    highlights: ["1-on-1 Guidance", "Custom Strategy", "Strict Accountability"],
  },
  {
    id: "beginner-training",
    title: "BEGINNER TRAINING",
    tagline: "A comfortable starting point for newcomers.",
    description: "Step-by-step introduction to gym machines, safety fundamentals, and building the confidence to make fitness a lifelong habit.",
    imageSrc: "/images/gym/hero-gym-floor.jpg",
    highlights: ["Zero Intimidation", "Machine Familiarization", "Confidence Building"],
  },
];

export const TIMELINE_MILESTONES = [
  {
    period: "THE FOUNDATION",
    title: "Two Decades of Commitment",
    description: "Founded on the belief that real physical transformation requires consistency, honest effort, and an environment free of gimmicks.",
  },
  {
    period: "EXPANSION OF CRAFT",
    title: "Investing in Heavy-Gauge Iron",
    description: "Curated durable, heavy-duty machines and cast iron equipment engineered to withstand decades of relentless, serious lifting.",
  },
  {
    period: "A DEDICATED COMMUNITY",
    title: "Generations of Stronger Lifters",
    description: "Fostered a supportive culture where beginners and seasoned lifters train side by side with mutual respect and unwavering discipline.",
  },
  {
    period: "THE PRESENT & FUTURE",
    title: "20+ Years Strong",
    description: "Continuing our mission every single day: helping everyday people discover their highest strength and build a lifelong training habit.",
  },
];
