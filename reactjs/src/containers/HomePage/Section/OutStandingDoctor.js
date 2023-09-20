import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import "slick-carousel/slick/slick.css";
import './OutStandingDoctor.scss'
import * as actions from '../../../store/actions'
import { withRouter } from 'react-router';
class OutStandingDoctor extends Component {
  constructor(props) {
    super(props) 
    this.state = {
    arrDoctors:[]
    } 
  }

  componentDidMount(){
    this.props.loadTopDoctors()

  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
     
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
       
      }) 
    }}

    handleViewDetailDoctor=(doctor)=>{
      this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
    
    render() {
     
        let settings = {
          dots: false,
          infinite: false,
          speed: 100,
          slidesToShow: 4,
          slidesToScroll: 1,


        };
   let arrDoctors = this.state.arrDoctors
   let {language} =this.props
       

        return (

          <div className="selection-grid">
            <div className="title-selection-grid">
              <span><FormattedMessage id='homepage.outstanding-doctor'/></span>
            </div>
            <div className="wrap-button-more">
              <a className="btn-more"><FormattedMessage id='homepage.more-info'/></a>
            </div>

            <Slider {...settings}>
              {arrDoctors && arrDoctors.length>0 && arrDoctors.map((item, index)=>{
                let imageBase64 = ''
                    if(item.image){
     
                      imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                     
                   }
                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`
                return (
              <div className="wrap-pictures-vs-text margin-image-3" key={index}>
                <div   style={{
                      backgroundImage: `url(${imageBase64})`,
                    
                    }} className="img-customize-3" onClick={()=>this.handleViewDetailDoctor(item)}></div>
                <span onClick={()=>this.handleViewDetailDoctor(item)} className="text-image">{language === LANGUAGES.VI ? nameVi : nameEn}</span><br/>
                <span onClick={()=>this.handleViewDetailDoctor(item)} className="text-image">Tiêu hóa-Bệnh viêm gan</span>
              </div>
                )
              })}
              
             
            </Slider>
          </div>
        );
      }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
      loadTopDoctors:()=> dispatch(actions.fetchTopDOctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));