const { Op } = require("sequelize");
const Patients = require("../../models/Patients");

const findOnePatient = (email, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Patients.findOne({
        attributes: ["email"],
        where: {
          [Op.or]: [{ email }],
        },
      });
      return resolve(result);
    } catch (e) {
      console.log("\nError retrieving information: \n", e);
      return reject("\nError retrieving information: \n", e);
    }
  });
};

const findAllPatients = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Patients.findAll();
      return resolve(result);
    } catch (e) {
      console.log("\nError retrieving information: \n", e);
      return reject("\nError retrieving information: \n", e);
    }
  });
};

module.exports = {
  findOnePatient,
  findAllPatients,
};
