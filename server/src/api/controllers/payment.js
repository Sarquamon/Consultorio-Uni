const Payments = require("../../models/Payments");
const {
  findOnePayment,
  registerDebt,
  findAllPayments,
} = require("../functions/paymentFunctions");
const { findOnePatient } = require("../functions/patientFunctions");

const moment = require("moment");

const createDebt = async (req, res) => {
  const { totalPayment, currentPayment, patientEmail } = req.body;

  try {
    const patientExists = await findOnePatient(patientEmail);
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

const getAllPayments = async (_req, res) => {
  try {
    const payments = await findAllPayments();
    if (!payments) {
      res.status(200).json({ message: "No hay pagos" });
    } else {
      res.status(200).json({ payments });
    }
  } catch (e) {
    console.log("Error al encontrar pagos", e);
    res.status(500).json({ message: "Error al encontrar pagos" });
  }
};

const registerPayment = async (req, res) => {
  const { currentPayment, patientEmail, paymentID } = req.body;
  const currentDate = moment().format("YYYY-MM-DD");
  const nextPaymentDate = moment().add(2, "M").format("YYYY-MM-DD");

  try {
    const payment = await findOnePayment(patientEmail, paymentID);
    if (!payment) {
      res.status(403).json({ message: "El paciente no tiene deudas" });
    } else {
      try {
        await Payments.update(
          {
            current_credit: `${
              parseInt(payment.dataValues.current_credit) +
              parseInt(currentPayment)
            }`,
            debt: `${
              parseInt(payment.dataValues.debt) - parseInt(currentPayment)
            }`,
            last_payment_date: currentDate,
            limit_payment_date: nextPaymentDate,
          },
          {
            where: {
              id: paymentID,
            },
          }
        );
        res.status(202).json({ message: "Pago actualizado" });
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error al actualizar el pago" });
      }
    }
  } catch (e) {
    console.log("Error al actualizar el pago", e);
  }
};

module.exports = {
  createDebt,
  getAllPayments,
  registerPayment,
};
