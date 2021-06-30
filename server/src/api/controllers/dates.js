const moment = require("moment");

const Dates = require("../../models/Dates");
const Payments = require("../../models/Payments");
const {
  findOneDate,
  findAllDates,
  findAllBusyDoctors,
  findAllAvailableDoctor,
  isRequestedDoctorAvailable,
  findAllDatesForSpecifiedDate,
  patientHasDateForSpecifiedDate,
} = require("../functions/dateFunctions");
const { findAllDoctorsBySpeciality } = require("../functions/doctorFunctions");
const { findOnePatient } = require("../functions/patientFunctions");
const { registerDebt } = require("../functions/paymentFunctions");

const registerDate = async (req, res) => {
  const {
    date,
    doctorID: doctorId,
    patientEmail,
    receptionistID,
    totalPayment,
    currentPayment,
  } = req.body;
  const currentDate = moment().format("YYYY-MM-DD");
  const formattedDate = moment(date, ["DD-MM-YYYY", "YYYY-MM-DD"]).format(
    "YYYY-MM-DD"
  );

  try {
    const avaliableDates = await findAllDatesForSpecifiedDate(currentDate);
    if (avaliableDates.length >= 8) {
      res.status(403).json({ message: "Listed date is full" });
    } else {
      const isDoctorAvailable = await isRequestedDoctorAvailable(
        doctorId,
        formattedDate
      );
      if (!isDoctorAvailable) {
        res
          .status(403)
          .json({ message: "The doctor is not available at that time" });
      } else {
        const patientExists = await findOnePatient(patientEmail, null);
        if (!patientExists) {
          console.log("Patient does not exist");
          res.status(403).json({ message: "Patient does not exist" });
        } else {
          const patientHasDate = await patientHasDateForSpecifiedDate(
            patientEmail,
            formattedDate
          );
          if (!patientHasDate) {
            const debt = await registerDebt(
              totalPayment,
              currentPayment,
              patientEmail
            );
            if (debt) {
              await Dates.create({
                patientEmail,
                doctorId,
                booked_date: formattedDate,
                receptionistId: receptionistID,
                paymentId: debt.id,
              });
              res.status(200).json({
                message: `A date for ${patientEmail} has been created.`,
              });
            } else {
              // ? ERROR ON PATIENT DEBT CREATION
              res.status(403).json({ message: "Patient has too many debts" });
            }
          } else {
            // ? PATIENT HAS DATE
            res
              .status(403)
              .json({ message: "Patient has a date for the specified date" });
          }
        }
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error on date booking" });
  }
};

const getAllDates = async (_req, res) => {
  try {
    const result = await findAllDates();
    if (result.length > 0) {
      res.status(200).json({ result });
    } else {
      res.status(200).json({ message: "No dates for today" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error on dates retrieval" });
  }
};

const getAllDatesForSpecificDate = async (_req, res) => {
  try {
    const result = await findAllDatesForSpecifiedDate(currentDate);
    if (result.length > 0) {
      res.status(200).json({ result });
    } else {
      res.status(200).json({ message: "No dates for today" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error on dates retrieval" });
  }
};

const getAllDatesForToday = async (_req, res) => {
  const currentDate = moment().format("YYYY-MM-DD");
  try {
    const result = await findAllDatesForSpecifiedDate(currentDate);
    if (result.length > 0) {
      res.status(200).json({ result });
    } else {
      res.status(200).json({ message: "No dates for today" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error on dates retrieval" });
  }
};

const getTotalDatesForToday = async (_req, res) => {
  const currentDate = moment().format("YYYY-MM-DD");
  try {
    const result = await findAllDatesForSpecifiedDate(currentDate);
    if (result.length > 0) {
      res.status(200).json({ totalDates: result.length });
    } else {
      res.status(200).json({ totalDates: 0 });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error on dates retrieval" });
  }
};

const getMonthDates = async (_req, res) => {
  const currentDate = moment().format("YYYY-MM-DD");
  try {
    const result = await findAllDatesForSpecifiedDate(currentDate);
    if (result.length > 0) {
      res.status(200).json({ totalDates: result.length });
    } else {
      res.status(200).json({ totalDates: 0 });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error on dates retrieval" });
  }
};

const getAllAvailableDoctors = async (req, res) => {
  const { date, doctorSpeciality } = req.query;
  try {
    const result = await findAllBusyDoctors(date, doctorSpeciality);
    if (result.length > 0) {
      const availableDoctors = await findAllAvailableDoctor(
        doctorSpeciality,
        result
      );
      if (availableDoctors) {
        console.log(availableDoctors);
        res.status(200).json(availableDoctors);
      } else {
        res.status(200).json({ message: "No available doctor was found" });
      }
    } else {
      try {
        const doctors = await findAllDoctorsBySpeciality(doctorSpeciality);
        if (doctors) {
          res.status(200).json(doctors);
        } else {
          res.status(200).json({ message: "No available doctor was found" });
        }
      } catch (e) {
        res.status(200).json({ message: "No available doctor was found" });
      }
    }
  } catch (e) {
    console.log(`Error on listing all available doctors:\n${e}`);
    res.status(500).json({ message: "Error on listing all available doctors" });
  }
};

const updateDate = async (req, res) => {
  const { dateId, total } = req.body;
  try {
    const result = await findOneDate(dateId);
    if (!result) {
      res.status(409).json({
        message: "La cita no existe",
      });
    } else {
      await Payments.update(
        { total },
        {
          where: {
            id: result.dataValues.Payment.dataValues.id,
          },
        }
      );
      res.status(202).json({ message: "cita actualizada" });
    }
  } catch (e) {
    console.log("Error on finding doctor");
    res.status(500).json({ message: "Error on finding doctor" });
  }
};

const deleteDate = async (req, res) => {
  const { id } = req.query;

  try {
    const date = await findOneDate(id);
    if (!date) {
      res.status(409).json({
        message: "La cita no existe",
      });
    } else {
      try {
        await Dates.destroy({
          where: {
            id,
          },
        });
        res.status(202).json({ message: "Cita borrada" });
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Fallo al borrar la cita" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(502).json({ message: "Fallo al borrar la cita" });
  }
};

module.exports = {
  deleteDate,
  updateDate,
  getAllDates,
  registerDate,
  getMonthDates,
  getAllDatesForToday,
  getTotalDatesForToday,
  getAllAvailableDoctors,
  getAllDatesForSpecificDate,
};
