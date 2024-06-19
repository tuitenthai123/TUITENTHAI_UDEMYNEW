import { db } from "@/lib/db"

export async function POST(request: Request) {
  const res = await request.json()
  const Idbaitap = res?.idbaitap
  const IDchuong = res?.idChuong
  
  const resxoacode = Idbaitap
    ? await db.code.deleteMany({ 
      where: { 
        baiId:Idbaitap 
      },
    })
    : []

  let tongkhoahoc = await db.tongkhoahoc.findMany({})

  let tongbaitaptoankhoa = tongkhoahoc[0].tongbaitap 
  if(tongbaitaptoankhoa == null)
    {
      tongbaitaptoankhoa = 0;
    }
  let tongbaitaptoankhoanew = tongbaitaptoankhoa-1
  
  await db.tongkhoahoc.updateMany({
    data:{
      tongbaitap:tongbaitaptoankhoanew
    }
  })
  
  const soluongbaitap = await db.chapter.findMany({
    where:{
      id:IDchuong
    }
  })
  const soluongbaitapnew = soluongbaitap[0]?.sumbaitap - 1

  await db.chapter.updateMany({
    where:{
      id:IDchuong
    },
    data:{
      sumbaitap:soluongbaitapnew
    }
  })

    const resxoabai = Idbaitap
    ? await db.baitap.delete({ 
      where: { 
        id:Idbaitap 
      },
    })
    : []
  return Response.json({ resxoabai,resxoacode })
}
