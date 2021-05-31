const express = require("express");

const {
  loginReceptionist,
  registerReceptionist,
} = require("../controllers/receptionist");
const { bookADate, getAllDatesForToday } = require("../controllers/dates");
const { registerDoctor } = require("../controllers/doctor");
const { registerPatient } = require("../controllers/patient");
const {
  createDebt,
  getAllUserPayments,
  registerPayment,
} = require("../controllers/payment");
const { isValidSession } = require("../../utils/utils");

const router = express.Router();

router.post("/register", registerReceptionist);
router.post("/login", loginReceptionist);
router.post("/registerPatient", registerPatient);
router.post("/createDebt", createDebt);
router.get("/getAllUserPayments", getAllUserPayments);
router.post("/registerPayment", registerPayment);
router.post("/book", /* isValidSession, */ bookADate);
router.get("/getAlltodayDates", /* isValidSession, */ getAllDatesForToday);
router.post("/registerDoctor", registerDoctor);

module.exports = router;
