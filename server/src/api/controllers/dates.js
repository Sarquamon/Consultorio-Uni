// TODO check if doctor has an appointment at that date and time
// TODO check if patient has an appointment at that date and time
// TODO check if there are available doctors for that date and time

const { format } = require("date-fns");

const Dates = require("../../models/Dates");
const {
  getAllDates,
  isRequestedDoctorAvailable,
  patientHasDateForSpecifiedDate,
  getAllAvailableDoctors,
} = require("../functions/dateFunctions");
const { findAllDoctorsBySpeciality } = require("../functions/doctorFunctions");
const { findOnePatient } = require("../functions/patientFunctions");
const { registerDebt } = require("../functions/paymentFunctions");

const bookADate = async (req, res) => {
  const {
    date,
    doctorID,
    patientEmail,
    receptionistID,
    totalPayment,
    currentPayment,
  } = req.body;
  const currentDate = format(new Date(), "yyyy-mm-dd");
  const formattedDate = format(new Date(date), "yyyy-mm-dd");
  console.log(formattedDate);

  try {
    const avaliableDates = await getAllDates(currentDate);
    if (avaliableDates.length >= 8) {
      res.status(403).json({ message: "Listed date is full" });
    } else {
      const isDoctorAvailable = await isRequestedDoctorAvailable(
        doctorID,
        date
      );
      if (!isDoctorAvailable) {
        res
          .status(403)
          .json({ message: "The doctor is not available at that time" });
      } else {
        const patientExists = await findOnePatient(patientEmail);
        if (!patientExists) {
          console.log("User does not exist");
          res.status(404).json({ message: "Patient does not exist" });
        } else {
          const patientHasDate = await patientHasDateForSpecifiedDate(
            patientEmail,
            date
          );
          if (!patientHasDate) {
            const debt = await registerDebt(
              totalPayment,
              currentPayment,
              patientEmail
            );
            if (debt) {
              await Dates.create({
                PATIENT_EMAIL: patientEmail,
                ID_DOCTOR: doctorID,
                BOOKED_DATE: date,
                ID_RECEPTIONIST: receptionistID,
                ID_PAYMENT: debt.ID_PAYMENT,
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

const getAllDatesForToday = async (_req, res) => {
  const currentDate = format(new Date(), "yyyy-mm-dd");
  try {
    const result = await getAllDates(currentDate);
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
  const currentDate = format(new Date(), "yyyy-mm-dd");
  try {
    const result = await getAllDates(currentDate);
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
  const currentDate = format(new Date(), "yyyy-mm-dd");
  try {
    const result = await getAllDates(currentDate);
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

const listAllAvailableDoctors = async (req, res) => {
  const { date, doctorSpeciality } = req.query;
  console.log(date, doctorSpeciality);
  try {
    const result = await getAllAvailableDoctors(date, doctorSpeciality);
    console.log(result);
    if (result) {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        try {
          const doctors = await findAllDoctorsBySpeciality(doctorSpeciality);
          if (doctors) {
            res.status(200).json(doctors);
          } else {
            res.status(404).json({ message: "No available doctor was found" });
          }
        } catch (e) {
          res.status(404).json({ message: "No available doctor was found" });
        }
      }
    } else {
      res.status(404).json({ message: "No available doctor was found" });
    }
  } catch (e) {
    console.log(`Error on listing all available doctors:\n${e}`);
    res.status(500).json({ message: "Error on listing all available doctors" });
  }
};

module.exports = {
  bookADate,
  getAllDatesForToday,
  listAllAvailableDoctors,
  getTotalDatesForToday,
  getMonthDates,
};
