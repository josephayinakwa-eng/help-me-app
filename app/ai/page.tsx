import { ScreenHeader } from "@/components/screen-header"
import { AiChat } from "./ai-chat"

export default function AiPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScreenHeader
        title="HELP ME AI"
        subtitle="Support, made simple"
        backHref="/"
      />
      <AiChat />
    </div>
  )
}