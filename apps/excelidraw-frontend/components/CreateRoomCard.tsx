"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRoomSchema } from "@repo/common/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { Check, Copy, Loader2, LogIn, Plus } from "lucide-react";
import { getPublicHttpUrl } from "@/lib/public-urls";
import { safeStorageGet } from "@/lib/storage";

type ActiveTab = "create" | "join";

interface ReadyState {
  roomName: string;
  shareUrl: string;
}

function parseRoomInput(raw: string): string {
  const trimmed = raw.trim();
  try {
    const url = new URL(trimmed, window.location.origin);
    const match = url.pathname.match(/\/room\/([^/]+)/);
    if (match?.[1]) {
      const invite = url.searchParams.get("invite");
      return invite ? `/room/${match[1]}?invite=${invite}` : `/room/${match[1]}`;
    }
  } catch {
    // not a URL — treat as plain slug
  }
  return `/room/${trimmed}`;
}

export function CreateRoomCard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("create");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState<ReadyState | null>(null);
  const [copied, setCopied] = useState(false);

  // Join tab state
  const [joinInput, setJoinInput] = useState("");
  const [joinError, setJoinError] = useState("");

  const router = useRouter();

  const form = useForm<z.infer<typeof CreateRoomSchema>>({
    resolver: zodResolver(CreateRoomSchema),
    defaultValues: { roomName: "", isPrivate: false },
  });

  const onSubmit = async (values: z.infer<typeof CreateRoomSchema>) => {
    setIsSubmitting(true);
    setError("");

    const token = safeStorageGet("token");
    if (!token) {
      setError("Not authenticated. Please sign in again.");
      setIsSubmitting(false);
      router.replace("/signin");
      return;
    }

    try {
      const response = await fetch(`${getPublicHttpUrl()}/room`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const responseData = (await response.json().catch(() => null)) as
        | { room?: { inviteCode?: string | null }; error?: string; message?: string }
        | null;

      if (!response.ok) {
        throw new Error(responseData?.error || responseData?.message || "Unable to create room");
      }

      if (responseData?.error) {
        setError(responseData.error);
      } else {
        const inviteQuery = responseData?.room?.inviteCode
          ? `?invite=${responseData.room.inviteCode}`
          : "";
        const shareUrl = `${window.location.origin}/room/${values.roomName}${inviteQuery}`;
        setReady({ roomName: values.roomName, shareUrl });
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCopyLink = async () => {
    if (!ready) return;
    try {
      await navigator.clipboard.writeText(ready.shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable
    }
  };

  const onEnterRoom = () => {
    if (!ready) return;
    const path = ready.shareUrl.replace(window.location.origin, "");
    router.push(path);
  };

  const onJoin = () => {
    const trimmed = joinInput.trim();
    if (!trimmed) {
      setJoinError("Enter a room name or invite link.");
      return;
    }
    setJoinError("");
    router.push(parseRoomInput(trimmed));
  };

  const switchTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setError("");
    setJoinError("");
    setReady(null);
    setCopied(false);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm dark:shadow-none">
      {/* Tab switcher */}
      <div className="mb-4 flex gap-1 rounded-lg bg-secondary/60 dark:bg-white/[0.04] p-1">
        <button
          type="button"
          onClick={() => switchTab("create")}
          className={`flex-1 rounded-md py-1.5 text-xs font-medium transition ${
            activeTab === "create"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Create room
        </button>
        <button
          type="button"
          onClick={() => switchTab("join")}
          className={`flex-1 rounded-md py-1.5 text-xs font-medium transition ${
            activeTab === "join"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Join room
        </button>
      </div>

      {/* Create tab */}
      {activeTab === "create" && (
        <>
          {ready ? (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground">Room created! Share the link or enter now.</p>
              <div className="flex gap-2">
                <input
                  readOnly
                  value={ready.shareUrl}
                  className="min-w-0 flex-1 rounded-lg border border-border bg-secondary/40 dark:bg-white/[0.04] px-3 py-2 text-xs text-foreground/70 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={onCopyLink}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-secondary/50 dark:bg-white/[0.04] px-3 py-2 text-xs text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <button
                type="button"
                onClick={onEnterRoom}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
              >
                Enter room →
              </button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="roomName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs text-muted-foreground">Room name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="my-project"
                          disabled={isSubmitting}
                          className="border-border bg-input text-foreground placeholder:text-muted-foreground/50 focus:border-primary/60"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      {error && <p className="text-xs text-destructive">{error}</p>}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isPrivate"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-xs text-muted-foreground">Private</FormLabel>
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            disabled={isSubmitting}
                            className="h-3.5 w-3.5 accent-indigo-600"
                          />
                        </FormControl>
                      </div>
                      <FormDescription className="text-[11px] text-muted-foreground/55">
                        Requires invite link to join.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Creating…</>
                  ) : (
                    <><Plus className="h-4 w-4" /> Create room</>
                  )}
                </button>
              </form>
            </Form>
          )}
        </>
      )}

      {/* Join tab */}
      {activeTab === "join" && (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Room name or invite link</label>
            <Input
              placeholder="my-project or https://…/room/my-project?invite=…"
              value={joinInput}
              onChange={(e) => {
                setJoinInput(e.target.value);
                if (joinError) setJoinError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") onJoin();
              }}
              className="border-border bg-input text-foreground placeholder:text-muted-foreground/50 focus:border-primary/60"
            />
            {joinError && <p className="text-xs text-destructive">{joinError}</p>}
          </div>
          <button
            type="button"
            onClick={onJoin}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            <LogIn className="h-4 w-4" /> Join room →
          </button>
        </div>
      )}
    </div>
  );
}
