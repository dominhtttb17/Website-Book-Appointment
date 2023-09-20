import React, { Component, isValidElement } from "react" 
import { FormattedMessage } from "react-intl" 
import { connect } from "react-redux" 
import "./UserRedux.scss" 
import { getAllCodeService } from "../../../services/userService" 
import { LANGUAGES ,CRUD_ACTIONS , CommonUtils} from "../../../utils" 
import * as actions from "../../../store/actions" 
import Lightbox from "react-image-lightbox" 
import "react-image-lightbox/style.css" 
import TableManageUser from "./TableManageUser"


class UserRedux extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,
         userEditId:'',
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      action:""
    } 
  }
  async componentDidMount() {
    this.props.getGenderStart() 
    this.props.getPositionStart() 
    this.props.getRoleStart() 
    

    // try {
    //    let res = await getAllCodeService('gender')
    //    if(res && res.errCode ===0 ){
    //       this.setState({
    //          genderArr:res.data
    //       })
    //    }
    //    console.log(res)
    // } catch (error) {
    //    console.log(error)
    // }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap: ''
      }) 
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
     
      let arrPositions = this.props.positionRedux
      this.setState({
         positionArr: arrPositions,
        position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap: ''
      }) 
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
     
      let arrRoles = this.props.roleRedux
      this.setState({
         roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap: ''
      }) 
    }
    if(prevProps.listUsers !== this.props.listUsers){
      let arrRoles = this.props.roleRedux
      let arrPositions = this.props.positionRedux
      let arrGenders = this.props.genderRedux
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap: '',
        position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap: '',
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap: '',
        avatar: "",
        action:CRUD_ACTIONS.CREATE,
        previewImgURL: "",
       
      })
    }
  }
  handleOnChangeImage = async(event) => {
    let data = event.target.files 
    let file = data[0] 

    if (file) {
      
      let base64 =await CommonUtils.getBase64(file)
    
      let objectUrl = URL.createObjectURL(file) 

      this.setState({
        previewImgURL: objectUrl,
        avatar:base64
      }) 
    }else{
      console.log('check image: ngom roi')
    }
  } 
  OpenPreviewImage = () => {
    if (!this.state.previewImgURL) return 
    this.setState({
      isOpen: true,
    }) 
  } 
  handleSaveUser = () => {
  let isValid= this.checkValidateInput()
  if(isValid === false)return

  let {action}=this.state
  if(action===CRUD_ACTIONS.CREATE){
    this.props.createNewUser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName:this.state.lastName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
      roleId:this.state.role,
      positionId:this.state.position,
      avatar: this.state.avatar
   
     })
     this.props.fetchUserRedux()
    //  setTimeout(() => {
      
    //  }, 1000);
   
  }else{
       this.props.editAUserRedux({
      
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName:this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId:this.state.role,
        positionId:this.state.position,
        avatar: this.state.avatar,
        
       })
  }
  
  }
  onChangeInput = (event,id) => {

   let copyState ={...this.state}
   copyState[id] = event.target.value
   this.setState({
      ...copyState
   })
}
   checkValidateInput =()=>{
     let isValid = true
      let arrCheck = [ 'email',
         'password',
         'firstName',
         'lastName',
         'phoneNumber',
         'address',
         ]
         for(let i=0 ;i<arrCheck.length ;i++){
            if(!this.state[arrCheck[i]]){
               isValid = false
               alert('This input is required: ' + arrCheck[i])
               break
            }
         }
         return isValid
   }
    // email:'',
    // password:'',
    // firstName:'',
    // lastName:'',
    // phoneNumber:'',
    // address:'',
    // gender:'',
    // position:'',
    // role:'',
    // avatar:''
  handleEditUserFromParent=(user)=>{

    let imageBase64=''
    if(user.image){
     
       imageBase64 = new Buffer(user.image, 'base64').toString('binary')
      
    }
   
    this.setState({
      email: user.email,
      password: 'Hardcode',
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber:user.phoneNumber,
      address: user.address,
      gender:user.gender,
      position: user.positionId,
      role: user.roleId,
      avatar: '',
      previewImgURL: imageBase64,
      action:CRUD_ACTIONS.EDIT,
      userEditId: user.id
    },()=>{
      console.log(this.state)
    })
    
  }
  render() {
    let genders = this.state.genderArr 
    let positions = this.state.positionArr 
    let roles = this.state.roleArr 
    let language = this.props.language 
    let isLoadingGender = this.props.isLoadingGender 
   
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
  
    } = this.state 
    return (
      <div className="user-redux-container">
        <div>{isLoadingGender === true ? "Loading gender " : ""}</div>
        <div className="user-redux-body user-redux-body1">
          <div className="container">
            <div className="text">
              <FormattedMessage id="manage-user.add" />
            </div>
            <form action="#">
              <div className="form-row">
                <div className="input-data">
                  <input hidden={this.state.action === CRUD_ACTIONS.EDIT ? true : false} value={email} onChange={(event)=>this.onChangeInput(event,'email')} type="text" required />
                  <div className="underline"></div>
                  <label htmlFor="">
                 
                    <FormattedMessage id="manage-user.email" />
                  </label>
                </div>
                <div className="input-data">
                  <input hidden={this.state.action === CRUD_ACTIONS.EDIT ? true : false} value={password} onChange={(event)=>this.onChangeInput(event,'password')} type="text" required />
                  <div className="underline"></div>
                  <label htmlFor="">
                    <FormattedMessage id="manage-user.password" />
                  </label>
                </div>
              </div>
              <div className="form-row">
                <div className="input-data">
                  <input value={firstName} onChange={(event)=>this.onChangeInput(event,'firstName')} type="text" required />
                  <div className="underline"></div>
                  <label htmlFor="">
                   
                    <FormattedMessage id="manage-user.first-name" />
                  </label>
                </div>
                <div className="input-data">
                  <input value={lastName} onChange={(event)=>this.onChangeInput(event,'lastName')} type="text" required />
                  <div className="underline"></div>
                  <label htmlFor="">
                    <FormattedMessage id="manage-user.last-name" />
                  </label>
                </div>
              </div>
              <div className="form-row">
                <div className="input-data">
                  <input value={phoneNumber} onChange={(event)=>this.onChangeInput(event,'phoneNumber')} type="text" required />
                  <div className="underline"></div>
                  <label htmlFor="">
                    <FormattedMessage id="manage-user.phone-number" />
                  </label>
                </div>
                <div className="input-data">
                  <input
                    onChange={(event) => this.handleOnChangeImage(event)}
                    id=""
                    className="text-type-file"
                    type="file"
                  />

                  <label htmlFor="">
                    <FormattedMessage id="manage-user.avatar" />
                  </label>
                  <div
                    onClick={() => this.OpenPreviewImage()}
                    style={{
                      backgroundImage: `url(${this.state.previewImgURL})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="khung-anh"
                  ></div>
                </div>
              </div>
              <div className="form-row">
                <div className="input-data textarea custom123">
                  <textarea value={address} onChange={(event)=>this.onChangeInput(event,'address')} rows="8" cols="80" required></textarea>
                  <br />
                  <div className="underline"></div>
                  <label htmlFor="">
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <br />
                  <div className="form-row submit-btn">
                    <div className="input-data">
                      <div className="inner"></div>
                      <input
                        onClick={() => this.handleSaveUser()}
                        className="button-add"
                        type="button"
                        value={this.state.action===CRUD_ACTIONS.EDIT ? "Update" :"Add" }
                      />
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="boc3">
                  <div className="boc1">
                    <label>
                      <FormattedMessage id="manage-user.gender" />
                    </label>
                    <select value={gender} onChange={(event)=>this.onChangeInput(event,'gender')}>
                      {genders &&
                        genders.length > 0 &&
                        genders.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          ) 
                        })}
                    </select>
                  </div>

                  <div className="boc1">
                    <label>
                      <FormattedMessage id="manage-user.position" />
                    </label>
                    <select value={position} onChange={(event)=>this.onChangeInput(event,'position')}>
                      {positions &&
                        positions.length > 0 &&
                        positions.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          ) 
                        })}
                    </select>
                  </div>

                  <div className="boc1">
                    <label>
                      <FormattedMessage id="manage-user.role" />
                    </label>
                    <select value={role}  onChange={(event)=>this.onChangeInput(event,'role')}>
                      {roles &&
                        roles.length > 0 &&
                        roles.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          ) 
                        })}
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <TableManageUser handleEditUserFromParent={this.handleEditUserFromParent} 
                        action={this.state.action}/>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}

      </div>
    ) 
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoadingGender: state.admin.isLoadingGender,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    listUsers: state.admin.users,

    
   
  } 
} 

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux:() => dispatch(actions.fetchAllUsersStart()),
    editAUserRedux:(data)=> dispatch(actions.editAUser(data))
    // processLogout:()=>dispatch(actions.processLogout()),
    // changeLanguageAppRedux:(language)=>{ dispatch(actions.changeLanguageApp(language))
  } 
} 

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux) 
