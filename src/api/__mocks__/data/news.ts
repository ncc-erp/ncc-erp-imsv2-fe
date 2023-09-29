import { PriorityValues, StatusType } from "@/enums/news"
import { IComment, INews, INewsForm } from "@/types"
import { longDateTimeFormat } from "@/utils/time"

export const newsListData: INews[] = [
  {
    thumbnailImage: "https://loremflickr.com/640/480",
    title: "Direct Infrastructure Specialist",
    sapo: "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    id: 1
  },
  {
    thumbnailImage: "https://loremflickr.com/640/480",
    title: "Dynamic Directives Director",
    sapo: "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    description:
      "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
    id: 2
  },
  {
    thumbnailImage: "https://loremflickr.com/640/480",
    title: "International Assurance Analyst",
    sapo: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    id: 3
  },
  {
    thumbnailImage: "https://loremflickr.com/640/480",
    title: "Corporate Tactics Manager",
    sapo: "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    id: 4
  },
  {
    thumbnailImage: "https://loremflickr.com/640/480",
    title: "Senior Branding Manager",
    sapo: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    id: 5
  },
  {
    thumbnailImage: "https://loremflickr.com/640/480",
    title: "Senior Branding Manager",
    sapo: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    id: 6
  },
  {
    thumbnailImage: "https://loremflickr.com/640/480",
    title: "Senior Branding Manager",
    sapo: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    id: 7
  },
  {
    thumbnailImage: "https://loremflickr.com/640/480",
    title: "Senior Branding Manager",
    sapo: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    id: 8
  },
  {
    thumbnailImage: "https://loremflickr.com/640/480",
    title: "Senior Branding Manager",
    sapo: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    id: 9
  },
  {
    thumbnailImage: "https://loremflickr.com/640/480",
    title: "Senior Branding Manager",
    sapo: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    id: 10
  },
  {
    thumbnailImage: "https://loremflickr.com/640/480",
    title: "Senior Branding Manager",
    sapo: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    id: 11
  },
  {
    thumbnailImage: "https://loremflickr.com/640/480",
    title: "Senior Branding Manager",
    sapo: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    id: 12
  },
  {
    thumbnailImage: "https://loremflickr.com/640/480",
    title: "Senior Branding Manager",
    sapo: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    id: 13
  }
]

export const newsFormValues: INewsForm = {
  thumbnailImageFile: undefined,
  title: "",
  sapo: "",
  description: "",
  status: StatusType.DRAFT,
  mainCategory: "",
  subCategory: "",
  priority: PriorityValues.LOW,
  publishedTime: new Date(),
  effectiveStartTime: null,
  effectiveEndTime: null,
  isNotify: true
}

export const editorPlugins = [
  'advlist',
  'autolink',
  'lists',
  'link',
  'image',
  'charmap',
  'preview',
  'anchor',
  'searchreplace',
  'visualblocks',
  'code',
  'fullscreen',
  'insertdatetime',
  'media',
  'table',
  'code',
  'help',
  'wordcount'
]

export const editorToolbars = `
  undo redo |
  blocks |
  fontsize |
  bold italic underline backcolor forecolor |
  alignleft aligncenter alignright alignjustify |
  bullist numlist outdent indent |
  removeformat |
  link image code |
  help
`

