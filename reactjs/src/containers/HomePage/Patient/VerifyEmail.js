import React, { Component, isValidElement } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import {postVerifyBookAppointmentService} from '../../../services/userService'
import HomeHeader from "../HomeHeader";
import './VerifyEmail.scss'
class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify:false,
      errCode:-1
    
    };
  }
  async componentDidMount() {
    if(this.props.location && this.props.location.search ){
      const urlParams = new URLSearchParams(this.props.location.search)
      const token = urlParams.get('token')
      const doctorId = urlParams.get('doctorId')

      let res = await postVerifyBookAppointmentService({
        token:token,
        doctorId:doctorId

      })
      if(res && res.errCode ===0){
            this.setState({
              statusVerify:true,
              errCode:res.errCode
            })
      }else{
        this.setState({
          statusVerify:true,
          errCode:res && res.errCode ? res.errCode : -1
        })
      }


     
 
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  
  render() {
   

    return (
     <> 
     <HomeHeader/>

     {this.state.statusVerify ===false  ?

    <div className="title-booking-success">
      Loading data .......
    </div>
    :
    <div> 
      {+this.state.errCode===0 ? 
      <div className="title-booking-success">
      Đơn hàng đã được xác nhận! Chúc mừng bé iu
    </div> :
     <div className="title-booking-failed">
    Đã có lỗi !
   </div>

      }
    </div>
    }
     </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
