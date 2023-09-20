import bcrypt from "bcryptjs";
import db from "../models/index";
import { response } from "express";

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
}
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password","firstName","lastName","id"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);

          if (check) {
            userData.errCode = 0;
            userData.errMessage = `ok`;
         
            delete user.password;
     
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = `Sai Password`;
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's isn't not found`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your's Email isn't exist in your system. Plz try other email`;
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });

      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUsers = (userId)=>{
return new Promise(async(resolve, reject)=>{
    try {
        let users = ''
        if(userId === 'ALL'){
            users = await db.User.findAll({
                attributes:{
                    exclude:['password']
                }

            })
        }
        if(userId && userId !=='ALL'){
            users = await db.User.findOne({
                where :{id : userId},
                attributes:{
                  exclude:['password']
              }
            })
        }
        resolve(users)
    } catch (error) {
        reject(error)
    }
})
}
let createNewUser=(data)=>{
  return new Promise(async(resolve, reject)=>{
try {
  let check = await checkUserEmail(data.email)
  if(check==true){
    resolve({
      errCode:1,
      errMessage: 'Email nay da ton tai'
    })
  }else{
  let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender ,
        roleId: data.roleId,
        positionId: data.positionId,
        image: data.avatar
      });
      resolve({
        errCode : 0,
        errMessage: 'ok'
      });
    }
} catch (error) {
  reject(error)
}
  })
}

let deleteUser = (id)=>{
  return new Promise(async(resolve,reject)=>{
    let user = await db.User.findOne({
      where:{id:id}
    })
    if(!user){
      resolve({
        errCode:2,
        errMessage:'The user is not exist'
      })
    }else{
      await db.User.destroy({
        where:{id:id}
      })
      resolve({
        errCode:0,
        errMessage:'xoa ok'
      })
    }
  })
}
let updateUserData= (data)=>{
  return new Promise(async(resolve,reject)=>{
   
    try {
      if(!data.id || !data.positionId || !data.gender || !data.roleId){
        resolve({
          errCode:2,
          errMessage:'Missing required parameters'
        })
      }
      let users = await db.User.findOne({
        where: { id: data.id },
        raw:false
      });
      if (users) {
       users.firstName = data.firstName
       users.lastName = data.lastName
       users.address = data.address
       users.phoneNumber = data.phoneNumber
       users.gender = data.gender
       users.roleId = data.roleId
       users.positionId = data.positionId
       if(data.avatar){
        users.image = data.avatar
       }
      
       
       await users.save()
        // await db.User.save({
        //   firstName: data.firstName,
        //   lastName: data.lastName,
        //   address: data.address,
        //   phoneNumber: data.phoneNumber,
        //   gender: data.gender === "1" ? true : false,
        //   roleId: data.roleId,
        // });
       resolve({
        errCode:0,
        errMessage:'update ok'
       })
      } else {
        resolve({
          errCode:1,
          errMessage:'User not found'
         })
      }
    } catch (error) {
      reject(error)
    }
  })
}
let getAllCodeService =(typeInput)=>{
  return new Promise( async(resolve,reject)=>{
       try {
        if(!typeInput){
          resolve({
            errCode:1,
            errMessage:'Missing required parameters'
          })
         
        }else{
          let res ={}
          let allcode = await db.Allcode.findAll({
            where:{type:typeInput}
          })
          res.errCode = 0
          res.data = allcode
          resolve(res)
        }
       
       } catch (error) {
        reject(error)
       }
  })
}

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers:getAllUsers,
  createNewUser:createNewUser,
  deleteUser:deleteUser,
  updateUserData:updateUserData,
  getAllCodeService:getAllCodeService
};
