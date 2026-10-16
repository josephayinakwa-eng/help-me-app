"use client"

import { useEffect, useState } from "react"
import type { FormEvent } from "react"
import {
  Search,
  BriefcaseBusiness,
  ExternalLink,
  MapPin,
  PlusCircle,
  X,
} from "lucide-react"
import { supabase } from "@/lib/supabase"

type JobDraft = {
  title: string
  company: string
  location: string
  type: string
  description: string
  contact: string
}

const emptyJob: JobDraft = {
  title: "",
  company: "",
  location: "",
  type: "Full-time",
  description: "",
  contact: "",
}

const jobSources = [
  {
    name: "LinkedIn Jobs",
    description: "Find job opportunities around the world.",
  },
  {
    name: "Indeed",
    description: "Search for jobs in different countries.",
  },
  {
    name: "Google Jobs",
    description: "Discover job openings from multiple websites.",
  },
  {
    name: "Jobberman Ghana",
    description: "Explore job opportunities in Ghana.",
  },
  {
    name: "Remote OK",
    description: "Find remote job opportunities.",
  },
]

export default function JobsPage() {
  const [keywords, setKeywords] = useState("")
  const [country, setCountry] = useState("Ghana")
  const [showPostForm, setShowPostForm] = useState(false)
  const [job, setJob] = useState<JobDraft>(emptyJob)
  const [message, setMessage] = useState("")
  const [savedJobs, setSavedJobs] = useState<JobDraft[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const savedCountry = localStorage.getItem("help-me-country")

    if (savedCountry) {
      setCountry(savedCountry)
    }

    try {
      const storedJobs = localStorage.getItem("help-me-job-drafts")

      if (storedJobs) {
        const parsedJobs: JobDraft[] = JSON.parse(storedJobs)
        setSavedJobs(parsedJobs)
      }
    } catch {
      setSavedJobs([])
    }

    function updateCountry(event: Event) {
      const customEvent = event as CustomEvent<string>

      if (customEvent.detail) {
        setCountry(customEvent.detail)
      }
    }

    window.addEventListener("help-me-country-changed", updateCountry)

    return () => {
      window.removeEventListener("help-me-country-changed", updateCountry)
    }
  }, [])

  function getJobUrl(name: string) {
    const search = encodeURIComponent(keywords.trim() || "jobs")
    const location = encodeURIComponent(country.trim() || "Ghana")

    if (name === "LinkedIn Jobs") {
      return "https://www.linkedin.com/jobs/search/?keywords=" + search + "&location=" + location
    }

    if (name === "Indeed") {
      return "https://www.indeed.com/jobs?q=" + search + "&l=" + location
    }

    if (name === "Google Jobs") {
      return "https://www.google.com/search?q=" + search + "+jobs+in+" + location + "&ibp=htl;jobs"
    }

    if (name === "Jobberman Ghana") {
      return "https://www.google.com/search?q=" + search + "+jobs+in+Ghana+site%3Ajobberman.com.gh"
    }

    return "https://remoteok.com/remote-" + search.replace(/%20/g, "-") + "-jobs"
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const search = encodeURIComponent(keywords.trim() || "jobs")
    const location = encodeURIComponent(country.trim() || "Ghana")

    const url =
      "https://www.google.com/search?q=" +
      search +
      "+jobs+in+" +
      location +
      "&ibp=htl;jobs"

    window.open(url, "_blank", "noopener,noreferrer")
  }

  async function handlePostJob(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    setMessage("")

    const newJob: JobDraft = {
      title: job.title.trim(),
      company: job.company.trim(),
      location: job.location.trim(),
      type: job.type,
      description: job.description.trim(),
      contact: job.contact.trim(),
    }

    if (
      !newJob.title ||
      !newJob.company ||
      !newJob.location ||
      !newJob.description ||
      !newJob.contact
    ) {
      setMessage("Please complete all fields before continuing.")
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("jobs").insert({
        title: newJob.title,
        company: newJob.company,
        location: newJob.location,
        employment_type: newJob.type,
        description: newJob.description,
        contact: newJob.contact,
        status: "pending",
      })

      if (error) {
        console.error("Job submission failed:", error.message)
        setMessage(
          "We could not submit your job. Please try again. If the problem continues, send me the error message."
        )
        return
      }

      setJob(emptyJob)
      setShowPostForm(false)

      setMessage(
        "Your job has been submitted successfully for review. It is pending approval and has not been published publicly."
      )
    } catch {
      setMessage(
        "We could not connect to the job service. Please check your internet connection and try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl space-y-6 px-4 py-6">
      <header className="flex items-center gap-3">
        <div className="rounded-2xl bg-primary p-3 text-primary-foreground">
          <BriefcaseBusiness className="size-7" />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold">Find Jobs</h1>
          <p className="text-sm text-muted-foreground">
            Explore opportunities and connect with employers.
          </p>
        </div>
      </header>

      <section className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-muted p-3">
            <PlusCircle className="size-6" />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="font-bold">Are you an employer?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Submit a job listing for review by HELP ME.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowPostForm(!showPostForm)
            setMessage("")
          }}
          className="mt-4 w-full rounded-xl bg-primary p-3 font-semibold text-primary-foreground"
        >
          {showPostForm ? "Close job form" : "Post a Job"}
        </button>
      </section>

      {showPostForm && (
        <section className="space-y-4 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold">Employer job details</h2>

            <button
              type="button"
              onClick={() => setShowPostForm(false)}
              aria-label="Close job form"
              className="rounded-lg p-2 hover:bg-muted"
            >
              <X className="size-5" />
            </button>
          </div>

          <p className="text-sm text-muted-foreground">
            Complete the details below. Your submission will be stored online
            and marked as pending until it is approved.
          </p>

          <form onSubmit={handlePostJob} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="job-title" className="text-sm font-medium">
                Job title
              </label>
              <input
                id="job-title"
                value={job.title}
                onChange={(event) =>
                  setJob({ ...job, title: event.target.value })
                }
                placeholder="Enter the job title"
                className="w-full rounded-xl border border-border bg-transparent p-3"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="job-company" className="text-sm font-medium">
                Company or employer name
              </label>
              <input
                id="job-company"
                value={job.company}
                onChange={(event) =>
                  setJob({ ...job, company: event.target.value })
                }
                placeholder="Enter company name"
                className="w-full rounded-xl border border-border bg-transparent p-3"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="job-location" className="text-sm font-medium">
                Job location and country
              </label>
              <input
                id="job-location"
                value={job.location}
                onChange={(event) =>
                  setJob({ ...job, location: event.target.value })
                }
                placeholder="Accra, Ghana or Remote"
                className="w-full rounded-xl border border-border bg-transparent p-3"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="job-type" className="text-sm font-medium">
                Employment type
              </label>
              <select
                id="job-type"
                value={job.type}
                onChange={(event) =>
                  setJob({ ...job, type: event.target.value })
                }
                className="w-full rounded-xl border border-border bg-background p-3"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Temporary</option>
                <option>Internship</option>
                <option>Remote</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="job-description" className="text-sm font-medium">
                Job description and requirements
              </label>
              <textarea
                id="job-description"
                value={job.description}
                onChange={(event) =>
                  setJob({ ...job, description: event.target.value })
                }
                placeholder="Describe the duties and requirements"
                className="min-h-32 w-full rounded-xl border border-border bg-transparent p-3"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="job-contact" className="text-sm font-medium">
                Employer contact or application link
              </label>
              <input
                id="job-contact"
                value={job.contact}
                onChange={(event) =>
                  setJob({ ...job, contact: event.target.value })
                }
                placeholder="Enter an email or application link"
                className="w-full rounded-xl border border-border bg-transparent p-3"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-primary p-3 font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit Job for Review"}
            </button>
          </form>
        </section>
      )}

      {message && (
        <p
          role="status"
          className="rounded-xl border border-border bg-card p-3 text-sm"
        >
          {message}
        </p>
      )}

      {savedJobs.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-bold">Your older saved job drafts</h2>

          {savedJobs.map((savedJob, index) => (
            <article
              key={index}
              className="rounded-2xl border border-border bg-card p-4"
            >
              <h3 className="font-bold">{savedJob.title}</h3>

              <p className="mt-1 text-sm">{savedJob.company}</p>

              <p className="mt-1 text-sm text-muted-foreground">
                {savedJob.location} - {savedJob.type}
              </p>

              <p className="mt-3 whitespace-pre-wrap text-sm">
                {savedJob.description}
              </p>

              <p className="mt-3 break-words text-sm text-muted-foreground">
                Contact: {savedJob.contact}
              </p>

              <p className="mt-3 text-xs font-medium text-muted-foreground">
                Older device draft - not published
              </p>
            </article>
          ))}
        </section>
      )}

      <form
        onSubmit={handleSearch}
        className="space-y-3 rounded-2xl border border-border bg-card p-4"
      >
        <h2 className="text-lg font-bold">Search available jobs</h2>

        <label htmlFor="job-keywords" className="block text-sm font-medium">
          Job title or keywords
        </label>

        <div className="flex items-center gap-2 rounded-xl border border-border px-3">
          <Search className="size-5 text-muted-foreground" />
          <input
            id="job-keywords"
            value={keywords}
            onChange={(event) => setKeywords(event.target.value)}
            placeholder="Enter a job title or keyword"
            className="min-w-0 flex-1 bg-transparent py-3 outline-none"
          />
        </div>

        <label htmlFor="job-country" className="block text-sm font-medium">
          Country
        </label>

        <div className="flex items-center gap-2 rounded-xl border border-border px-3">
          <MapPin className="size-5 text-muted-foreground" />
          <input
            id="job-country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            placeholder="Enter a country"
            className="min-w-0 flex-1 bg-transparent py-3 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-primary p-3 font-semibold text-primary-foreground"
        >
          Search Jobs
        </button>
      </form>

      <section className="space-y-3">
        <h2 className="text-lg font-bold">Explore job websites</h2>

        {jobSources.map((source) => (
          <a
            key={source.name}
            href={getJobUrl(source.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 hover:bg-muted"
          >
            <div className="rounded-xl bg-muted p-3">
              <BriefcaseBusiness className="size-5" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-semibold">{source.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {source.description}
              </p>
            </div>

            <ExternalLink className="size-5 shrink-0 text-primary" />
          </a>
        ))}
      </section>

      <p className="text-sm text-muted-foreground">
        External job websites may have their own application requirements.
        Verify employers and vacancies before sharing personal information or
        paying any fees.
      </p>
    </main>
  )
}