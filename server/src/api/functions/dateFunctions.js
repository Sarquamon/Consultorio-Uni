const { Op } = require("sequelize");
const Dates = require("../../models/Dates");
const Doctors = require("../../models/Doctors");
const Payments = require("../../models/Payments");
const Patients = require("../../models/Patients");
const Receptionists = require("../../models/Receptionists");

exports.getAllDayDates = (date) => {
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
