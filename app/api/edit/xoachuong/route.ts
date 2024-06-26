import { db } from "@/lib/db"

export async function POST(request: Request) {
  const res = await request.json()
  const IDchuong = res?.idchuong

  const xoabaitap = await db.baitap.deleteMany({
    where:{
      chapterId:IDchuong
    }
  })
  const xoacode = await db.code.deleteMany({
    where:{
      chapterId:IDchuong
    }
  })

  // tru tong bai tap
  const tongbaitapchuong = await db.chapter.findMany({
    where:{
      id:IDchuong
    }
  })

  const tongbaihockhoa = await db.tongkhoahoc.findMany({})
  let tongbaihocso = tongbaihockhoa[0].tongbaitap
  if(tongbaihocso == null)
    {
      tongbaihocso = 0;
    }
  const sobaiconlai = tongbaihocso - tongbaitapchuong[0].sumbaitap
  
  const updatetongbaitap = await db.tongkhoahoc.updateMany({
    where:{
      id:"680b3e96-cfb1-4fcf-a530-6dd50ea59822"
    },
    data:{
      tongbaitap:sobaiconlai
    }
  })

  const xoachuong = await db.chapter.deleteMany({
    where:{
      id:IDchuong
    }
  })
  
  return Response.json({ xoachuong,updatetongbaitap,xoabaitap,xoacode })
}
