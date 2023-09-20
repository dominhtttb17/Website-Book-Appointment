import db from "../models/index" 


let createClinicService = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data.name || !data.imageBase64 || !data.contentMarkdown || !data.contentHTML || !data.address) {
          resolve({
            errCode: 1,
            errMessage: "Missing requiter parameters!",
          }) 
        } else {
          await db.Clinic.create({
           name:data.name,
           image:data.imageBase64,
           contentMarkdown:data.contentMarkdown,
           contentHTML:data.contentHTML,
           address:data.address
          }) 
          
  
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
  let getAllClinicService = () => {
    return new Promise(async (resolve, reject) => {
      try {
       
          let specialty = await db.Clinic.findAll() 
          if(specialty && specialty.length>0){
            specialty.map(item=>{
              item.image= Buffer.from(item.image, "base64").toString("binary") 
              return item
            })
          }
  
          resolve({
            errCode: 0,
            errMessage: "ok",
            data:specialty
          }) 
        
      } catch (error) {
        reject(error) 
      }
    }) 
  } 
  let getDetailClinicService = (inputId) => {
    return new Promise(async (resolve, reject) => {
      try {
        if(!inputId ){
          resolve({
            errCode: 1,
            errMessage: "Missing requiter parameters!",
          }) 
        }else{
          let   data = await db.Clinic.findOne({
            where:{
              id:inputId
            },
            attributes:['name','address','contentMarkdown','contentHTML']
              
            
          }) 
          if(data ){
            let doctorClinic = []
          
              doctorClinic = await db.Doctor_Info.findAll({
                where:{
                  ClinicId: inputId
                },
                attributes:['doctorId','provinceId']
              })
           
              
            
              data.doctorClinic = doctorClinic
          }else{
            data={}
          }
  
          resolve({
            errCode: 0,
            errMessage: "ok",
            data
          }) 
       
    
        }
       
      
        
      } catch (error) {
        reject(error) 
      }
    }) 
  } 





module.exports = {
    createClinicService:createClinicService,
    getAllClinicService:getAllClinicService,
    getDetailClinicService:getDetailClinicService
 
} 