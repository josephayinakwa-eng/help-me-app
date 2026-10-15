"use client"

import Link from "next/link"

export default function NotificationsPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto w-full max-w-md">

        <Link
          href="/"
          className="text-sm font-medium text-primary"
        >
          ← Back to HELP ME
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            HELP ME
          </p>

          <h1 className="mt-2 text-3xl font-bold text-foreground">
            Notifications
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Important updates and information will appear here.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-semibold text-foreground">
            No new notifications
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            You are all caught up. New updates will appear here when
            they become available.
          </p>
        </div>

      </div>
    </main>
  )
}