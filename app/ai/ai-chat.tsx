"use client"

import { useRef, useState } from "react"
import { Send, Sparkles, TriangleAlert, User } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  fallback?: boolean
}

const SUGGESTIONS = [
  "Help me find a job",
  "I need help with housing",
  "How do I write a CV?",
  "Where can I find food assistance?",
]

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello! Welcome to HELP ME AI. I can help you explore jobs, housing, food assistance, money support, education, health services, travel, and important documents. Tell me what you need, which country you are in, and a little about your situation. I will help you work out your next steps.",
}

function localReply(question: string): string {
  const text = question.toLowerCase()

  if (
    text.includes("suicide") ||
    text.includes("kill myself") ||
    text.includes("end my life") ||
    text.includes("hurt myself")
  ) {
    return "I'm sorry you are going through such a difficult time. You deserve support, and you do not have to face this alone. If you might hurt yourself now, move away from anything you could use to harm yourself and contact local emergency services or a trusted person who can stay with you. If you tell me your country, I can help you look for appropriate support."
  }

  if (
    text.includes("emergency") ||
    text.includes("in danger") ||
    text.includes("being attacked") ||
    text.includes("can't breathe") ||
    text.includes("cannot breathe")
  ) {
    return "If you or someone else is in immediate danger, contact your local emergency services now. For severe difficulty breathing, serious bleeding, or another life-threatening medical problem, seek emergency medical care immediately. Tell me your country if you need help identifying the appropriate service."
  }

  if (
    text.includes("job") ||
    text.includes("work") ||
    text.includes("employment") ||
    text.includes("hiring") ||
    text.includes("career") ||
    text.includes("warehouse") ||
    text.includes("salary") ||
    text.includes("employer")
  ) {
    return "Let's work on your job search. Here is a practical plan:\n\n1. Tell me your country and city.\n2. Tell me the type of work you want and any experience or qualifications you have.\n3. Prepare a CV with your education, skills, and contact details.\n4. Apply through verified employers and official company career pages.\n5. Be careful with recruiters who demand money before offering a job.\n\nShare your preferred job and location, and I can help you prepare your CV and plan your applications. Live vacancies must be verified before you apply."
  }

  if (
    text.includes("cv") ||
    text.includes("resume") ||
    text.includes("résumé") ||
    text.includes("cover letter")
  ) {
    return "I can help you create a professional CV, even if you have no work experience.\n\nA simple CV should include:\n\n1. Your name and contact information.\n2. A short professional profile.\n3. Your education and qualifications.\n4. Your skills and relevant projects.\n5. Any volunteering, internships, or work experience.\n\nTell me the job you want, your education, your skills, and your experience. I can help you write a CV suited to that job."
  }

  if (
    text.includes("house") ||
    text.includes("housing") ||
    text.includes("homeless") ||
    text.includes("accommodation") ||
    text.includes("shelter") ||
    text.includes("rent") ||
    text.includes("landlord") ||
    text.includes("apartment") ||
    text.includes("room to rent")
  ) {
    return "I can help you explore housing options. Depending on your country, you may be able to seek affordable accommodation, emergency shelter, rental assistance, or support from local housing organisations.\n\nTo help you find the right option, tell me:\n\n1. Your country and city.\n2. Whether you need a room, a house, or emergency accommodation.\n3. Whether you can pay rent or need financial assistance.\n\nIf you are facing eviction, check local tenant-support services promptly because deadlines and rights vary by country."
  }

  if (
    text.includes("food") ||
    text.includes("hungry") ||
    text.includes("hunger") ||
    text.includes("meal") ||
    text.includes("eat today")
  ) {
    return "Let's look for ways to get food assistance. Depending on your location, options may include community kitchens, food banks, religious or community organisations, government assistance, and local charities.\n\nTell me your country and city, and whether you need food today or longer-term assistance. I can help you identify the types of organisations to contact. Please verify opening hours and eligibility before travelling."
  }

  if (
    text.includes("money") ||
    text.includes("financial help") ||
    text.includes("financial assistance") ||
    text.includes("cash assistance") ||
    text.includes("debt") ||
    text.includes("bills") ||
    text.includes("benefit") ||
    text.includes("allowance")
  ) {
    return "There may be several ways to get financial support, depending on your circumstances and country. These can include government assistance, emergency grants, food support, housing assistance, employment programmes, and reputable community organisations.\n\nTell me your country, what you need help paying for, and whether the need is urgent. I can help you work through possible options. Be cautious of anyone promising guaranteed financial assistance in exchange for an upfront fee."
  }

  if (
    text.includes("doctor") ||
    text.includes("hospital") ||
    text.includes("health") ||
    text.includes("medical") ||
    text.includes("clinic") ||
    text.includes("medicine") ||
    text.includes("medication") ||
    text.includes("healthcare") ||
    text.includes("sick")
  ) {
    return "I can help you work out how to access healthcare. Depending on your country, options may include public hospitals, community clinics, primary-care doctors, health insurance services, and low-cost medical programmes.\n\nTell me your country and city, and whether you need a doctor, affordable treatment, health insurance information, or help finding a clinic.\n\nI can provide general information, but I cannot diagnose a medical condition. For a serious or rapidly worsening problem, seek urgent medical care."
  }

  if (
    text.includes("school") ||
    text.includes("university") ||
    text.includes("education") ||
    text.includes("scholarship") ||
    text.includes("college") ||
    text.includes("tuition") ||
    text.includes("admission") ||
    text.includes("study abroad") ||
    text.includes("student")
  ) {
    return "I can help you explore educational opportunities, university admissions, scholarships, vocational training, and affordable courses.\n\nTell me your country, the level of education you want to pursue, your preferred subject, and whether you need financial assistance.\n\nI can help you prepare an application checklist and understand the usual requirements. Admission dates, fees, and scholarship eligibility should be confirmed with the relevant institution."
  }

  if (
    text.includes("travel") ||
    text.includes("visa") ||
    text.includes("passport") ||
    text.includes("immigration") ||
    text.includes("residence permit") ||
    text.includes("work permit") ||
    text.includes("relocate") ||
    text.includes("move to another country")
  ) {
    return "I can help you understand travel and relocation requirements. Depending on your plans, you may need a valid passport, a visa or residence permit, supporting documents, proof of funds, or a work or study permit.\n\nTell me your nationality, the country you want to travel to, and whether your purpose is work, study, tourism, or long-term relocation.\n\nRequirements change, so confirm important decisions with the destination country's official immigration or embassy service."
  }

  if (
    text.includes("document") ||
    text.includes("birth certificate") ||
    text.includes("national id") ||
    text.includes("national identification") ||
    text.includes("lost my id") ||
    text.includes("replace my passport") ||
    text.includes("lost my passport") ||
    text.includes("certificate")
  ) {
    return "I can help you work out how to obtain, replace, or prepare important documents. The process depends on the document and the country that issued it.\n\nTell me which document you need, which country issued it, and whether it is lost, expired, or being requested for the first time. I can help you identify the usual steps and the appropriate official authority."
  }

  if (
    text.includes("business") ||
    text.includes("entrepreneur") ||
    text.includes("start a business") ||
    text.includes("small business") ||
    text.includes("self-employed")
  ) {
    return "I can help you plan a business, understand basic registration steps, develop a budget, identify potential customers, and prepare a simple business plan.\n\nTell me your country, the type of business you want to start, and your approximate starting budget. I will help you organise your next steps. Registration rules and taxes depend on your location."
  }

  if (
    text.includes("how are you") ||
    text.includes("hello") ||
    text.includes("hi ") ||
    text === "hi" ||
    text === "hey" ||
    text.includes("good morning") ||
    text.includes("good afternoon") ||
    text.includes("good evening")
  ) {
    return "Hello! I'm here to help. You can ask me about jobs, housing, food, financial assistance, health services, education, travel, or documents. What do you need help with today?"
  }

  if (
    text.includes("thank you") ||
    text === "thanks" ||
    text.startsWith("thanks ")
  ) {
    return "You're welcome! I'm glad to help. If you tell me a little more about your situation and your country, we can work through the next steps together."
  }

  return "I want to help you with that. To give you a more useful answer, please tell me a little more about what you need and which country you are in. I can help you understand your options, organise the next steps, prepare documents, or work through a problem step by step."
}

