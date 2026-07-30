"use client"

import SignupFormDemo from "@/components/signup-form-demo"
import Link from "next/link"

const SignInPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="text-lg font-semibold text-foreground">
            Sketchable
          </Link>
        </div>
        <SignupFormDemo mode="signin" />
      </div>
    </main>
  )
}

export default SignInPage
