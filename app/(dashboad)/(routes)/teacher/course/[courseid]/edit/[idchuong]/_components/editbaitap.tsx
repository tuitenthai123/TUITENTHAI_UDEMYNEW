import React,{useState,useRef, useEffect} from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Bolt,FilePenLine,Eraser} from 'lucide-react';
import Editor from "@monaco-editor/react";
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label"

interface Ibaitap {
    debai:String,
    viducode:String,
    idbaitap:String,
    idchuong:String
};


export const Editbaitap = (BaiTap: Ibaitap) => {
  
  enum Dialogs {
    dialog1 = 'dialog1',
    dialog2 = 'dialog2',
  }
  
  const debai = useRef("")
  const [sourceCode, setSourceCode] = useState("");
  const [dialog, setDialog] = useState()
  let idbaitap = BaiTap.idbaitap

  function handleOnchange(value: string) {
    setSourceCode(value)
}

  const handlechinhsua = async () => {
    const debaivalue = debai.current.value
    const response = await axios.post(`/api/edit/chinhsuabaitap`,{
      idbaitap,
      debaivalue,
      sourceCode
    },{
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
  toast.success('chỉnh sửa thành công', {
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

  useEffect(() => {
    setSourceCode(BaiTap.viducode)
  }, [])
  

  const handlexoa = async () => {
    const idChuong = BaiTap.idchuong
    const response = await axios.post(`/api/edit/xoabaitap`,{
      idbaitap,
      idChuong
    },{
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
  toast.success('xóa thành công', {
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
    <div className='flex flex-col gap-3 p-2'>
        <div className='bg-sky-100  rounded-lg p-2  flex flex-col gap-2'>
            <div className='flex justify-between p-2'>
              <span>{BaiTap.debai}</span>
              <DropdownMenu>
              <DropdownMenuTrigger><Bolt className='w-6 cursor-pointer'/></DropdownMenuTrigger>
              <DropdownMenuContent>
              <DialogTrigger
                asChild
                onClick={() => {setDialog(Dialogs.dialog1)}}>
                  <DropdownMenuItem>
                  <FilePenLine className='mr-2 h-4 w-4'/>
                    Chỉnh sửa bài tập
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger
                      asChild
                      onClick={() => {
                        setDialog(Dialogs.dialog2)
                      }}
                    >
                <DropdownMenuItem>
                  <Eraser className='mr-2 h-4 w-4'/>
                  Xóa bài tập
                </DropdownMenuItem>
            </DialogTrigger>
                
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
            <SyntaxHighlighter className="rounded-xl" language="cpp" style={atomOneDark} customStyle={{
              padding: "15px"
            }}
            wrapLongLines={true}
            >
                {BaiTap.viducode} 
            </SyntaxHighlighter>
        </div>
    </div>
    {/* dialog chinh sua */}
    <DialogContent>
    {dialog === Dialogs.dialog1
      ? 
      <div>
        <DialogHeader>
          <DialogTitle className='flex justify-center'>Chỉnh sửa bài tập</DialogTitle>
          <DialogDescription className='flex justify-center'>
            Chỉnh sửa tùy ý các lựa chọn bên dưới
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="debai" className="text-right">
              Đề bài
            </Label>
            <Input
            ref={debai}
            defaultValue={BaiTap.debai}
              className="col-span-3"
            />
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
                  defaultValue={BaiTap.viducode}
                  language={"c++"}
                  onChange={handleOnchange}
                />
          </div>
        </div>
        <DialogFooter className='flex justify-center'>
          <Button onClick={handlechinhsua}>Lưu chỉnh sửa</Button>
        </DialogFooter>
      </div>
      : 
      <div>
        <DialogHeader>
          <DialogTitle className='flex justify-center'>Chỉnh sửa bài tập</DialogTitle>
        </DialogHeader>
        <div className='p-5 flex justify-center'> các dữ liệu bị xóa không thể khôi phục</div>
        <DialogFooter className='flex justify-center'>
          <Button variant={"destructive"} onClick={handlexoa}>Xóa bài tập</Button>
        </DialogFooter>
      </div>
    }   
    </DialogContent>  
  </Dialog>
  )
}