export const dashboardData = [
  {
    thumbnail:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    title: "Những điều cần biết tại NCC",
    createdDate: longDateTimeFormat(new Date()),
    nameAuthor: "Trần Thị Ánh Nhi",
    avatarAuthor:
      "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512__340.jpg",
    countLike: 30,
    countComment: 30,
    categoryColor: "red",
    categoryName: `Company's workflow`
  },
  {
    thumbnail:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    title: "Những điều cần biết tại NCC",
    createdDate: longDateTimeFormat(new Date()),
    nameAuthor: "Trần Thị Ánh Nhi",
    avatarAuthor:
      "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512__340.jpg",
    countLike: 30,
    countComment: 30,
    categoryColor: "red",
    categoryName: `Company's workflow`
  },
  {
    thumbnail:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    title: "Những điều cần biết tại NCC",
    createdDate: longDateTimeFormat(new Date()),
    nameAuthor: "Trần Thị Ánh Nhi",
    avatarAuthor:
      "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512__340.jpg",
    countLike: 30,
    countComment: 30,
    categoryColor: "red",
    categoryName: `Company's workflow`
  },
  {
    thumbnail:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    title: "Những điều cần biết tại NCC",
    createdDate: longDateTimeFormat(new Date()),
    nameAuthor: "Trần Thị Ánh Nhi",
    avatarAuthor:
      "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512__340.jpg",
    countLike: 30,
    countComment: 30,
    categoryColor: "red",
    categoryName: `Company's workflow`
  },
  {
    thumbnail:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    title: "Những điều cần biết tại NCC",
    createdDate: longDateTimeFormat(new Date()),
    nameAuthor: "Trần Thị Ánh Nhi",
    avatarAuthor:
      "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512__340.jpg",
    countLike: 30,
    countComment: 30,
    categoryColor: "red",
    categoryName: `Company's workflow`
  },
  {
    thumbnail:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    title: "Những điều cần biết tại NCC",
    createdDate: longDateTimeFormat(new Date()),
    nameAuthor: "Trần Thị Ánh Nhi",
    avatarAuthor:
      "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512__340.jpg",
    countLike: 30,
    countComment: 30,
    categoryColor: "red",
    categoryName: `Company's workflow`
  },
  {
    thumbnail:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    title: "Những điều cần biết tại NCC",
    createdDate: longDateTimeFormat(new Date()),
    nameAuthor: "Trần Thị Ánh Nhi",
    avatarAuthor:
      "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512__340.jpg",
    countLike: 30,
    countComment: 30,
    categoryColor: "red",
    categoryName: `Company's workflow`
  },
  {
    thumbnail:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    title: "Những điều cần biết tại NCC",
    createdDate: longDateTimeFormat(new Date()),
    nameAuthor: "Trần Thị Ánh Nhi",
    avatarAuthor:
      "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512__340.jpg",
    countLike: 30,
    countComment: 30,
    categoryColor: "red",
    categoryName: `Company's workflow`
  },
  {
    thumbnail:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    title: "Những điều cần biết tại NCC",
    createdDate: longDateTimeFormat(new Date()),
    nameAuthor: "Trần Thị Ánh Nhi",
    avatarAuthor:
      "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512__340.jpg",
    countLike: 30,
    countComment: 30,
    categoryColor: "red",
    categoryName: `Company's workflow`
  },
  {
    thumbnail:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    title: "Những điều cần biết tại NCC",
    createdDate: longDateTimeFormat(new Date()),
    nameAuthor: "Trần Thị Ánh Nhi",
    avatarAuthor:
      "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512__340.jpg",
    countLike: 30,
    countComment: 30,
    categoryColor: "red",
    categoryName: `Company's workflow`
  },
  {
    thumbnail:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    title: "Những điều cần biết tại NCC",
    createdDate: longDateTimeFormat(new Date()),
    nameAuthor: "Trần Thị Ánh Nhi",
    avatarAuthor:
      "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512__340.jpg",
    countLike: 30,
    countComment: 30,
    categoryColor: "red",
    categoryName: `Company's workflow`
  },

  {
    thumbnail:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    title: "Những điều cần biết tại NCC",
    createdDate: longDateTimeFormat(new Date()),
    nameAuthor: "Trần Thị Ánh Nhi",
    avatarAuthor:
      "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512__340.jpg",
    countLike: 30,
    countComment: 30,
    categoryColor: "red",
    categoryName: `Company's workflow`
  },
  {
    thumbnail:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    title: "Những điều cần biết tại NCC",
    createdDate: longDateTimeFormat(new Date()),
    nameAuthor: "Trần Thị Ánh Nhi",
    avatarAuthor:
      "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512__340.jpg",
    countLike: 30,
    countComment: 30,
    categoryColor: "red",
    categoryName: `Company's workflow`
  },
  {
    thumbnail:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    title: "Những điều cần biết tại NCC",
    createdDate: longDateTimeFormat(new Date()),
    nameAuthor: "Trần Thị Ánh Nhi",
    avatarAuthor:
      "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512__340.jpg",
    countLike: 30,
    countComment: 30,
    categoryColor: "red",
    categoryName: `Company's workflow`
  },
  {
    thumbnail:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    title: "Những điều cần biết tại NCC",
    createdDate: longDateTimeFormat(new Date()),
    nameAuthor: "Trần Thị Ánh Nhi",
    avatarAuthor:
      "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512__340.jpg",
    countLike: 30,
    countComment: 30,
    categoryColor: "red",
    categoryName: `Company's workflow`
  }
]

