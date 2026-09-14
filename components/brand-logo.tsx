import { LifeBuoy } from "lucide-react"
import { cn } from "@/lib/utils"

export function BrandLogo({
  className,
  showWordmark = true,
  size = "md",
}: {
  className?: string
  showWordmark?: boolean
  size?: "sm" | "md" | "lg"
}) {
  const dims = size === "lg" ? "size-11" : size === "sm" ? "size-8" : "size-9"
  const icon = size === "lg" ? "size-6" : size === "sm" ? "size-4" : "size-5"

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "grid place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm",
          dims,
        )}
        aria-hidden="true"
      >
        <LifeBuoy className={icon} strokeWidth={2.25} />
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="text-base font-extrabold tracking-tight text-foreground">HELP ME</span>
          <span className="text-[11px] font-medium text-muted-foreground">Support, made simple</span>
        </span>
      )}
    </span>
  )
}
