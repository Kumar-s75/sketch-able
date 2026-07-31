import { afterEach, describe, expect, it } from "vitest"
import { signUserJwt } from "@repo/common/jwt"
import { checkUser } from "./checkUser"

const ORIGINAL_SECRET = process.env.JWT_SECRET

afterEach(() => {
  process.env.JWT_SECRET = ORIGINAL_SECRET
})

describe("checkUser", () => {
  it("returns null when JWT_SECRET is missing", async () => {
    delete process.env.JWT_SECRET
    const token = await signUserJwt({ userId: "abc" }, "fallback", "1h")

    expect(await checkUser(token)).toBeNull()
  })

  it("returns userId for valid token", async () => {
    process.env.JWT_SECRET = "test-secret"
    const token = await signUserJwt({ userId: "user-123" }, process.env.JWT_SECRET, "1h")

    expect(await checkUser(token)).toBe("user-123")
  })

  it("returns null for invalid token", async () => {
    process.env.JWT_SECRET = "test-secret"

    expect(await checkUser("not-a-valid-jwt")).toBeNull()
  })

  it("returns null when token was signed with different secret", async () => {
    process.env.JWT_SECRET = "secret-a"
    const token = await signUserJwt({ userId: "user-123" }, "secret-b", "1h")

    expect(await checkUser(token)).toBeNull()
  })
})
