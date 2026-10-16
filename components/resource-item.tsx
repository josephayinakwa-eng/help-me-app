import Link from "next/link"
import { ChevronRight } from "lucide-react"

type ResourceItemProps = {
  title: string
  description: string
  meta?: string
  href?: string
}

export function ResourceItem({
  title,
  description,
  meta,
  href,
}: ResourceItemProps) {
  const content = (
    <>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-card-foreground">{title}</h3>

        {meta && (
          <p className="mt-0.5 text-xs font-medium text-primary">
            {meta}
          </p>
        )}

        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      <ChevronRight className="mt-1 size-5 shrink-0 text-muted-foreground" />
    </>
  )

  const className =
    "group flex w-full items-start gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40 hover:bg-secondary/60"

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    )
  }

  return <div className={className}>{content}</div>
}