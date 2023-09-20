import React, { Component } from "react" 
import { connect } from "react-redux" 
import "./ManageDoctor.scss" 
import * as actions from "../../../store/actions" 
import MarkdownIt from "markdown-it" 
import MdEditor from "react-markdown-editor-lite" 
import Select from "react-select" 
import "react-markdown-editor-lite/lib/index.css" 
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils" 
import { getDetailInfoDoctorService } from "../../../services/userService" 
import { FormattedMessage } from "react-intl" 

const mdParser = new MarkdownIt(/* Markdown-it options */) 

class ManageDoctor extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      // save markdown
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      hasOldData: false,

      // save doctor_info
      listPrice: [],
      listPayment: [],
      listClinic: [],
      listProvince: [],
      listSpecialty: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedClinic: "",
      selectedSpecialty: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId:'',
      specialtyId:''
    } 
  }

  componentDidMount() {
    this.props.fetchAllDoctors() 
    this.props.getRequiredDoctorInfoRedux() 
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listDoctorRedux !== this.props.listDoctorRedux) {
      let dataSelect = this.buildDataInputSelect(this.props.listDoctorRedux) 

      this.setState({
        listDoctors: dataSelect,
      }) 
    }
    if (this.props.language !== prevProps.language) {
      let { resPrice, resPayment, resProvince } =
        this.props.allRequiredDoctorInfo 
      let dataSelectPrice =
        this.buildDataInputSelectRequiredDoctorInfoPrice(resPrice) 
      let dataSelectPayment =
        this.buildDataInputSelectRequiredDoctorInfo(resPayment) 
      let dataSelectProvince =
        this.buildDataInputSelectRequiredDoctorInfo(resProvince) 
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      }) 
    }
    if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
      let { resPrice, resPayment, resProvince, resSpecialty , resClinic} =
        this.props.allRequiredDoctorInfo 

      let dataSelectPrice =
        this.buildDataInputSelectRequiredDoctorInfoPrice(resPrice) 
      let dataSelectPayment =
        this.buildDataInputSelectRequiredDoctorInfo(resPayment) 
      let dataSelectProvince =
        this.buildDataInputSelectRequiredDoctorInfo(resProvince) 
        let dataSelectSpecialty =
        this.buildDataInputSelectRequiredDoctorInfoSpecialty(resSpecialty) 
        let dataSelectClinic =
        this.buildDataInputSelectRequiredDoctorInfoSpecialty(resClinic) 

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic
      }) 
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    }) 
  } 
  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state 

    this.props.saveInfoDoctor({
      contentMarkdown: this.state.contentMarkdown,
      contentHTML: this.state.contentHTML,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === false ? CRUD_ACTIONS.CREATE : CRUD_ACTIONS.EDIT,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      // selectedClinic: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
      selectedClinic: this.state.selectedClinic.value,
      selectedSpecialty : this.state.selectedSpecialty.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
     
    }) 
  } 

  handleChangeSelect = async (selectedOption) => {

    this.setState({ selectedOption }) 
    let {listPrice, listPayment, listProvince, listSpecialty, listClinic}=this.state
    let res = await getDetailInfoDoctorService(selectedOption.value) 
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown 
      let addressClinic,
        nameClinic,
        note,
        priceId,
        paymentId,
        provinceId,
        selectedPrice,
        selectedPayment,
        selectedProvince,
        specialtyId,
        clinicId,
        selectedSpecialty,
        selectedClinic = "" 

      
      if (res.data.Doctor_Info) {
        addressClinic = res.data.Doctor_Info.addressClinic 
        nameClinic = res.data.Doctor_Info.nameClinic 
        note = res.data.Doctor_Info.note 
        priceId = res.data.Doctor_Info.priceId 
        paymentId = res.data.Doctor_Info.paymentId 
        provinceId = res.data.Doctor_Info.provinceId 
        specialtyId = res.data.Doctor_Info.specialtyId 
        clinicId = res.data.Doctor_Info.clinicId

         selectedPrice = listPrice.find(item=>{
          return item && item.value === priceId
        })
         selectedPayment = listPayment.find(item=>{
          return item && item.value === paymentId
        })
         selectedProvince = listProvince.find(item=>{
          return item && item.value === provinceId
        })
        selectedSpecialty = listSpecialty.find(item=>{
          return item && item.value === specialtyId
        })
        selectedClinic = listClinic.find(item=>{
          return item && item.value === clinicId
        })
        // paymentId = res.data.Doctor_Info.addressClinic
        // addressClinic = res.data.Doctor_Info.addressClinic
        this.setState({
          contentMarkdown: markdown.contentMarkdown,
          contentHTML: markdown.contentHTML,
          description: markdown.description,
          hasOldData: true,
          addressClinic: addressClinic,
          nameClinic: nameClinic,
          note: note,
          selectedPrice:selectedPrice,
          selectedPayment:selectedPayment,
          selectedProvince:selectedProvince,
          selectedSpecialty:selectedSpecialty,
          selectedClinic:selectedClinic
  
        }) 
      }else{
        this.setState({
          contentMarkdown: markdown.contentMarkdown,
          contentHTML: markdown.contentHTML,
          description: markdown.description,
          hasOldData: true,
          addressClinic: "",
          nameClinic: "",
          note: "",
          selectedPrice:'',
          selectedPayment:'',
          selectedProvince:'',
          selectedSpecialty:'',
          selectedClinic:''
  
        }) 
      }
    
    } else {
      this.setState({
        contentMarkdown: "",
        contentHTML: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
        selectedPrice:'',
        selectedPayment:'',
        selectedProvince:'',
        selectedClinic:''
      }) 
    }
  } 
  handleChangeSelectDoctorInfo = async (selectedOption, name) => {
    let stateName = name.name 
    let stateCopy = { ...this.state } 
    stateCopy[stateName] = selectedOption 

    this.setState({
      ...stateCopy,
    }) 
  } 

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state } 
    stateCopy[id] = event.target.value 
    this.setState({
      ...stateCopy,
    }) 

  } 
  buildDataInputSelect = (data) => {
    let result = [] 
    //  let {language} = this.props
    if (data && data.length > 0) {
      data.map((item, index) => {
        let object = {} 

        let label = `${item.lastName} ${item.firstName}` 
        // let labelEn =`${item.firstName} ${item.lastName}`
        object.label = label 
        object.value = item.id 
        result.push(object) 
      }) 
    }
    return result 
  } 
  buildDataInputSelectRequiredDoctorInfoPrice = (data) => {
    let result = [] 
    let { language } = this.props 
    if (data && data.length > 0) {
      data.map((item, index) => {
        let object = {} 

        let labelVi = `${item.valueVi} VND` 
        let labelEn = `${item.valueEn} USD` 

        // let labelEn =`${item.firstName} ${item.lastName}`
        object.label =
          language === LANGUAGES.VI ? labelVi : (object.label = labelEn) 
        object.value = item.keyMap 
        result.push(object) 
      }) 
    }
    return result 
  } 
  buildDataInputSelectRequiredDoctorInfo = (data) => {
    let result = [] 
    let { language } = this.props 
    if (data && data.length > 0) {
      data.map((item, index) => {
        let object = {} 

        let labelVi = `${item.valueVi} ` 
        let labelEn = `${item.valueEn} ` 

        // let labelEn =`${item.firstName} ${item.lastName}`
        object.label =
          language === LANGUAGES.VI ? labelVi : (object.label = labelEn) 
        object.value = item.keyMap 
        result.push(object) 
      }) 
    }
    return result 
  } 
  buildDataInputSelectRequiredDoctorInfoSpecialty= (data) => {
    let result = [] 

    if (data && data.length > 0) {
      data.map((item, index) => {
        let object = {} 
        object.label = item.name
        object.value = item.id 
        result.push(object) 
      }) 
    }
    return result 
  } 

  render() {
    const {
      selectedOption,
      hasOldData,
      selectedPrice,
      selectedPayment,
      selectedProvince,
      selectedClinic,
      selectedSpecialty
    } = this.state 
    // const options = [
    //     { value: 'chocolate', label: 'chocolate' },
    //     { value: 'chocolate', label: 'chocolate' },
    //     { value: 'chocolate', label: 'chocolate' },

    //   ]

    return (
      <React.Fragment>
        <div className="manage-doctor-wrap">
          <div className="title text-center">
            <FormattedMessage id="admin.manage-doctor.title" />
          </div>
          <div className="wrap-select-textarea">
            <div className="wrap-select-span">
              <span>
                <FormattedMessage id="admin.manage-doctor.choose-doctor" />
              </span>
              <Select
                value={selectedOption}
                onChange={this.handleChangeSelect}
                options={this.state.listDoctors}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.choose-doctor" />
                }
                name={"selectedOption"}
              />
            </div>
            <div className="wrap-textarea-span">
              <span>
                <FormattedMessage id="admin.manage-doctor.description-doctor" />
              </span>
              <textarea
                value={this.state.description}
                onChange={(event) =>
                  this.handleOnChangeText(event, "description")
                }
                rows="4"
                cols="50"
              >
                
              </textarea>
            </div>
          </div>
          <div className="doctor-info row">
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.price" />
              </label>
              <Select
                value={selectedPrice}
                onChange={this.handleChangeSelectDoctorInfo}
                options={this.state.listPrice}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.price" />
                }
                name={"selectedPrice"}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.payment" />
              </label>
              <Select
                value={selectedPayment}
                onChange={this.handleChangeSelectDoctorInfo}
                options={this.state.listPayment}
                name={"selectedPayment"}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.payment" />
                }
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.province" />
              </label>
              <Select
                value={selectedProvince}
                onChange={this.handleChangeSelectDoctorInfo}
                options={this.state.listProvince}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.province" />
                }
                name={"selectedProvince"}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.nameClinic" />
              </label>
              <input
                value={this.state.nameClinic}
                onChange={(event) =>
                  this.handleOnChangeText(event, "nameClinic")
                }
                className="form-control"
              ></input>
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.addressClinic" />
              </label>
              <input
                value={this.state.addressClinic}
                onChange={(event) =>
                  this.handleOnChangeText(event, "addressClinic")
                }
                className="form-control"
              ></input>
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.note" />
              </label>
              <input
                value={this.state.note}
                onChange={(event) => this.handleOnChangeText(event, "note")}
                className="form-control"
              ></input>
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.specialty" />
              </label>
              <Select
                value={selectedSpecialty}
                onChange={this.handleChangeSelectDoctorInfo}
                options={this.state.listSpecialty}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.specialty" />
                }
                name={"selectedSpecialty"}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.clinic" />
              </label>
              <Select
                value={selectedClinic}
                onChange={this.handleChangeSelectDoctorInfo}
                options={this.state.listClinic}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.clinic" />
                }
                name={"selectedClinic"}
              />
            </div>
          </div>
          <MdEditor
            value={this.state.contentMarkdown}
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
          <button
            onClick={() => this.handleSaveContentMarkdown()}
            className={
              hasOldData === false ? "btn-markdown" : "btn-markdown-update"
            }
          >
            {hasOldData === false ? (
              <FormattedMessage id="admin.manage-doctor.add" />
            ) : (
              <FormattedMessage id="admin.manage-doctor.edit" />
            )}
          </button>
        </div>
      </React.Fragment>
    ) 
  }
}

const mapStateToProps = (state) => {
  return {
    listDoctorRedux: state.admin.listDoctor,
    language: state.app.language,
    allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
  } 
} 

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveInfoDoctor: (data) => dispatch(actions.saveInfoDoctor(data)),
    getRequiredDoctorInfoRedux: () => dispatch(actions.getRequiredDoctorInfo()),
  } 
} 

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor) 
