import React from 'react'
import { db } from "@/lib/db";
import { columns } from '../[courseid]/_components/columns';
import { DataTable } from '../[courseid]/_components/datatable';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


const page = async ()  => {
  const chuong = await db.chapter.findMany(    {
    orderBy: {
      tenchuong: "asc"
  }})
  

  return (
    <div>
      <div className='p-3 ml-3'>
        <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/teacher/course">Khóa học</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Chương</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      </div>
      <div className='p-6 -mt-6'>
        <DataTable columns={columns} data={chuong}/>
      </div>
    </div>
  )
}

export default page