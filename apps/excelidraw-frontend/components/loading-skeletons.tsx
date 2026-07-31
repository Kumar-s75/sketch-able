import { Skeleton } from "@/components/ui/skeleton"

export function LandingPageSkeleton() {
  return (
    <main className="min-h-screen bg-background px-6 py-8 text-foreground sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <Skeleton className="h-14 w-full rounded-2xl" />
        <div className="rounded-3xl border border-border bg-secondary/30 p-8 sm:p-12">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="mt-5 h-12 w-2/3" />
          <Skeleton className="mt-4 h-5 w-1/2" />
          <div className="mt-8 flex gap-3">
            <Skeleton className="h-10 w-36" />
            <Skeleton className="h-10 w-36" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      </div>
    </main>
  )
}

export function AuthPageSkeleton() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col px-6 pb-14 pt-6 sm:px-8 lg:px-10">
        <section className="relative mt-6 overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12">
          <div className="grid min-h-[72vh] items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-5">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-12 w-full max-w-xl" />
              <Skeleton className="h-5 w-full max-w-lg" />
              <Skeleton className="h-5 w-2/3 max-w-lg" />
            </div>
            <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-secondary/40 p-6">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="mt-2 h-4 w-56" />
              <Skeleton className="mt-6 h-10 w-full" />
              <Skeleton className="mt-3 h-10 w-full" />
              <Skeleton className="mt-3 h-10 w-full" />
              <Skeleton className="mt-5 h-10 w-full" />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export function DashboardShellSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-card p-4">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="mt-2 h-4 w-36" />
        <div className="mt-8 space-y-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      </aside>
      <main className="pl-64">
        <div className="mx-auto max-w-7xl space-y-8 p-8">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-12 w-80" />
          <Skeleton className="h-5 w-[32rem]" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-64 w-full rounded-2xl lg:col-span-2" />
          </div>
        </div>
      </main>
    </div>
  )
}

export function CreateRoomShellSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-card p-4">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="mt-2 h-4 w-36" />
      </aside>
      <main className="pl-64">
        <div className="mx-auto max-w-2xl space-y-6 py-12">
          <div className="space-y-3 text-center">
            <Skeleton className="mx-auto h-5 w-28" />
            <Skeleton className="mx-auto h-10 w-72" />
            <Skeleton className="mx-auto h-4 w-[28rem]" />
          </div>
          <Skeleton className="h-72 w-full rounded-2xl" />
        </div>
      </main>
    </div>
  )
}

export function RoomCanvasSkeleton() {
  return (
    <div className="relative h-screen w-full bg-[#111317]">
      <div className="fixed left-1/2 top-4 z-20 -translate-x-1/2">
        <Skeleton className="h-12 w-[46rem] rounded-xl" />
      </div>
      <div className="fixed left-4 top-4 z-20">
        <Skeleton className="h-9 w-9 rounded-xl" />
      </div>
      <div className="fixed bottom-5 left-4 z-20 flex gap-2">
        <Skeleton className="h-10 w-36 rounded-xl" />
        <Skeleton className="h-10 w-20 rounded-xl" />
      </div>
      <div className="fixed left-5 top-24 z-20">
        <Skeleton className="h-[22rem] w-64 rounded-2xl" />
      </div>
      <div className="absolute inset-0 p-10">
        <Skeleton className="h-full w-full rounded-2xl" />
      </div>
    </div>
  )
}

export function DemoPageSkeleton() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <section className="w-full max-w-xl rounded-2xl border border-border bg-card p-8">
        <Skeleton className="h-8 w-80" />
        <Skeleton className="mt-3 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-5/6" />
        <div className="mt-6 flex gap-3">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-10 w-28" />
        </div>
      </section>
    </main>
  )
}
