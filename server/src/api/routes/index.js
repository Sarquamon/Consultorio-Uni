const express = require("express");

const {
  loginReceptionist,
  registerReceptionist,
} = require("../controllers/receptionist");
const {
  bookADate,
  getAllDatesForToday,
  listAllAvailableDoctors,
  getTotalDatesForToday,
  getMonthDates,
} = require("../controllers/dates");
const {
  registerDoctor,
  listAllDoctors,
  getTotalDoctors,
} = require("../controllers/doctor");
const {
  registerPatient,
  getRegisteredPatients,
} = require("../controllers/patient");
const {
  createDebt,
  getAllUserPayments,
  registerPayment,
} = require("../controllers/payment");
const { isValidSession } = require("../../utils/utils");

const router = express.Router();

// ? Receptionists - POSTERS
router.post("/register", registerReceptionist);
router.post("/login", loginReceptionist);

// ? Patients - POSTERS
router.post("/registerPatient", registerPatient);

// ? Payments - POSTERS
router.post("/createDebt", createDebt);
router.post("/registerPayment", registerPayment);

// ? Payments - GETTERS
router.get("/getAllUserPayments", getAllUserPayments);

// ? Dates - POSTERS
router.post("/book", /* isValidSession, */ bookADate);

// ? Dates - GETTERS
router.get("/getAlltodayDates", /* isValidSession, */ getAllDatesForToday);

// ? Doctors - POSTERS
router.post("/registerDoctor", registerDoctor);

// ? Doctors - GETTERS
router.get("/listAllDoctors", listAllDoctors);
router.get("/listAllAvailableDoctors", listAllAvailableDoctors);

router.get("/getTotalDoctors", getTotalDoctors);
router.get("/getMonthDates", getMonthDates);
router.get("/getTotalDatesForToday", getTotalDatesForToday);
router.get("/getRegisteredPatients", getRegisteredPatients);

module.exports = router;
