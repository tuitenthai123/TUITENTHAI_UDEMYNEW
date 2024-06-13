import { db } from "@/lib/db"

export async function POST(request: Request) {
  const res = await request.json()
  const idchuong = res.idchuong

  const reschuong = idchuong
    ? await db.chapter.findMany({
      where: {
        id:idchuong
      }
    })
    : [] 

  return Response.json({ reschuong })
}
