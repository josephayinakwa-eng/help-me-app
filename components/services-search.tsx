"use client"

import { useEffect, useState } from "react"

type Service = {
  title: string
  description: string
  category: string
}

const services: Service[] = [
  {
    title: "Find a Job",
    description: "Find job opportunities and employment support near you.",
    category: "Jobs",
  },
  {
    title: "Find Housing",
    description: "Find housing, rooms, shelters, and accommodation support.",
    category: "Housing",
  },
  {
    title: "Financial Help",
    description: "Find financial assistance, food support, and help with bills.",
    category: "Money Help",
  },
  {
    title: "Health Services",
    description:
      "Find doctors, clinics, hospitals, pharmacies, and care services.",
    category: "Health & Care",
  },
  {
    title: "Education",
    description:
      "Find schools, universities, courses, scholarships, and training.",
    category: "Education",
  },
  {
    title: "Travel & Documents",
    description:
      "Find information about passports, visas, identification, and travel.",
    category: "Travel & Documents",
  },
  {
    title: "Local Services",
    description:
      "Find useful businesses, professionals, organizations, and support.",
    category: "Services",
  },
]

export function ServicesSearch() {
  const [country, setCountry] = useState("")
  const [search, setSearch] = useState("")
  const [savedServices, setSavedServices] = useState<string[]>([])

  useEffect(() => {
    const savedCountry = localStorage.getItem("help-me-country")
    const saved = localStorage.getItem("help-me-saved-services")

    if (savedCountry) {
      setCountry(savedCountry)
    }

    if (saved) {
      setSavedServices(JSON.parse(saved))
    }
  }, [])

  function toggleSaved(title: string) {
    const updated = savedServices.includes(title)
      ? savedServices.filter((item) => item !== title)
      : [...savedServices, title]

    setSavedServices(updated)

    localStorage.setItem(
      "help-me-saved-services",
      JSON.stringify(updated)
    )
  }

  const filteredServices = services.filter((service) => {
    const text =
      service.title + " " + service.description + " " + service.category

    return text.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Your location</p>

        <h2 className="mt-1 text-xl font-bold text-gray-900">
          {country || "Country not selected"}
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Services will be tailored to your selected country.
        </p>
      </div>

      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search for help or a service..."
        className="w-full rounded-xl border px-4 py-3 text-gray-900 outline-none focus:ring-2"
      />

      <div className="space-y-3">
        {filteredServices.map((service) => {
          const isSaved = savedServices.includes(service.title)

          return (
            <div
              key={service.title}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {service.category}
              </p>

              <h3 className="mt-1 text-lg font-bold text-gray-900">
                {service.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {service.description}
              </p>

              <button
                type="button"
                onClick={() => toggleSaved(service.title)}
                className="mt-4 w-full rounded-xl border px-4 py-3 text-sm font-semibold"
              >
                {isSaved ? "★ Saved" : "☆ Save Service"}
              </button>
            </div>
          )
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="rounded-2xl border bg-gray-50 p-6 text-center">
          <p className="font-semibold text-gray-900">
            No matching services found.
          </p>

          <p className="mt-1 text-sm text-gray-600">
            Try searching for something else.
          </p>
        </div>
      )}
    </div>
  )
}