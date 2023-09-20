import actionTypes from './actionTypes';
import { getAllCodeService ,createNewUserService 
    ,getAllUsers, deleteUser, editUserService ,getDoctorHomeService
    ,getAllDoctorService ,saveInfoDoctorService,getAllSpecialtyService,getAllClinicService} from '../../services/userService';
import { toast } from 'react-toastify';
export const fetchGenderStart = () => { 
    return async(dispatch,getState)=>{
        try {
            dispatch({
                type:actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("gender")
            if(res && res.errCode ===0 ){
                // console.log('getstraete',getState)
                dispatch(fetchGenderSuccess(res.data))
            }else{
                dispatch( fetchGenderFailed())
    
            }
            
        } catch (error) {
            dispatch( fetchGenderFailed())
            console.log(error)
        }
    }
   
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS
    ,data:genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS
    ,data:positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS
    ,data:roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})
export const fetchPositionStart = () => { 
    return async(dispatch,getState)=>{
        try {
           
            let res = await getAllCodeService("POSITION")
            if(res && res.errCode ===0 ){
                
                dispatch(fetchPositionSuccess(res.data))
            }else{
                dispatch( fetchPositionFailed())
    
            }
            
        } catch (error) {
            dispatch( fetchPositionFailed())
            console.log(error)
        }
    }
   
}
export const fetchRoleStart = () => { 
    return async(dispatch,getState)=>{
        try {
           
            let res = await getAllCodeService("role")
            if(res && res.errCode ===0 ){
                
                dispatch(fetchRoleSuccess(res.data))
            }else{
                dispatch( fetchRoleFailed())
    
            }
            
        } catch (error) {
            dispatch( fetchRoleFailed())
            console.log(error)
        }
    }
   
}
export const createNewUser = (data) => { 
    return async(dispatch,getState)=>{
        try {
           
            let res = await createNewUserService(data)

            console.log('check create', res)
            if(res && res.errCode ===0 ){
                toast.success("Create a new user success!")
                
                dispatch(createNewUserSuccess())
                dispatch(fetchAllUsersStart())
            }else{
                dispatch( createNewUserFailed())
    
            }
            
        } catch (error) {
            dispatch( createNewUserFailed())
            console.log(error)
        }
    }
   
}
export const createNewUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
    
})
export const createNewUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})
export const fetchAllUsersStart = () => { 
    return async(dispatch,getState)=>{
        try {
           
            let res = await getAllUsers("ALL")
          
           
            if(res && res.errCode ===0 ){
                
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            }else{
                toast.error("Fetch all users error!")
                dispatch( fetchAllUsersFailed())
    
            }
            
        } catch (error) {
            toast.error("Fetch all users error!")
            dispatch( fetchAllUsersFailed())
            console.log(error)
        }
    }
   
}
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users:data
    
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})
export const deleteAUser = (userId) => { 
    return async(dispatch,getState)=>{
        try {
           
            let res = await deleteUser(userId)
            if(res && res.errCode ===0 ){
                toast.success("Delete the user success!")
                
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart())
            }else{
                toast.error("Delete the users error!")
                dispatch( deleteUserFailed())
    
            }
            
        } catch (error) {
            toast.error("Delete the users error!")
            dispatch( deleteUserFailed())
            console.log(error)
        }
    }
   
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})
export const editAUser = (data) => { 
    return async(dispatch,getState)=>{
        try {
           
            let res = await editUserService(data)
            if(res && res.errCode ===0 ){
                toast.success("Update the user success!")
                
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart())
            }else{
                toast.error("Update the users error!")
                dispatch( editUserFailed())
    
            }
            
        } catch (error) {
            toast.error("Update the users error!")
            dispatch( editUserFailed())
            console.log(error)
        }
    }
   
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})
export const fetchTopDOctor = () => {
    return async (dispatch,getState)=>{
    try {
        let res = await getDoctorHomeService("")
       if(res && res.errCode ===0){
        dispatch({
            type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
            dataDoctors: res.data
        })
       }else{
        dispatch({
             type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
          
        })
       }
    } catch (error) {
        console.log(error)
        dispatch({
            type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
         
       })
    }}
}
export const fetchAllDoctors = () => {
    return async (dispatch,getState)=>{
    try {
        let res = await getAllDoctorService()
       if(res && res.errCode ===0){
        dispatch({
            type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
            dataDoctors: res.data
        })
       }else{
        dispatch({
             type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
          
        })
       }
    } catch (error) {
        console.log(error)
        dispatch({
            type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
         
       })
    }}
}
export const saveInfoDoctor = (data) => {
    return async (dispatch,getState)=>{
    try {
        let res = await saveInfoDoctorService(data)
       if(res && res.errCode ===0){
        toast.success('Save Info Doctor success!')
        dispatch({
            type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
           
        })
       }else{
        console.log(res)
        toast.error('Save Info Doctor error!')
        dispatch({
             type: actionTypes.SAVE_INFO_DOCTOR_FAILED,
          
        })
       }
    } catch (error) {
        
        toast.error('Save Info Doctor error!')
        console.log(error)
        dispatch({
            type: actionTypes.SAVE_INFO_DOCTOR_FAILED,
         
       })
    }}
}
export const fetchAllScheduleTime = (type) => {
    return async (dispatch,getState)=>{
    try {
        let res = await getAllCodeService("TIME")
       if(res && res.errCode ===0){
        dispatch({
            type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
            dataTime: res.data
        })
       }else{
        dispatch({
             type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
          
        })
       }
    } catch (error) {
        console.log(error)
        dispatch({
            type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
         
       })
    }}
}
export const getRequiredDoctorInfo = () => { 
    return async(dispatch,getState)=>{
        try {
            dispatch({
                type:actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START
            })
            let resPrice = await getAllCodeService("PRICE")
            let resPayment = await getAllCodeService("PAYMENT")
            let resProvince = await getAllCodeService("PROVINCE")
            let resSpecialty = await getAllSpecialtyService()
            let resClinic = await getAllClinicService()
            if(resPrice && resPrice.errCode ===0 
                && resPayment && resPayment.errCode ===0 
                && resProvince && resProvince.errCode ===0 
                && resSpecialty && resSpecialty.errCode ===0 
                && resClinic && resClinic.errCode ===0 ){
               
                let data={
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty:resSpecialty.data,
                    resClinic:resClinic.data
                }
                dispatch(fetchRequiredDoctorInfoSuccess(data))
            }else{
                dispatch( fetchRequiredDoctorInfoFailed())
    
            }
            
        } catch (error) {
            dispatch( fetchRequiredDoctorInfoFailed())
            console.log(error)
        }
    }
   
}
export const fetchRequiredDoctorInfoSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS
    ,data:allRequiredData
})
export const fetchRequiredDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED
})



