import { db } from "@/lib/db"

export async function POST(request: Request) {
  const res = await request.json()

  return Response.json({ res })
}
