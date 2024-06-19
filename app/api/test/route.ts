import { db } from "@/lib/db"
export async function POST(request: Request) {
    const updatecodeuser = await db.code.count({
      where:{
        checkcode:"dung"
      }
    })
    return Response.json({ updatecodeuser })
  }
  