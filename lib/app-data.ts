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
    href?: string
    search?: string
  }[]
}

export const categories: Category[] = [
  {
    slug: "jobs",
    title: "Jobs",
    href: "/jobs",
    icon: Briefcase,
    tagline: "Find work and build your CV",
    description: "Explore job opportunities, prepare your CV, and find help with applications.",
    accent: "text-chart-1",
    items: [
      {
        title: "Warehouse Operative",
        meta: "Search current vacancies",
        description: "Explore warehouse jobs and check the requirements before applying.",
        search: "warehouse operative jobs",
      },
      {
        title: "Care Assistant",
        meta: "Search current vacancies",
        description: "Explore care assistant jobs and check the requirements before applying.",
        search: "care assistant jobs",
      },
      {
        title: "Delivery Driver",
        meta: "Search current vacancies",
        description: "Explore delivery driver jobs and check the requirements before applying.",
        search: "delivery driver jobs",
      },
      {
        title: "Customer Support",
        meta: "Search current vacancies",
        description: "Explore customer support jobs, including remote opportunities.",
        search: "customer support jobs",
      },
    ],
  },
  {
    slug: "housing",
    title: "Housing",
    href: "/housing",
    icon: Home,
    tagline: "Somewhere safe to stay",
    description: "Explore emergency shelter, affordable housing, and tenancy support.",
    accent: "text-chart-2",
    items: [
      {
        title: "Emergency shelter",
        meta: "Find local support",
        description: "Search for emergency accommodation and safe places to stay.",
        search: "emergency shelter housing assistance",
      },
      {
        title: "Affordable housing",
        meta: "Housing information",
        description: "Explore affordable housing options and local housing programmes.",
        search: "affordable housing assistance",
      },
      {
        title: "Rent deposit assistance",
        meta: "Financial support",
        description: "Find programmes that may help with rental deposits and moving costs.",
        search: "rent deposit assistance programmes",
      },
      {
        title: "Tenant rights",
        meta: "Housing guidance",
        description: "Learn about tenant rights and how to get help with housing problems.",
        search: "tenant rights housing advice",
      },
    ],
  },
  {
    slug: "money",
    title: "Money Help",
    href: "/money",
    icon: Wallet,
    tagline: "Benefits, food and budgeting",
    description: "Explore financial assistance, food support, debt advice, and budgeting resources.",
    accent: "text-chart-3",
    items: [
      {
        title: "Financial assistance",
        meta: "Find support",
        description: "Search for financial assistance programmes in your area.",
        search: "financial assistance programmes",
      },
      {
        title: "Emergency food assistance",
        meta: "Food support",
        description: "Find food banks, community kitchens, and emergency food programmes.",
        search: "emergency food assistance",
      },
      {
        title: "Free debt advice",
        meta: "Money guidance",
        description: "Find organisations that offer debt advice and financial guidance.",
        search: "free debt advice",
      },
      {
        title: "Budgeting help",
        meta: "Manage your money",
        description: "Learn how to plan spending, manage income, and build a budget.",
        search: "free budgeting help",
      },
    ],
  },
  {
    slug: "health",
    title: "Health & Care",
    href: "/health",
    icon: HeartPulse,
    tagline: "Look after yourself",
    description: "Find healthcare services, urgent care information, and wellbeing support.",
    accent: "text-chart-5",
    items: [
      {
        title: "Find a doctor",
        meta: "Healthcare services",
        description: "Search for doctors and healthcare providers in your area.",
        search: "healthcare clinics",
      },
      {
        title: "Urgent medical care",
        meta: "Find medical help",
        description: "Find medical facilities and urgent healthcare services.",
        search: "urgent medical care",
      },
      {
        title: "Mental health support",
        meta: "Wellbeing resources",
        description: "Find mental health services and organisations offering support.",
        search: "mental health support services",
      },
      {
        title: "Affordable healthcare",
        meta: "Healthcare information",
        description: "Explore healthcare assistance and affordable treatment options.",
        search: "affordable healthcare assistance",
      },
    ],
  },
  {
    slug: "education",
    title: "Education",
    href: "/education",
    icon: GraduationCap,
    tagline: "Learn new skills",
    description: "Discover courses, scholarships, digital skills training, and educational support.",
    accent: "text-chart-4",
    items: [
      {
        title: "Free online courses",
        meta: "Learn new skills",
        description: "Explore free courses and training opportunities online.",
        search: "free online courses",
      },
      {
        title: "Digital skills training",
        meta: "Beginner friendly",
        description: "Find resources to learn computer, internet, and digital skills.",
        search: "free digital skills training",
      },
      {
        title: "Scholarships",
        meta: "Education funding",
        description: "Search for scholarships and financial support for students.",
        search: "scholarships for students",
      },
      {
        title: "Vocational training",
        meta: "Career development",
        description: "Explore practical training programmes that can help you find work.",
        search: "vocational training programmes",
      },
    ],
  },
  {
    slug: "travel",
    title: "Travel & Documents",
    href: "/travel",
    icon: Plane,
    tagline: "IDs, papers and getting around",
    description: "Find information about travel documents, official paperwork, and travel assistance.",
    accent: "text-chart-2",
    items: [
      {
        title: "Replace a lost ID",
        meta: "Document guidance",
        description: "Find official information about replacing a lost identity document.",
        search: "official government lost ID replacement",
      },
      {
        title: "Immigration information",
        meta: "Official guidance",
        description: "Find official immigration information for your destination country.",
        search: "official government immigration information",
      },
      {
        title: "Travel assistance",
        meta: "Travel support",
        description: "Search for travel assistance programmes and affordable transport options.",
        search: "travel assistance programmes",
      },
      {
        title: "Document translation",
        meta: "Translation services",
        description: "Find document translation services and information about certified translations.",
        search: "certified document translation services",
      },
    ],
  },
]

export function getResourceHref(search: string, country?: string) {
  const selectedCountry =
    country ||
    (typeof window !== "undefined"
      ? localStorage.getItem("help-me-country")
      : null) ||
    "Ghana"

  const query = search + " in " + selectedCountry

  return "https://www.google.com/search?q=" + encodeURIComponent(query)
}

export const findService = {
  slug: "services",
  title: "Find a Service",
  href: "/services",
  icon: Compass,
  tagline: "Search everything in one place",
  description: "Search across every HELP ME category and discover useful support resources.",
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
  return categories.find((category) => category.slug === slug)
}