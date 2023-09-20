import { truncate } from "lodash";
import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoadingGender:false,
   genders:[],
   roles:[],
   positions:[],
   users:[],
   topDoctors:[],
   listDoctor:[],
   allScheduleTime:[],
   allRequiredDoctorInfo:[]

}
const adminReducer = (state = initialState,action)=>{
    switch (action.type){
        case actionTypes.FETCH_GENDER_START:
            let copyState1 ={...state}
                copyState1.isLoadingGender = true
            return{
                ...copyState1,
               
            }
            case actionTypes.FETCH_GENDER_SUCCESS:
                let copyState ={...state}
                copyState.genders = action.data
                copyState.isLoadingGender=false
                return{
                    ...copyState,
                   
                }
                case actionTypes.FETCH_GENDER_FAILED:
                    let copyState2 ={...state}
                copyState2.genders = []
                copyState2.isLoadingGender=false
                    return{
                        ...copyState2,
                       
                    }
                    case actionTypes.FETCH_POSITION_SUCCESS:
                        let copyState3 ={...state}
                    copyState3.positions = action.data
                   
                        return{
                            ...copyState3,
                           
                        }
                        case actionTypes.FETCH_POSITION_FAILED:
                            let copyState4 ={...state}
                        copyState4.positions = []
                       
                            return{
                                ...copyState4,
                               
                            }
                            case actionTypes.FETCH_ROLE_SUCCESS:
                                let copyState5 ={...state}
                            copyState5.roles = action.data
                           
                                return{
                                    ...copyState5,
                                   
                                }
                                case actionTypes.FETCH_ROLE_FAILED:
                                    let copyState6 ={...state}
                                copyState6.roles = []
                               
                                    return{
                                        ...copyState6,
                                       
                                    }
                                    case actionTypes.FETCH_ALL_USERS_SUCCESS:
                                        let copyState7 ={...state}
                                    copyState7.users = action.users
                                   
                                        return{
                                            ...copyState7,
                                           
                                        }
                                        case actionTypes.FETCH_ALL_USERS_FAILED:
                                            let copyState8 ={...state}
                                        copyState8.users =[]
                                       
                                            return{
                                                ...copyState8,
                                               
                                            }
                                            case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
                                            let copyState9 ={...state}
                                        copyState9.topDoctors = action.dataDoctors
                                       
                                            return{
                                                ...copyState9,
                                               
                                            }
                                            case actionTypes.FETCH_TOP_DOCTORS_FAILED:
                                            let copyState10 ={...state}
                                        copyState10.topDoctors =[]
                                       
                                            return{
                                                ...copyState10,
                                               
                                            }
                                            case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
                                                let copyState11 ={...state}
                                            copyState11.listDoctor =action.dataDoctors
                                           
                                                return{
                                                    ...copyState11,
                                                   
                                                }
                                                case actionTypes.FETCH_ALL_DOCTORS_FAILED:
                                                    let copyState12 ={...state}
                                                copyState12.listDoctor =[]
                                               
                                                    return{
                                                        ...copyState12,
                                                       
                                                    }
                                                    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
                                                        let copyState13 ={...state}
                                                    copyState13.allScheduleTime =action.dataTime
                                                   
                                                        return{
                                                            ...copyState13,
                                                           
                                                        }
                                                        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
                                                            let copyState14 ={...state}
                                                        copyState14.allScheduleTime =[]
                                                       
                                                            return{
                                                                ...copyState14,
                                                               
                                                            }
                                                            case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
                                                                let copyState15 ={...state}
                                                            copyState15.allRequiredDoctorInfo =action.data
                                                                return{
                                                                    ...copyState15,
                                                                   
                                                                }
                                                                case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
                                                                    let copyState16 ={...state}
                                                                copyState16.allRequiredDoctorInfo =[]
                                                               
                                                                    return{
                                                                        ...copyState16,
                                                                       
                                                                    }
           
               
                    default:
                        return state
    }
}
export default adminReducer