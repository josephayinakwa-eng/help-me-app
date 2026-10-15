"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

type Account = {
  name: string
  email: string
  phone: string
}

export default function AccountPage() {
  const [mode, setMode] = useState<"signin" | "create">("signin")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("help-me-account")

    if (saved) {
      try {
        const account: Account = JSON.parse(saved)
        setEmail(account.email || "")
      } catch {
        // Ignore invalid saved account data.
      }
    }
  }, [])

  function createAccount() {
    if (!name.trim() || !email.trim()) {
      setMessage("Please enter your name and email.")
      return
    }

    const account: Account = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    }

    localStorage.setItem("help-me-account", JSON.stringify(account))
    localStorage.setItem("help-me-signed-in", "true")

    setMessage("Account created successfully.")
  }

  function signIn() {
    const saved = localStorage.getItem("help-me-account")

    if (!saved) {
      setMessage("No account found. Please create an account first.")
      return
    }

    try {
      const account: Account = JSON.parse(saved)

      if (
        !email.trim() ||
        email.trim().toLowerCase() !== account.email.toLowerCase()
      ) {
        setMessage("The email does not match your saved account.")
        return
      }

      localStorage.setItem("help-me-signed-in", "true")
      setMessage("Signed in successfully.")
    } catch {
      setMessage("There was a problem with your saved account.")
    }
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

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            HELP ME
          </p>

          <h1 className="mt-2 text-3xl font-bold text-foreground">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {mode === "signin"
              ? "Sign in to access your HELP ME account."
              : "Create an account to keep track of your help requests."}
          </p>
        </div>

        <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-sm">

          {mode === "create" && (
            <>
              <label className="text-sm font-medium text-foreground">
                Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mt-2 mb-4 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground"
              />

              <label className="text-sm font-medium text-foreground">
                Phone
              </label>

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="mt-2 mb-4 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground"
              />
            </>
          )}

          <label className="text-sm font-medium text-foreground">
            Email
          </label>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground"
          />

          <button
            onClick={mode === "signin" ? signIn : createAccount}
            className="mt-5 w-full rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground"
          >
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>

          {message && (
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {message}
            </p>
          )}

          <div className="mt-6 text-center">
            {mode === "signin" ? (
              <button
                onClick={() => {
                  setMode("create")
                  setMessage("")
                }}
                className="text-sm font-semibold text-primary"
              >
                Create a new account
              </button>
            ) : (
              <button
                onClick={() => {
                  setMode("signin")
                  setMessage("")
                }}
                className="text-sm font-semibold text-primary"
              >
                Already have an account? Sign In
              </button>
            )}
          </div>

        </div>
      </div>
    </main>
  )
}
