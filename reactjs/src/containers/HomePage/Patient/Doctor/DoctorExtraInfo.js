import React, { Component, isValidElement } from "react" 
import { FormattedMessage } from "react-intl" 
import { Redirect } from "react-router-dom" 
import { connect } from "react-redux" 
import "./DoctorExtraInfo.scss" 
import { getDetailInfoDoctorService } from "../../../../services/userService" 
// import { LANGUAGES ,CRUD_ACTIONS , CommonUtils} from "../../../utils"
// import * as actions from "../../../store/actions"
import Lightbox from "react-image-lightbox" 
import "react-image-lightbox/style.css" 
import HomeHeader from "../../HomeHeader" 
import { LANGUAGES } from "../../../../utils" 
import localization from "moment/locale/vi" 
import {
  getScheduleByDate,
  getExtraInfoDoctorById,
} from "../../../../services/userService" 
import NumberFormat from "react-number-format" 

import moment from "moment" 

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      isShowDetailInfo: false,
      extraInfo: {},
    } 
  }
  async componentDidMount() {
    if (this.props.doctorIdFromParent){
    let res = await getExtraInfoDoctorById(this.props.doctorIdFromParent) 
    if (res && res.errCode === 0) {
      this.setState({
        extraInfo: res.data,
      }) 
    }
  }}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInfoDoctorById(this.props.doctorIdFromParent) 
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.data,
        }) 
      }
    }
  }

  handleOnClickHideShow = () => {
    this.setState({
      isShowDetailInfo: !this.state.isShowDetailInfo,
    }) 
  } 
  render() {
    let { extraInfo } = this.state 
    let { language } = this.props 

    return (
      <div className="doctor-extra-info-container">
        <div className="content-up">
          <div className="text-address"> <FormattedMessage id='patient.patient-doctor.text-address'/></div>
          <div className="name-clinic">
            {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ""}
          </div>
          <div className="detail-address">
            {extraInfo && extraInfo.addressClinic
              ? extraInfo.addressClinic
              : ""}
          </div>
        </div>
        <div className="content-down">
          {this.state.isShowDetailInfo === false ? (
            <>
              <div className="title-price">
                {" "}
                <FormattedMessage id='patient.patient-doctor.title-price'/>
                <span className="price">
                  {extraInfo &&
                    extraInfo.priceTypeData &&
                    language === LANGUAGES.VI && (
                      <NumberFormat
                        value={extraInfo.priceTypeData.valueVi}
                        className="foo"
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"VND"}
                      />
                    )}
                  {extraInfo &&
                    extraInfo.priceTypeData &&
                    language === LANGUAGES.EN && (
                      <NumberFormat
                        value={extraInfo.priceTypeData.valueEn}
                        className="foo"
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"USD"}
                      />
                    )}
                </span>
                <span
                  className="btn-detail-show"
                  onClick={() => this.handleOnClickHideShow()}
                >
                 <FormattedMessage id='patient.patient-doctor.see-details'/>
                </span>{" "}
              </div>
            </>
          ) : (
            <>
              <div className="title-price"><FormattedMessage id='patient.patient-doctor.title-price'/></div>
              <div className="wrap-price">
                <div className="wrap-title-vi-en">
                  <div className="title-price1">
                  <FormattedMessage id='patient.patient-doctor.title-price'/>
                    <span className="title-price2">
                      {extraInfo &&
                        extraInfo.priceTypeData &&
                        language === LANGUAGES.VI && (
                          <NumberFormat
                            value={extraInfo.priceTypeData.valueVi}
                            className="foo"
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"VND"}
                          />
                        )}
                      {extraInfo &&
                        extraInfo.priceTypeData &&
                        language === LANGUAGES.EN && (
                          <NumberFormat
                            value={extraInfo.priceTypeData.valueEn}
                            className="foo"
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"USD"}
                          />
                        )}
                    </span>
                  </div>

                  <div className="price-Vi">
                  {extraInfo && extraInfo.note ? extraInfo.note : ""}
                  </div>
                 
                </div>
                <div className="payment-price">
                <FormattedMessage id='patient.patient-doctor.payment-price'/> {extraInfo && extraInfo.paymentTypeData && language === LANGUAGES.VI && extraInfo.paymentTypeData.valueVi } {extraInfo && extraInfo.paymentTypeData && language === LANGUAGES.EN && extraInfo.paymentTypeData.valueEn }
                </div>
              </div>
              <div
                onClick={() => this.handleOnClickHideShow()}
                className="btn-detail-hide"
              >
              <FormattedMessage id='patient.patient-doctor.hide-price-list'/>
              </div>
            </>
          )}
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo) 
