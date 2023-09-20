import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });
      resolve("ok them thanh cong");
    } catch (error) {
      reject(error);
    }
  });
};
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashUserPassword = await bcrypt.hashSync(password, salt);
      resolve(hashUserPassword);
    } catch (error) {
      reject(error);
    }
  });
};
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        where: { id: userId },
        raw: true,
      });
      if (users) {
        resolve(users);
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
};
let putUpdateCRUD = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findOne({
        where: { id: data.id },
      });
      if (users) {
        // users.firstName = data.firstName;
        // users.lastName = data.lastName;
        // users.address = data.address;
        // users.phoneNumber = data.phoneNumber;
        // if (data.gender == "1") {
        //   users.gender = true;
        // } else {
        //   users.gender = false;
        // }
        // users.roleId = data.roleId;

        // await users.save();
        // resolve();
        await users.update({
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender === "1" ? true : false,

          roleId: data.roleId,
        });
        await users.save();
        let allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteCRUD = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findOne({
        where: { id: userId },
      });
      if (users) {
        await users.destroy();
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  putUpdateCRUD: putUpdateCRUD,
  deleteCRUD: deleteCRUD,
};
