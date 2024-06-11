"use client"
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Baitap } from '../_components/baitap';


const page = () => {
  const baitapchuong =[{
    id:1,
    item:"item1",
    baitap:'1. Viết chương trình in nội dung một bài thơ mà bạn thích',
    codevidu:'//ví dụ hiển thị một chuỗi \n #include <iostream> \n using namespace std; \n int main() {\n cout<<"nội dung cần hiển thị"; \n}'
  },
  {
    id:2,
    item:"item2",
    baitap:'2. Viết chương trình nhập vào 4 giá trị lần lượt là số thực, nguyên, nguyên dài và ký tự. In ra màn hình các giá trị này.',
    codevidu:'//ví dụ nhập và hiển thị một số nguyên từ bàn phím \n #include <iostream> \n using namespace std; \n int main() {\n int n;\n cin>>n; \n cout<<n; \n}'
  },
  {
    id:3,
    item:"item3",
    baitap:"3. Viết chương trình in ra tổng, tích, hiệu và thương của 2 số thực được nhập vào từ bàn phím.",
    codevidu:"#include <iostream> \n using namespace std; \n int main() { // Declare variables \n float num1, num2; // tổng \n float sum = num1 + num2; \n // trừ \n float difference = num1 - num2; \n // nhân \n float product = num1 * num2; \n // chia \n float quotient = num1 / num2;\n }"
  },
  {
    id:4,
    item:"item4",
    baitap:'4. Viết chương trình in ra trung bình cộng, trung bình nhân của 3 số nguyên được nhập vào từ bàn phím',
    codevidu:'//ví dụ nhập và hiển thị một số nguyên từ bàn phím \n #include <iostream> \n using namespace std; \n int main() {\n int n;\n cin>>n; \n cout<<n; \n}'
  },
  {
    id:5,
    item:"item5",
    baitap:'5. Viết chương trình nhập vào bán kính của hình tròn, in ra diện tích, chu vi của nó.',
    codevidu:'//ví dụ nhập và hiển thị một số nguyên từ bàn phím \n #include <iostream> \n using namespace std; \n int main() {\n int n;\n cin>>n; \n cout<<n; \n}'
  }
]

  return (
    <>
    <div className='p-2 text-2xl font-bold'>
        Bài tập
      </div>
    {baitapchuong.map(item=>(
      <Accordion type="single" collapsible className="w-full p-6" key={item.id}>
        <AccordionItem value={item.item}>
          <AccordionTrigger>{item.baitap}</AccordionTrigger>
          <AccordionContent>
            <Baitap debai={item.baitap} viducode={item.codevidu} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ))}
    </>
    
  )
}

export default page