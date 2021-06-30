const conn = require("../../config/sqlconn");
const { Op, QueryTypes } = require("sequelize");
const Dates = require("../../models/Dates");
const Doctors = require("../../models/Doctors");
const Payments = require("../../models/Payments");
const Patients = require("../../models/Patients");
const Receptionists = require("../../models/Receptionists");

const findAllDates = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Dates.findAll({
        include: [
          { model: Doctors, required: true },
          { model: Payments, required: true },
          { model: Patients, required: true },
        ],
      });
      if (result) {
        resolve(result);
      } else {
        resolve(false);
      }
    } catch (e) {
      console.log("\nError retrieving information: \n", e);
      return reject("\nError retrieving information: \n", e);
    }
  });
};

const findAllDatesForSpecifiedDate = (booked_date) => {
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
          [Op.or]: [{ booked_date }],
        },
      });

      if (result && result.length > 0) {
        return resolve(result);
      } else {
        return resolve(false);
      }
    } catch (e) {
      console.log("\nError retrieving information: \n", e);
      return reject("\nError retrieving information: \n", e);
    }
  });
};

const isRequestedDoctorAvailable = (doctorId, booked_date) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Dates.findOne({
        attributes: ["id"],
        where: {
          booked_date,
          doctorId,
        },
      });
      if (result) {
        resolve(false);
      } else {
        resolve(true);
      }
    } catch (e) {
      console.log(`Error on doctor availability1 ${e}`);
      reject("Error on doctor availability1");
    }
  });
};

const patientHasDateForSpecifiedDate = (patientEmail, booked_date) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Dates.findOne({
        where: {
          booked_date,
          patientEmail,
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

const findAllBusyDoctors = (booked_date, speciality) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dates = await findAllDatesForSpecifiedDate(booked_date);
      if (dates.length > 0) {
        const result = await Dates.findAll({
          include: [
            {
              model: Doctors,
              required: true,
              where: {
                speciality,
              },
            },
          ],
          where: {
            [Op.or]: [{ booked_date }],
          },
        });

        resolve(result);
      } else {
        resolve(true);
      }
    } catch (e) {
      console.log(`Error on get all doctors availability ${e}`);
      reject("Error on get all doctors availability");
    }
  });
};

const findOneDate = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Dates.findOne({
        include: [{ model: Payments, required: true }],
        where: {
          id,
        },
      });
      if (result) {
        resolve(result);
      } else {
        resolve(false);
      }
    } catch (e) {
      console.log(`Error on get all date availability ${e}`);
      reject("Error on get all date availability");
    }
  });
};

const findAllAvailableDoctor = (speciality, busyDoctors) => {
  return new Promise(async (resolve, reject) => {
    try {
      const busyDoctorsEmail = busyDoctors.map((dataValues) => {
        return dataValues.Doctor.dataValues.email;
      });

      const result = await Doctors.findAll({
        where: {
          email: {
            [Op.or]: {
              [Op.not]: [].concat(busyDoctorsEmail),
            },
          },
          speciality,
        },
      });

      if (result.length > 0) {
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
  findOneDate,
  findAllDates,
  findAllBusyDoctors,
  findAllAvailableDoctor,
  isRequestedDoctorAvailable,
  findAllDatesForSpecifiedDate,
  patientHasDateForSpecifiedDate,
};
