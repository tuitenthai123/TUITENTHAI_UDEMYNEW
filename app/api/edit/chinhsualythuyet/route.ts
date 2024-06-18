import { db } from "@/lib/db"

export async function POST(request: Request) {
  const res = await request.json()
  const idchuong = res.idchuong
  const lythuyet = res.model

  const reschuong = idchuong
    ? await db.chapter.updateMany({
      where: {
        id:idchuong
      },
      data:{
        lythuyet:lythuyet
      }
    })
    : [] 

  return Response.json({ res })
}
