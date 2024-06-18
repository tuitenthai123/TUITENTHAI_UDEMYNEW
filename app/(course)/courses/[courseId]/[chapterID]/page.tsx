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
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

const page = () => {
    const [baitap, setbaitap] = useState([])
    const [lythuyet, setlythuyet] = useState("")
    const [tenchuong, settenchuong] = useState("")
    const [Chapterid,setChapterid] = useState("")
    useEffect(() => {
        const fetchdata = async () =>{
            const currentPath = window.location.pathname
            const pathfix = currentPath.split("/") 
            let ChapterID = pathfix[3]
            const idchuong = ChapterID
            setChapterid(ChapterID)
            // const response = await axios.put(`/api/edit/${chapterId}`);
            // console.log('API response:', response.data);
            const res = await axios.post(
                "http://localhost:3000/api/edit/b3f6ab24-b880-41b8-ae54-e2aaafe118ce",
                {ChapterID},
                {headers: {"Content-Type": "application/json",},},
              );
              setbaitap(res?.data?.resbaitap)
            const response = await axios.post("/api/edit/timchuong",{idchuong},{headers: {"Content-Type": "application/json",},},)
            setlythuyet(response?.data?.reschuong[0]?.lythuyet)
            settenchuong(response?.data?.reschuong[0]?.tenchuong)
          }
          fetchdata()
      }, [])
      
    return (
    <div>
      <div className='p-5 flex justify-center text-3xl font-bold'>{tenchuong}</div>
          <div className='p-2 text-2xl font-bold'>
           I. Lý thuyết
          </div>
          <div className='p-5'>
            <div className='p-5 border-4 border-dashed rounded-lg'>
              <FroalaEditorView model={lythuyet} />
            </div>
          </div>
          <div className='p-2 text-2xl font-bold'>
            II. Bài tập
          </div>

      {baitap.map((item) => (
        <div  key={item.id}>
          <Accordion type="single" collapsible className="w-full p-6">
            <AccordionItem value={item.id}>
              <AccordionTrigger>{item.debai}</AccordionTrigger>
              <AccordionContent>
                <Baitap debai={item.debai} viducode={item.codemau} idbaitap={item.id} chapterid={Chapterid}/>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
    ))}
    </div>
  )
}

export default page