export const detailData = {
  thumbnail:
    "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
  title: "Những điều cần biết tại NCC",
  createdDate: longDateTimeFormat(new Date()),
  nameAuthor: "Trần Thị Ánh Nhi",
  avatarAuthor:
    "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512__340.jpg",
  sapo: "Mọi thứ cần biết tại NCC sẽ được update và cập nhật liên tục tại đây.",
  content: `<div data-v-e3cd4756="" class="description"><p>&nbsp;</p>
    <p>Bạn có thể biết được các thông tin sau: &nbsp;<a href="https://docs.google.com/presentation/d/10Axhxv6RpLaFDz9XMz663TyweUEwMH_2/edit?usp=sharing&amp;ouid=111508383616194994778&amp;rtpof=true&amp;sd=true">Tài liệu đầy đủ tại đây</a></p>
    <p>Video giới thiệu công ty, NDA và hướng dẫn sử dụng internal tool <a href="https://www.youtube.com/playlist?list=PLpx2NXgigRu__Dl3Wxb8NGBmFeKbXnwp9">tại đây</a></p>
    <p>&nbsp;</p>
    <p><strong>1. NCCPLUS là gì?</strong></p>
    <p>-&nbsp; NCCPLUS là gì?</p>
    <p>-&nbsp; Lịch sử hình thành NCC</p>
    <p>- Dịch vụ NCC cung cấp</p>
    <p>- Số lượng nhân sự và&nbsp; chi nhánh</p>
    <p>&nbsp;</p>
    <p><strong>2. NDA (bảo mật thông tin)</strong></p>
    <p>- Các thông tin cần bảo mật tại NCC&nbsp; gồm những gì?</p>
    <p>- Phương pháp xử lý khi cố ý/ vô tình tiết lộ thông tin cần bảo mật</p>
    <p>&nbsp;</p>
    <p><strong>3. Company strcture&nbsp; (cơ cấu công ty)</strong></p>
    <p>Công ty có nhiều bộ phận cụ thể như</p>
    <p>- HR - Nhân sự</p>
    <p>- Finance&amp;IT (kế toán và IT)</p>
    <p>-&nbsp; Sale</p>
    <p>- Project (Dự án)</p>
    <p>- Cauvong (Hỗ trợ về kỹ thuật, technical, test)</p>
    <p>- Loren (Đào tạo về chuyên môn)</p>
    <p>- Office (Các văn phòng chi nhánh)</p>
    <p>&nbsp;</p>
    <p><strong>4. Benefit (Chế độ/ Quyền lợi/ Phúc lợi của nhân viên)</strong></p>
    <p>- Chế độ/ Phúc lợi/ Quyền lợi</p>
    <p>- Sự kiện, các câu lạc bộ</p>
    <p>&nbsp;</p>
    <p><strong>5.&nbsp;Rules &amp; Regulations (Quy tắc/Luật lệ/ Quy định)</strong></p>
    <p>- Một số quy định khi làm việc tại văn phòng</p>
    <p>- Một số quy định khi làm việc tại nhà</p>
    <p>&nbsp;</p>
    <p><strong>6. Internal tool</strong></p>
    <p>- Face ID (phần mềm để checkin – checkout tại văn phòng)</p>
    <p>- Timesheet (Thời gian làm được ghi nhận trên timesheet là căn cứ để tính lương hàng tháng)</p>
    <p>- IMS&nbsp; (trang thông tin nội bộ chính thống tại NCC)</p>
    <p>- Komu Discord (phần mềm trao đổi nội bộ tại NCC)</p>
    <p>&nbsp;</p></div>`,
  recommended: [
    {
      thumbnail: "https://ims-api.nccsoft.vn//image/1671698800331_1.jpg",
      title: "DANH SÁCH LIÊN HỆ CÔNG VIỆC",
      createdDate: longDateTimeFormat(new Date()),
      nameAuthor: "Trần Thị Ánh Nhi",
      avatarAuthor:
        "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512__340.jpg",
      countLike: 30,
      countComment: 30,
      categoryColor: "red",
      categoryName: `Sử dụng công cụ`
    },
    {
      thumbnail: "https://ims-api.nccsoft.vn//image/1671698800331_1.jpg",
      title: "DANH SÁCH LIÊN HỆ CÔNG VIỆC",
      createdDate: longDateTimeFormat(new Date()),
      nameAuthor: "Trần Thị Ánh Nhi",
      avatarAuthor:
        "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512__340.jpg",
      countLike: 30,
      countComment: 30,
      categoryColor: "red",
      categoryName: `Sử dụng công cụ`
    },
    {
      thumbnail: "https://ims-api.nccsoft.vn//image/1671698800331_1.jpg",
      title: "DANH SÁCH LIÊN HỆ CÔNG VIỆC",
      createdDate: longDateTimeFormat(new Date()),
      nameAuthor: "Trần Thị Ánh Nhi",
      avatarAuthor:
        "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512__340.jpg",
      countLike: 30,
      countComment: 30,
      categoryColor: "red",
      categoryName: `Sử dụng công cụ`
    }
  ],
  related: [
    {
      thumbnail: "https://ims-api.nccsoft.vn//image/1671698800331_1.jpg",
      title: "DANH SÁCH LIÊN HỆ CÔNG VIỆC",
      createdDate: longDateTimeFormat(new Date()),
      nameAuthor: "Trần Thị Ánh Nhi",
      avatarAuthor:
        "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512__340.jpg",
      countLike: 30,
      countComment: 30,
      categoryColor: "red",
      categoryName: `Sử dụng công cụ`
    },
    {
      thumbnail: "https://ims-api.nccsoft.vn//image/1671698800331_1.jpg",
      title: "DANH SÁCH LIÊN HỆ CÔNG VIỆC",
      createdDate: longDateTimeFormat(new Date()),
      nameAuthor: "Trần Thị Ánh Nhi",
      avatarAuthor:
        "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512__340.jpg",
      countLike: 30,
      countComment: 30,
      categoryColor: "red",
      categoryName: `Sử dụng công cụ`
    },
    {
      thumbnail: "https://ims-api.nccsoft.vn//image/1671698800331_1.jpg",
      title: "DANH SÁCH LIÊN HỆ CÔNG VIỆC",
      createdDate: longDateTimeFormat(new Date()),
      nameAuthor: "Trần Thị Ánh Nhi",
      avatarAuthor:
        "https://cdn.pixabay.com/photo/2015/04/19/08/33/flower-729512__340.jpg",
      countLike: 30,
      countComment: 30,
      categoryColor: "red",
      categoryName: `Sử dụng công cụ`
    }
  ]
}

