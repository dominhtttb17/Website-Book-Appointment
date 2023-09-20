import React, { Component, isValidElement } from "react";
import { FormattedMessage } from "react-intl";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./DetailDoctor.scss";
import {getDetailInfoDoctorService} from "../../../../services/userService"
// import { LANGUAGES ,CRUD_ACTIONS , CommonUtils} from "../../../utils"
// import * as actions from "../../../store/actions"
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import HomeHeader from "../../HomeHeader";
import { LANGUAGES } from "../../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor:[],
      currentDoctorId:-1
    };
  }
  async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){

          this.setState({
            currentDoctorId: this.props.match.params.id
          })
          let res = await getDetailInfoDoctorService(this.props.match.params.id)
         if(res && res.errCode===0){
          this.setState({
            detailDoctor: res.data,
           
          })
         }
     
        }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  render() {
  
    let {detailDoctor} = this.state
    let {language} = this.props
    let nameVi, nameEn =''
     if(detailDoctor && detailDoctor.positionData){
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.firstName}`
    }
    
   
    return (
     
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
          <div className="intro-doctor-grid">
            <div className="content-left">
            
              <div  style={{
                      backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image: ''})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }} className="img-doctor"></div>
            </div>
            <div className="content-right">
            <div className="title-doctor">
                { language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
            <div className="description-doctor">
                  {detailDoctor&& detailDoctor.Markdown && detailDoctor.Markdown.description &&
                  <span> {detailDoctor.Markdown.description}</span>
                  }
            </div>
            </div>
          </div>
          </div>
          <div className="schedule-doctor"> 
               <div className="content-left">
                <DoctorSchedule 
                doctorIdFromParent = {this.state.currentDoctorId}
                />
               </div>
               <div className="content-right">
                <DoctorExtraInfo 
                 doctorIdFromParent = {this.state.currentDoctorId}
                 />
               </div>
          </div>
          <div className="detail-info-doctor">
          <div className="detail-info-doctor-grid">
            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
            
            
            <div dangerouslySetInnerHTML={{__html: detailDoctor.Markdown.contentHTML}}></div>
            }
          </div>
          </div>
          <div className="comment-doctor"></div>
      
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
