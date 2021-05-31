const { Op } = require("sequelize");
const Doctors = require("../../models/Doctors");

const findOneDoctor = (doctorID, doctorEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Doctors.findOne({
        attributes: ["ID_DOCTOR", "EMAIL"],
        where: {
          [Op.or]: [
            { ID_DOCTOR: doctorID || null },
            { EMAIL: doctorEmail || null },
          ],
        },
      });
      return resolve(result);
    } catch (e) {
      console.log("\nError retrieving information: \n", e);
      return reject("\nError retrieving information: \n", e);
    }
  });
};

module.exports = {
  findOneDoctor,
};
