import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import './MedicalFacility.scss'
import { getAllClinicService } from '../../../services/userService';
import { withRouter } from 'react-router';
class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
    dataClinics:[]
    
    };
  }
  async componentDidMount() {
    let res = await getAllClinicService()
   if(res && res.errCode ===0 ){
    this.setState({
      dataClinics: res.data ? res.data:[]
    })
   }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleViewDetailClinic=(clinic)=>{
    this.props.history.push(`/detail-clinic/${clinic.id}`)
  }
    render() {
        let settings = {
          dots: false,
          infinite: false,
          speed: 100,
          slidesToShow: 4,
          slidesToScroll: 1,
         
        
        };
        let {dataClinics} = this.state
    
        return (
          <div className="selection-grid">
            <div className="title-selection-grid">
              <span>Cơ sở y tế nổi bật</span>
            </div>
            <div className="wrap-button-more">
              <a className="btn-more">Xem thêm</a>
            </div>
    
            <Slider {...settings}>
             
              {dataClinics && dataClinics.length>0 && dataClinics.map((item, index)=>{
             
                    
              
                return (
              <div className="wrap-pictures-vs-text margin-image-2" key={index}>
                <div   style={{
                      backgroundImage: `url(${item.image})`,
                    
                    }} className="img-customize-2" onClick={()=>this.handleViewDetailClinic(item)}></div>
                <span onClick={()=>this.handleViewDetailClinic(item)} className="text-image">{item.name}</span><br/>
              
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
