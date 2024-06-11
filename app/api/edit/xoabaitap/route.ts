import { db } from "@/lib/db"

export async function POST(request: Request) {
  const res = await request.json()
  const Idbaitap = res?.idbaitap
  const resbaitap = Idbaitap
    ? await db.baitap.delete({ 
      where: { 
        id:Idbaitap 
      },
    })
    : [] 

  return Response.json({ resbaitap })
}
