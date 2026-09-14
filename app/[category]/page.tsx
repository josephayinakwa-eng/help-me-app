import { notFound } from "next/navigation"
import { Phone } from "lucide-react"
import { ScreenHeader } from "@/components/screen-header"
import { ResourceItem } from "@/components/resource-item"
import { categories, getCategory } from "@/lib/app-data"

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }))
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const data = getCategory(category)

  if (!data) {
    notFound()
  }

  const Icon = data.icon

  return (
    <>
      <ScreenHeader title={data.title} subtitle={data.tagline} backHref="/" />

      <main className="mx-auto w-full max-w-md flex-1 space-y-5 px-4 pb-8 pt-5">
        <section className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-secondary">
            <Icon className={`size-6 ${data.accent}`} />
          </span>
          <p className="text-sm leading-relaxed text-muted-foreground">{data.description}</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground">Popular right now</h2>
          {data.items.map((item) => (
            <ResourceItem key={item.title} {...item} />
          ))}
        </section>

        <section className="rounded-2xl bg-secondary p-4">
          <h3 className="font-semibold text-foreground">Need to speak to someone?</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            A HELP ME adviser can talk you through your options, free and in confidence.
          </p>
          <a
            href="tel:0800000000"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Phone className="size-4" />
            Call a free adviser
          </a>
        </section>
      </main>
    </>
  )
}
