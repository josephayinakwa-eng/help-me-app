import { AiChat } from "./ai-chat"

export default function AiPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col bg-background">
      <div className="border-b border-border bg-background px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          HELP ME
        </p>

        <h1 className="mt-1 text-2xl font-bold text-foreground">
          HELP ME AI
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Ask questions about jobs, housing, money, health, education, travel, and more.
        </p>
      </div>

      <div className="min-h-0 flex-1">
        <AiChat />
      </div>
    </main>
  )
}