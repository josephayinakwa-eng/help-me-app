"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type Toggle = { id: string; label: string; description: string; default: boolean }

const groups: { heading: string; toggles: Toggle[] }[] = [
  {
    heading: "Notifications",
    toggles: [
      { id: "jobs", label: "Job alerts", description: "New roles matching your area.", default: true },
      { id: "reminders", label: "Reminders", description: "Appointments and applications.", default: true },
      { id: "tips", label: "Helpful tips", description: "Occasional support suggestions.", default: false },
    ],
  },
  {
    heading: "Privacy",
    toggles: [
      { id: "anon", label: "Private mode", description: "Hide your activity from this device.", default: false },
      { id: "location", label: "Use my location", description: "Show services closest to you.", default: true },
    ],
  },
]

export function SettingsList() {
  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <section key={group.heading}>
          <h2 className="mb-2 px-1 text-sm font-semibold text-muted-foreground">{group.heading}</h2>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            {group.toggles.map((t, i) => (
              <SettingRow key={t.id} toggle={t} last={i === group.toggles.length - 1} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function SettingRow({ toggle, last }: { toggle: Toggle; last: boolean }) {
  const [on, setOn] = useState(toggle.default)
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3.5",
        !last && "border-b border-border",
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="font-medium text-card-foreground">{toggle.label}</p>
        <p className="text-sm text-muted-foreground">{toggle.description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={toggle.label}
        onClick={() => setOn((v) => !v)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          on ? "bg-primary" : "bg-input",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform",
            on ? "translate-x-[22px]" : "translate-x-0.5",
          )}
        />
      </button>
    </div>
  )
}
