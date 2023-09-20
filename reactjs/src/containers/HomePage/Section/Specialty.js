import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { getAllSpecialtyService } from "../../../services/userService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { FormattedMessage } from "react-intl";
import { withRouter } from 'react-router';

class Specialty extends Component {


  constructor(props) {
    super(props);
    this.state = {
   dataSpecialty:[]
    
    };
  }
  async componentDidMount() {
    let res  = await getAllSpecialtyService()
    if(res && res.errCode===0){
      this.setState({
        dataSpecialty:res.data
      })
    }

    
  }

  handleViewDetailSpecialty=(item)=>{
    this.props.history.push(`/detail-specialty/${item.id}`)
  }


  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 100,
      slidesToShow: 4,
      slidesToScroll: 1,
      
    
    };
    let {dataSpecialty}=this.state

    return (
      <div className="selection-grid">
        <div className="title-selection-grid">
          <span><FormattedMessage id="homepage.specialty"></FormattedMessage></span>
        </div>
        <div className="wrap-button-more">
          <a className="btn-more"><FormattedMessage id="homepage.more-info"></FormattedMessage></a>
        </div>

        <Slider {...settings}>
         
          {dataSpecialty && dataSpecialty.length>0 && dataSpecialty.map((item, index)=>{
                
                return (
              <div className="wrap-pictures-vs-text margin-image-1" key={index} onClick={()=>this.handleViewDetailSpecialty(item)}>
                <div   style={{
                      backgroundImage: `url(${item.image})`,
                    
                    }} className="img-customize-1" onClick={()=>this.handleViewDetailSpecialty(item)}></div>
                <span onClick={()=>this.handleViewDetailSpecialty(item)} className="text-image">{item.name}</span><br/>
                {/* <span onClick={()=>this.handleViewDetailDoctor(item)} className="text-image">Tiêu hóa-Bệnh viêm gan</span> */}
              </div>
                )
              })}
        </Slider>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
