const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // const themkh = await prisma.khoahoc.create({
  //   data:{
  //     title:"lập trình căn bản"
  //   }
  // })

  // const user1 = await prisma.user.create({
  //   data: {
  //     userId: 'user_1',
  //     hoanthanhchuong: ["1", "0", "0", "0", "0", "0"],
  //     hoanthanhkhoa: 20.0,
  //   },
  // });

  // const user2 = await prisma.user.create({
  //   data: {
  //     userId: 'user_2',
  //     hoanthanhchuong: ["1", "1", "0", "0", "0", "0"],
  //     hoanthanhkhoa: 40.0,
  //   },
  // });

  // console.log('Created users:', user1, user2);

  // // Tạo chương
  // const chapter1 = await prisma.chapter.create({
  //   data: {
  //     tenchuong: 'Chương 1',
  //     sumbaitap: 5,
  //   },
  // });

  // const chapter2 = await prisma.chapter.create({
  //   data: {
  //     tenchuong: 'Chương 2',
  //     sumbaitap: 10,
  //   },
  // });

  // console.log('Created chapters:', chapter1, chapter2);

  // Tạo bài tập
  const baitap1 = await prisma.baitap.create({
    data: {
      chapterId: "b3f6ab24-b880-41b8-ae54-e2aaafe118ce",
      debai: '1. tính diện tích hình vuông n*n với n được nhập từ bàn phím',
      codemau: '//Code mẫu 1',
    },
  });

  const baitap2 = await prisma.baitap.create({
    data: {
      chapterId: "b3f6ab24-b880-41b8-ae54-e2aaafe118ce",
      debai: '2. tính tổng, hiệu, tích, thương của hai số thực bất kỳ được nhập từ bàn phím',
      codemau: '//Code mẫu 2',
    },
  });

  console.log('Created baitaps:', baitap1, baitap2);

  // // Tạo mã
  // const code1 = await prisma.code.create({
  //   data: {
  //     chapterId: chapter1.id,
  //     baiId: baitap1.id,
  //     codeuser: 'Code user 1',
  //     gemini: 'Gemini 1',
  //     checkcode: 'dung',
  //     loicode: ""
  //   },
  // });

  // const code2 = await prisma.code.create({
  //   data: {
  //     chapterId: chapter2.id,
  //     baiId: baitap2.id,
  //     codeuser: 'Code user 2',
  //     gemini: 'Gemini 2',
  //     checkcode: 'saithuattoan',
  //     loicode: ""
  //   },
  // });

  // console.log('Created codes:', code1, code2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
