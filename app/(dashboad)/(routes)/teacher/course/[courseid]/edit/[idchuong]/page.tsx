"use client"
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect,useRef,useState } from 'react'
import {Editbaitap} from "./_components/editbaitap"
import axios from 'axios';
import { RefreshCcw } from 'lucide-react';
import Editor from "@monaco-editor/react";
import { ToastContainer,toast } from 'react-toastify';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const page = () => {
  const debai = useRef("")
  const [baitap, setbaitap] = useState([])
  const [reload, setreload] = useState(true)
  const [chapterid, setchapterid] = useState("")
  const [sourceCode, setSourceCode] = useState("")
  useEffect(() => {
    const fetchdata = async () =>{
      const currentPath = window.location.pathname
      const pathfix = currentPath.split("/")
      setchapterid(pathfix[5]) 
      const ChapterID = pathfix[5]
      // const response = await axios.put(`/api/edit/${chapterId}`);
      // console.log('API response:', response.data);
      const res = await axios.post(
          "http://localhost:3000/api/edit/b3f6ab24-b880-41b8-ae54-e2aaafe118ce",
          {ChapterID},
          {headers: {"Content-Type": "application/json",},},
        );
        //console.log(res)
        setbaitap(res?.data?.resbaitap)
    }   
    fetchdata()
  }, [reload])
  // console.log(pathfix[5])
  // const response = db.baitap.findMany({})
  function handleOnchange(value: string) {
    setSourceCode(value)
  }
  
  const handlethembaitap = async () =>{
    const inputdebai = debai.current.value
    const res = await axios.post(
      "http://localhost:3000/api/edit/thembaitap",
      {
        chapterid,
        inputdebai,
        sourceCode,
      },
      {headers: {"Content-Type": "application/json",},},
    );
    toast.success('tạo bài tập thành công', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
      });
  }


  return (
    <Dialog>
      <ToastContainer/>
      <div>
        <div className='flex justify-end gap-2 p-2'>
          <Button variant={"ghost"} className='flex  p-2 cursor-pointer' onClick={()=>setreload(!reload)}><RefreshCcw/></Button>
          <DialogTrigger className='bg-black p-2 rounded-lg text-white'>Thêm bài tập</DialogTrigger>
        </div>
        <div></div>
        { baitap.length === 0 
          ? <span className='flex items-center justify-center min-h-screen text-lg'>Chương hiện tại trống!</span> 
          :baitap.map(item => (
              <Editbaitap 
                debai={item?.debai} 
                idbaitap={item.id} 
                viducode={item?.codemau} 
                key={item.id}
                idchuong={chapterid}
              />
            ))
        }
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm bài tập</DialogTitle>
          <DialogDescription>
            Điền các thông tin bài tập tại đây
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="debai" className="text-right">
              Đề bài
            </Label>
            <Input className="col-span-3" ref={debai}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="codemau" className="text-right">
              Code mẫu
            </Label>
              <Editor
                theme={ "vs-dark"}
                height="400px"
                width="342px"
                defaultLanguage={"c++"}
                defaultValue={""}
                language={"c++"}
                onChange={handleOnchange}
              />
          </div>
          <DialogFooter>
            <Button onClick={handlethembaitap}>Thêm bài tập</Button>
          </DialogFooter>
        </div>
      </DialogContent>

    </Dialog>
    
  )
}

export default page