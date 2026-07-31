import { verifyUserJwt } from "@repo/common/jwt"

export const checkUser = async (token: string): Promise<string | null> => {
  if (!process.env.JWT_SECRET) {
    return null
  }

  return verifyUserJwt(token, process.env.JWT_SECRET)
}
