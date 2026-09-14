import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

export function ScreenHeader({
  title,
  subtitle,
  backHref,
  right,
  className,
}: {
  title: string
  subtitle?: string
  backHref?: string
  right?: React.ReactNode
  className?: string
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75",
        className,
      )}
    >
      <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-3.5">
        {backHref && (
          <Link
            href={backHref}
            aria-label="Go back"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
          >
            <ChevronLeft className="size-5" />
          </Link>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold leading-tight text-foreground">{title}</h1>
          {subtitle && <p className="truncate text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {right}
      </div>
    </header>
  )
}
