require("dotenv").config() 
import nodemailer from "nodemailer" 

let sendSimpleEmail = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  }) 
 await transporter.sendMail({
    from: '"BookingCare" <nghidi888@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    text: "-----------------", // plain text body
    html: getBodyHTML(dataSend), // html body
  }) 
} 

let getBodyHTML = (dataSend) => {
  let result = "" 
  if (dataSend.language === "en") {
    result = `
<h3 >Dear ${dataSend.patientName}!</h3>
<p>You received this email because you booked an online medical appointment on Booking Care</p>
<p>Information to schedule an appointment: </p>
<div ><b>Time: ${dataSend.time}<b/></div>
<div ><b>Doctor: ${dataSend.doctorName}<b/></div>

<p>If it's you, click the link below to complete your booking</p>
<div><a href=${dataSend.redirectLink}>Click here</a></div>
<div>Thanks so much ! </div>
` 
  }
  if (dataSend.language === "vi") {
    result = `
        <h3 >Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Booking Care</p>
        <p>Thông tin đặt lịch khám bệnh: </p>
        <div ><b>Thời gian: ${dataSend.time}<b/></div>
        <div ><b>Bác sĩ: ${dataSend.doctorName}<b/></div>
        
        <p>Nếu đúng là bạn, hãy click đường link bên dưới để hoàn tất việc đặt lịch</p>
        <div><a href=${dataSend.redirectLink}>Bấm vào đây</a></div>
        <div> Xin trân thành cảm ơn ! </div>
        ` 
  }

   return result
} 
let sendAttachments = async(dataSend)=>{
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  }) 
 await transporter.sendMail({
    from: '"BookingCare" <nghidi888@gmail.com>', // sender address
    to: dataSend.email, // list of receivers
    subject: "Kết quả đặt lịch khám bệnh", // Subject line
    text: "-----------------", // plain text body
    html: getBodyHTMLRemedy(dataSend), 
    attachments:[
      {
        filename:`remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
        content : dataSend.imageBase64.split("base64,")[1],
        encoding:'base64'

      }
    ]
  }) 
}
 let getBodyHTMLRemedy = (dataSend)=>{
  let result = "" 
  if (dataSend.language === "en") {
    result = `
<h3 >Dear ${dataSend.patientName}!</h3>
<p>You received this email because you booked an online medical appointment on Booking Care</p>
<p>Information to schedule an appointment: </p>

<div>Thanks so much ! </div>
` 
  }
  if (dataSend.language === "vi") {
    result = `
        <h3 >Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Booking Care</p>
        <p>Thông tin đơn thuốc/ hóa đơn được gửi trong file đính kèm : </p>
      
        <div> Xin trân thành cảm ơn ! </div>
        ` 
  }

   return result
}
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachments:sendAttachments
} 
