import type { LucideIcon } from "lucide-react"
import {
  Briefcase,
  Home,
  Wallet,
  HeartPulse,
  GraduationCap,
  Plane,
  Compass,
  Sparkles,
  Bell,
  User,
} from "lucide-react"

export type Category = {
  slug: string
  title: string
  href: string
  icon: LucideIcon
  tagline: string
  description: string
  accent: string
  items: {
    title: string
    meta: string
    description: string
  }[]
}

export const categories: Category[] = [
  {
    slug: "jobs",
    title: "Jobs",
    href: "/jobs",
    icon: Briefcase,
    tagline: "Find work & build your career",
    description:
      "Find work opportunities, improve your CV or resume, prepare for interviews, and get help with applications.",
    accent: "text-chart-1",
    items: [
      {
        title: "Find a Job",
        meta: "Local & online",
        description:
          "Explore job opportunities based on your location, experience, and skills.",
      },
      {
        title: "Create a CV or Resume",
        meta: "Career help",
        description:
          "Get help creating or improving your CV or resume.",
      },
      {
        title: "Job Application Help",
        meta: "Application support",
        description:
          "Get guidance when applying for jobs and completing applications.",
      },
      {
        title: "Interview Preparation",
        meta: "Career support",
        description:
          "Practice interview questions and prepare for your next interview.",
      },
    ],
  },

  {
    slug: "housing",
    title: "Housing",
    href: "/housing",
    icon: Home,
    tagline: "Find a safe place to live",
    description:
      "Find housing, rooms, shelters, rental support, and information about housing problems.",
    accent: "text-chart-2",
    items: [
      {
        title: "Find a Place to Live",
        meta: "Housing search",
        description:
          "Search for homes, apartments, rooms, and other accommodation.",
      },
      {
        title: "Find Affordable Housing",
        meta: "Housing support",
        description:
          "Find affordable housing options and organizations that may help.",
      },
      {
        title: "Emergency Shelter",
        meta: "Urgent support",
        description:
          "Find emergency accommodation and temporary shelter near you.",
      },
      {
        title: "Housing Problems",
        meta: "Support",
        description:
          "Get guidance about rent, repairs, unsafe housing, or tenancy problems.",
      },
    ],
  },

  {
    slug: "money",
    title: "Money Help",
    href: "/money",
    icon: Wallet,
    tagline: "Money, food & financial support",
    description:
      "Find financial assistance, food support, budgeting help, and local resources.",
    accent: "text-chart-3",
    items: [
      {
        title: "Financial Assistance",
        meta: "Support",
        description:
          "Find financial assistance and support available in your country or area.",
      },
      {
        title: "Food Assistance",
        meta: "Local support",
        description:
          "Find food banks, community food programs, and other food support.",
      },
      {
        title: "Help With Bills",
        meta: "Financial support",
        description:
          "Find organizations that may help with essential household expenses.",
      },
      {
        title: "Budgeting Help",
        meta: "Money management",
        description:
          "Learn how to manage income, spending, saving, and debt.",
      },
    ],
  },

  {
    slug: "health",
    title: "Health & Care",
    href: "/health",
    icon: HeartPulse,
    tagline: "Find health & care support",
    description:
      "Find doctors, clinics, hospitals, pharmacies, health information, and care services.",
    accent: "text-chart-5",
    items: [
      {
        title: "Find a Doctor or Clinic",
        meta: "Healthcare",
        description:
          "Find healthcare providers and clinics near your location.",
      },
      {
        title: "Find a Hospital",
        meta: "Healthcare",
        description:
          "Find hospitals and other healthcare facilities near you.",
      },
      {
        title: "Find a Pharmacy",
        meta: "Medicine support",
        description:
          "Find pharmacies and information about accessing medicines.",
      },
      {
        title: "Mental Health Support",
        meta: "Wellbeing",
        description:
          "Find mental health and emotional support services.",
      },
    ],
  },

  {
    slug: "education",
    title: "Education",
    href: "/education",
    icon: GraduationCap,
    tagline: "Learn, study & build skills",
    description:
      "Find schools, universities, courses, scholarships, training, and education support.",
    accent: "text-chart-4",
    items: [
      {
        title: "Find a School",
        meta: "Education",
        description:
          "Find schools and educational opportunities in your area.",
      },
      {
        title: "Find a University",
        meta: "Higher education",
        description:
          "Explore universities, colleges, and higher education options.",
      },
      {
        title: "Find Scholarships",
        meta: "Education funding",
        description:
          "Find scholarships and other education funding opportunities.",
      },
      {
        title: "Find Courses & Training",
        meta: "Skills",
        description:
          "Find courses and training to develop new skills.",
      },
    ],
  },

  {
    slug: "travel",
    title: "Travel & Documents",
    href: "/travel",
    icon: Plane,
    tagline: "Travel, IDs & important documents",
    description:
      "Get help understanding passports, visas, identification, travel documents, and travel requirements.",
    accent: "text-chart-2",
    items: [
      {
        title: "Passport Help",
        meta: "Documents",
        description:
          "Find information about applying for or replacing a passport.",
      },
      {
        title: "Visa Information",
        meta: "Travel",
        description:
          "Learn about visa requirements and application processes.",
      },
      {
        title: "Replace a Lost Document",
        meta: "Document support",
        description:
          "Find guidance for replacing lost or damaged important documents.",
      },
      {
        title: "Travel Requirements",
        meta: "Travel information",
        description:
          "Check travel and entry requirements for your destination.",
      },
    ],
  },
]

export const findService = {
  slug: "services",
  title: "Find a Service",
  href: "/services",
  icon: Compass,
  tagline: "Search useful services near you",
  description:
    "Search for local businesses, organizations, professionals, and support services.",
}

export type NavItem = {
  href: string
  label: string
  icon: LucideIcon
}

export const bottomNav: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/ai", label: "HELP ME AI", icon: Sparkles },
  { href: "/services", label: "Services", icon: Compass },
  { href: "/notifications", label: "Alerts", icon: Bell },
  { href: "/profile", label: "Profile", icon: User },
]

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug)
}