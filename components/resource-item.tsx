import { ChevronRight } from "lucide-react"

export function ResourceItem({
  title,
  meta,
  description,
}: {
  title: string
  meta: string
  description: string
}) {
  return (
    <button
      type="button"
      className="group flex w-full items-start gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40 hover:bg-secondary/60"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-semibold text-card-foreground">{title}</h3>
        </div>
        <p className="mt-0.5 text-xs font-medium text-primary">{meta}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <ChevronRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </button>
  )
}
