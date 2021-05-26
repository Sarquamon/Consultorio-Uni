const Patients = require("../../models/Patients");
const { findOnePatient } = require("../functions/patientFunctions");

exports.registerPatient = async (req, res) => {
  const { email, phone, firstName, lastName } = req.body;
  try {
    const user = await findOnePatient(email);
    if (user) {
      res
        .status(409)
        .json({ message: "A patient with that email already exists!" });
    } else {
      try {
        await Patients.create({
          EMAIL: email,
          PHONE: phone,
          FIRST_NAME: firstName,
          LAST_NAME: lastName,
        });
        res.status(202).json({ message: "Patient created" });
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error on patient creation" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error on Receptionists" });
  }
};
