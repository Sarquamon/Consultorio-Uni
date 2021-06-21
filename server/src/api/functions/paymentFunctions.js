const { Op } = require("sequelize");
const Payments = require("../../models/Payments");
const { format, addMonths } = require("date-fns");

const findAllPatientPayments = (patientEmail, paymentID) => {
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

const findOnePayment = (patientEmail, paymentID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Payments.findOne({
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

const registerDebt = (totalPayment, currentPayment, patientEmail) => {
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const nextPaymentDate = format(addMonths(new Date(), 2), "yyyy-MM-dd");

  return new Promise(async (resolve, reject) => {
    const payments = await findAllPatientPayments(patientEmail);
    if (payments.length === 4 || payments.length > 4) {
      resolve(false);
    } else {
      try {
        const result = await Payments.create({
          TOTAL: totalPayment,
          CURRENT_CREDIT: currentPayment ? currentPayment : "0",
          LIMIT_PAYMENT_DATE: nextPaymentDate,
          LAST_PAYMENT_DATE: currentDate,
          ASSIGNED_TO: patientEmail,
          DEBT: currentPayment ? totalPayment - currentPayment : totalPayment,
          CREATED_AT: currentDate,
        });

        resolve(result.dataValues);
      } catch (e) {
        console.log(e);
        reject(false);
      }
    }
  });
};

module.exports = {
  findOnePayment,
  findAllPatientPayments,
  registerDebt,
};
