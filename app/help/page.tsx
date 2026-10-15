"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

type HelpRequest = {
  id: string
  category: string
  request: string
  message: string
  country: string
  createdAt: string
}

export default function HelpPage() {
  const [category, setCategory] = useState("Help")
  const [request, setRequest] = useState("General help")
  const [message, setMessage] = useState("")
  const [country, setCountry] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    setCategory(params.get("category") || "Help")
    setRequest(params.get("request") || "General help")

    const savedCountry = localStorage.getItem("help-me-country")
    if (savedCountry) {
      setCountry(savedCountry)
    }
  }, [])

  function handleSubmit() {
    if (!message.trim()) {
      alert("Please describe what you need help with.")
      return
    }

    const newRequest: HelpRequest = {
      id: Date.now().toString(),
      category,
      request,
      message: message.trim(),
      country,
      createdAt: new Date().toLocaleString(),
    }

    const existingRequests = JSON.parse(
      localStorage.getItem("help-me-requests") || "[]"
    )

    localStorage.setItem(
      "help-me-requests",
      JSON.stringify([...existingRequests, newRequest])
    )

    setSubmitted(true)
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

        <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm">
          {!submitted ? (
            <>
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                {category}
              </p>

              <h1 className="mt-2 text-2xl font-bold text-foreground">
                {request}
              </h1>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Tell us what you need help with. HELP ME will use your selected
                country to provide more relevant information and support.
              </p>

              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Describe what you need help with..."
                className="mt-6 min-h-32 w-full rounded-2xl border border-border bg-background p-4 text-sm outline-none focus:ring-2"
              />

              <button
                type="button"
                onClick={handleSubmit}
                className="mt-4 w-full rounded-2xl bg-primary px-4 py-3 font-semibold text-primary-foreground"
              >
                Submit Help Request
              </button>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto grid size-14 place-items-center rounded-full bg-green-100 text-2xl">
                ✓
              </div>

              <h1 className="mt-4 text-2xl font-bold text-foreground">
                Request submitted
              </h1>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Your request has been saved on this device.
              </p>

              <Link
                href="/profile"
                className="mt-6 block w-full rounded-2xl bg-primary px-4 py-3 font-semibold text-primary-foreground"
              >
                View My Requests
              </Link>

              <Link
                href="/"
                className="mt-3 block text-sm font-medium text-primary"
              >
                Back to HELP ME
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}