import Link from "next/link"
import { Bell, Phone, Search, Sparkles, ArrowRight } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"
import { categories, findService } from "@/lib/app-data"

export default function HomePage() {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 px-4 py-3.5 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <BrandLogo />
          <Link
            href="/notifications"
            aria-label="Notifications"
            className="relative grid size-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
          >
            <Bell className="size-5" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive ring-2 ring-card" />
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-md flex-1 space-y-6 px-4 pb-8 pt-5">
        <section className="rounded-3xl bg-primary p-5 text-primary-foreground shadow-lg">
          <p className="text-sm font-medium text-primary-foreground/80">Welcome back</p>
          <h2 className="mt-1 text-xl font-bold leading-snug text-balance">
            What do you need help with today?
          </h2>
          <Link
            href="/services"
            className="mt-4 flex items-center gap-2 rounded-2xl bg-primary-foreground/15 px-4 py-3 text-sm font-medium backdrop-blur transition-colors hover:bg-primary-foreground/25"
          >
            <Search className="size-4" />
            Search for a service or support...
          </Link>
        </section>

        <Link
          href="/ai"
          className="flex items-center gap-4 rounded-2xl border border-accent bg-accent/40 p-4 transition-colors hover:bg-accent/60"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold text-foreground">Ask HELP ME AI</span>
            <span className="block text-sm text-muted-foreground">
              Get instant, private answers to any question.
            </span>
          </span>
          <ArrowRight className="size-5 shrink-0 text-primary" />
        </Link>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">Get help with</h2>
            <Link href={findService.href} className="text-sm font-medium text-primary">
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
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-secondary/60"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-secondary">
                    <Icon className={`size-6 ${cat.accent}`} />
                  </span>
                  <span>
                    <span className="block font-semibold leading-tight text-card-foreground">
                      {cat.title}
                    </span>
                    <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                      {cat.tagline}
                    </span>
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive">
              <Phone className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-foreground">In an emergency?</h3>
              <p className="text-sm text-muted-foreground">
                If someone is in danger, call your local emergency number now.
              </p>
            </div>
          </div>
          <a
            href="tel:999"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-destructive py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Phone className="size-4" />
            Call emergency services
          </a>
        </section>
      </main>
    </>
  )
}
