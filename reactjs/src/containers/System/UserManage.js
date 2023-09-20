import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers,createNewUserService, deleteUser ,editUserService} from "../../services/userService";
import ModalUser from "./ModalUser";
import { emitter } from "../../utils/emitter";
import ModalEditUser from "./ModalEditUser";


class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser:false,
      userEdit: {}
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact()
  }

   getAllUsersFromReact =async()=>{
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  }
  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  toggleUserEditModal= () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  createNewUserService= async(data)=>{
    try {
    let response= await createNewUserService(data)
   if(response && response.errCode !==0){
alert(response.errMessage)
   }else{
    await this.getAllUsersFromReact()
    this.setState({
      isOpenModalUser:false
    })
    emitter.emit('EVENT_CLEAR_MODAL_DATA',{'id':'your id'})
   }
    } catch (error) {
      console.log(error)
    }
   
  }
  handleDeleteUser=async(item)=>{
    
    try {
let res= await deleteUser(item.id)
if(res && res.errCode ===0){
  await this.getAllUsersFromReact()
}else{
  alert(res.errMessage)
}


    } catch (error) {
      console.log(error)
    }
  }
  handleEditUser = (user)=>{
this.setState({
  isOpenModalEditUser:true,
  userEdit: user
})
  }
  handleUpdateUser = async(user)=>{
       try {
        let res =  await editUserService(user)
        if(res && res.errCode ===0){
          this.setState({
            isOpenModalEditUser:false
          })
          await this.getAllUsersFromReact()
        }else{
          alert(res.errCode)
        }
       } catch (error) {
        console.log(error)
       }
  }

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">

        <ModalUser
        isOpen={this.state.isOpenModalUser}
             toggleFromParent={this.toggleUserModal}
          createNewUserService={this.createNewUserService}
        />
        {
          this.state.isOpenModalEditUser &&
      
        <ModalEditUser
          isOpen={this.state.isOpenModalEditUser}
          
          toggleFromParent={this.toggleUserEditModal}
          currentUser = {this.state.userEdit}
          updateUser = {this.handleUpdateUser}
          // createNewUserService={this.createNewUserService}
        />  }
        <div className="title text-center">Anh Hoang</div>
        <div className="btn-add1">
          <button
            onClick={() => this.handleAddNewUser()}
            className="btn- btn-primary"
          >
            <i className="fas fa-plus-circle"></i> Add new User
          </button>
        </div>
        <div className="users-table">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>Email</th>

                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <>
                      {" "}
                      <tr>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>
                          <a onClick={()=>this.handleEditUser(item)} className="btn-edit">
                            <i className="fas fa-pencil-alt"></i>
                          </a>
                          <a onClick={()=>this.handleDeleteUser(item)} className="btn-delete">
                            <i className="fas fa-trash-alt"></i>
                          </a>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
