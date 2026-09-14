import Link from "next/link"
import {
  Bookmark,
  ChevronRight,
  FileText,
  HelpCircle,
  Settings,
  Shield,
  User,
} from "lucide-react"
import { ScreenHeader } from "@/components/screen-header"

const savedStats = [
  { label: "Saved", value: "6" },
  { label: "Applications", value: "2" },
  { label: "Documents", value: "4" },
]

const menu = [
  { icon: Bookmark, label: "Saved services", href: "/services", accent: "text-chart-1" },
  { icon: FileText, label: "My documents", href: "/travel", accent: "text-chart-2" },
  { icon: Shield, label: "Privacy & safety", href: "/settings", accent: "text-chart-5" },
  { icon: HelpCircle, label: "Help & support", href: "/ai", accent: "text-chart-3" },
  { icon: Settings, label: "Settings", href: "/settings", accent: "text-muted-foreground" },
]

export default function ProfilePage() {
  return (
    <>
      <ScreenHeader
        title="Profile"
        subtitle="Your account and saved help"
        backHref="/"
        right={
          <Link
            href="/settings"
            aria-label="Settings"
            className="grid size-9 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
          >
            <Settings className="size-5" />
          </Link>
        }
      />

      <main className="mx-auto w-full max-w-md flex-1 space-y-5 px-4 pb-8 pt-5">
        <section className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            <User className="size-7" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-bold text-card-foreground">Guest user</h2>
            <p className="text-sm text-muted-foreground">Sign in to save your progress</p>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-3">
          {savedStats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </section>

        <section className="overflow-hidden rounded-2xl border border-border bg-card">
          {menu.map((item, i) => {
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-secondary/60 ${
                  i !== menu.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <Icon className={`size-5 ${item.accent}`} />
                <span className="flex-1 font-medium text-card-foreground">{item.label}</span>
                <ChevronRight className="size-5 text-muted-foreground" />
              </Link>
            )
          })}
        </section>

        <Link
          href="/ai"
          className="flex w-full items-center justify-center rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Sign in or create an account
        </Link>
      </main>
    </>
  )
}
