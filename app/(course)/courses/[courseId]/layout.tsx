import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NavbarRoutes } from "@/components/navbar-routes";
import { cn } from "@/lib/utils";
import { BookText  } from "lucide-react";
import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";

const CourseLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/")
  }
  const chuong = await db.chapter.findMany({
    orderBy: {
      tenchuong: "asc"
    }
  })

  const conmeo = await db.user.upsert({
    where:{
      id:userId
    },
    create:{
      id:userId,
      userId:userId,
      hoanthanhchuong:["0", "0", "0", "0", "0", "0"],
      hoanthanhkhoa:0
    },
    update:{
      id:userId
    }
  })
  //console.log(chuong)

  return (
    <div className="h-full">
        <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
          <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <NavbarRoutes />      
          </div>
        </div>
        <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="p-8 flex flex-col border-b">
          <h1 className="font-bold flex justify-center">
            lập trình căn bản
          </h1>
        </div>
        <div className="flex flex-col w-full">
      {chuong.map((chapter)=>(
        <Link
            href={`/courses/laptrinhcanban/${chapter.id}`}
            className={cn(
              "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20"
            )}
            key={chapter.id}
        >
          <div className="flex items-center gap-x-2 py-4">
            <BookText
              size={22}
              className={cn(
                "text-slate-500", "text-slate-700",
              )}
            />
              {chapter.tenchuong}
          </div>
        </Link>
      ))}
        </div>
      </div>
      </div>
      <main className="md:pl-80 pt-[80px] h-full">
        {children}
      </main>
    </div>
  )
}

export default CourseLayout