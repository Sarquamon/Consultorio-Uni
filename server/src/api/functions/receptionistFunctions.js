const { Op } = require("sequelize");
const Receptionists = require("../../models/Receptionists");

exports.findOneReceptionist = (receptionistId, receptionistEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Receptionists.findOne({
        attributes: ["ID_RECEPTIONIST", "EMAIL", "PWD"],
        where: {
          [Op.or]: [
            { ID_RECEPTIONIST: receptionistId || null },
            { EMAIL: receptionistEmail || null },
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
