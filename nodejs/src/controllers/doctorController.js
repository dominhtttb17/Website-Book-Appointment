import doctorService from "../services/doctorService"
let getTopDoctorHome = async(req,res)=>{
   let limit = req.query.limit
   if(!limit) limit =10
   try {
    let response = await doctorService.getTopDoctorHome(+limit)
    return res.status(200).json(response)

   } catch (error) {
    console.log(error)
    return res.status(200).json({
        errCode: 1,
        errMessage: 'Error from server'
    })
   }
}
let getAllDoctors = async(req,res)=>{
    
    try {
     let doctors = await doctorService.getAllDoctorService()
     return res.status(200).json(doctors)
 
    } catch (error) {
     console.log(error)
     return res.status(200).json({
         errCode: 1,
         errMessage: 'Error from server'
     })
    }
 }
 let postInfoDoctors = async(req,res)=>{
    
    try {
     let doctors = await doctorService.saveInfoDoctorService(req.body)
     return res.status(200).json(doctors)
 
    } catch (error) {
     console.log(error)
     return res.status(200).json({
         errCode: 1,
         errMessage: 'Error from server'
     })
    }
 }
 let getDetailDoctor = async(req,res)=>{
    
    try {
     let doctors = await doctorService.getDetailDoctorService(req.query.id)
     return res.status(200).json(doctors)
 
    } catch (error) {
     console.log(error)
     return res.status(200).json({
         errCode: 1,
         errMessage: 'Error from server'
     })
    }
 }
 let bulkCreateSchedule = async(req,res)=>{
    
    try {
     let doctors = await doctorService.bulkCreateScheduleService(req.body)
     return res.status(200).json(doctors)
 
    } catch (error) {
     console.log(error)
     return res.status(200).json({
         errCode: 1,
         errMessage: 'Error from server'
     })
    }
 }
 let getScheduleByDate = async(req,res)=>{
    
    try {
     let doctors = await doctorService.getScheduleByDateService(req.query.doctorId, req.query.date)
     return res.status(200).json(doctors)
 
    } catch (error) {
     console.log(error)
     return res.status(200).json({
         errCode: 1,
         errMessage: 'Error from server'
     })
    }
 }

 let getExtraInfoDoctorById = async(req,res)=>{
    
    try {
     let doctors = await doctorService.getExtraInfoDoctorByIdService(req.query.doctorId)
     return res.status(200).json(doctors)
 
    } catch (error) {
     console.log(error)
     return res.status(200).json({
         errCode: 1,
         errMessage: 'Error from server'
     })
    }
 }
 let getProfileDoctorById = async(req,res)=>{
    
    try {
     let doctors = await doctorService.getProfileDoctorByIdService(req.query.doctorId)
     return res.status(200).json(doctors)
 
    } catch (error) {
     console.log(error)
     return res.status(200).json({
         errCode: 1,
         errMessage: 'Error from server'
     })
    }
 }
 let getPatientForDoctor = async(req,res)=>{
    
    try {
     let doctors = await doctorService.getPatientForDoctorService(req.query.doctorId, req.query.date)
     return res.status(200).json(doctors)
 
    } catch (error) {
     console.log(error)
     return res.status(200).json({
         errCode: 1,
         errMessage: 'Error from server'
     })
    }
 }
 let sendRemedy = async(req,res)=>{
    
    try {
     let doctors = await doctorService.sendRemedyService(req.body)
     return res.status(200).json(doctors)
 
    } catch (error) {
     console.log(error)
     return res.status(200).json({
         errCode: 1,
         errMessage: 'Error from server'
     })
    }
 }
 
module.exports={
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors:getAllDoctors,
    postInfoDoctors:postInfoDoctors,
    getDetailDoctor:getDetailDoctor,
    bulkCreateSchedule:bulkCreateSchedule,
    getScheduleByDate:getScheduleByDate,
    getExtraInfoDoctorById:getExtraInfoDoctorById,
    getProfileDoctorById:getProfileDoctorById,
    getPatientForDoctor:getPatientForDoctor,
    sendRemedy:sendRemedy
}