"use client"
import React, { useEffect,useState } from 'react'
import {Editbaitap} from "./_components/editbaitap"
import axios from 'axios';
import { RefreshCcw } from 'lucide-react';
import { Button } from "@/components/ui/button"

const page = () => {
    const [baitap, setbaitap] = useState([])
    const [reload, setreload] = useState(true)
    useEffect(() => {
      const fetchdata = async () =>{
        const currentPath = window.location.pathname;
        const pathfix = currentPath.split("/")
        const chapterId = pathfix[5]
        // const response = await axios.put(`/api/edit/${chapterId}`);
        // console.log('API response:', response.data);
        const res = await axios.post(
            "http://localhost:3000/api/edit/b3f6ab24-b880-41b8-ae54-e2aaafe118ce",
            {chapterId},
            {headers: {"Content-Type": "application/json",},},
          );
          setbaitap(res?.data?.resbaitap)
      }   
      fetchdata()
    }, [reload])
    // console.log(pathfix[5])
    // const response = db.baitap.findMany({})
  return (
    <div>
      <Button variant={"ghost"} className='flex  p-2 cursor-pointer' onClick={()=>setreload(!reload)}><RefreshCcw/></Button>
        {baitap.map(item => (
            <Editbaitap debai={item?.debai} idbaitap={item.id} viducode={item?.codemau} key={item.id}/>
        ))}
        
    </div>
    
  )
}

export default page