import Link from "next/link"
import { Bell, Phone, Search, Sparkles, ArrowRight } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"
import { CountrySelector } from "@/components/country-selector"
import { categories, findService } from "@/lib/app-data"

export default function HomePage() {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-border bg-background px-4 py-3">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <BrandLogo />
          <Link href="/notifications" aria-label="Notifications">
            <Bell className="size-5" />
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-md space-y-6 px-4 pb-8 pt-5">
        <section className="rounded-3xl bg-primary p-5 text-primary-foreground">
          <p className="text-sm">Welcome to HELP ME</p>
          <h2 className="mt-1 text-xl font-bold">
            What do you need help with today?
          </h2>
          <Link
            href="/services"
            className="mt-4 flex items-center gap-2 rounded-xl bg-background p-3 text-foreground"
          >
            <Search className="size-4" />
            Search for a service or support
          </Link>
        </section>

        <section className="rounded-2xl border border-border bg-card p-4">
          <CountrySelector />
        </section>

        <Link
          href="/ai"
          className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
        >
          <Sparkles className="size-6" />
          <span className="flex-1">
            <span className="block font-semibold">Ask HELP ME AI</span>
            <span className="block text-sm text-muted-foreground">
              Get help with your questions.
            </span>
          </span>
          <ArrowRight className="size-5" />
        </Link>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold">Get help with</h2>
            <Link href={findService.href} className="text-sm text-primary">
              See all
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon

              return (
                <Link
                  key={cat.slug}
                  href={cat.href}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4"
                >
                  <Icon className={"size-6 " + cat.accent} />
                  <span className="font-semibold">{cat.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {cat.tagline}
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <Phone className="size-5" />
            <div>
              <h3 className="font-semibold">In an emergency?</h3>
              <p className="text-sm text-muted-foreground">
                Call your local emergency services if someone is in danger.
              </p>
            </div>
          </div>

          <a
            href="tel:999"
            className="mt-3 block rounded-xl bg-destructive p-3 text-center text-white"
          >
            Call emergency services
          </a>
        </section>
      </main>
    </>
  )
}