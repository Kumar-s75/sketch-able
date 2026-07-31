"use client"

import { getPublicHttpUrl } from "./public-urls"
import { safeStorageGet, safeStorageRemove } from "./storage"

export const hasValidSession = async (): Promise<boolean> => {
  const token = safeStorageGet("token")
  if (!token) {
    return false
  }

  try {
    const response = await fetch(`${getPublicHttpUrl()}/user`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      safeStorageRemove("token")
      return false
    }

    return true
  } catch {
    return false
  }
}
