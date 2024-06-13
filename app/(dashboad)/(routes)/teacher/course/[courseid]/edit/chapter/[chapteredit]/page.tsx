"use client"
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import FroalaEditorComponent from "react-froala-wysiwyg";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
import "froala-editor/js/plugins.pkgd.min.js";
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PencilLine } from 'lucide-react';


const page = () => {
    const [chuong, setchuong] = useState("")
    const [editlythuyet, seteditlythuyet] = useState(false)
    const [model, setModel] = useState("<p>chỉnh sửa tại đây</p>");

    const handleModelChange = (event) => {
      setModel(event);
      console.log(event)
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
            setchuong(res?.data?.reschuong[0])
        }
        fetchdata()
    },[])
    
  return (
    <div className='p-3'>
      <h1 className='text-2xl font-bold mb-5'>Tổng quan</h1>
      <div className='flex justify-between bg-sky-100 rounded-lg p-3'>
        <div className='flex flex-col w-full h-auto bg-white rounded-lg p-2'>
          <div>
            <span className='text-2xl font-bold flex gap-2'>{chuong?.tenchuong}<PencilLine className='cursor-pointer w-5 h-5 mt-2'/></span>
          </div>
          <span className='opacity-60'>tổng số bài tập: {chuong?.sumbaitap}</span>
        </div>
      </div>
      <h1 className='text-2xl font-bold mb-5 mt-5'>Lý thuyết chương học</h1>
    { editlythuyet ?
    <div>
        <div>
          <div className='flex justify-between bg-sky-100 rounded-lg p-3'>
            <FroalaEditorComponent
            tag="textarea"
            model={model}
            config={config}
            onModelChange={handleModelChange}
          />
          </div>
        </div>
        <div>
          <h1 className='text-2xl font-bold mb-5 mt-5'>Review</h1>
          <div className='flex justify-between bg-sky-100 rounded-lg p-3'>
            <div className=" p-5 bg-white rounded-lg w-full h-auto">
              <FroalaEditorView model={model} />
            </div>
          </div>
        </div>
      </div> 
      : 
      <div>
     <div className='flex justify-between bg-sky-100 rounded-lg p-3'>
          <div className='flex w-full h-auto bg-white rounded-lg p-2'>
            Hiện tại chưa thêm lý thuyết chương học <PencilLine className='cursor-pointer w-5 h-5 mt-1 ml-2' onClick={() =>{seteditlythuyet(true)}}/>
          </div>
        </div>
      </div>
    }
    </div>

  )
}

export default page