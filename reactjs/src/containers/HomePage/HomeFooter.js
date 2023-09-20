import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeFooter.scss";

import "slick-carousel/slick/slick.css";

class HomeFooter extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 100,
      slidesToShow: 2,
      slidesToScroll: 1,


    };

    return (
     <div className="home-footer">
        <p>&copy; 2023 Huyy Hoàng, More information, please visit my facebook <a target="_blank" href="https://www.facebook.com/daoquanghuyhoang">Click here</a></p> 
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);