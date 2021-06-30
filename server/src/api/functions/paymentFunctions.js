const { Op } = require("sequelize");
const Payments = require("../../models/Payments");
const moment = require("moment");

const findAllPayments = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Payments.findAll();
      if (result) {
        if (result.length > 0) {
          return resolve(result);
        } else {
          return resolve(false);
        }
      } else {
        return resolve(false);
      }
    } catch (e) {
      console.log("\nError retrieving information: \n", e);
      return reject("\nError retrieving information: \n", e);
    }
  });
};

const findAllPatientPayments = (assigned_to, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Payments.findAll({
        where: {
          [Op.or]: [{ assigned_to }, { id }],
        },
      });
      return resolve(result);
    } catch (e) {
      console.log("\nError retrieving information: \n", e);
      return reject("\nError retrieving information: \n", e);
    }
  });
};

const findOnePayment = (assigned_to, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Payments.findOne({
        where: {
          [Op.or]: [{ id }, { assigned_to }],
        },
      });
      return resolve(result);
    } catch (e) {
      console.log("\nError retrieving information: \n", e);
      return reject("\nError retrieving information: \n", e);
    }
  });
};

const registerDebt = (totalPayment, currentPayment, assigned_to) => {
  const currentDate = moment().format("YYYY-MM-DD");
  const nextPaymentDate = moment().add(1, "M").format("YYYY-MM-DD");

  return new Promise(async (resolve, reject) => {
    const payments = await findAllPatientPayments(assigned_to, null);
    if (payments.length === 4 || payments.length > 4) {
      resolve(false);
    } else {
      try {
        const result = await Payments.create({
          total: totalPayment,
          current_credit: currentPayment ? currentPayment : "0",
          limit_payment_date: nextPaymentDate,
          last_payment_date: currentDate,
          assigned_to,
          debt: currentPayment ? totalPayment - currentPayment : totalPayment,
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
  registerDebt,
  findOnePayment,
  findAllPayments,
  findAllPatientPayments,
};
