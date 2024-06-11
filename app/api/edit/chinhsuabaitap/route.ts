import { db } from "@/lib/db"

export async function POST(request: Request) {
  const res = await request.json()
  const Idbaitap = res?.idbaitap
  const Debai = res?.debaivalue
  const Codemau = res?.sourceCode

  const resbaitap = Idbaitap
    ? await db.baitap.update({ 
      where: { 
        id:Idbaitap 
      },
      data:{
        debai:Debai,
        codemau:Codemau
      } 
    })
    : [] 

  return Response.json({ resbaitap })
}
