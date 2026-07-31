"use client"

export const safeStorageGet = (key: string): string | null => {
  try {
    if (typeof window === "undefined") {
      return null
    }
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export const safeStorageSet = (key: string, value: string): boolean => {
  try {
    if (typeof window === "undefined") {
      return false
    }
    window.localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

export const safeStorageRemove = (key: string): boolean => {
  try {
    if (typeof window === "undefined") {
      return false
    }
    window.localStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}
