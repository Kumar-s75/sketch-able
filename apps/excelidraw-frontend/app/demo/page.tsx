import Link from "next/link"
import { redirect } from "next/navigation"
import { getRoom } from "@/actions/getRoom"
import { Button } from "@repo/ui/button"

const DEMO_ROOM_NAME = "live-demo"

export default async function DemoPage() {
  try {
    const room = await getRoom(DEMO_ROOM_NAME)
    const roomName = encodeURIComponent(room.roomName)
    redirect(`/room/${roomName}`)
  } catch {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
        <section className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 shadow-sm dark:shadow-none">
          <h1 className="text-2xl font-semibold tracking-tight">Live demo is currently unavailable</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Demo room <code className="rounded bg-secondary px-1 py-0.5 text-foreground/80">{DEMO_ROOM_NAME}</code> is not available right now.
            You can still create your own room in a few clicks.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/signup">
              <Button>Start free</Button>
            </Link>
            <Link href="/signin">
              <Button variant="outline">Sign in</Button>
            </Link>
          </div>
        </section>
      </main>
    )
  }
}
