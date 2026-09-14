import Link from "next/link"
import { LifeBuoy } from "lucide-react"
import { ScreenHeader } from "@/components/screen-header"
import { SettingsList } from "./settings-list"

export default function SettingsPage() {
  return (
    <>
      <ScreenHeader title="Settings" subtitle="Manage your preferences" backHref="/profile" />

      <main className="mx-auto w-full max-w-md flex-1 space-y-6 px-4 pb-8 pt-5">
        <SettingsList />

        <section className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
              <LifeBuoy className="size-5" />
            </span>
            <div>
              <p className="font-semibold text-card-foreground">HELP ME</p>
              <p className="text-sm text-muted-foreground">Version 1.0 · Support, made simple</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <Link href="/ai" className="font-medium text-primary">
              Contact support
            </Link>
            <Link href="/services" className="font-medium text-primary">
              Browse services
            </Link>
          </div>
        </section>

        <button
          type="button"
          className="w-full rounded-2xl border border-destructive/30 bg-destructive/5 py-3 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10"
        >
          Clear my data on this device
        </button>
      </main>
    </>
  )
}
