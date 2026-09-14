import { ScreenHeader } from "@/components/screen-header"
import { AiChat } from "./ai-chat"

export default function AiPage() {
  return (
    <>
      <ScreenHeader title="HELP ME AI" subtitle="Private assistant · here to help" backHref="/" />
      <AiChat />
    </>
  )
}
