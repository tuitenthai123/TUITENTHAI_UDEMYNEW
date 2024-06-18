import { db } from "@/lib/db"

export async function POST(request: Request) {
  const res = await request.json()
    const resxoabai = await db.chapter.create({ 
      data:{
        sumbaitap:0,
        tenchuong:res?.title,
        lythuyet:"<p>hiện tại vẫn chưa có lý thuyết</p>"
      }
    })
  return Response.json({ resxoabai })
}
