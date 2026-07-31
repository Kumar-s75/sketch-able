"use client"

import { useCallback, useEffect, useState } from "react"
import { getPublicHttpUrl } from "@/lib/public-urls"
import { safeStorageGet, safeStorageRemove } from "@/lib/storage"

export interface RoomSummary {
  id: string
  roomName: string
}

export interface AuthenticatedUser {
  id: string
  username: string
  email: string
  room: RoomSummary[]
}

interface UseUserResponse {
  user: AuthenticatedUser | null
  isLoading: boolean
  error: string | null
  reload: () => Promise<void>
}

interface UserResponse {
  user?: AuthenticatedUser
  error?: string
  message?: string
}

export const useUser = (): UseUserResponse => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUser = useCallback(async () => {
    setIsLoading(true)
    const token = safeStorageGet("token")

    if (!token) {
      setUser(null)
      setError("AUTH_REQUIRED")
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch(`${getPublicHttpUrl()}/user`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })

      if (res.status === 401) {
        safeStorageRemove("token")
        setUser(null)
        setError("AUTH_REQUIRED")
        return
      }

      const data = (await res.json().catch(() => null)) as UserResponse | null

      if (!res.ok) {
        setUser(null)
        setError(data?.error || data?.message || "Failed to load user")
        return
      }

      if (!data?.user) {
        setUser(null)
        setError("Malformed user response from server")
        return
      }

      setUser({
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        room: Array.isArray(data.user.room)
          ? data.user.room.map((r) => ({
              id: String(r.id),
              roomName: r.roomName,
            }))
          : [],
      })
      setError(null)
    } catch (err: unknown) {
      setUser(null)
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchUser()
  }, [fetchUser])

  return { user, isLoading, error, reload: fetchUser }
}
