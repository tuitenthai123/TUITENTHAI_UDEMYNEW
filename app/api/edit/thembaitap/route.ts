import { db } from "@/lib/db"

export async function POST(request: Request) {
  const res = await request.json()
  const chapterID = res?.chapterid
  const Inputdebai = res?.inputdebai
  const Codemau = res?.sourceCode

  const resbaitap = chapterID
    ? await db.baitap.createMany({
      data:{
        chapterId:chapterID,
        debai:Inputdebai,
        codemau:Codemau
      } 
    })
    : [] 

  return Response.json({ resbaitap })
}
