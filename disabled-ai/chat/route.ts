import { generateText, APICallError } from "ai"
import { openai } from "@ai-sdk/openai"

// Run on the Node.js runtime so the OPENAI_API_KEY env var is available server-side only.
export const runtime = "nodejs"
// Never cache AI responses.
export const dynamic = "force-dynamic"

const MODEL = "gpt-4o-mini"
const MAX_MESSAGE_LENGTH = 4000

const SYSTEM_PROMPT =
  "You are the assistant for the HELP ME mobile app. You give clear, calm, and practical help. " +
  "Keep answers concise and easy to read on a phone. If a request involves an emergency or someone's " +
  "safety is at risk, tell the user to contact local emergency services immediately."

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status })
}

export async function POST(req: Request) {
  // Fail fast (and privately) if the key was not configured.
  if (!process.env.OPENAI_API_KEY) {
    return jsonError("Server is not configured.", 500)
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return jsonError("Request body must be valid JSON.", 400)
  }

  const message = (body as { message?: unknown })?.message

  if (typeof message !== "string") {
    return jsonError("A 'message' string is required.", 400)
  }

  const trimmed = message.trim()

  if (trimmed.length === 0) {
    return jsonError("Message cannot be empty.", 400)
  }

  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    return jsonError(`Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`, 413)
  }

  try {
    const { text } = await generateText({
      model: openai(MODEL),
      system: SYSTEM_PROMPT,
      prompt: trimmed,
    })

    return Response.json({ reply: text })
  } catch (err) {
    // Log the real error server-side; return a safe, generic message to the client.
    console.error("[v0] /api/chat generateText failed:", err)

    if (APICallError.isInstance(err)) {
      // OpenAI billing/quota exhausted.
      if (err.statusCode === 429) {
        return jsonError("The assistant is temporarily unavailable. Please try again later.", 429)
      }
      // Invalid or missing API key.
      if (err.statusCode === 401) {
        return jsonError("The assistant is not available right now.", 503)
      }
    }

    return jsonError("Failed to generate a response. Please try again.", 502)
  }
}

// Reject other methods explicitly so mobile clients get a clear signal.
export async function GET() {
  return jsonError("Method not allowed. Use POST.", 405)
}
