import * as jose from "jose"

export async function signUserJwt(
  payload: { userId: string },
  secret: string,
  expiresIn: string
): Promise<string> {
  const key = new TextEncoder().encode(secret)
  return await new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(key)
}

export async function verifyUserJwt(token: string, secret: string): Promise<string | null> {
  try {
    const key = new TextEncoder().encode(secret)
    const { payload } = await jose.jwtVerify(token, key, {
      algorithms: ["HS256"],
    })
    if (typeof payload.userId === "string") {
      return payload.userId
    }
    return null
  } catch {
    return null
  }
}
