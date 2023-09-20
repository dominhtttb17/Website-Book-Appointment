import React, { Component } from "react";
import { connect } from "react-redux";
import "./HandBook.scss";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

class HandBook extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 100,
      slidesToShow: 2,
      slidesToScroll: 1,


    };

    return (
      <div className="selection-grid">
        <div className="title-selection-grid">
          <span>Cẩm nang</span>
        </div>
        <div className="wrap-button-more">
          <a className="btn-more">Xem thêm</a>
        </div>

        <Slider {...settings}>
          <div className="wrap-pictures-vs-text wrap-pictures-vs-text-flex">
            <div className="img-customize-1"></div>
            <div className="text-selection">Top 7 bệnh viện, phòng khám da liễu uy tín tại Quận Bình Thạnh</div>
          </div>
          <div className="wrap-pictures-vs-text wrap-pictures-vs-text-flex">
            <div className="img-customize-1"></div>
            <div className="text-selection">Top 7 bệnh viện, phòng khám da liễu uy tín tại Quận Bình Thạnh</div>
          </div>
          <div className="wrap-pictures-vs-text wrap-pictures-vs-text-flex">
            <div className="img-customize-1"></div>
            <div className="text-selection">Top 7 bệnh viện, phòng khám da liễu uy tín tại Quận Bình Thạnh</div>
          </div>
          <div className="wrap-pictures-vs-text wrap-pictures-vs-text-flex">
            <div className="img-customize-1"></div>
            <div className="text-selection">Top 7 bệnh viện, phòng khám da liễu uy tín tại Quận Bình Thạnh</div>
          </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);