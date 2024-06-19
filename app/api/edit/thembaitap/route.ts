import { db } from "@/lib/db"

export async function POST(request: Request) {
  const res = await request.json()
  const chapterID = res?.chapterid
  const Inputdebai = res?.inputdebai
  const Codemau = res?.sourceCode

  const reschuong = await db.chapter.findMany({
    where:{
      id:chapterID
    }
  })
  let tongkhoahoc = await db.tongkhoahoc.findMany({})

  let tongbaitaptoankhoa = tongkhoahoc[0].tongbaitap 
  if(tongbaitaptoankhoa == null)
    {
      tongbaitaptoankhoa = 0;
    }
  let tongbaitaptoankhoanew = tongbaitaptoankhoa+1

  await db.tongkhoahoc.updateMany({
    data:{
      tongbaitap:tongbaitaptoankhoanew
    }
  })
  const soluongbaitap = reschuong[0].sumbaitap

  const soluongbaitapnew = soluongbaitap +1

  const reschuongnew = await db.chapter.updateMany({
    where:{
      id:chapterID
    },
    data:{
      sumbaitap:soluongbaitapnew
    }
  })

  const resbaitap = await db.baitap.createMany({
      data:{
        chapterId:chapterID,
        debai:Inputdebai,
        codemau:Codemau
      } 
    })

  return Response.json({ reschuong })
}