export function AiChat() {
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  function scrollToBottom() {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      })
    })
  }

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)
    scrollToBottom()

    let reply = ""

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      })

      const data = (await res.json().catch(() => null)) as {
        reply?: string
      } | null

      if (res.ok && typeof data?.reply === "string" && data.reply.trim()) {
        reply = data.reply.trim()
      }
    } catch {
      reply = ""
    }

    if (!reply) {
      reply = localReply(trimmed)
    }

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: reply,
      },
    ])

    setLoading(false)
    scrollToBottom()
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    send(input)
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto px-4 py-5"
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {loading && (
          <div className="flex items-center gap-2 pl-11 text-sm text-muted-foreground">
            <span className="flex gap-1">
              <Dot />
              <Dot delay="150ms" />
              <Dot delay="300ms" />
            </span>
            Thinking...
          </div>
        )}

        {messages.length <= 1 && (
          <div className="space-y-2 pt-2">
            <p className="text-xs font-medium text-muted-foreground">
              Try asking
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => send(suggestion)}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-border bg-background px-4 py-3"
      >
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                if (e.nativeEvent.isComposing || e.keyCode === 229) return
                e.preventDefault()
                send(input)
              }
            }}
            rows={1}
            placeholder="Type your question..."
            aria-label="Type your question"
            className="max-h-32 min-h-11 flex-1 resize-none rounded-2xl border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
          />

          <button
            type="submit"
            disabled={!input.trim() || loading}
            aria-label="Send message"
            className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <Send className="size-5" />
          </button>
        </div>
      </form>
    </div>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex items-start gap-2.5",
        isUser && "flex-row-reverse",
      )}
    >
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-full",
          isUser
            ? "bg-secondary text-foreground"
            : "bg-primary text-primary-foreground",
        )}
      >
        {isUser ? (
          <User className="size-4" />
        ) : (
          <Sparkles className="size-4" />
        )}
      </span>

      <div
        className={cn(
          "max-w-[78%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-tr-sm bg-primary text-primary-foreground"
            : "rounded-tl-sm border border-border bg-card text-card-foreground",
        )}
      >
        {message.content}
      </div>
    </div>
  )
}

function Dot({ delay = "0ms" }: { delay?: string }) {
  return (
    <span
      className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
      style={{ animationDelay: delay }}
    />
  )
}