import { db } from "@/lib/db"

export async function POST(request: Request) {
  const res = await request.json()
  const chapterId = res?.ChapterID

  // Use chapterId if it exists, otherwise handle the case where it's missing
  const resbaitap = chapterId
    ? await db.baitap.findMany({ where: { chapterId }, orderBy:{
      debai:"asc"
    } })
    : [] // Handle case where chapterId is missing (e.g., return empty array)

  return Response.json({ resbaitap })
}
