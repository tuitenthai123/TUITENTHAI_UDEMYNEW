"use client"
import React, { useEffect, useState,useRef } from 'react'
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";
import 'react-toastify/dist/ReactToastify.css';
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import "froala-editor/js/plugins.pkgd.min.js";
import axios from 'axios'
import { PencilLine,Trash2 } from 'lucide-react';
import { ToastContainer,toast } from 'react-toastify';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const page = () => {
  enum Dialogs {
    dialog1 = 'dialog1',
    dialog2 = 'dialog2',
  }

  const [dialog, setDialog] = useState()
  const [chuong, setchuong] = useState("")
  const [editlythuyet, seteditlythuyet] = useState(false)
  const [model, setModel] = useState("");
  const [reload, setreload] = useState(false)
  const tenchuong = useRef("")

  const handleModelChange = (event) => {
    setModel(event);
  };
  let config = {
    charCounterCount: false,
    key: "AVB8B-21B4C3A2E1D2D1A17vC2ve1xhbH1qb1vC2wgheC3I3C7C8C4B4B3A3B2G2==",
    events: {
      contentChanged: function () {
        console.log("Test Events");
      }
    }
  };
  
  const handlesavelythuyet = async () => {
    const currentPath = window.location.pathname
    const pathfix = currentPath.split("/")
    const idchuong = pathfix[6]
    const res = await axios.post(
        "http://localhost:3000/api/edit/chinhsualythuyet",
        {
          idchuong,
          model
        },
        {headers: {"Content-Type": "application/json",},},
      );
    setreload(!reload)
    toast.success('cập nhật thành công', {
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

  const handletenchuong = async () => {
    const currentPath = window.location.pathname
    const pathfix = currentPath.split("/")
    const idchuong = pathfix[6]
    const edittenchuong = tenchuong.current.value
    const res = await axios.post(
        "http://localhost:3000/api/edit/chinhsuachuong",
        {
          edittenchuong,
          idchuong,
        },
        {headers: {"Content-Type": "application/json",},},
      );
    setreload(!reload)
    toast.success('thay đổi thành công', {
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

  const handlexoachuong = async () => {
    const currentPath = window.location.pathname
    const pathfix = currentPath.split("/")
    const idchuong = pathfix[6]
    const res = await axios.post(
        "http://localhost:3000/api/edit/xoachuong",
        {
          idchuong,
        },
        {headers: {"Content-Type": "application/json",},},
      );
    toast.success('xóa chương thành công thành công', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
      });
      location.href="/teacher/course/680b3e96-cfb1-4fcf-a530-6dd50ea59822"
  }

  useEffect(() =>{
      const fetchdata = async() => {
          const currentPath = window.location.pathname
          const pathfix = currentPath.split("/")
          const idchuong = pathfix[6]
          const res = await axios.post(
              "http://localhost:3000/api/edit/timchuong",
              {
                idchuong 
              },
              {headers: {"Content-Type": "application/json",},},
            );
          console.log(res)
          setModel(res?.data?.reschuong[0]?.lythuyet)
          console.log(res?.data?.reschuong[0]?.lythuyet)
          setchuong(res?.data?.reschuong[0])
      }
      fetchdata()
  },[reload])
    
  return (
    <Dialog>
      <ToastContainer/>
    <div className='p-3'>
      <div className=' mb-5'>
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
                    <BreadcrumbLink href="/teacher/course/680b3e96-cfb1-4fcf-a530-6dd50ea59822">Chương</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Chỉnh sửa chương</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
      </div>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-bold mb-5'>Tổng quan</h1>
          <DialogTrigger asChild onClick={()=>{setDialog(Dialogs.dialog2)}}><Button>Xóa chương</Button></DialogTrigger>

      </div>
      <div className='flex justify-between bg-sky-100 rounded-lg p-3'>
        <div className='flex flex-col w-full h-auto bg-white rounded-lg p-2'>
          <div>
            <span className='text-2xl font-bold flex gap-2'>{chuong?.tenchuong}
              <DialogTrigger asChild onClick={()=>{setDialog(Dialogs.dialog1)}}><PencilLine className='cursor-pointer w-4 h-4 mt-2'/></DialogTrigger></span>
          </div>
          <span className='opacity-60'>tổng số bài tập: {chuong?.sumbaitap}</span>
        </div>
      </div>
      <div className="flex">
        <h1 className='text-2xl font-bold mb-5 mt-5'>Lý thuyết chương học</h1>      
        {!editlythuyet && <div className="mt-5">
            <Button variant={"ghost"} onClick={()=>{seteditlythuyet(true)}} size="icon"><PencilLine className="h-4 w-4"/></Button>
        </div> }
      </div>

    { editlythuyet ?
    <div>
        <div>
          <div className='flex flex-col gap-5 justify-between bg-sky-100 rounded-lg p-3'>
            <FroalaEditorComponent
            tag="textarea"
            model={model}
            config={config}
            onModelChange={handleModelChange}
          />
          <div className="flex justify-end gap-5">
            <Button className="w-36" onClick={handlesavelythuyet}>Lưu</Button>
            <Button variant={"outline"} onClick={() => {seteditlythuyet(false)}} className="w-36">Hủy</Button>
          </div>
          </div>
          
        </div>
        <div>
          <h1 className='text-2xl font-bold mb-5 mt-5'>Review</h1>
          <div className='flex justify-between bg-sky-100 rounded-lg p-3'>
            <div className=" p-5 bg-white rounded-lg w-full h-auto">
              <FroalaEditorView model={model}  />
            </div>
          </div>
        </div>
      </div> 
      : 
      <div>
        <div className='flex flex-col justify-between bg-sky-100 rounded-lg p-2'>
          <div className='w-full h-auto bg-white rounded-lg p-5'>
          <FroalaEditorView model={chuong?.lythuyet}/>
          </div>
        </div>
      </div>
    }
      <DialogContent>
        {dialog === Dialogs.dialog1?         
        <div>
            <DialogHeader>
              <DialogTitle>Chỉnh sửa chương</DialogTitle>
              <DialogDescription>
                Chỉnh sửa thông tin cơ bản của chương
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Tên chương
                </Label>
                <Input
                  defaultValue={chuong?.tenchuong}
                  ref={tenchuong}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handletenchuong}>Lưu</Button>
            </DialogFooter>
        </div>:        
        <div>
            <DialogHeader>
              <DialogTitle className='flex justify-center'>Xóa chương</DialogTitle>
            </DialogHeader>
            <div className='p-5 flex justify-center'>Khi xóa chương không thể khôi phục lại được</div>
            <DialogFooter>
              <Button onClick={handlexoachuong} variant={"destructive"}>Xóa chương</Button>
            </DialogFooter>
        </div>}
      </DialogContent>
      </div>
    </Dialog>
  )
}

export default page