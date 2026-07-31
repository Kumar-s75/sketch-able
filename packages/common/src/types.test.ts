import { describe, expect, it } from "vitest"
import { CreateRoomSchema, LoginSchema, RegisterSchema } from "./types"

describe("RegisterSchema", () => {
  it("accepts valid user payload", () => {
    const result = RegisterSchema.safeParse({
      username: "jane_doe",
      email: "jane@example.com",
      password: "secret123",
    })

    expect(result.success).toBe(true)
  })

  it("rejects too-long username", () => {
    const result = RegisterSchema.safeParse({
      username: "a".repeat(21),
      email: "jane@example.com",
      password: "secret123",
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain("exceeds 20")
    }
  })

  it("rejects invalid email", () => {
    const result = RegisterSchema.safeParse({
      username: "jane",
      email: "not-an-email",
      password: "secret123",
    })

    expect(result.success).toBe(false)
  })

  it("rejects short password", () => {
    const result = RegisterSchema.safeParse({
      username: "jane",
      email: "jane@example.com",
      password: "123",
    })

    expect(result.success).toBe(false)
  })
})

describe("LoginSchema", () => {
  it("accepts valid login payload", () => {
    const result = LoginSchema.safeParse({
      email: "jane@example.com",
      password: "anything",
    })

    expect(result.success).toBe(true)
  })

  it("rejects invalid email", () => {
    const result = LoginSchema.safeParse({
      email: "invalid",
      password: "anything",
    })

    expect(result.success).toBe(false)
  })
})

describe("CreateRoomSchema", () => {
  it("accepts public room payload", () => {
    const result = CreateRoomSchema.safeParse({
      roomName: "Design Review",
      isPrivate: false,
    })

    expect(result.success).toBe(true)
  })

  it("accepts payload with omitted privacy flag", () => {
    const result = CreateRoomSchema.safeParse({
      roomName: "Planning",
    })

    expect(result.success).toBe(true)
  })

  it("rejects empty room name", () => {
    const result = CreateRoomSchema.safeParse({
      roomName: "",
      isPrivate: true,
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain("required")
    }
  })

  it("rejects room names over 50 chars", () => {
    const result = CreateRoomSchema.safeParse({
      roomName: "a".repeat(51),
    })

    expect(result.success).toBe(false)
  })
})
