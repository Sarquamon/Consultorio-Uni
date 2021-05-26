const { Op } = require("sequelize");
const Payments = require("../../models/Payments");

exports.findAllPatientPayments = (patientEmail, paymentID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Payments.findAll({
        // attributes: ["ID_PAYMENT", "ASSIGNED_TO"],
        where: {
          [Op.or]: [
            { ID_PAYMENT: paymentID || null },
            { ASSIGNED_TO: patientEmail || null },
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

exports.findOnePayment = (patientEmail, paymentID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Payments.findOne({
        // attributes: ["ID_PAYMENT", "ASSIGNED_TO"],
        where: {
          [Op.or]: [
            { ID_PAYMENT: paymentID || null },
            { ASSIGNED_TO: patientEmail || null },
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
