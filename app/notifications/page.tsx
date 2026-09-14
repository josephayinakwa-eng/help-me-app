import { Briefcase, Home, HeartPulse, Wallet, Bell } from "lucide-react"
import { ScreenHeader } from "@/components/screen-header"

const notifications = [
  {
    icon: Briefcase,
    accent: "text-chart-1",
    title: "New jobs near you",
    body: "3 warehouse roles were added in your area today.",
    time: "2h ago",
    unread: true,
  },
  {
    icon: Home,
    accent: "text-chart-2",
    title: "Housing application update",
    body: "Your council housing register form is ready to continue.",
    time: "Yesterday",
    unread: true,
  },
  {
    icon: Wallet,
    accent: "text-chart-3",
    title: "You may be missing out",
    body: "A quick benefits check could find support you can claim.",
    time: "2 days ago",
    unread: false,
  },
  {
    icon: HeartPulse,
    accent: "text-chart-5",
    title: "Appointment reminder",
    body: "Remember to register with a GP to access free care.",
    time: "4 days ago",
    unread: false,
  },
]

export default function NotificationsPage() {
  return (
    <>
      <ScreenHeader title="Alerts" subtitle="Updates and reminders for you" backHref="/" />

      <main className="mx-auto w-full max-w-md flex-1 space-y-3 px-4 pb-8 pt-5">
        {notifications.map((n) => {
          const Icon = n.icon
          return (
            <div
              key={n.title}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary">
                <Icon className={`size-5 ${n.accent}`} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-semibold text-card-foreground">{n.title}</h3>
                  {n.unread && <span className="size-2 shrink-0 rounded-full bg-primary" />}
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
                <p className="mt-1.5 text-xs text-muted-foreground">{n.time}</p>
              </div>
            </div>
          )
        })}

        <div className="flex flex-col items-center gap-2 pt-6 text-center">
          <span className="grid size-10 place-items-center rounded-full bg-secondary text-muted-foreground">
            <Bell className="size-5" />
          </span>
          <p className="text-sm text-muted-foreground">You&apos;re all caught up.</p>
        </div>
      </main>
    </>
  )
}
