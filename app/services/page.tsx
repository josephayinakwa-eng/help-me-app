"use client"

import Link from "next/link"

export default function ServicesPage() {
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
            Services
          </h1>

          <p className="mt-2 text-muted-foreground">
            Find help, information, and support.
          </p>
        </div>

        <div className="mt-6 space-y-4">

          <Link
            href="/jobs"
            className="block rounded-3xl border border-border bg-card p-5 shadow-sm transition hover:bg-muted"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-3xl">
                🤝
              </div>

              <div>
                <h2 className="font-semibold text-card-foreground">
                  Find Help
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Find the type of help you need.
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/about"
            className="block rounded-3xl border border-border bg-card p-5 shadow-sm transition hover:bg-muted"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-3xl">
                ℹ️
              </div>

              <div>
                <h2 className="font-semibold text-card-foreground">
                  Get Information
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Learn how HELP ME works.
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/help"
            className="block rounded-3xl border border-border bg-card p-5 shadow-sm transition hover:bg-muted"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-3xl">
                💬
              </div>

              <div>
                <h2 className="font-semibold text-card-foreground">
                  Contact Support
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Send a request for assistance.
                </p>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </main>
  )
}
