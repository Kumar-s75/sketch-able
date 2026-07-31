import React, { useState } from "react"
import { Share2 } from "lucide-react"

interface ShareButtonProps {
  inviteCode?: string | null
}

export const ShareButton = ({ inviteCode }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false)

  const onShare = async () => {
    try {
      const url = new URL(window.location.href)
      if (inviteCode) {
        url.searchParams.set("invite", inviteCode)
      }
      await navigator.clipboard.writeText(url.toString())
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      onClick={onShare}
      className="flex items-center gap-2 rounded-md bg-[#232329] px-3 py-2 text-sm text-white/90 hover:text-white"
      title="Copy room link"
      type="button"
    >
      <Share2 className="h-4 w-4" />
      {copied ? "Copied" : "Share"}
    </button>
  )
}
