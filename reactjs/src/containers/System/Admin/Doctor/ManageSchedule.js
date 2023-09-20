import React, { Component } from "react" 
import { connect } from "react-redux" 
import { FormattedMessage } from "react-intl" 
import "./ManageSchedule.scss" 
import { LANGUAGES, dateFormat } from "../../../../utils" 
import Select from "react-select" 
import * as actions from "../../../../store/actions" 
import DatePicker from "../../../../components/Input/DatePicker" 
import moment from "moment" 
import {toast} from "react-toastify"
import _ from 'lodash'
import {saveBulksScheduleDoctor} from '../../../../services/userService'
class ManageSchedule extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      listDoctors: [],
      selectedOption: {},
      currentDate: "",
      rangeTime: [],
    } 
  }

  componentDidMount() {
    this.props.fetchAllDoctors() 
    this.props.fetchAllScheduleTime() 
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listDoctorRedux !== this.props.listDoctorRedux) {
      let dataSelect = this.buildDataInputSelect(this.props.listDoctorRedux) 

      this.setState({
        listDoctors: dataSelect,
      }) 
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime 

      if (data && data.length > 0) {
        data = data.map((item, index) => {
          item.isSelected = false 
          return item 
        }) 
      }
      this.setState({
        rangeTime: data,
      }) 
    }
  }
  buildDataInputSelect = (data) => {
    let result = [] 
    //  let {language} = this.props
    if (data && data.length > 0) {
      data.map((item, index) => {
        let object = {} 

        let label = `${item.lastName} ${item.firstName}` 
        // let labelEn =`${item.firstName} ${item.lastName}`
        object.label = label 
        object.value = item.id 
        result.push(object) 
      }) 
    }
    return result 
  } 
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption }) 
  } 
  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    }) 
  } 
  handleClickButtonTime = (itemTime) => {
    let { rangeTime } = this.state
    if(rangeTime && rangeTime.length>0){
        rangeTime =  rangeTime.map((item,index)=>{
        if(item.id === itemTime.id)item.isSelected= !item.isSelected 
        return item
            
        
        })
       this.setState({
        rangeTime:rangeTime
       })
    }
  } 


  handleSaveSchedule= async()=>{
    let {rangeTime, selectedOption,currentDate}= this.state
   
   
    let formatDate  =  new Date(currentDate).getTime()
    
    let result = []
    if(selectedOption && _.isEmpty(selectedOption)){
        toast.error("Invalid selected doctor !")
    }
   else if(!currentDate){
        toast.error("Invalid date!")

    } else if(rangeTime && rangeTime.length >0 ){
        let selectedTime = rangeTime.filter(item => item.isSelected===true)
       
             if(selectedTime && selectedTime.length >0){
               
                selectedTime.map(item=>{
                    let object = {}
                    object.doctorId = selectedOption.value
                    object.date = formatDate
                    object.timeType = item.keyMap
                    result.push(object)
                })
             }else{
                toast.error("Invalid selected time!!")
             }
   
    
    }
    let res = await saveBulksScheduleDoctor({
        arrSchedule: result ,
        doctorId: selectedOption.value,
        formatDate:formatDate
    })
      if(res && res.errCode ===0){
        toast.success("Save Bulks Schedule Doctor Success!!")
        }else{
                toast.error("Save Bulks Schedule Doctor Error")
     }

   
    
}
  render() {
    let { rangeTime } = this.state 
    let { language } = this.props 
    let yesterday = new Date(new Date().setDate(new Date().getDate()-1));


    return (
      <div className="manage-schedule-container">
        <div className="m-s-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label>
                {" "}
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChangeSelect}
                options={this.state.listDoctors}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                minDate={yesterday}
                value={this.state.currentDate}
                className="form-control"
                onChange={this.handleOnChangeDatePicker}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      onClick={() => this.handleClickButtonTime(item)}
                      className={item.isSelected===true ? "btn-schedule active  " :"btn-schedule"}
                      key={index}

                    >
                      {" "}
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  ) 
                })}
            </div>
            <button onClick={()=>this.handleSaveSchedule()} className="btn btn-primary btn-save-info">
              <FormattedMessage id="manage-schedule.save-info" />
            </button>
          </div>
        </div>
      </div>
    ) 
  }
}

const mapStateToProps = (state) => {
  return {
    listDoctorRedux: state.admin.listDoctor,
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    allScheduleTime: state.admin.allScheduleTime,
  } 
} 

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  } 
} 

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule) 
