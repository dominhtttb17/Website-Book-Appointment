import React, { Component, isValidElement } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import DatePicker from "../../../../../components/Input/DatePicker" 
import * as actions from "../../../../../store/actions" 
import Select from "react-select" 
import {postPatientBookAppointmentService} from '../../../../../services/userService'
import { LANGUAGES } from "../../../../../utils"
import NumberFormat from "react-number-format" 
import moment  from "moment/moment"
import _ from 'lodash'
import { toast } from "react-toastify";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

      fullName:'',
      phoneNumber:'',
      email:'',
      address:'',
      reason :'',
      birthday:'',
      genders:'',
      doctorId:'',
      selectedGender:'',
      timeType:''

    };
  }
  async componentDidMount() {
    this.props.getGender()
  }
  buildDataInputSelect = (data) => {
    let result = [] 
     let {language} = this.props
    if (data && data.length > 0) {
      data.map((item, index) => {
        let object = {} 

        let label = language === LANGUAGES.VI ?  item.valueVi : item.valueEn
       
        object.label = label 
        object.value = item.keyMap 
        result.push(object) 
      }) 
    }
    return result 
  } 

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataInputSelect(this.props.genders)
      })
    }
    if (this.props.genders !== prevProps.genders) {
    
      this.setState({
        genders: this.buildDataInputSelect(this.props.genders)
      })
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if(this.props.dataTime && !_.isEmpty(this.props.dataTime)){
       let doctorId=this.props.dataTime.doctorId
       let timeType=this.props.dataTime.timeType
       this.setState({
        doctorId: doctorId,
        timeType: timeType
      })
    }
     
    }
  }
  handleOnChangeInput =(event, id)=>{
     let valueInput = event.target.value
     let stateCopy = {...this.state}
     stateCopy[id]=valueInput
     this.setState({
      ...stateCopy
     })
  }
  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    }) 
  } 
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedGender :selectedOption }) 
  } 
  handleConfirmBooking=async()=>{
    let timeString = this.buildTimeBooking(this.props.dataTime)
    let date = new Date(this.state.birthday).getTime()
    let doctorName  = this.buildDoctorName(this.props.dataTime)

     let res = await postPatientBookAppointmentService({
      fullName:this.state.fullName,
      phoneNumber:this.state.phoneNumber,
      email:this.state.email,
      address:this.state.address,
      reason :this.state.reason,
      date:this.props.dataTime.date,
      birthday:date,
      selectedGender:this.state.selectedGender.value,
      doctorId:this.state.doctorId,
      timeType: this.state.timeType,
      language:this.props.language,
      timeString: timeString,
      doctorName:doctorName
    
     })
     if(res && res.errCode === 0){
       toast.success('Booking a new appointment success!')
       this.props.closeBookingModal()
     }else
     {
      toast.error('Booking a new appointment error!')
     } 


  }
  buildTimeBooking=(dataTime)=>{
    let {language} = this.props
    let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn

    if(dataTime && !_.isEmpty(dataTime)){
     let date = language===LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY'):moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
    return `${time} - ${date}`
  
  }
  return ``
}
buildDoctorName=(dataTime)=>{
  let {language} = this.props

  if(dataTime && !_.isEmpty(dataTime)){
  let name = language === LANGUAGES.VI ? dataTime.doctorData.lastName+' '+dataTime.doctorData.firstName : dataTime.doctorData.firstName+' '+dataTime.doctorData.lastName

  return name

}
return ``
}


  render() {
    let {isOpenModal , closeBookingModal ,dataTime}= this.props
    let doctorId = ''
    if(dataTime && !_.isEmpty(dataTime)){
        doctorId=dataTime.doctorId
    }
    let {fullName , phoneNumber ,email, address , reason ,birthday,genders , selectedGender}= this.state

    return (
      <>
        <Modal
          isOpen={isOpenModal}
          
          className={"booking-modal-container"}
          centered
          size="lg"
        >
            <div className="booking-modal-content">
            <div className="booking-modal-header">
                <span className="left"><FormattedMessage id="patient.booking-modal.title"/></span>
                <span onClick={closeBookingModal} className="right"><i className="far fa-times-circle"></i></span>
            </div>
            <div className="booking-modal-body">
              <div className="doctor-info">
          <ProfileDoctor doctorId={doctorId}
                       isShowDescriptionDoctor = {false}
                       dataTime = {dataTime}
          />
              </div>
            
            <div className="container">
            <div className="row">
             <div className="col-6 form-group">
              <label><FormattedMessage id="patient.booking-modal.fullName"/></label>
              <input onChange={(event)=>this.handleOnChangeInput(event, 'fullName')} value={fullName} className="form-control"></input>
              </div>
              <div className="col-6 form-group">
              <label><FormattedMessage id="patient.booking-modal.phoneNumber"/></label>
              <input onChange={(event)=>this.handleOnChangeInput(event, 'phoneNumber')} value={phoneNumber} className="form-control"></input>
              </div>
              <div className="col-6 form-group">
              <label><FormattedMessage id="patient.booking-modal.email"/></label>
              <input  onChange={(event)=>this.handleOnChangeInput(event, 'email')} value={email} className="form-control"></input>
              </div>
              <div className="col-6 form-group">
              <label><FormattedMessage id="patient.booking-modal.address"/></label>
              <input  onChange={(event)=>this.handleOnChangeInput(event, 'address')} value={address} className="form-control"></input>
              </div>
              <div onChange={(event)=>this.handleOnChangeInput(event, 'reason')} value={reason} className="col-12 form-group">
              <label><FormattedMessage id="patient.booking-modal.reason"/></label>
              <input className="form-control"></input>
              </div>
              <div  onChange={(event)=>this.handleOnChangeInput(event, 'birthday')}  className="col-6 form-group">
              <label><FormattedMessage id="patient.booking-modal.birthday"/></label>
              <DatePicker
                // minDate={yesterday}
                value={birthday}
                className="form-control"
                onChange={this.handleOnChangeDatePicker}
              />
              </div>
              <div  onChange={(event)=>this.handleOnChangeInput(event, 'genders')}  className="col-6 form-group">
              <label><FormattedMessage id="patient.booking-modal.genders"/></label>
              <Select
                value={selectedGender}
                onChange={this.handleChangeSelect}
                options={genders}
              />
              </div>

             </div>
             
             
            </div>
            </div>
            <div className="booking-modal-footer">
                <button onClick={()=>this.handleConfirmBooking()} className="btn-booking-confirm"><FormattedMessage id="patient.booking-modal.btn-confirm"/></button>
                <button onClick={closeBookingModal} className="btn-booking-cancel"><FormattedMessage id="patient.booking-modal.btn-cancel"/></button>

            </div>
            </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGender: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
