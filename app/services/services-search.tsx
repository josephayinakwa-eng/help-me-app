"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search, X } from "lucide-react"
import { categories } from "@/lib/app-data"

type Row = {
  title: string
  meta: string
  description: string
  categoryTitle: string
  href: string
}

const ALL_ROWS: Row[] = categories.flatMap((cat) =>
  cat.items.map((item) => ({
    ...item,
    categoryTitle: cat.title,
    href: cat.href,
  })),
)

export function ServicesSearch() {
  const [query, setQuery] = useState("")

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ALL_ROWS
    return ALL_ROWS.filter((r) =>
      [r.title, r.description, r.categoryTitle, r.meta].join(" ").toLowerCase().includes(q),
    )
  }, [query])

  return (
    <main className="mx-auto w-full max-w-md flex-1 space-y-5 px-4 pb-8 pt-5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search jobs, housing, money, health..."
          className="w-full rounded-2xl border border-border bg-card py-3 pl-11 pr-10 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-secondary"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {!query && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
            >
              {cat.title}
            </Link>
          ))}
        </div>
      )}

      <section className="space-y-3">
        <p className="text-sm font-semibold text-muted-foreground">
          {query ? `${results.length} result${results.length === 1 ? "" : "s"}` : "All services"}
        </p>

        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
            <p className="font-medium text-foreground">No matches found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different word, or ask HELP ME AI for help.
            </p>
            <Link
              href="/ai"
              className="mt-4 inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Ask HELP ME AI
            </Link>
          </div>
        ) : (
          results.map((r) => (
            <Link
              key={`${r.categoryTitle}-${r.title}`}
              href={r.href}
              className="block rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-secondary/60"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="truncate font-semibold text-card-foreground">{r.title}</h3>
                <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {r.categoryTitle}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>
            </Link>
          ))
        )}
      </section>
    </main>
  )
}
