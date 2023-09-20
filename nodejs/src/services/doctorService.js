import db from "../models/index";
require("dotenv").config();
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
import _ from "lodash";
import emailService from "../services/emailService"
let getTopDoctorHome = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limit,
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        where: {
          roleId: "R2",
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });

      resolve({
        errCode: 0,

        data: users,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getAllDoctorService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: {
          roleId: "R2",
        },
        attributes: {
          exclude: ["password", "image"],
        },
      });

      resolve({
        errCode: 0,

        data: doctors,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let checkRequiredFields = (inputData) => {
  let arrFields = [
    "doctorId",
    "contentHTML",
    "contentMarkdown",
    "action",
    "selectedPrice",
    "selectedPayment",
    "selectedProvince",
    "selectedSpecialty",
    "selectedClinic",
    "nameClinic",
    "addressClinic",
    "note",
  ];
  let isValid = true;
  let element = "";
  for (let i = 0; i < arrFields.length; i++) {
    if (!inputData[arrFields[i]]) {
      isValid = false;
      element = arrFields[i];
      break;
    }
  }
  return {
    isValid,
    element,
  };
};
let saveInfoDoctorService = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkObj = checkRequiredFields(inputData);
      if (checkObj.isValid === false) {
        resolve({
          errCode: 1,

          errMessage: `Missing parameter: ${checkObj.element}`,
        });
      } else {
        if (inputData.action === "CREATE") {
          await db.Markdown.create({
            contentHTML: inputData.contentHTML,
            contentMarkdown: inputData.contentMarkdown,
            description: inputData.description,
            doctorId: inputData.doctorId,
          });
        } else if (inputData.action === "EDIT") {
          let doctorMarkdown = await db.Markdown.findOne({
            where: {
              doctorId: inputData.doctorId,
            },
            raw: false,
          });
          if (doctorMarkdown) {
            doctorMarkdown.contentHTML = inputData.contentHTML;
            doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
            doctorMarkdown.description = inputData.description;
            // doctorMarkdown.updateAt = new Date()
            await doctorMarkdown.save();
          }
        }

        // table doctor_info

        let doctorInfo = await db.Doctor_Info.findOne({
          where: {
            doctorId: inputData.doctorId,
          },
          raw: false,
        });
        if (doctorInfo) {
          //update

          doctorInfo.priceId = inputData.selectedPrice;
          doctorInfo.paymentId = inputData.selectedPayment;
          doctorInfo.provinceId = inputData.selectedProvince;
          doctorInfo.specialtyId = inputData.selectedSpecialty;
          doctorInfo.clinicId = inputData.selectedClinic;
          doctorInfo.addressClinic = inputData.addressClinic;
          doctorInfo.nameClinic = inputData.nameClinic;
          doctorInfo.note = inputData.note;

          await doctorInfo.save();
        } else {
          await db.Doctor_Info.create({
            doctorId: inputData.doctorId,
            priceId: inputData.selectedPrice,
            paymentId: inputData.selectedPayment,
            provinceId: inputData.selectedProvince,
            specialtyId: inputData.selectedSpecialty,
            clinicId: inputData.selectedClinic,
            addressClinic: inputData.addressClinic,
            nameClinic: inputData.nameClinic,
            note: inputData.note,
          });
        }
        resolve({
          errCode: 0,

          errMessage: "Save info doctor success",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getDetailDoctorService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let data = await db.User.findOne({
          where: {
            id: id,
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Doctor_Info,
              attributes: {
                exclude: ["id", "doctorId"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          attributes: {
            exclude: ["password"],
          },
          raw: false,
          nest: true,
        });

        if (data && data.image) {
          data.image = Buffer.from(data.image, "base64").toString("binary");
        }
        if (!data) data = [];

        resolve({
          errCode: 0,
          errMessage: "ok",
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let bulkCreateScheduleService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      if (!data.arrSchedule || !data.doctorId || !data.formatDate) {
        resolve({
          errCode: 1,
          errMessage: "missing required parameter!",
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = MAX_NUMBER_SCHEDULE;
            return item;
          });
        }
        // get all existing data

        let existing = await db.Schedule.findAll({
          where: { doctorId: data.doctorId, date: data.formatDate },
          attributes: ["timeType", "date", "doctorId", "maxNumber"],
          raw: true,
        });
        // convert date
        // if (existing && existing.length > 0) {
        //   existing = existing.map((item) => {
        //     item.date = new Date(item.date).getTime()
        //     return item
        //   })
        // }
        //compare different
        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && +a.date === +b.date;
        });
        //create data
        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }
        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getScheduleByDateService = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing requiter parameters!",
        });
      } else {
        let data = await db.Schedule.findAll({
          where: {
            doctorId: doctorId,
            date: date,
          },
          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.User,
              as: "doctorData",
              attributes: ["firstName", "lastName"],
            },
          ],
          nest: true,
          raw: false,
        });

        if (!data) data = [];
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getExtraInfoDoctorByIdService = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing requiter parameters!",
        });
      } else {
        let data = await db.Doctor_Info.findOne({
          where: {
            doctorId: doctorId,
          },

          attributes: {
            exclude: ["id", "doctorId"],
          },
          include: [
            {
              model: db.Allcode,
              as: "priceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "paymentTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "provinceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
          ],

          nest: true,
          raw: false,
        });

        if (!data) data = [];
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getProfileDoctorByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing requiter parameters!",
        });
      } else {
        let data = await db.User.findOne({
          where: {
            id: inputId,
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },

            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Doctor_Info,
              attributes: {
                exclude: ["id", "doctorId"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          attributes: {
            exclude: ["password"],
          },
          raw: false,
          nest: true,
        });

        if (data && data.image) {
          data.image = Buffer.from(data.image, "base64").toString("binary");
        }
        if (!data) data = [];

        resolve({
          errCode: 0,
          errMessage: "ok",
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getPatientForDoctorService = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing requiter parameters!",
        });
      } else {
        let data = await db.Booking.findAll({
          where: {
            statusId: "S2",
            date: date,
          },
          include: [
            {
              model: db.User,
              as: "patientData",
              attributes: [
                "email",
                "firstName",
                "address",
                "gender",
                "phoneNumber",
              ],
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["valueVi", "valueEn"],
                },
              ],
            },
            {
              model: db.Allcode,
              as: "timeTypeDataPatient",
              attributes: ["valueVi", "valueEn"],
            },
          ],

          raw: false,
          nest: true,
        });

        if (!data) data = [];

        resolve({
          errCode: 0,
          errMessage: "ok",
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
}

let sendRemedyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorId || !data.patientId ||!data.timeType || !data.imageBase64)  {
        resolve({
          errCode: 1,
          errMessage: "Missing requiter parameters!",
        });
      } else {
       let appointment = await db.Booking.findOne({
        where:{
          doctorId:data.doctorId,
          patientId:data.patientId,
          timeType:data.timeType,
          statusId:'S2'
        },
        raw:false
       })
       if(appointment){
        appointment.statusId='S3'
        await appointment.save()
       }
         

       await emailService.sendAttachments(data)

        resolve({
          errCode: 0,
          errMessage: "ok",
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctorService: getAllDoctorService,
  saveInfoDoctorService: saveInfoDoctorService,
  getDetailDoctorService: getDetailDoctorService,
  bulkCreateScheduleService: bulkCreateScheduleService,
  getScheduleByDateService: getScheduleByDateService,
  getExtraInfoDoctorByIdService: getExtraInfoDoctorByIdService,
  getProfileDoctorByIdService: getProfileDoctorByIdService,
  getPatientForDoctorService: getPatientForDoctorService,
  sendRemedyService:sendRemedyService
};