export const tableData = [
  {
    id: 1,
    ordinalNum: 1,
    title: "Những điều cần biết tại NCC",
    status: "Thông tin mới",
    thumImage: "https://ims-api.nccsoft.vn//image/1671698800331_1.jpg",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 2,
    ordinalNum: 2,
    title: "DANH SÁCH LIÊN HỆ CÔNG VIỆC",
    status: "Thông tin mới",

    thumImage:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 3,
    ordinalNum: 3,
    title: "Những điều cần biết tại NCC",
    status: "Thông tin mới",

    thumImage: "https://ims-api.nccsoft.vn//image/1671698800331_1.jpg",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 4,
    ordinalNum: 4,
    title: "DANH SÁCH LIÊN HỆ CÔNG VIỆC",
    status: "Thông tin mới",

    thumImage:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 5,
    ordinalNum: 5,
    title: "Những điều cần biết tại NCC",
    status: "Thông tin mới",

    thumImage: "https://ims-api.nccsoft.vn//image/1671698800331_1.jpg",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 6,
    ordinalNum: 6,
    title: "DANH SÁCH LIÊN HỆ CÔNG VIỆC",
    status: "Thông tin mới",

    thumImage:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 7,
    ordinalNum: 7,
    title: "Những điều cần biết tại NCC",
    status: "Thông tin mới",

    thumImage: "https://ims-api.nccsoft.vn//image/1671698800331_1.jpg",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 8,
    ordinalNum: 8,
    title: "DANH SÁCH LIÊN HỆ CÔNG VIỆC",
    status: "Thông tin mới",

    thumImage:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 9,
    ordinalNum: 9,
    title: "Những điều cần biết tại NCC",
    status: "Thông tin mới",

    thumImage: "https://ims-api.nccsoft.vn//image/1671698800331_1.jpg",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 10,
    ordinalNum: 10,
    title: "DANH SÁCH LIÊN HỆ CÔNG VIỆC",
    status: "Thông tin mới",

    thumImage:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 11,
    ordinalNum: 11,
    title: "Những điều cần biết tại NCC",
    status: "Thông tin mới",

    thumImage: "https://ims-api.nccsoft.vn//image/1671698800331_1.jpg",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 12,
    ordinalNum: 12,
    title: "DANH SÁCH LIÊN HỆ CÔNG VIỆC",
    status: "Thông tin mới",

    thumImage:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 13,
    ordinalNum: 13,
    title: "Những điều cần biết tại NCC",
    status: "Thông tin mới",

    thumImage: "https://ims-api.nccsoft.vn//image/1671698800331_1.jpg",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 14,
    ordinalNum: 14,
    title: "DANH SÁCH LIÊN HỆ CÔNG VIỆC",
    status: "Thông tin mới",

    thumImage:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 15,
    ordinalNum: 15,
    title: "Những điều cần biết tại NCC",
    status: "Thông tin mới",

    thumImage: "https://ims-api.nccsoft.vn//image/1671698800331_1.jpg",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 16,
    ordinalNum: 16,
    title: "DANH SÁCH LIÊN HỆ CÔNG VIỆC",
    status: "Thông tin mới",

    thumImage:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 17,
    ordinalNum: 17,
    title: "Những điều cần biết tại NCC",
    status: "Thông tin mới",

    thumImage: "https://ims-api.nccsoft.vn//image/1671698800331_1.jpg",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 18,
    ordinalNum: 18,
    title: "DANH SÁCH LIÊN HỆ CÔNG VIỆC",
    status: "Thông tin mới",

    thumImage:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 19,
    ordinalNum: 19,
    title: "Những điều cần biết tại NCC",
    status: "Thông tin mới",

    thumImage: "https://ims-api.nccsoft.vn//image/1671698800331_1.jpg",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 20,
    ordinalNum: 20,
    title: "DANH SÁCH LIÊN HỆ CÔNG VIỆC",
    status: "Thông tin mới",

    thumImage:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 21,
    ordinalNum: 21,
    title: "Những điều cần biết tại NCC",
    status: "Thông tin mới",

    thumImage: "https://ims-api.nccsoft.vn//image/1671698800331_1.jpg",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 22,
    ordinalNum: 22,
    title: "DANH SÁCH LIÊN HỆ CÔNG VIỆC",
    status: "Thông tin mới",

    thumImage:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 23,
    ordinalNum: 23,
    title: "Những điều cần biết tại NCC",
    status: "Thông tin mới",

    thumImage: "https://ims-api.nccsoft.vn//image/1671698800331_1.jpg",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 24,
    ordinalNum: 24,
    title: "DANH SÁCH LIÊN HỆ CÔNG VIỆC",
    status: "Thông tin mới",

    thumImage:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 25,
    ordinalNum: 25,
    title: "Những điều cần biết tại NCC",
    status: "Thông tin mới",

    thumImage: "https://ims-api.nccsoft.vn//image/1671698800331_1.jpg",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 26,
    ordinalNum: 26,
    title: "DANH SÁCH LIÊN HỆ CÔNG VIỆC",
    status: "Thông tin mới",

    thumImage:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 27,
    ordinalNum: 27,
    title: "Những điều cần biết tại NCC",
    status: "Thông tin mới",

    thumImage: "https://ims-api.nccsoft.vn//image/1671698800331_1.jpg",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 28,
    ordinalNum: 28,
    title: "DANH SÁCH LIÊN HỆ CÔNG VIỆC",
    status: "Thông tin mới",

    thumImage:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 29,
    ordinalNum: 29,
    title: "Những điều cần biết tại NCC",
    status: "Thông tin mới",

    thumImage: "https://ims-api.nccsoft.vn//image/1671698800331_1.jpg",
    createdTime: new Date(),
    publishedTime: new Date()
  },
  {
    id: 30,
    ordinalNum: 30,
    title: "DANH SÁCH LIÊN HỆ CÔNG VIỆC",
    status: "Thông tin mới",

    thumImage:
      "https://ims-api.nccsoft.vn//image/1668165865998_Violet%20Grid%20Illustrated%20Balloon%20Welcome%20Card.png",
    createdTime: new Date(),
    publishedTime: new Date()
  }
]
