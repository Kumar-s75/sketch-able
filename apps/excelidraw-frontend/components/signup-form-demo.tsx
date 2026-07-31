"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { login, demoLogin } from "@/actions/login"
import { register } from "@/actions/register"
import { safeStorageSet } from "@/lib/storage"

type AuthMode = "signin" | "signup"

export default function SignupFormDemo({ mode = "signup" }: { mode?: AuthMode }) {
  const router = useRouter()
  const isSignup = mode === "signup"

  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [demoLoading, setDemoLoading] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError(null)

    if (!email || !password) {
      setSubmitError("Email and password are required")
      return
    }

    if (isSignup && password !== confirmPassword) {
      setSubmitError("Password and confirm password must match")
      return
    }

    setLoading(true)
    try {
      if (isSignup) {
        const username = [firstName, lastName].join(" ").trim() || email.split("@")[0] || "User"
        await register({ email, password, username })
      }

      const res = await login({ email, password })
      if (!safeStorageSet("token", res.token)) {
        throw new Error("Browser storage is blocked. Enable storage access for this site.")
      }
      router.replace("/dashboard")
    } catch (error: unknown) {
      setSubmitError(error instanceof Error ? error.message : `${isSignup ? "Sign up" : "Sign in"} failed`)
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setSubmitError(null)
    setDemoLoading(true)
    try {
      const res = await demoLogin()
      if (!safeStorageSet("token", res.token)) {
        throw new Error("Browser storage is blocked. Enable storage access for this site.")
      }
      router.replace("/dashboard")
    } catch (error: unknown) {
      setSubmitError(error instanceof Error ? error.message : "Demo login failed")
    } finally {
      setDemoLoading(false)
    }
  }

  return (
    <div className="w-full rounded-xl border border-border bg-card p-6 shadow-sm dark:shadow-none">
      <h2 className="text-lg font-semibold text-foreground">
        {isSignup ? "Create your account" : "Welcome back"}
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {isSignup
          ? "Sign up to start collaborative whiteboarding."
          : "Sign in to continue to your rooms."}
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {isSignup && (
          <div className="flex gap-3">
            <Field label="First name" id="firstname">
              <input
                id="firstname"
                placeholder="Tyler"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Last name" id="lastname">
              <input
                id="lastname"
                placeholder="Durden"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
        )}

        <Field label="Email" id="email">
          <input
            id="email"
            placeholder="you@example.com"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </Field>

        {isSignup ? (
          <div className="flex gap-3">
            <Field label="Password" id="password">
              <input
                id="password"
                placeholder="••••••••"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Confirm" id="confirmPassword">
              <input
                id="confirmPassword"
                placeholder="••••••••"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
        ) : (
          <Field label="Password" id="password">
            <input
              id="password"
              placeholder="••••••••"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </Field>
        )}

        {submitError && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:opacity-60"
        >
          {loading ? `${isSignup ? "Signing up" : "Signing in"}…` : isSignup ? "Create account" : "Sign in"}
        </button>

        <div className="relative flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground/60">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={demoLoading || loading}
          className="w-full rounded-lg border border-border bg-secondary/50 py-2.5 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground disabled:opacity-60"
        >
          {demoLoading ? "Loading demo…" : "Continue with demo account"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground/80">
        {isSignup ? "Already have an account? " : "Don't have an account? "}
        <Link
          href={isSignup ? "/signin" : "/signup"}
          className="text-indigo-600 dark:text-indigo-400 transition hover:text-indigo-500 dark:hover:text-indigo-300"
        >
          {isSignup ? "Sign in" : "Sign up"}
        </Link>
      </p>
    </div>
  )
}

const inputClass =
  "w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition focus:border-primary/60 focus:ring-0"

function Field({
  label,
  id,
  children,
}: {
  label: string
  id: string
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  )
}
