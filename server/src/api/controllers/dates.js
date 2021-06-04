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
const { findOnePatient } = require("../functions/patientFunctions");
const { registerDebt } = require("../functions/paymentFunctions");

const bookADate = async (req, res) => {
  const {
    bookingDate,
    doctorID,
    patientEmail,
    receptionistID,
    totalPayment,
    currentPayment,
  } = req.body;
  const currentDate = format(new Date(), "yyyy-MM-dd");

  try {
    const avaliableDates = await getAllDates(currentDate);
    if (avaliableDates.length >= 8) {
      res.status(403).json({ message: "Listed date is full" });
    } else {
      const isDoctorAvailable = await isRequestedDoctorAvailable(
        doctorID,
        bookingDate
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
            bookingDate
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
                BOOKED_DATE: bookingDate,
                ID_RECEPTIONIST: receptionistID,
                ID_PAYMENT: debt.ID_PAYMENT,
              });
              res.status(200).json({
                message: `A date for ${patientEmail} has been created.`,
              });
            } else {
              // ? ERROR ON PATIENT DEBT CREATION
              res
                .status(403)
                .json({ message: "Could not create a debt for the patient" });
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
  const currentDate = format(new Date(), "yyyy-MM-dd");
  try {
    const result = await getAllDates(currentDate);
    console.log(result);
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

const listAllAvailableDoctors = async (req, res) => {
  const { date, doctorSpeciality } = req.body;
  try {
    const result = await getAllAvailableDoctors(date, doctorSpeciality);
    console.log(result);
    if (result) {
      res.status(200).json(result);
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
};
