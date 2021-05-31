const { Op } = require("sequelize");
const Dates = require("../../models/Dates");
const Doctors = require("../../models/Doctors");
const Payments = require("../../models/Payments");
const Patients = require("../../models/Patients");
const Receptionists = require("../../models/Receptionists");

Dates.belongsTo(Doctors, { foreingKey: "ID_DOCTOR" });
Dates.belongsTo(Payments, { foreingKey: "ID_PAYMENT" });
Dates.belongsTo(Patients, { foreingKey: "EMAIL" });
Dates.belongsTo(Receptionists, { foreingKey: "ID_RECEPTIONIST" });

const getAllDates = (date) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Dates.findAll({
        include: [
          { model: Doctors, required: true },
          { model: Payments, required: true },
          { model: Patients, required: true },
          { model: Receptionists, required: true },
        ],
        where: {
          [Op.or]: [{ BOOKED_DATE: date || null }],
        },
      });
      return resolve(result);
    } catch (e) {
      console.log("\nError retrieving information: \n", e);
      return reject("\nError retrieving information: \n", e);
    }
  });
};

const isRequestedDoctorAvailable = (doctorID, bookingDate) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Dates.findOne({
        include: [{ model: Doctors, required: true }],
        where: {
          BOOKED_DATE: bookingDate,
          ID_DOCTOR: doctorID,
        },
      });

      if (result) {
        resolve(false);
      } else {
        resolve(true);
      }
    } catch (e) {
      console.log(`Error on doctor availability ${e}`);
      reject("Error on doctor availability");
    }
  });
};

const patientHasDateForSpecifiedDate = (patientEmail, bookingDate) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Dates.findOne({
        include: [{ model: Patients, required: true }],
        where: {
          BOOKED_DATE: bookingDate,
          PATIENT_EMAIL: patientEmail,
        },
      });

      if (result) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      console.log(`Error on doctor availability ${e}`);
      reject("Error on doctor availability");
    }
  });
};

module.exports = {
  getAllDates,
  isRequestedDoctorAvailable,
  patientHasDateForSpecifiedDate,
};
