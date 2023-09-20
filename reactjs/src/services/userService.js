import axios from "../axios"
const handleLoginAPI =(userEmail,userPassword)=>{
    return axios.post('/api/login',{email:userEmail,password:userPassword})

}
const getAllUsers = (inputId)=>{
    return axios.get(`/api/get-all-user?id=${inputId}`)
}
const createNewUserService = (data)=>{
    return axios.post('/api/create-new-user', data)
}
const deleteUser = (userId)=>{
    // return axios.delete('/api/delete-user',{id:userId})
    return axios.delete('/api/delete-user',{
        data:{
            id:userId
        }
    })
}
const editUserService = (inputData)=>{
    // return axios.delete('/api/delete-user',{id:userId})
    return axios.put('/api/edit-user',inputData
      
    )
}
const getAllCodeService = (inputType)=>{
    // return axios.delete('/api/delete-user',{id:userId})
    return axios.get(`/api/allcode?type=${inputType}`
      
    )
}
const getDoctorHomeService = (limit)=>{
    // return axios.delete('/api/delete-user',{id:userId})
    return axios.get(`/api/top-doctor-home?limit=${limit}`
      
    )
}
const getAllDoctorService = ()=>{
    // return axios.delete('/api/delete-user',{id:userId})
    return axios.get(`/api/all-doctor`
      
    )
}
const saveInfoDoctorService = (data)=>{
    // return axios.delete('/api/delete-user',{id:userId})
    return axios.post(`/api/save-info-doctor`,data )
}
const getDetailInfoDoctorService = (id)=>{
    // return axios.delete('/api/delete-user',{id:userId})
     return axios.get(`/api/get-detail-doctor?id=${id}`
      
    )
}
const saveBulksScheduleDoctor = (data)=>{
    // return axios.delete('/api/delete-user',{id:userId})
     return axios.post(`/api/bulk-create-schedule`, data
      
    )
}
const getScheduleByDate = (doctorId, date)=>{
    // return axios.delete('/api/delete-user',{id:userId})
     return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
      
    )
}
const getExtraInfoDoctorById = (doctorId)=>{
    // return axios.delete('/api/delete-user',{id:userId})
     return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`
      
    )
}
const getProfileDoctorByIdService = (doctorId)=>{
    // return axios.delete('/api/delete-user',{id:userId})
     return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`
      
    )
}
const postPatientBookAppointmentService = (data)=>{
    // return axios.delete('/api/delete-user',{id:userId})
     return axios.post(`/api/patient-book-appointment `, data
      
    )
}
const postVerifyBookAppointmentService = (data)=>{
    // return axios.delete('/api/delete-user',{id:userId})
     return axios.post(`/api/verify-book-appointment`, data
      
    )
}
const createSpecialtyService = (data)=>{
    // return axios.delete('/api/delete-user',{id:userId})
     return axios.post(`/api/create-new-specialty`, data
      
    )
}
const getAllSpecialtyService = ()=>{
    // return axios.delete('/api/delete-user',{id:userId})
     return axios.get(`/api/get-specialty`
      
    )
}
const getDetailSpecialtyService = (data)=>{
    // return axios.delete('/api/delete-user',{id:userId})
     return axios.get(`/api/get-detail-specialty?id=${data.id}&location=${data.location}`
      
    )
}
const createClinicService = (data)=>{
    // return axios.delete('/api/delete-user',{id:userId})
     return axios.post(`/api/create-new-clinic`,data
      
    )
}
const getAllClinicService = ()=>{
    // return axios.delete('/api/delete-user',{id:userId})
     return axios.get(`/api/get-clinic`
      
    )
}
const getDetailClinicService = (data)=>{
    // return axios.delete('/api/delete-user',{id:userId})
     return axios.get(`/api/get-detail-clinic?id=${data.id}`
      
    )
}
const getAllPatientForDoctorService = (data)=>{
    // return axios.delete('/api/delete-user',{id:userId})
     return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
      
    )
}
const postSendRemedyService = (data)=>{
    // return axios.delete('/api/delete-user',{id:userId})
     return axios.post(`/api/send-remedy`, data
      
    )
}
export {handleLoginAPI, getAllUsers,createNewUserService,deleteUser,
     editUserService,getAllCodeService, getDoctorHomeService
     ,getAllDoctorService, saveInfoDoctorService 
     ,getDetailInfoDoctorService,saveBulksScheduleDoctor,getScheduleByDate
     ,getExtraInfoDoctorById,getProfileDoctorByIdService
     ,postPatientBookAppointmentService,postVerifyBookAppointmentService,
     createSpecialtyService,getAllSpecialtyService,getDetailSpecialtyService,
     createClinicService,getAllClinicService,getDetailClinicService,
     getAllPatientForDoctorService ,postSendRemedyService   }

