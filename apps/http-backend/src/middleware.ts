import { Request, Response, NextFunction } from "express"
import { verifyUserJwt } from "@repo/common/jwt"

declare global {
  namespace Express {
    interface Request {
      userId?: string
      requestId?: string
    }
  }
}

export const middleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = extractAuthToken(req.headers["authorization"])

  if (!process.env.JWT_SECRET) {
    res.status(500).json({ message: "Server misconfigured" })
    return
  }

  try {
    const userId = await verifyAuthToken(token)
    if (typeof userId === "string") {
      req.userId = userId
      next()
    } else {
      res.status(401).json({
        message: "Unauthorized!",
      })
    }
  } catch {
    res.status(401).json({
      message: "Unauthorized!",
    })
  }
}

export const extractAuthToken = (authorizationHeader: string | string[] | undefined): string => {
  const value = Array.isArray(authorizationHeader) ? authorizationHeader[0] : authorizationHeader
  if (!value || typeof value !== "string") return ""
  const trimmed = value.trim()
  if (!trimmed) return ""
  if (trimmed.toLowerCase().startsWith("bearer ")) {
    return trimmed.slice(7).trim()
  }
  return trimmed
}

export const verifyAuthToken = async (token: string): Promise<string | null> => {
  if (!token || !process.env.JWT_SECRET) {
    return null
  }
  return verifyUserJwt(token, process.env.JWT_SECRET)
}
