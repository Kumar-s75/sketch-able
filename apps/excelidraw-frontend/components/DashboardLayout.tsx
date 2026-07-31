"use client";

import { DashboardSidebar } from "./DashboardSidebar";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { Button } from "@repo/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardShellSkeleton } from "@/components/loading-skeletons";

export function DashboardLayout({ children }: { children: (username: string, rooms: { id: string; roomName: string }[]) => React.ReactNode }) {
  const { user, isLoading, error, reload } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (error === "AUTH_REQUIRED") {
      router.replace("/signin");
    }
  }, [error, router]);

  if (isLoading) {
    return <DashboardShellSkeleton />;
  }

  if (error === "AUTH_REQUIRED") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Redirecting to sign in...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Oops!</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md">
          {error?.toString() || "We couldn't find your user information. Please try logging in again."}
        </p>
        <div className="flex items-center gap-3">
          <Button size="lg" className="px-8" onClick={() => void reload()}>
            Retry
          </Button>
          <Link href="/signin">
            <Button size="lg" variant="outline" className="px-8">
              Go to Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar username={user.username} />
      <main className="min-h-screen pl-60">
        <div className="mx-auto max-w-5xl p-8">
          {children(user.username, user.room)}
        </div>
      </main>
    </div>
  );
}
