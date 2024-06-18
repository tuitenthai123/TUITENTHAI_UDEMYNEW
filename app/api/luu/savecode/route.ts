import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

export async function POST(request: Request) {
  let {userId} = auth()
  const res = await request.json() 

  if(!userId){
    userId=""
  }
  
  const updatecodeuser = await db.code.upsert({
    where: {
      id:res?.idbaitap,
      baiId:res?.idbaitap,
    },
    update:{
      codeuser:res?.sourceCode,
      checkcode:res?.Checkcodehehe,
      gemini:res?.geminifix
    },
    create:{
      id:res?.idbaitap,
      userId:userId,
      chapterId:res?.idchuong,
      baiId:res?.idbaitap,
      codeuser:res?.sourceCode,
      checkcode:res?.Checkcodehehe,
      gemini:res?.geminifix
    }
  }
  )
  // const tongsobaitap = await db.tongkhoahoc.findMany({
  //   where:{
  //     id:"680b3e96-cfb1-4fcf-a530-6dd50ea59822"
  //   }
  // })

  // const socaulamduocnew = socaulamduoc[0].hoanthanhkhoa

  // if(res?.checkcodehehe === "dung"){
  //   let sobaitap = await db.chapter.findMany({
  //     where:{
  //       id:res?.idchuong
  //     }
  //   })
  //   let tiendohoanthanh = sobaitap[0].sumbaitap 
  // }

  return Response.json({ updatecodeuser })
}
