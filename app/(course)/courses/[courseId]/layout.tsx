import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NavbarRoutes } from "@/components/navbar-routes";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import React from "react";
import Link from "next/link";

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

  const chuong = [
    {title: "Chương 1: Tổng quan về ngôn ngữ C++",route:"chapter1"},
    {title: "Chương 2: Các cấu trúc điều khiển",route:"chapter2"},
    {title: "Chương 3: Dữ liệu kiểu mảng",route:"chapter3"},
    {title: "Chương 4: Dữ liệu kiểu chuỗi",route:"chapter4"},
    {title: "Chương 5: Con trỏ và hàm",route:"chapter5"},
    {title: "Chương 6: Dữ liệu kiểu cấu trúc",route:"chapter6"},
    {title: "Chương 7: Dữ liệu kiểu tập tin",route:"chapter7"},
  ]

  



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
            href={`/courses/laptrinhcanban/${chapter.route}`}
            className={cn(
              "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20"
            )}
        >
          <div className="flex items-center gap-x-2 py-4">
            <CheckCircle
              size={22}
              className={cn(
                "text-slate-500", "text-slate-700",
              )}
            />
              {chapter.title}
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