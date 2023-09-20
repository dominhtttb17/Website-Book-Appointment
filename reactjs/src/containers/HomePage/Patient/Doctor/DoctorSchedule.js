import React, { Component, isValidElement } from "react" 
import { FormattedMessage } from "react-intl" 
import { Redirect } from "react-router-dom" 
import { connect } from "react-redux" 
import "./DoctorSchedule.scss" 
import { getDetailInfoDoctorService } from "../../../../services/userService" 
// import { LANGUAGES ,CRUD_ACTIONS , CommonUtils} from "../../../utils"
// import * as actions from "../../../store/actions"
import Lightbox from "react-image-lightbox" 
import "react-image-lightbox/style.css" 
import HomeHeader from "../../HomeHeader" 
import { LANGUAGES } from "../../../../utils" 
import localization from "moment/locale/vi" 
import { getScheduleByDate } from "../../../../services/userService" 
import BookingModal from "./Modal/BookingModal" 

import moment from "moment" 

class DoctorSchedule extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking:false,
      dataScheduleTimeModal:{}
    } 
  }
  async componentDidMount() {
    let { language } = this.props 
    let allDays = this.getArrDays(language) 
    if( this.props.doctorIdFromParent){
      let res = await getScheduleByDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      ) 
  
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      }) 
    }
  
    this.setState({
      allDays: allDays,
    }) 
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language) 
      this.setState({
        allDays: allDays,
      }) 
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.getArrDays(this.props.language) 
      let res = await getScheduleByDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      ) 

      this.setState({
        allAvailableTime: res.data ? res.data : [],
      }) 
    }
  }
  getArrDays = (language) => {
    let allDays = [] 
    const currentDate = moment(new Date()) 

    // Các định dạng và nhãn chung
    const dateFormat =
      language === LANGUAGES.VI ? "dddd - DD/MM" : "ddd - DD/MM" 
    const todayLabel = language === LANGUAGES.VI ? "Hôm nay - " : "Today - " 

    for (let i = 0;  i < 7;  i++) {
      let object = {} 
      let date = moment(currentDate).add(i, "days") 

      if (i === 0) {
        object.label = todayLabel + date.format("DD/MM") 
      } else {
        object.label = this.capitalizeFirstLetter(
          date
            .locale(language === LANGUAGES.VI ? "vi" : "en")
            .format(dateFormat)
        ) 
      }
      object.value = date.startOf("day").valueOf() 
      allDays.push(object) 
    }

    return allDays 
  } 

  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent 
      let date = event.target.value 
      let res = await getScheduleByDate(doctorId, date) 
      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        }) 
      }
    }
  } 
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1) 
  } 
  handleClickScheduleTime = (time)=>{
   this.setState({
    isOpenModalBooking:true,
    dataScheduleTimeModal: time
   })
  }
  closeBookingModal =()=>{
    this.setState({
      isOpenModalBooking:false
    })
  }

  render() {
    let { allDays, allAvailableTime ,isOpenModalBooking , dataScheduleTimeModal} = this.state 
    let { language } = this.props 

    return (
      <>
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select onChange={(event) => this.handleOnChangeSelect(event)}>
            {allDays &&
              allDays.length > 0 &&
              allDays.map((item, index) => {
                return (
                  <option
                    className="option-date"
                    value={item.value}
                    key={index}
                  >
                    {item.label}
                  </option>
                ) 
              })}
          </select>
        </div>
        <div className="all-available-time">
          <div className="text-calendar">
            <span>
              <i className="fas fa-calendar-alt"></i>
              <FormattedMessage id="patient.patient-doctor.schedule" />
            </span>
          </div>
          <div className="time-content">
            {allAvailableTime && allAvailableTime.length > 0 ? (
              allAvailableTime.map((item, index) => {
                return (
                  
                   <React.Fragment key={index}>
                    <button onClick={()=>this.handleClickScheduleTime(item)}
                     >
                      {language === LANGUAGES.VI
                        ? item.timeTypeData.valueVi
                        : item.timeTypeData.valueEn}
                    </button>

                    <div className="select-book-text">
                      <FormattedMessage id="patient.patient-doctor.choose" />
                      <i className="far fa-hand-point-up"></i>
                      <FormattedMessage id="patient.patient-doctor.and-book-0d" />
                    </div>
                  
                  </React.Fragment>
                ) 
              })
            ) : (
              <div className="text-empty-time">
                <FormattedMessage id="patient.patient-doctor.no-schedule" />
              </div>
            )}
          </div>
        </div>
      </div>
      <BookingModal isOpenModal ={isOpenModalBooking}
                      closeBookingModal={this.closeBookingModal}
                      dataTime={dataScheduleTimeModal}
        />
      </>
    ) 
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  } 
} 

const mapDispatchToProps = (dispatch) => {
  return {} 
} 

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule) 
