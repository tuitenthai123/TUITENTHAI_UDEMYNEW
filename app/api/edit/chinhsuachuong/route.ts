import { db } from "@/lib/db"

export async function POST(request: Request) {
  const res = await request.json()
  const idchuong = res.idchuong
  const Tenchuong = res.edittenchuong

  const reschuong = idchuong
    ? await db.chapter.updateMany({
      where: {
        id:idchuong
      },
      data:{
        tenchuong:Tenchuong
      }
    })
    : [] 

  return Response.json({ res })
}
