const conn = require("../../config/sqlconn");
const { Op, QueryTypes } = require("sequelize");
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
        attributes: ["ID_DATE"],
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

const getAllAvailableDoctors = (bookingDate, speciality) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await conn.query(
        `SELECT "DOCTORS"."FIRST_NAME", "DOCTORS"."LAST_NAME", "DOCTORS"."SPECIALITY", "DOCTORS"."EMAIL", "DOCTORS"."PHONE" FROM "T_DATES" AS "DATES" INNER JOIN "T_DOCTORS" AS "DOCTORS" ON "DATES"."ID_DOCTOR" = "DOCTORS"."ID_DOCTOR" WHERE "DOCTORS"."SPECIALITY" = :speciality AND NOT "DATES"."BOOKED_DATE" = :bookingDate;`,
        {
          replacements: {
            bookingDate,
            speciality,
          },
          type: QueryTypes.SELECT,
        }
      );
      if (result) {
        resolve(result);
      } else {
        resolve(false);
      }
    } catch (e) {
      console.log(`Error on get all doctors availability ${e}`);
      reject("Error on get all doctors availability");
    }
  });
};

module.exports = {
  getAllDates,
  isRequestedDoctorAvailable,
  patientHasDateForSpecifiedDate,
  getAllAvailableDoctors,
};
