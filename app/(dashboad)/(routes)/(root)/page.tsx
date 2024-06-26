import { auth } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { db } from '@/lib/db';

import { CourseProgress } from "@/components/course-progress";
import { IconBadge } from "@/components/icon-badge";

export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const tiengdo = await db.user.findMany({
    where:{
      userId:userId
    }
  })

  return (
<>
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-4 sm:grid-cols-4 gap-4">
      <Link href={"/courses/laptrinhcanban/e2029146-ac8c-4565-9566-9c2d3ebb9416"}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt="khoa hoc c++" 
            src={"/ngon-ngu-c-.jpg"}
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            khóa học c++
          </div>
          <p className="text-xs text-muted-foreground">
            lập trình
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                Chapters
              </span>
            </div>
          </div>
          <CourseProgress
              variant={"default"}
              size="sm"
              value={tiengdo[0].hoanthanhkhoa}
            />
          
        </div>
      </div>
    </Link>
      </div>
    </div>
</>
  )
}
