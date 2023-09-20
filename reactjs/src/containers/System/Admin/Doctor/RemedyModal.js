import React, { Component, isValidElement } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./RemedyModal.scss";
import { Modal } from "reactstrap";
import {CommonUtils} from '../../../../utils'


import moment  from "moment/moment"

import { toast } from "react-toastify";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
 email:'',
 imageBase64:''
 

    };
  }
  async componentDidMount() {
    if(this.props.dataModal){
        this.setState({
            email:this.props.dataModal.email
        })
    }
   
  }
 

  async componentDidUpdate(prevProps, prevState, snapshot) {
   if (prevProps.dataModal !== this.props.dataModal){
this.setState({
    email :this.props.dataModal.email
})
   }
     
    }


    handleOnChangeEmail =(event)=>{
        this.setState({
        email: event.target.value

        })
    }
    handleOnChangeImage = async(event) => {
        let data = event.target.files 
        let file = data[0] 
    
        if (file) {
          
          let base64 =await CommonUtils.getBase64(file)
        
        
          this.setState({
           imageBase64:base64
          }) 
        }else{
          console.log('check image: ngom roi')
        }
      }
      handleSendRemedy =()=>{
       this.props.sendRemedy(this.state)
      }


  render() {
    let {isOpenModal, dataModal , closeRemedyModal}= this.props
  


    return (
      <>
        <Modal
          isOpen={isOpenModal}
          
          className={"booking-modal-container"}
          centered
          size="md"

        >
         <div className="booking-modal-content">
            <div className="booking-modal-header">
                <span className="left">Gui hoa don kham benh</span>
                <span onClick={closeRemedyModal} className="right"><i className="far fa-times-circle"></i></span>
            </div>
            <div className="booking-modal-body">
              <div className="doctor-info">
        
              </div>
            
            <div className="container">
            <div className="row">
            
              <div className="col-6 form-group">
              <label>Email patient</label>
              <input value={this.state.email }  onChange={(event)=>this.handleOnChangeEmail(event)}  className="form-control"></input>
              </div>
              <div className="col-12 form-group">
              <label>Chon file don thuoc</label>
              <input onChange={(event)=>this.handleOnChangeImage(event)} type="file" className="form-control-file"></input>
              </div>
             
           

             </div>
             
             
            </div>
            </div>
            <div className="booking-modal-footer">
               <button onClick={()=>this.handleSendRemedy()}  className="btn-booking-confirm">xac nhan</button>
               <button onClick={closeRemedyModal} className="btn-booking-cancel"><FormattedMessage id="patient.booking-modal.btn-cancel"/></button>

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
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
