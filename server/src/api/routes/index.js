const express = require("express");

const {
  loginReceptionist,
  registerReceptionist,
  updateReceptionist,
  deleteReceptionist,
  getAllReceptionists,
} = require("../controllers/receptionist");
const {
  deleteDate,
  updateDate,
  getAllDates,
  registerDate,
  getMonthDates,
  getAllDatesForToday,
  getTotalDatesForToday,
  getAllAvailableDoctors,
} = require("../controllers/dates");
const {
  registerDoctor,
  getAllDoctors,
  getTotalDoctors,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctor");
const {
  registerPatient,
  getTotalPatients,
  getAllPatients,
  deletePatient,
  updatePatient,
} = require("../controllers/patient");
const { getAllPayments, registerPayment } = require("../controllers/payment");
// const { isValidSession } = require("../../utils/utils");

const router = express.Router();

router.post("/login", loginReceptionist);

router.post("/registerDate", registerDate);
router.post("/registerDoctor", registerDoctor);
router.post("/registerPayment", registerPayment);
router.post("/registerPatient", registerPatient);
router.post("/registerReceptionist", registerReceptionist);

router.get("/getAllDates", getAllDates);
router.get("/getAllDoctors", getAllDoctors);
router.get("/getAllPayments", getAllPayments);
router.get("/getAllPatients", getAllPatients);
router.get("/getAllReceptionists", getAllReceptionists);
router.get("/getAllAvailableDoctors", getAllAvailableDoctors);

router.get("/getTotalDoctors", getTotalDoctors);
router.get("/getTotalMonthDates", getMonthDates);
router.get("/getTotalPatients", getTotalPatients);
router.get("/getAlltodayDates", getAllDatesForToday);
router.get("/getTotalDatesForToday", getTotalDatesForToday);

router.put("/editDate", updateDate);
router.put("/editDoctor", updateDoctor);
router.put("/editPatient", updatePatient);
router.put("/editReceptionist", updateReceptionist);

router.delete("/deleteDate", deleteDate);
router.delete("/deleteDoctor", deleteDoctor);
router.delete("/deletePatient", deletePatient);
router.delete("/deleteReceptionist", deleteReceptionist);

module.exports = router;
