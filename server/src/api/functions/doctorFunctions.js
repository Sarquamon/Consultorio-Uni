const { Op } = require("sequelize");
const Doctors = require("../../models/Doctors");

const findOneDoctor = (id, email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Doctors.findOne({
        attributes: ["id", "email"],
        where: {
          [Op.or]: [{ id }, { email }],
        },
      });
      return resolve(result);
    } catch (e) {
      console.log("\nError retrieving information: \n", e);
      return reject("\nError retrieving information: \n", e);
    }
  });
};

const findAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Doctors.findAll();
      if (result.length > 0) {
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

const findAllDoctorsBySpeciality = (speciality) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Doctors.findAll({
        where: {
          speciality,
        },
      });
      if (result.length > 0) {
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

module.exports = {
  findOneDoctor,
  findAllDoctors,
  findAllDoctorsBySpeciality,
};
