"use client"

import Link from "next/link"
import CountrySelector from "@/components/country-selector"

const categories = [
  { slug: "jobs", title: "Find a Job", description: "Find jobs and employment support." },
  { slug: "housing", title: "Housing", description: "Find housing and accommodation." },
  { slug: "money", title: "Money Help", description: "Find financial and food assistance." },
  { slug: "health", title: "Health & Care", description: "Find healthcare and support." },
  { slug: "education", title: "Education", description: "Find schools, courses, and scholarships." },
  { slug: "travel", title: "Travel & Documents", description: "Find travel and document information." },
]

export default function HomePage() {
  return (
    <main>
      <h1>Welcome to HELP ME</h1>

      <Link href="/notifications">
        Notifications
      </Link>

      <CountrySelector />

      <h2>What do you need help with?</h2>

      {categories.map((category) => (
        <Link
          key={category.slug}
          href={"/" + category.slug}
        >
          <h3>{category.title}</h3>
          <p>{category.description}</p>
          <p>Get help →</p>
        </Link>
      ))}

      <Link href="/ai">
        HELP ME AI
      </Link>

      <br />

      <Link href="/profile">
        My Profile
      </Link>
    </main>
  )
}
