import React, { Component, isValidElement } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import DatePicker from "../../../../components/Input/DatePicker" 
import {  getAllPatientForDoctorService, postSendRemedyService } from "../../../../services/userService";
import moment from "moment";
import { LANGUAGES } from "../../../../utils"; 
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from 'react-loading-overlay'

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentDate: moment(new Date()).startOf('day').valueOf() ,
        dataPatient:[],
        isOpenRemedyModal:false,
        dataModal:{},
        isShowLoading:false
    };
  }
  async componentDidMount() {
    
this.getDataPatient()
  
  
  }

  getDataPatient =async()=>{
    let {user} = this.props
    let {currentDate}=this.state
  
let formattedDate= new Date(currentDate).getTime()
    let res = await getAllPatientForDoctorService({
        doctorId:user.id,
        date: formattedDate
    })
    if (res &&res.errCode===0){
        this.setState({
            dataPatient:res.data
        })
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    },async()=>{
       
 await this.getDataPatient()
    }) 
  } 
  handleBtnConfirm = (item)=>{
        
        let data = {
          doctorId:item.doctorId,
          patientId: item.patientId,
          email: item.patientData.email,
          timeType:item.timeType,
          patientName: item.patientData.firstName
        }
       this.setState({
        isOpenRemedyModal:true,
        dataModal:data
       })
  }
  closeRemedyModal = ()=>{
    this.setState({
      isOpenRemedyModal:false,
      dataModal:{}
    })
  }
  sendRemedy = async(dataFromChild)=>{
    let {dataModal} = this.state
    this.setState({
      isShowLoading:true
    })
    let res = await postSendRemedyService({
      email: dataFromChild.email,
      imageBase64: dataFromChild.imageBase64,
      doctorId:dataModal.doctorId,
      patientId:dataModal.patientId,
      timeType:dataModal.timeType,
      language:this.props.language,
      patientName:dataModal.patientName
    })
    if(res&& res.errCode===0){
      this.setState({
        isShowLoading:false
      })
      toast.success("Send Remedy Success!")
      this.closeRemedyModal()
      await this.getDataPatient()
     
    
    }else{
      this.setState({
        isShowLoading:false
      })
      toast.error("Send Remedy Error!")
    }
  }
  

  render() {
   let {dataPatient, isOpenRemedyModal, dataModal}=this.state
   let {language} = this.props
    return (
      <>
      <LoadingOverlay
      active={this.state.isShowLoading}
      spinner
      text='Loading...'
      >
      
        <div className="manage-patient-container">
          <div className="m-p-title">Quan ly benh nhan kham benh</div>
          <div className="manage-patient-body row">
            <div className="col-4 form-group">
              <label>Chon ngay kham</label>
              <DatePicker
               
                value={this.state.currentDate}
                className="form-control"
                onChange={this.handleOnChangeDatePicker}
              />
            </div>
            <div className="col-12">
             
                <table className="table table-dark table-hover">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Ho va ten</th>
                      <th>Thoi Gian</th>
                      <th>Gioi Tinh</th>
                      <th>So Dien Thoai</th>
                      <th>Dia Chi</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPatient && dataPatient.length>0 ? dataPatient.map((item,index)=>{
                                  let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn
                                  let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn
                        return(
                            <>
                             <tr key={index}>
                      <td>{index +1}</td>
                      <td>{item.patientData.firstName}</td>
                      <td>{time}</td>
                      <td>{gender}</td>
                      <td>{item.patientData.phoneNumber}</td>
                      <td>{item.patientData.address}</td>
                      <th>
                        <button onClick={()=>this.handleBtnConfirm(item)} className="btn-confirm">Xac nhan</button>
                      
                      </th>
                     

                    </tr>
                            </>
                        )
                    }):<>
                    <tr><td colSpan="7" style={{textAlign:"center"}}>khong co data</td></tr>
                    </>}
                   
                    
                  </tbody>
                </table>
              </div>
          
          </div>
        </div>
        </LoadingOverlay>
        <RemedyModal 
      isOpenModal=  {isOpenRemedyModal}
      dataModal = {dataModal}
      closeRemedyModal={this.closeRemedyModal}
      sendRemedy = {this.sendRemedy}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user:state.user.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
