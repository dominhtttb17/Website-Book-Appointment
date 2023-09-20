import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash'
import { Button, Modal,  ModalBody, } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalEditUser extends Component {

  constructor(props){
    super(props)
    this.state = {
        id:'',
      email:'',
      password:'',
      firstName:'',
      lastName:'',
      address:'',
      phoneNumber:'',
      // gender:'',
      // roleId:'',
      

    }
    
   }


    componentDidMount() {
        let user = this.props.currentUser
        if(user && !_.isEmpty(user)){
            this.setState({
                id:user.id,
                email:user.email,
                password:'pass',
                firstName:user.firstName,
                lastName:user.lastName,
                address:user.address,
                phoneNumber:user.phoneNumber,
            })
        }

    }

    toggle=()=>{
this.props.toggleFromParent()
    }
    handleOnChangeInput=(event,id)=>{
     
      let copyState = {...this.state}
      copyState[id] = event.target.value
      this.setState({
        ...copyState
      })
    }
    checkValidateInput=()=>{
      let isValid = true
      let arrInput =['email','password','firstName','lastName','address','phoneNumber']
      for(let i=0; i<arrInput.length;i++){
            if(!this.state[arrInput[i]]){
              isValid = false
              alert('Missing!' + arrInput[i])
              break
            }
      }
      return isValid
    }
    handleUpdateUser=(user)=>{
    let isValid = this.checkValidateInput()
    if(isValid === true){
     this.props.updateUser(this.state)
    }
    
    }
    render() {
    
        return (
            <Modal
             isOpen={this.props.isOpen}
              toggle={()=>{this.toggle()}} 
              className={'modal-user-container'}
              size ='lg'
              
              >
                
          
            <ModalBody>
      
              <div className='body1'>
              <div className='custom11'>EDIT USER</div>
                <div className='custom11'>
             <div  className="form__group field">
               <input disabled value={this.state.email} type="input" className="form__field" placeholder="Email"  onChange={(event)=>this.handleOnChangeInput(event,'email')} />
               <label htmlFor="email" className="form__label">Email</label>
             </div>
             <div  className="form__group field">
               <input disabled value={this.state.password} type="input" className="form__field" placeholder="Password"  onChange={(event)=>this.handleOnChangeInput(event,'password')} />
               <label htmlFor="password" className="form__label">Password</label>
             </div>
             </div>
             <div className='custom11'>
             <div className="form__group field">
               <input value={this.state.firstName} type="input" className="form__field" placeholder="First Name"   onChange={(event)=>this.handleOnChangeInput(event,'firstName')} />
               <label htmlFor="firstName" className="form__label">First Name</label>
             </div>
             <div className="form__group field">
               <input value={this.state.lastName} type="input" className="form__field" placeholder="Last Name"  onChange={(event)=>this.handleOnChangeInput(event,'lastName')} />
               <label htmlFor="lastName" className="form__label">Last Name</label>
             </div>
             </div>
             <div className='custom11'>
             <div className="form__group field form__group--full">
               <input value={this.state.address} type="input" className="form__field" placeholder="Address"   onChange={(event)=>this.handleOnChangeInput(event,'address')} />
               <label htmlFor="address" className="form__label">Address</label>
             </div>
           
             </div>



             <div className='custom11'>
             <div className="form__group field ">
               <input value={this.state.phoneNumber} type="input" className="form__field" placeholder="Phone Number"   onChange={(event)=>this.handleOnChangeInput(event,'phoneNumber')} />
               <label htmlFor="phoneNumber" className="form__label">Phone Number</label>
             </div>
             {/* <div className="form__group field ">
              <div className='select-50'>
                <div className='select-sex'>
                <label htmlFor="gender" className="sex-label">Sex</label>
                <select id="gender" onChange={(event)=>this.handleOnChangeInput(event,'gender')}  className="form-control1">
                  <option  value={this.state.gender}>Male</option>
                  <option value={this.state.gender}>Female</option>
                </select>
                </div>
                <div className='select-sex'>
                <label htmlFor="roleId" className="sex-label">Role</label>
                <select id="roleId" onChange={(event)=>this.handleOnChangeInput(event,'roleId')} value={this.state.roleId} className="form-control1">
                   <option  value={this.state.roleId}>Admin</option>
                    <option value={this.state.roleId}>Doctor</option>
                    <option value={this.state.roleId}>Patient</option>
                </select>
                </div>
                </div>
                </div> */}

             </div>
             <div className='custom11'>
              <button onClick={()=>{this.handleUpdateUser()}} className='btn btn-success'>Update</button>
             </div>
              </div>
           
         
   
             
            </ModalBody>
           
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);

