import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

export async function POST(request: Request) {
  const res = await request.json()
  let {userId} = auth();

  if(!userId){
    userId=""
  }

    let rescode = await db.code.findMany({
        where: {
            id:res?.IDbaitap,
            baiId:res?.IDbaitap,
            chapterId:res?.IDchuong,
            userId:userId
        }
    })
  return Response.json({ rescode })
}
