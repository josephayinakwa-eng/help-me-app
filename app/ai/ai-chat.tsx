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
  "How do I register with a doctor?",
  "I need help paying my rent",
  "How do I write a simple CV?",
  "Where can I get food today?",
]

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi, I'm HELP ME AI. Ask me anything about jobs, housing, money, health, or documents and I'll point you in the right direction. If it's an emergency, please call your local emergency services first.",
}

const FALLBACK_MESSAGE =
  "I'm having trouble reaching the assistant right now, so I can't give a live answer yet. In the meantime, you can browse the Home screen for jobs, housing, money, health, education, and document help — or call a free adviser from any of those screens. Please try me again shortly."

export function AiChat() {
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  function scrollToBottom() {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
    })
  }

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const userMessage: Message = { id: crypto.randomUUID(), role: "user", content: trimmed }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)
    scrollToBottom()

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      })

      const data = (await res.json().catch(() => null)) as { reply?: string } | null

      if (res.ok && data?.reply) {
        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), role: "assistant", content: data.reply as string },
        ])
      } else {
        throw new Error("unavailable")
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: FALLBACK_MESSAGE, fallback: true },
      ])
    } finally {
      setLoading(false)
      scrollToBottom()
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    send(input)
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}

        {loading && (
          <div className="flex items-center gap-2 pl-11 text-sm text-muted-foreground">
            <span className="flex gap-1">
              <Dot /> <Dot delay="150ms" /> <Dot delay="300ms" />
            </span>
            Thinking...
          </div>
        )}

        {messages.length <= 1 && (
          <div className="space-y-2 pt-2">
            <p className="text-xs font-medium text-muted-foreground">Try asking</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
                >
                  {s}
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
    <div className={cn("flex items-start gap-2.5", isUser && "flex-row-reverse")}>
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-full",
          isUser
            ? "bg-secondary text-foreground"
            : message.fallback
              ? "bg-destructive/10 text-destructive"
              : "bg-primary text-primary-foreground",
        )}
      >
        {isUser ? (
          <User className="size-4" />
        ) : message.fallback ? (
          <TriangleAlert className="size-4" />
        ) : (
          <Sparkles className="size-4" />
        )}
      </span>
      <div
        className={cn(
          "max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-tr-sm bg-primary text-primary-foreground"
            : message.fallback
              ? "rounded-tl-sm border border-destructive/30 bg-destructive/5 text-foreground"
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
