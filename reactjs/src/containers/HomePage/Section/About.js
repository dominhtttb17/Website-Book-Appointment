import React, { Component } from "react";
import { connect } from "react-redux";
import "./About.scss";

import "slick-carousel/slick/slick.css";

class About extends Component {
  render() {
 

    return (
      <div className="about-container">
        <div className="about-grid">
          <div className="about-title">
            <span>Truyền thông nói về BookingCare</span>
          </div>
          <div className="about-list-video-wrap">
            <div className="about-video">
              <iframe
                width="560"
                height="262"
                src="https://www.youtube.com/embed/OASGscJQXp0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="about-list">
              <ul>
                <li>
                  <a
                    target="_blank"
                    title="Báo sức khỏe đời sống nói về BookingCare"
                    href="https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-n153232.html"
                  >
                    <i
                      className="truyenthong-bt truyenthong-suckhoedoisong luoi-tai"
                    
                    ></i>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    title="Báo sức khỏe đời sống nói về BookingCare"
                    href="https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-n153232.html"
                  >
                    <i
                      className="truyenthong-bt truyenthong-suckhoedoisong luoi-tai"
                    
                    ></i>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    title="Báo sức khỏe đời sống nói về BookingCare"
                    href="https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-n153232.html"
                  >
                    <i
                      className="truyenthong-bt truyenthong-suckhoedoisong luoi-tai"
                    
                    ></i>
                  </a>
                </li>
              </ul>
              
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
