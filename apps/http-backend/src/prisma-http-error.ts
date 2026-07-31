export function prismaErrorToHttpResponse(
  error: unknown
): { status: number; body: { error: string } } | null {
  const err = error as
    | { code?: string; name?: string; message?: string }
    | undefined
    | null

  const code = typeof err?.code === "string" ? err.code : ""
  const name = typeof err?.name === "string" ? err.name : ""
  const message = typeof err?.message === "string" ? err.message : ""

  if (code === "P1001" || message.includes("P1001") || message.includes("Can't reach database server")) {
    return {
      status: 503,
      body: {
        error:
          "Cannot reach the database. Check DATABASE_URL, add ?sslmode=require for Supabase, ensure the DB is running, and resume the project in the Supabase dashboard if it was paused.",
      },
    }
  }
  if (code === "P1000" || message.includes("P1000")) {
    return {
      status: 503,
      body: {
        error:
          "Database authentication failed. Verify DATABASE_URL username and password.",
      },
    }
  }
  if (name === "PrismaClientInitializationError") {
    return {
      status: 503,
      body: {
        error:
          "Database connection failed. Check DATABASE_URL and that the database is reachable (e.g. Supabase: SSL and project not paused).",
      },
    }
  }
  return null
}
