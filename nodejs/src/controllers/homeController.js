import db from "../models/index";
import CRUDservice from "../services/CRUDservice";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();

    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
    //ds
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};
let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};
let postCRUD = async (req, res) => {
  let mess = await CRUDservice.createNewUser(req.body);

  return res.send(req.body);
};
let displayGetCRUD = async (req, res) => {
  let data = await CRUDservice.getAllUser();

  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};
let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDservice.getUserInfoById(userId);

    return res.render("editCRUD.ejs", {
      dataTable: userData,
    });
  } else {
    res.send("co loi 404");
  }
};
let putUpdateCRUD = async (req, res) => {
  let data = req.body;

  let allUsers = await CRUDservice.putUpdateCRUD(data);

  return res.render("displayCRUD.ejs", {
    dataTable: allUsers,
  });
};
let deleteCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    await CRUDservice.deleteCRUD(userId);
    return res.send("xoa ok vcl");
  } else {
    return res.send("ko  tim thay");
  }
};

// object: {
//     key: '',
//     value: '',
// }
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putUpdateCRUD: putUpdateCRUD,
  deleteCRUD: deleteCRUD,
};
