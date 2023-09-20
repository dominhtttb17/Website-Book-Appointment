import React, { Component, isValidElement } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import './ManageClinic.scss'
// import "react-markdown-editor-lite/lib/index.css" 
import { createClinicService } from "../../../services/userService";
import { toast } from "react-toastify";
import MarkdownIt from "markdown-it" 
import MdEditor from "react-markdown-editor-lite" 
import { CommonUtils } from "../../../utils";
const mdParser = new MarkdownIt(/* Markdown-it options */) 


class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
    name:'',
    imageBase64:'' ,
    contentMarkdown: '',
    contentHTML: '',
    address:''
    
    };
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeInput = (event,id)=>{
      let stateCopy = {...this.state}
      stateCopy[id]=event.target.value
      this.setState({
        ...stateCopy
      })
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
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
  handleSaveNewClinic= async()=>{
      let res = await createClinicService(this.state)
      if ( res && res.errCode ===0){
            toast.success("Create Clinic Success!")
            this.setState({
              name:'',
              imageBase64:'' ,
              contentMarkdown: '',
              contentHTML: '',
              address:''
            })
      }else{
        toast.error("Create Specialty Error!")
      }
  }
  render() {
   

    return (
     <>
     
     <div className="manage-specialty-container">
        <div className="ms-title">Quan ly phong kham</div>
        
        <div className="add-new-specialty row"> 
        <div className="col-6 form-group">
            <label>Ten phong kham</label>
            <input className="form-control" value={this.state.name} onChange={(event)=>this.handleOnChangeInput(event ,'name')}></input>
        </div>
        <div className="col-6 form-group">
            <label>Anh phong kham</label>
            <input   onChange={(event) => this.handleOnChangeImage(event)} type="file" className="form-control-file"></input>
        </div>
        <div className="col-6 form-group">
        <label>Dia chi phong kham</label>
            <input className="form-control" value={this.state.address} onChange={(event)=>this.handleOnChangeInput(event ,'address')}></input>
        </div>
        <div className="col-12">
        <MdEditor
            value={this.state.contentMarkdown}
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <div className="col-12">
            <button onClick={()=>this.handleSaveNewClinic()} className="btn-save-specialty">Save</button>
            
        </div>
       
          
          </div>
     
     </div>
     
     
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
