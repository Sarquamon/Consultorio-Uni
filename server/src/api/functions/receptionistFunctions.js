const { Op } = require("sequelize");
const Receptionists = require("../../models/Receptionists");

const findOneReceptionist = (id, email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Receptionists.findOne({
        attributes: ["id", "email", "pwd"],
        where: {
          [Op.or]: [{ id }, { email }],
        },
      });
      console.log(result);
      return resolve(result);
    } catch (e) {
      console.log("\nError retrieving information: \n", e);
      return reject("\nError retrieving information: \n", e);
    }
  });
};

const findAllReceptionists = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Receptionists.findAll();
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
  findOneReceptionist,
  findAllReceptionists,
};
