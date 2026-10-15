import Link from "next/link"

const categoryData: Record<
  string,
  {
    icon: string
    title: string
    description: string
    options: { icon: string; title: string; description: string }[]
  }
> = {
  jobs: {
    icon: "💼",
    title: "Find a Job",
    description: "Find jobs and employment support.",
    options: [
      {
        icon: "🔎",
        title: "Find a Job",
        description: "Search for job opportunities and employment support.",
      },
      {
        icon: "📄",
        title: "Create a CV or Resume",
        description: "Get help creating or improving your CV or resume.",
      },
      {
        icon: "📝",
        title: "Job Application Help",
        description: "Get guidance with job applications.",
      },
      {
        icon: "🎤",
        title: "Interview Preparation",
        description: "Prepare for interviews and practice common questions.",
      },
    ],
  },

  housing: {
    icon: "🏠",
    title: "Housing",
    description: "Find housing and accommodation.",
    options: [
      {
        icon: "🏡",
        title: "Find a Place to Live",
        description: "Search for homes, apartments, rooms, and accommodation.",
      },
      {
        icon: "💵",
        title: "Find Affordable Housing",
        description: "Explore affordable housing options and support.",
      },
      {
        icon: "🛏️",
        title: "Emergency Shelter",
        description: "Find emergency accommodation and temporary shelter.",
      },
      {
        icon: "🔧",
        title: "Housing Problems",
        description: "Get help with rent, repairs, or housing problems.",
      },
    ],
  },

  money: {
    icon: "💰",
    title: "Money Help",
    description: "Find financial and food assistance.",
    options: [
      {
        icon: "💳",
        title: "Financial Assistance",
        description: "Find financial assistance available in your area.",
      },
      {
        icon: "🍎",
        title: "Food Assistance",
        description: "Find food banks and community food support.",
      },
      {
        icon: "🧾",
        title: "Help With Bills",
        description: "Find support for essential household expenses.",
      },
      {
        icon: "📊",
        title: "Budgeting Help",
        description: "Learn how to manage your money and spending.",
      },
    ],
  },

  health: {
    icon: "🏥",
    title: "Health & Care",
    description: "Find healthcare and support.",
    options: [
      {
        icon: "👨‍⚕️",
        title: "Find a Doctor or Clinic",
        description: "Find healthcare providers and clinics near you.",
      },
      {
        icon: "🏥",
        title: "Find a Hospital",
        description: "Find hospitals and healthcare facilities.",
      },
      {
        icon: "💊",
        title: "Find a Pharmacy",
        description: "Find pharmacies and medicine support.",
      },
      {
        icon: "❤️",
        title: "Mental Health Support",
        description: "Find mental health and emotional support services.",
      },
    ],
  },

  education: {
    icon: "📚",
    title: "Education",
    description: "Find schools, courses, and scholarships.",
    options: [
      {
        icon: "🏫",
        title: "Find a School",
        description: "Find schools and educational opportunities.",
      },
      {
        icon: "🎓",
        title: "Find a University",
        description: "Explore universities, colleges, and higher education.",
      },
      {
        icon: "💡",
        title: "Find Scholarships",
        description: "Find scholarships and education funding.",
      },
      {
        icon: "📖",
        title: "Find Courses & Training",
        description: "Find courses and training opportunities.",
      },
    ],
  },

  travel: {
    icon: "✈️",
    title: "Travel & Documents",
    description: "Find travel and document information.",
    options: [
      {
        icon: "🛂",
        title: "Passport Help",
        description:
          "Find information about applying for or replacing a passport.",
      },
      {
        icon: "🌍",
        title: "Visa Information",
        description: "Learn about visa requirements and applications.",
      },
      {
        icon: "📑",
        title: "Replace a Lost Document",
        description: "Get guidance for replacing important documents.",
      },
      {
        icon: "🧳",
        title: "Travel Requirements",
        description: "Find travel and entry information for your destination.",
      },
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(categoryData).map((category) => ({
    category,
  }))
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const data = categoryData[category.toLowerCase()]

  if (!data) {
    return (
      <main className="min-h-screen bg-background px-4 py-8">
        <div className="mx-auto w-full max-w-md">
          <Link
            href="/"
            className="text-sm font-medium text-primary"
          >
            ← Back to HELP ME
          </Link>

          <div className="mt-8 rounded-3xl border border-border bg-card p-6 text-center shadow-sm">
            <div className="text-5xl">🤝</div>

            <h1 className="mt-4 text-2xl font-bold text-foreground">
              Help
            </h1>

            <p className="mt-2 text-muted-foreground">
              Choose a help category from the HELP ME home page.
            </p>
          </div>
        </div>
      </main>
    )
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

        <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-4xl">
            {data.icon}
          </div>

          <h1 className="mt-5 text-3xl font-bold text-foreground">
            {data.title}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {data.description}
          </p>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            What do you need help with?
          </p>

          <div className="space-y-3">
            {data.options.map((option) => {
              const helpUrl =
                "/help?category=" +
                encodeURIComponent(data.title) +
                "&request=" +
                encodeURIComponent(option.title)

              return (
                <Link
                  key={option.title}
                  href={helpUrl}
                  className="block rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:bg-muted"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-muted text-2xl">
                      {option.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="font-semibold text-card-foreground">
                        {option.title}
                      </h2>

                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {option.description}
                      </p>

                      <p className="mt-3 text-sm font-semibold text-primary">
                        Get help →
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
    
  