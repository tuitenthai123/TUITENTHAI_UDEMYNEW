import React, { useEffect } from 'react'
import { db } from "@/lib/db";
import { columns } from '../[courseid]/_components/columns';
import { DataTable } from '../[courseid]/_components/datatable';

const page = async ()  => {
  const chuong = await db.chapter.findMany(    {
    orderBy: {
      tenchuong: "asc"
  }})

  return (
    <div className='p-6 -mt-6'>
      <DataTable columns={columns} data={chuong}/>
    </div>
  )
}

export default page