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
  /** tailwind text color token class for the icon */
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
    tagline: "Find work & build your CV",
    description: "Search local roles, get help writing your CV, and prepare for interviews.",
    accent: "text-chart-1",
    items: [
      { title: "Warehouse Operative", meta: "Full time · £12.20/hr", description: "Manchester · No experience needed, training provided." },
      { title: "Care Assistant", meta: "Part time · £11.80/hr", description: "Leeds · Flexible shifts, DBS support available." },
      { title: "Delivery Driver", meta: "Flexible · £13/hr", description: "Own hours · Valid UK licence required." },
      { title: "Customer Support", meta: "Remote · £22,000/yr", description: "Work from home · Full training included." },
    ],
  },
  {
    slug: "housing",
    title: "Housing",
    href: "/housing",
    icon: Home,
    tagline: "Somewhere safe to stay",
    description: "Emergency shelter, affordable housing options, and tenancy support.",
    accent: "text-chart-2",
    items: [
      { title: "Emergency shelter tonight", meta: "Available now", description: "Find a safe bed near you within the next few hours." },
      { title: "Council housing register", meta: "Guide", description: "Step-by-step help to join your local housing list." },
      { title: "Rent deposit scheme", meta: "Financial help", description: "Support with up-front costs for a private tenancy." },
      { title: "Report a housing problem", meta: "Tenant rights", description: "Damp, repairs, or an unsafe landlord? Get help here." },
    ],
  },
  {
    slug: "money",
    title: "Money Help",
    href: "/money",
    icon: Wallet,
    tagline: "Benefits, debt & budgeting",
    description: "Check what you can claim, get debt advice, and manage your budget.",
    accent: "text-chart-3",
    items: [
      { title: "Benefits calculator", meta: "5 min check", description: "See what support you may be entitled to claim." },
      { title: "Emergency food & funds", meta: "Available now", description: "Local food banks and crisis grants near you." },
      { title: "Free debt advice", meta: "Confidential", description: "Speak to a trained adviser about what you owe." },
      { title: "Budgeting planner", meta: "Tool", description: "Track income and spending in one simple place." },
    ],
  },
  {
    slug: "health",
    title: "Health & Care",
    href: "/health",
    icon: HeartPulse,
    tagline: "Look after yourself",
    description: "Register with a doctor, find urgent care, and access mental health support.",
    accent: "text-chart-5",
    items: [
      { title: "Register with a GP", meta: "Guide", description: "You can register even without a fixed address." },
      { title: "Urgent care near me", meta: "Available now", description: "Find the nearest walk-in centre or pharmacy." },
      { title: "Mental health support", meta: "24/7", description: "Talk to someone now if you are struggling to cope." },
      { title: "Free prescriptions check", meta: "2 min check", description: "Find out if you qualify for help with costs." },
    ],
  },
  {
    slug: "education",
    title: "Education",
    href: "/education",
    icon: GraduationCap,
    tagline: "Learn new skills",
    description: "Free courses, English classes, and support for children's schooling.",
    accent: "text-chart-4",
    items: [
      { title: "Free English (ESOL) classes", meta: "Local", description: "Improve your English speaking and writing for free." },
      { title: "Basic digital skills", meta: "Beginner", description: "Learn to use a phone, email, and the internet." },
      { title: "School places for children", meta: "Guide", description: "How to apply for a school place mid-year." },
      { title: "Adult learning grants", meta: "Funding", description: "Money to help you retrain or return to study." },
    ],
  },
  {
    slug: "travel",
    title: "Travel & Documents",
    href: "/travel",
    icon: Plane,
    tagline: "IDs, papers & getting around",
    description: "Replace lost documents, understand your status, and plan travel.",
    accent: "text-chart-2",
    items: [
      { title: "Replace a lost ID", meta: "Guide", description: "Steps to replace a passport, BRP, or driving licence." },
      { title: "Immigration advice", meta: "Confidential", description: "Free, regulated advice about your status and rights." },
      { title: "Free travel help", meta: "Local", description: "Bus passes and travel support if you're on a low income." },
      { title: "Translate a document", meta: "Tool", description: "Get official letters translated into your language." },
    ],
  },
]

export const findService = {
  slug: "services",
  title: "Find a Service",
  href: "/services",
  icon: Compass,
  tagline: "Search everything in one place",
  description: "Search across every HELP ME category and local support service.",
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
