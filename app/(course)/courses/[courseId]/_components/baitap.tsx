import React, {useState, useRef,useEffect} from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Editor from "@monaco-editor/react";
import { compileCode } from '@/lib/compilercode';
import run from "@/lib/gemini"
import { cn } from "@/lib/utils";
import axios from 'axios';
import FileSaver from "file-saver";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {ResizablePanel,ResizablePanelGroup } from '@/components/ui/resizable';
import { Button } from "../../../../../components/ui/button";

interface Ibaitap {
    debai:String,
    viducode:String,
    chapterid:String,
    idbaitap:String,
};

export const Baitap =  (BaiTap: Ibaitap) => {

    const tenfile = useRef("")
    const [sourceCode, setSourceCode] = useState("");
    const [stdInput, setstdInput] = useState("");
    const [loicode, setloicode] = useState(false)
    const [ketqua, setketqua] = useState('');
    const [compilerOutput, setcompilerOutput] = useState({})
    const [responsegemini, setresponsegemini] = useState({})
    const [kiemtra,setkiemtra] = useState(false)
    const [copy, setcopy] = useState(false)
    const [thuattoan, setthuattoan] = useState(false)
    const [checkcode, setcheckcode] = useState("")
    const textareaRef = useRef("");
    const [loading, setloading] = useState(true)
    const [timecompile, settimecompile] = useState(false)
    
    useEffect(() => {
      const fetchdata = async () => {
        const IDbaitap = BaiTap.idbaitap
        const IDchuong = BaiTap.chapterid
        const response123 = await axios.post("http://localhost:3000/api/edit/timcodeuser",
          {IDbaitap,IDchuong},
          {headers: {"Content-Type": "application/json",},},)
        console.log(response123)
        const checklamchua= response123?.data.rescode
        if(checklamchua.length > 0){
          const geminiprisma = response123?.data?.rescode[0]?.gemini
          const jsongemini = JSON.parse(geminiprisma)
          console.log(jsongemini)
          setSourceCode(response123?.data?.rescode[0]?.codeuser)
          setcheckcode(response123?.data?.rescode[0]?.checkcode)
          setresponsegemini(jsongemini)
          if(response123?.data?.rescode[0]?.checkcode === "dung" || response123?.data?.rescode[0]?.checkcode === "loithuattoan"){
            setkiemtra(true)
          }
          setloading(false)
        }else{
          setloading(false)
        }
      }
      fetchdata()
    }, [])
    
  
    const handlecopy = () => {
      setcopy(!copy)
      navigator.clipboard.writeText(BaiTap?.viducode);
    }
  
    function handleOnchange(value: string) {
        setSourceCode(value)
    }
  
  
    const handleInput = ()=> {
      const text = textareaRef.current.value;
      setstdInput(text)
  }
  
    async function executeCode() {
      settimecompile(true)
      const requestData = {
        language: "c++",
        version: "10.2.0",
        files: [
          {
            content: sourceCode,
          },
        ],
        stdin:stdInput
      };  
      try {
        let conmeo
        let Checkcodehehe
        const result = await compileCode(requestData);
        setcompilerOutput(result)
        console.log(result);
        if(result?.run?.stderr!==""){
          setloicode(true)
          let checkcode = "ngôn ngữ c++ cơ bản không sử dụng các thư viện chỉ sử dụng code thuần và các kiểu dữ liệu nguyên thủy với đề bài: "+BaiTap.debai+" \n '"
          checkcode = checkcode.concat(sourceCode)
        //   checkcode = checkcode.concat("' \n")
        //   checkcode = checkcode.concat(result?.run?.stderr! + "\n")
          checkcode = checkcode.concat("bỏ qua lỗi 'chmod: cannot access 'a.out': No such file or directory' kiểm tra lỗi cú pháp chỉ rõ ràng code tôi cung cấp có sai chỗ nào nên lưu ý xem code của tôi cung cấp để kiểm tra trả về cho tôi dạng json với 3 key như sau key thứ 1 line: lỗi tại dòng số mấy trong code mà tôi cung cấp khi báo lỗi dòng số mấy phải lượt qua toàn bộ code xem còn chỗ nào lỗi ghi nhận lại và cách nhau bằng dấu ',', key thứ 2 err: dịch lỗi và giải thích lỗi, key thứ 3 explain: hướng dẫn giải quyết lỗi trong code mà tôi cung cấp nhưng không trả về code nếu như bị các lỗi như thiếu std")
          const responsege = await run(checkcode)
          conmeo = JSON.parse(responsege)
          const concho = conmeo?.line
          setresponsegemini(JSON.parse(responsege))
          console.log("gemini",conmeo)
        //   console.log("hehehe",concho.split(",").map(item=>item-1))
          setkiemtra(false)
          setcheckcode("loicuphap")
          Checkcodehehe = "loicuphap"
        }else{
          setloicode(false)
          let checkcode = "ngôn ngữ c++ cơ bản không sử dụng các thư viện ngoại trừ các thư viện như cmath chỉ sử dụng code thuần và các kiểu dữ liệu nguyên thủy với đề bài: "+BaiTap.debai+". In ra màn hình các giá trị này với code như sau /n"
          checkcode = checkcode.concat(sourceCode)
          checkcode = checkcode.concat("\n")
          checkcode = checkcode.concat("kiểm tra code mà tôi cung cấp đúng như đề bài yêu cầu và đánh giá thuật toán tối ưu hay chưa nếu code tôi cung cấp có sai thì chỉ rõ dòng nào cũng như comment trong code và chỉ trả lời là code tôi cung cấp đúng hay sai ở dạng json trả về 3 key 1 là correct với value tương ứng true hoặc false 2 là comment với value đánh giá 3 là code đã được tối ưu hoặc đã sửa lỗi ở key thứ 3 là code thì làm đàng hoàn trả về đúng kết quả, kết quả trả về các dấu ngoặc kép thay thế làm sao cho chuỗi json làm sao có thể sử dụng JSON.parse để lấy được dữ liệu")
          const responsege = await run(checkcode)
          setresponsegemini(JSON.parse(responsege))
          conmeo = JSON.parse(responsege)
          //console.log(conmeo?.correct)
          if(conmeo?.correct === "true"){
            setthuattoan(true)
            setcheckcode("dung")
            Checkcodehehe = "dung"
          }else{
            setcheckcode("loithuattoan")
            setthuattoan(false)
            Checkcodehehe = "loithuattoan"
          }
          const hehe = result?.run?.output
          setketqua(hehe);
          setkiemtra(true);
        }
        const geminifix = JSON.stringify(conmeo)
        const idbaitap = BaiTap.idbaitap
        const idchuong = BaiTap.chapterid
        const tuitenthai = await axios.post(
          "http://localhost:3000/api/luu/savecode",
          {idbaitap,idchuong,sourceCode,geminifix,Checkcodehehe},
          {headers: {"Content-Type": "application/json",},},
        );
        settimecompile(false)
      } catch (error) { 
        console.log(error);
      }
    }

    const handleDownload = () => {
      // const blob = new Blob([sourceCode], { type: "text/plain;charset=utf-8" });
      // saveAs(blob, "code.cpp");
      var blob = new Blob([sourceCode], {
        type: "text/plain;charset=utf-8"
      });
      FileSaver.saveAs(blob, `${tenfile.current.value}.cpp`);
  }
  
  return (
    <Dialog>
      {loading ? (
        <p>Đang tải thông tin bài tập</p>
      ):(
        <div>
          {timecompile ? (
            <p className='flex justify-center'>đang biên dịch vui lòng chờ trong giây lát</p>
          ):(
            <div>
            <div className='grid place-items-start h-auto p-2 ml-5'>
              <div className='max-w-2xl min-w-[25rem] bg-[#3a404d] rounded-md overflow-hidden'>
                <div className='flex justify-between px-4 text-white text-xs items-center'>
                  <p className='text-sm p-1'>Gợi ý</p>
                  <button className='py-1 inline-flex items-center gap-1' onClick={handlecopy}>
                    {copy ? "Đã copy" : "Copy code"}
                  </button>
                </div>
                <SyntaxHighlighter language="cpp" style={atomOneDark} customStyle={{
                  padding: "20px"
                }}
                wrapLongLines={true}
                >
                  {
                    BaiTap.viducode
                  }
                </SyntaxHighlighter>
              </div>
            </div>
            <div className='p-5 rounded-2xl'>
            <div className='font-medium'>Bài làm:</div>
                <ResizablePanelGroup direction="horizontal" className="w-1/2 rounded-lg border dark:bg-slate-900">
                  <ResizablePanel defaultSize={50} minSize={35}>
                  <div className='flex'>
                    <Editor
                      theme={ "vs-dark"}
                      height="auto"
                      width="663px"
                      defaultLanguage={"c++"}
                      defaultValue={sourceCode}
                      language={"c++"}
                      onChange={handleOnchange}
                    />
                  <div className='p-3 w-1/2'>
                    <span className='items-center font-bold'>Output</span>
                      <div className='flex flex-col gap-5'>
                        <div className='font-bold'>lỗi và gợi ý</div>
                        <div className='flex flex-col'>{responsegemini?.err}</div>
                        <div className='flex flex-col'>{responsegemini?.explain}</div>
                        <div className='font-bold'>kết quả trả về</div>
                        {!loicode && 
                          <div className='font-bold text-lg '>
                            <textarea disabled value={ketqua} className='w-96 h-auto'></textarea>
                          </div>}
                      </div>
                  </div>
                  </div>
                  <div className='p-5 flex gap-5'>
                      <Button
                              onClick={executeCode}
                              size={"lg"}
                              className="dark:bg-purple-600 dark:hover:bg-purple-700 text-slate-100 bg-slate-800 hover:bg-slate-900"
                      >run</Button>
                      <Textarea ref={textareaRef} placeholder="Nhập từ bàn phím" id="message-2" onChange={handleInput}/>
                      <p className="text-sm text-muted-foreground">
                        thêm nhiều Input bằng cách xuống dòng "Enter"
                      </p>
                      
                      <DialogTrigger className='w-52 bg-black text-white rounded-lg'>Tải code</DialogTrigger>
                </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
            </div>

            {kiemtra && <div className='p-2 ml-3'>
              <span className='font-medium'>Kiểm tra:</span>
            <div className={cn('rounded-xl p-8 border', 
                checkcode === "dung" && "bg-green-200", checkcode ==="loithuattoan" && "bg-red-300")}>
                  {responsegemini?.comment}
                  {thuattoan && <div className='grid place-items-start h-auto p-2 ml-5'>
                    <div className='max-w-2xl min-w-[25rem] bg-[#3a404d] rounded-md overflow-hidden'>
                      <div className='flex justify-between px-4 text-white text-xs items-center'>
                        <p className='text-sm p-1'>Gợi ý</p>
                        <button className='py-1 inline-flex items-center gap-1' onClick={()=>{{navigator.clipboard.writeText(responsegemini?.code)}}}>
                          {copy ? "Đã copy" : "Copy code"}
                        </button>
                      </div>
                      <SyntaxHighlighter language="cpp" style={atomOneDark} customStyle={{
                        padding: "20px"
                      }}
                      wrapLongLines={true}
                      >
                        {responsegemini?.code}
                      </SyntaxHighlighter>
                    </div>
                  </div> }             
              </div>
            </div>}
            </div>
          )} 
        </div>
      )}
            <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thông tin tải về</DialogTitle>
          <DialogDescription>
            Chỉnh sửa tên file với quy tắc không dấu không khoảng trắng 
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Tên File
            </Label>
            <Input
              ref={tenfile}
              defaultValue="yourcode"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => {handleDownload()}}>Tải code</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}