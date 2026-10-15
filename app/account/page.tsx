"use client"

import Link from "next/link"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AccountPage() {
  const [mode, setMode] = useState<"signin" | "create">("signin")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function createAccount() {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage("Please enter your name, email, and password.")
      return
    }

    if (password.length < 6) {
      setMessage("Your password must be at least 6 characters.")
      return
    }

    setLoading(true)
    setMessage("Creating your account...")

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    })

    if (error) {
      setLoading(false)
      setMessage(error.message)
      return
    }

    if (!data.user) {
      setLoading(false)
      setMessage("Account could not be created.")
      return
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: data.user.id,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
      })

    setLoading(false)

    if (profileError) {
      setMessage("Profile error: " + profileError.message)
      return
    }

    localStorage.setItem(
      "help-me-account",
      JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      })
    )

    localStorage.setItem("help-me-signed-in", "true")

    setMessage(
      "Account created successfully. Check your email if confirmation is required."
    )
  }

  async function signIn() {
    if (!email.trim() || !password.trim()) {
      setMessage("Please enter your email and password.")
      return
    }

    setLoading(true)
    setMessage("Signing in...")

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (error) {
      setLoading(false)
      setMessage(error.message)
      return
    }

    if (!data.user) {
      setLoading(false)
      setMessage("Sign in could not be completed.")
      return
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("name, phone, email")
      .eq("id", data.user.id)
      .maybeSingle()

    localStorage.setItem(
      "help-me-account",
      JSON.stringify({
        name: profile?.name || "",
        email: profile?.email || data.user.email || "",
        phone: profile?.phone || "",
      })
    )

    localStorage.setItem("help-me-signed-in", "true")

    setLoading(false)
    setMessage("Signed in successfully.")
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
              : "Create an account to use HELP ME on your devices."}
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
            className="mt-2 mb-4 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground"
          />

          <label className="text-sm font-medium text-foreground">
            Password
          </label>

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            type="password"
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground"
          />

          <button
            onClick={mode === "signin" ? signIn : createAccount}
            disabled={loading}
            className="mt-5 w-full rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : mode === "signin"
                ? "Sign In"
                : "Create Account"}
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
