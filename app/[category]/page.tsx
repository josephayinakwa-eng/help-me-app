"use client"

import { useEffect, useState } from "react"
import { notFound, useParams } from "next/navigation"
import { ScreenHeader } from "@/components/screen-header"
import { ResourceItem } from "@/components/resource-item"
import { categories, getCategory, getResourceHref } from "@/lib/app-data"

export default function CategoryPage() {
  const params = useParams<{ category: string }>()
  const slug = params.category
  const data = getCategory(slug)

  const [country, setCountry] = useState("Ghana")

  useEffect(() => {
    function loadCountry() {
      const savedCountry = localStorage.getItem("help-me-country")
      setCountry(savedCountry || "Ghana")
    }

    loadCountry()

    window.addEventListener("help-me-country-changed", loadCountry)

    return () => {
      window.removeEventListener("help-me-country-changed", loadCountry)
    }
  }, [])

  if (!data) {
    notFound()
  }

  const Icon = data.icon

  return (
    <>
      <ScreenHeader
        title={data.title}
        subtitle={data.tagline}
        backHref="/"
      />

      <main className="mx-auto w-full max-w-md flex-1 space-y-5 px-4 pb-8 pt-5">
        <section className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-secondary">
            <Icon className="size-6" />
          </span>

          <div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {data.description}
            </p>

            <p className="mt-2 text-sm font-semibold text-foreground">
              Selected country: {country}
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground">
            Helpful resources
          </h2>

          {data.items.map((item) => {
            const resourceHref = item.search
              ? getResourceHref(item.search, country)
              : item.href

            return (
              <ResourceItem
                key={item.title}
                title={item.title}
                description={item.description}
                meta={item.meta}
                href={resourceHref}
              />
            )
          })}
        </section>

        <section className="rounded-2xl bg-secondary p-4">
          <h3 className="font-semibold text-foreground">
            Need urgent help?
          </h3>

          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            If you are in immediate danger, contact the emergency services
            in your country. You can also explore the resources available
            in HELP ME.
          </p>
        </section>
      </main>
    </>
  )
}