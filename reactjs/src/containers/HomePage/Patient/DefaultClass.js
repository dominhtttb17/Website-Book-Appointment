import React, { Component, isValidElement } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  
  render() {
   

    return (
     <></>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);