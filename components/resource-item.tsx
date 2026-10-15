
"use client"

import { ChevronRight } from "lucide-react"
import { useState } from "react"

type ResourceItemProps = {
  title: string
  meta: string
  description: string
}

export function ResourceItem({
  title,
  meta,
  description,
}: ResourceItemProps) {
  const [open, setOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const isJob =
    title === "Warehouse Operative" ||
    title === "Care Assistant" ||
    title === "Delivery Driver" ||
    title === "Customer Support"

  const getActionLabel = () => {
    switch (title) {
      case "Warehouse Operative":
      case "Care Assistant":
      case "Delivery Driver":
      case "Customer Support":
        return "Apply Now"
      case "Emergency shelter tonight":
        return "Get Shelter Help"
      case "Council housing register":
        return "Join Housing Register"
      case "Rent deposit scheme":
        return "Get Deposit Help"
      case "Report a housing problem":
        return "Report Problem"
      case "Benefits calculator":
        return "Check Benefits"
      case "Emergency food & funds":
        return "Find Emergency Help"
      case "Free debt advice":
        return "Get Debt Help"
      case "Budgeting planner":
        return "Start Budget Planner"
      case "Register with a GP":
        return "Get GP Help"
      case "Urgent care near me":
        return "Find Urgent Care"
      case "Mental health support":
        return "Get Support Now"
      case "Free prescriptions check":
        return "Check Prescription Help"
      case "Free English (ESOL) classes":
        return "Find English Classes"
      case "Basic digital skills":
        return "Find Digital Skills Help"
      case "School places for children":
        return "Find School Places"
      case "Adult learning grants":
        return "Check Learning Grants"
      case "Replace a lost ID":
        return "Replace Lost ID"
      case "Immigration advice":
        return "Get Immigration Advice"
      case "Free travel help":
        return "Find Travel Help"
      case "Translate a document":
        return "Get Translation Help"
      default:
        return "Get Help"
    }
  }

  const getFormTitle = () => {
    if (isJob) {
      return "Apply for " + title
    }

    return "Get Help: " + title
  }

  const getFormMessage = () => {
    switch (title) {
      case "Emergency shelter tonight":
        return "Tell us what help you need so we can start your shelter request."
      case "Council housing register":
        return "Tell us about your housing situation and we can start your housing request."
      case "Rent deposit scheme":
        return "Tell us about your rental situation and the deposit help you need."
      case "Report a housing problem":
        return "Describe the housing problem you need help reporting."
      case "Benefits calculator":
        return "Tell us what type of financial support you are looking for."
      case "Emergency food & funds":
        return "Tell us what emergency food or financial help you need."
      case "Free debt advice":
        return "Tell us briefly about the debt problem you need help with."
      case "Budgeting planner":
        return "Tell us what you want help budgeting for."
      case "Register with a GP":
        return "Tell us what help you need with registering with a GP."
      case "Urgent care near me":
        return "Tell us what type of urgent care you are looking for."
      case "Mental health support":
        return "Tell us what kind of support you are looking for."
      case "Free prescriptions check":
        return "Tell us what you need help with regarding prescription costs."
      case "Free English (ESOL) classes":
        return "Tell us your preferred location or level of English."
      case "Basic digital skills":
        return "Tell us which digital skills you want to learn."
      case "School places for children":
        return "Tell us about the school place you need."
      case "Adult learning grants":
        return "Tell us what course or training you want funding for."
      case "Replace a lost ID":
        return "Tell us which document you need help replacing."
      case "Immigration advice":
        return "Tell us what immigration information or support you need."
      case "Free travel help":
        return "Tell us what travel support you are looking for."
      case "Translate a document":
        return "Tell us what document you need translated."
      default:
        return description
    }
  }

  const handleSubmit = () => {
    const newRequest = {
      id: Date.now().toString(),
      title,
      name,
      phone,
      email,
      message,
      status: "Submitted",
      createdAt: new Date().toISOString(),
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

  const closeAll = () => {
    setOpen(false)
    setFormOpen(false)
    setSubmitted(false)
    setName("")
    setPhone("")
    setEmail("")
    setMessage("")
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true)
          setFormOpen(false)
          setSubmitted(false)
        }}
        className="group flex w-full items-start gap-3 rounded-2xl border border-border bg-card p-4 text-left transition hover:shadow-md"
      >
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-card-foreground">
            {title}
          </h3>

          <p className="mt-0.5 text-xs font-medium text-primary">
            {meta}
          </p>

          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <ChevronRight className="mt-1 size-5 shrink-0 text-muted-foreground" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-background p-6 shadow-xl">

            {!formOpen && !submitted && (
              <>
                <h2 className="text-2xl font-bold text-foreground">
                  {title}
                </h2>

                <div className="mt-4 space-y-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>

                  {meta && (
                    <p className="font-semibold text-primary">
                      {meta}
                    </p>
                  )}

                  <div className="rounded-xl bg-muted p-4">
                    <p className="text-sm leading-relaxed text-foreground">
                      {getFormMessage()}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFormOpen(true)
                      setSubmitted(false)
                    }}
                    className="flex-1 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground"
                  >
                    {getActionLabel()}
                  </button>

                  <button
                    type="button"
                    onClick={closeAll}
                    className="flex-1 rounded-xl border border-border px-4 py-3 font-semibold text-foreground"
                  >
                    Close
                  </button>
                </div>
              </>
            )}

            {formOpen && !submitted && (
              <>
                <h2 className="text-2xl font-bold text-foreground">
                  {getFormTitle()}
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  {getFormMessage()}
                </p>

                <div className="mt-5 space-y-4">
                  <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />

                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />

                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />

                  <textarea
                    placeholder={
                      isJob
                        ? "Tell us briefly about yourself..."
                        : "Tell us what help you need..."
                    }
                    rows={5}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground"
                  >
                    {isJob ? "Submit Application" : "Submit Request"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormOpen(false)}
                    className="flex-1 rounded-xl border border-border px-4 py-3 font-semibold text-foreground"
                  >
                    Back
                  </button>
                </div>
              </>
            )}

            {submitted && (
              <div className="text-center">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-3xl">✓</span>
                </div>

                <h2 className="mt-5 text-2xl font-bold text-foreground">
                  Request Submitted
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Your HELP ME request has been saved successfully.
                  You can view it later in your requests.
                </p>

                <button
                  type="button"
                  onClick={closeAll}
                  className="mt-6 w-full rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}