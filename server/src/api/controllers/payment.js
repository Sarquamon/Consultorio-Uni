const Payments = require("../../models/Payments");
const {
  findAllPatientPayments,
  findOnePayment,
  registerDebt,
} = require("../functions/paymentFunctions");
const { format, addMonths } = require("date-fns");
const { findOnePatient } = require("../functions/patientFunctions");

const createDebt = async (req, res) => {
  const { totalPayment, currentPayment, patientEmail } = req.body;

  try {
    const patientExists = await findOnePatient(patientEmail);
    console.log(patientExists);
    if (!patientExists) {
      res.status(404).json({ message: "Patient does not exist" });
    } else {
      const result = await registerDebt(
        totalPayment,
        currentPayment,
        patientEmail
      );
      if (result) {
        res.status(202).json({ message: "Debt created" });
      } else {
        res.status(500).json({ message: "Error on debts" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error on debts" });
  }
};

const getAllUserPayments = async (req, res) => {
  const { patientEmail } = req.body;

  try {
    const patient = await findOnePatient(patientEmail);
    if (!patient) {
      console.log("No patient was found with that address");
      res
        .status(404)
        .json({ message: "No patient was found with that address" });
    } else {
      const payments = await findAllPatientPayments(patientEmail);
      if (payments.length <= 0) {
        console.log("Patient has no payments", e);
        res.status(404).json({ message: "Patient has no payments" });
      } else {
        res.status(200).json({ payments });
      }
    }
  } catch (e) {
    console.log("Error on finding patient", e);
    res.status(500).json({ message: "Error on finding patient" });
  }
};

const registerPayment = async (req, res) => {
  const { currentPayment, patientEmail, paymentID } = req.body;
  const currentDate = format(new Date(), "yyyy-mm-dd");
  const nextPaymentDate = format(addMonths(new Date(), 2), "yyyy-mm-dd");

  try {
    const payment = await findOnePayment(patientEmail, paymentID);
    if (!payment) {
      res.status(403).json({ message: "The user has no debts" });
    } else {
      try {
        await Payments.update(
          {
            CURRENT_CREDIT: `${
              parseInt(payment.dataValues.CURRENT_CREDIT) +
              parseInt(currentPayment)
            }`,
            DEBT: `${
              parseInt(payment.dataValues.DEBT) - parseInt(currentPayment)
            }`,
            LAST_PAYMENT_DATE: currentDate,
            LIMIT_PAYMENT_DATE: nextPaymentDate,
          },
          {
            where: {
              ID_PAYMENT: paymentID,
            },
          }
        );
        res.status(202).json({ message: "Debt created" });
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error on debt creation" });
      }
    }
  } catch (e) {
    console.log("Error on payment registration", e);
  }
};

module.exports = {
  createDebt,
  getAllUserPayments,
  registerPayment,
};
