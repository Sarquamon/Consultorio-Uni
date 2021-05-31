const Doctors = require("../../models/Doctors");
const { findOneDoctor } = require("../functions/doctorFunctions");

const registerDoctor = async (req, res) => {
  const { email, phone, firstName, lastName, speciality } = req.body;
  try {
    const user = await findOneDoctor(null, email);
    if (user) {
      res
        .status(409)
        .json({ message: "A doctor with that email already exists" });
    } else {
      try {
        await Doctors.create({
          EMAIL: email,
          PHONE: phone,
          FIRST_NAME: firstName,
          LAST_NAME: lastName,
          SPECIALITY: speciality,
        });
        res.status(202).json({ message: "Doctor created" });
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error on doctor creation" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error on Receptionists" });
  }
};

module.exports = {
  registerDoctor,
};
