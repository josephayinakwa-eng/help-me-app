"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  FileText,
  HelpCircle,
  LogOut,
  Settings,
  User,
} from "lucide-react"

type Account = {
  name: string
  email: string
}

type HelpRequest = {
  id: string
  category: string
  request: string
  message: string
  country: string
  createdAt: string
}

export default function ProfilePage() {
  const [account, setAccount] = useState<Account | null>(null)
  const [requests, setRequests] = useState<HelpRequest[]>([])

  useEffect(() => {
    try {
      const savedAccount = localStorage.getItem("help-me-account")
      const savedRequests = localStorage.getItem("help-me-requests")

      if (savedAccount) {
        setAccount(JSON.parse(savedAccount))
      }

      if (savedRequests) {
        setRequests(JSON.parse(savedRequests))
      }
    } catch {
      setAccount(null)
      setRequests([])
    }
  }, [])

  function signOut() {
    setAccount(null)
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto w-full max-w-md">

        <Link
          href="/"
          className="text-sm font-medium text-primary"
        >
          ← Back to HELP ME
        </Link>

        <section className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-sm">
          {account ? (
            <div className="flex items-center gap-4">
              <div className="grid size-16 shrink-0 place-items-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                {account.name.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0">
                <h1 className="text-xl font-bold text-foreground">
                  {account.name}
                </h1>

                <p className="mt-1 truncate text-sm text-muted-foreground">
                  {account.email}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div className="grid size-16 place-items-center rounded-full bg-secondary">
                <User className="size-7" />
              </div>

              <h1 className="mt-4 text-2xl font-bold text-foreground">
                Guest User
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Sign in or create an account to save your progress.
              </p>

              <Link
                href="/account"
                className="mt-5 block rounded-2xl bg-primary px-4 py-3 text-center font-semibold text-primary-foreground"
              >
                Sign in or Create an Account
              </Link>
            </div>
          )}
        </section>

        <section className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-2xl font-bold text-foreground">
              {requests.length}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Help requests
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-2xl font-bold text-foreground">
              {account ? "Active" : "Guest"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Account status
            </p>
          </div>
        </section>

        <section className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">
              My Help Requests
            </h2>

            <span className="text-sm text-muted-foreground">
              {requests.length}
            </span>
          </div>

          {requests.length === 0 ? (
            <div className="mt-3 rounded-2xl border border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">
                You have not submitted any help requests yet.
              </p>

              <Link
                href="/"
                className="mt-4 inline-block text-sm font-semibold text-primary"
              >
                Find help →
              </Link>
            </div>
          ) : (
            <div className="mt-3 space-y-3">
              {requests
                .slice()
                .reverse()
                .map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {item.category}
                    </p>

                    <h3 className="mt-1 font-bold text-foreground">
                      {item.request}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.message}
                    </p>

                    {item.country && (
                      <p className="mt-3 text-xs text-muted-foreground">
                        Country: {item.country}
                      </p>
                    )}

                    <p className="mt-1 text-xs text-muted-foreground">
                      Submitted: {item.createdAt}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </section>

        <section className="mt-6 space-y-3">
          <Link
            href="/saved-services"
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 font-semibold text-foreground"
          >
            <FileText className="size-5" />
            Saved Services
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 font-semibold text-foreground"
          >
            <Settings className="size-5" />
            Settings
          </Link>

          <Link
            href="/help"
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 font-semibold text-foreground"
          >
            <HelpCircle className="size-5" />
            Help & Support
          </Link>

          {account && (
            <button
              type="button"
              onClick={signOut}
              className="flex w-full items-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 font-semibold text-destructive"
            >
              <LogOut className="size-5" />
              Sign Out
            </button>
          )}
        </section>

      </div>
    </main>
  )
}