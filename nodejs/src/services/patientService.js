import { isSymbol } from "lodash" 
import db from "../models/index" 
require("dotenv").config() 
import { sendSimpleEmail } from "./emailService" 
import { v4 as uuidv4 } from "uuid" 

let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}` 

  return result 
} 
let checkRequiredFields = (inputData)=>{
  let arrFields = ['doctorId','email','timeType','date'
  ,'fullName','selectedGender','address','fullName'
  ,'phoneNumber']
  let isValid = true
  let element = ''
  for(let i=0; i<arrFields.length;i++){
    if(!inputData[arrFields[i]]){
    isValid = false
    element = arrFields[i]
    break
  }}
  return {
    isValid,element
  }
}
let postBookAppointmentService = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
       let checkObj = checkRequiredFields(data)
      if (checkObj.isValid===false ) {
        resolve({
          errCode: 1,

          errMessage: `Missing parameter: ${checkObj.element}`,
        }) 
      } else {
        let token = uuidv4() 

        await sendSimpleEmail({
          receiverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: buildUrlEmail(data.doctorId, token),
        }) 

        let user = await db.User.findOrCreate({
          where: {
            email: data.email,
          
          },
          defaults: {
            email: data.email,
            roleId: "R3",
            address: data.address,
            gender: data.selectedGender,
            phoneNumber:data.phoneNumber,
            firstName: data.fullName
          },
        }) 
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: {
              patientId: user[0].id,
            },
            defaults: {
              statusId: "S1",
              patientId: user[0].id,
              doctorId: data.doctorId,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          }) 
        }

        resolve({
          errCode: 0,
          errMessage: "ok",
        }) 
      }
    } catch (error) {
      reject(error) 
    }
  }) 
} 
let postVerifyBookAppointmentService = async(data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing requiter parameters!",
        }) 
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        }) 
        if (appointment) {
          appointment.statusId = 'S2'
          await appointment.save() 
          resolve({
            errCode: 0,
            errMessage: "Update the appointment succeed!",
          }) 
        } else {
          resolve({
            errCode: 2,
            errMessage: "Appointment has been activated or does not exist",
          }) 
        }

        resolve({
          errCode: 0,
          errMessage: "ok",
        }) 
      }
    } catch (error) {
      reject(error) 
    }
  }) 
} 
module.exports = {
  postBookAppointmentService: postBookAppointmentService,
  postVerifyBookAppointmentService: postVerifyBookAppointmentService,
} 
