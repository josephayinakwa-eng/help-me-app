import { notFound } from "next/navigation"
import { ScreenHeader } from "@/components/screen-header"
import { ResourceItem } from "@/components/resource-item"
import { categories, getCategory } from "@/lib/app-data"

export function generateStaticParams() {
  return categories.map(function (category) {
    return {
      category: category.slug,
    }
  })
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const result = await params
  const category = result.category
  const data = getCategory(category)

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

          <p className="text-sm leading-relaxed text-muted-foreground">
            {data.description}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground">
            Helpful resources
          </h2>

          {data.items.map(function (item) {
            return (
              <ResourceItem
                key={item.title}
                title={item.title}
                description={item.description}
                href={item.href}
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