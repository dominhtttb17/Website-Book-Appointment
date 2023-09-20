import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions" 





class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
     userRedux:[]
    };
  }
  async componentDidMount() {
    await this.props.fetchUserRedux()
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
     
      this.setState({
        userRedux: this.props.listUsers
       
      }) 
    }
  }
  handleDeleteUser=(user)=>{
    this.props.deleteAUserRedux(user.id)
  }
  handleEditUser=(user)=>{
   this.props.handleEditUserFromParent(user)
  }

  render() {
   
    let arrUser = this.state.userRedux
    return (
      <React.Fragment>
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
                      
                            {arrUser && arrUser.length>0 && arrUser.map((item,index)=>{
                                return(
                                    <>
                                      < tr key={index}> 
                         <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        
                        <td>
                          <a onClick={()=> this.handleEditUser(item)} className="btn-edit">
                            <i className="fas fa-pencil-alt"></i>
                          </a>
                          <a onClick={()=> this.handleDeleteUser(item)}  className="btn-delete">
                            <i className="fas fa-trash-alt"></i>
                          </a>
                        </td>
                        </tr>
                        </>
                                )
                              }  )}
                        
                      
            </tbody>
          </table>
        </div>
         </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux:() => dispatch(actions.fetchAllUsersStart()),
    deleteAUserRedux: (id)=> dispatch(actions.deleteAUser(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
