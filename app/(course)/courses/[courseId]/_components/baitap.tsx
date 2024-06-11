import React, {useState, useRef} from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Editor from "@monaco-editor/react";
import {ResizablePanel,ResizablePanelGroup } from '@/components/ui/resizable';
import { compileCode } from '@/lib/compilercode';
import { Button } from "../../../../../components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import run from "@/lib/gemini"
import { cn } from "@/lib/utils";

interface Ibaitap {
    debai:String,
    viducode:String,
};

export const Baitap = (BaiTap: Ibaitap) => {
    const [sourceCode, setSourceCode] = useState("");
    const [stdInput, setstdInput] = useState("");
    const [loicode, setloicode] = useState(false)
    const [ketqua, setketqua] = useState('');
    const [compilerOutput, setcompilerOutput] = useState({})
    const [responsegemini, setresponsegemini] = useState({})
    const [kiemtra,setkiemtra] = useState(false)
    const [copy, setcopy] = useState(false)
    const [thuattoan, setthuattoan] = useState(false)
    const textareaRef = useRef("");
    
  
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
      console.log(stdInput)
  }
  
    async function executeCode() {
        console.log(BaiTap.debai)
      console.log("bam nut roi")
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
          const conmeo = JSON.parse(responsege)
          const concho = conmeo?.line
          setresponsegemini(JSON.parse(responsege))
          console.log("gemini",conmeo)
        //   console.log("hehehe",concho.split(",").map(item=>item-1))
          setkiemtra(false)
        }else{
          setloicode(false)
          let checkcode = "ngôn ngữ c++ cơ bản không sử dụng các thư viện trừ các thư viện như cmath chỉ sử dụng code thuần và các kiểu dữ liệu nguyên thủy với đề bài: "+BaiTap.debai+". In ra màn hình các giá trị này với code như sau /n"
          checkcode = checkcode.concat(sourceCode)
          checkcode = checkcode.concat("\n")
          checkcode = checkcode.concat("kiểm tra code mà tôi cung cấp đúng như đề bài yêu cầu và đánh giá thuật toán tối ưu hay chưa nếu code tôi cung cấp có sai thì chỉ rõ dòng nào cũng như comment trong code và chỉ trả lời là code tôi cung cấp đúng hay sai ở dạng json trả về 3 key 1 là correct với value tương ứng true hoặc false 2 là comment với value đánh giá 3 là code đã được tối ưu hoặc đã sửa lỗi ở key thứ 3 là code thì làm đàng hoàn trả về đúng kết quả, kết quả trả về các dấu ngoặc kép thay thế làm sao cho chuỗi json làm sao có thể sử dụng JSON.parse để lấy được dữ liệu")
          console.log(checkcode)
          const responsege = await run(checkcode)
          setresponsegemini(JSON.parse(responsege))
          const conmeo = JSON.parse(responsege)
          //console.log(conmeo?.correct)
          if(conmeo?.correct === "true"){
            setthuattoan(true)
            console.log("dung")
          }else{
            setthuattoan(false)
          }
          const hehe = result?.run?.output
          setketqua(hehe);
          setkiemtra(true);
        }     
      } catch (error) { 
        console.log(error);
      }
    }
  return (
    <>
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
         <div className='font-medium'>Bài làm: </div>
            <ResizablePanelGroup direction="horizontal" className="w-1/2 rounded-lg border dark:bg-slate-900">
              <ResizablePanel defaultSize={50} minSize={35}>
              <div className='flex'>
                <Editor
                  theme={ "vs-dark"}
                  height="250px"
                  width="663px"
                  defaultLanguage={"c++"}
                  defaultValue={"//code ở đây"}
                  language={"c++"}
                  onChange={handleOnchange}
                />
               <div className='p-3'>
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
            </div>
              </ResizablePanel>
            </ResizablePanelGroup>
        </div>

        {kiemtra && <div className='p-2 ml-3'>
          <span className='font-medium'>Kiểm tra:</span>
          <div className={cn('rounded-xl p-8 border', 
            responsegemini?.correct === "true" && "bg-green-200", responsegemini?.correct ==="false" && "bg-red-300")}>
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
    </>
  )
}