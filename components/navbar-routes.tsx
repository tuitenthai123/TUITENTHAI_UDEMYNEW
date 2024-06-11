"use client";
import { isTeacher } from "@/lib/teacher";
import { UserButton, useAuth } from "@clerk/nextjs";
import { redirect,usePathname } from "next/navigation";
import Link from "next/link";


export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  if (!userId) {
    return redirect("/")
  }
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");

  return (
    <div className="flex gap-x-5 ml-auto">
      {isTeacherPage || isCoursePage ? (
          <div>
            <Link href={"/"} className="font-bold">
              Exit
            </Link>
          </div>
        ) : isTeacher(userId) ? (      
          <div >
            <Link href={"/teacher/course"} className="font-bold">
              Chỉnh sửa khóa học
            </Link>
          </div>
      ): null}
        <UserButton
          afterSignOutUrl="/"
        />
    </div>
  )
}