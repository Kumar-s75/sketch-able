import { RegisterSchema } from "@repo/common/types"
import { getPublicHttpUrl } from "@/lib/public-urls"
import { z } from "zod"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const res = await fetch(`${getPublicHttpUrl()}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    })

    const data = await res.json().catch(() => null) as { error?: string; message?: string } | null

    if (res.ok) {
        return data
    }

    throw new Error(data?.error || data?.message || "Unable to sign up")
}
