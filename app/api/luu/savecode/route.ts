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
 


  // const socaulamduocnew = socaulamduoc[0].hoanthanhkhoa

  if(res?.Checkcodehehe === "dung"){
    const tongsocau = await db.tongkhoahoc.findMany({
      where:{
        id:"680b3e96-cfb1-4fcf-a530-6dd50ea59822"
      }
    })
  
    const socaullamdung = await db.code.count({
      where:{
        checkcode:"dung"
      }
    })
  
    let tongbaitap = 1
    if (tongsocau.length > 0 && tongsocau[0].hasOwnProperty('tongbaitap')) {
      tongbaitap = tongsocau[0].tongbaitap || 1;
    }
  
    let tiendohoc = (socaullamdung * 100) / tongbaitap

    const capnhattiendohoc = await db.user.updateMany({
      where:{
        id:userId
      },
      data:{
        hoanthanhkhoa:tiendohoc
      }
    })
  }

  return Response.json({updatecodeuser  })
}
