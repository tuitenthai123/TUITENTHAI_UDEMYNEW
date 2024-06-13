"use client"

import React,{useEffect,useState} from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import axios from 'axios'
import { Baitap } from '../_components/baitap'

const page = () => {
    const [baitap, setbaitap] = useState([])
    useEffect(() => {
        const fetchdata = async () =>{
            const currentPath = window.location.pathname
            const pathfix = currentPath.split("/") 
            const ChapterID = pathfix[3]
            // const response = await axios.put(`/api/edit/${chapterId}`);
            // console.log('API response:', response.data);
            const res = await axios.post(
                "http://localhost:3000/api/edit/b3f6ab24-b880-41b8-ae54-e2aaafe118ce",
                {ChapterID},
                {headers: {"Content-Type": "application/json",},},
              );
              console.log(res)
              setbaitap(res?.data?.resbaitap)
          }   
          fetchdata()
      }, [])
      
    return (
    <div>
        {/* {baitap.map((item) => (
            <div key={item.id}>
                <Baitap debai={item.debai} viducode={item.codemau} key={item.id} />
            </div>
        ))} */}
            <div className='p-2 text-2xl font-bold'>
        Bài tập
      </div>
    {baitap.map((item) => (
      <Accordion type="single" collapsible className="w-full p-6" key={item.id}>
        <AccordionItem value={item.id}>
          <AccordionTrigger>{item.debai}</AccordionTrigger>
          <AccordionContent>
            <Baitap debai={item.debai} viducode={item.codemau} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ))}
    </div>
  )
}

export default page