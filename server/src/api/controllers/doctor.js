const Doctors = require("../../models/Doctors");
const {
  findOneDoctor,
  findAllDoctors,
} = require("../functions/doctorFunctions");

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

const listAllDoctors = async (req, res) => {
  try {
    const result = await findAllDoctors();
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No doctors were found" });
    }
  } catch (e) {
    console.log("Error on list all doctors");
    res.status(500).json({ message: "Error on find all doctors" });
  }
};

const getTotalDoctors = async (req, res) => {
  try {
    const result = await findAllDoctors();
    if (result) {
      res.status(200).json({ totalDoctors: result.length });
    } else {
      console.log("nada");
      res.status(200).json({ totalDoctors: 0 });
    }
  } catch (e) {
    console.log("Error on list all doctors");
    res.status(500).json({ message: "Error on find all doctors" });
  }
};

module.exports = {
  registerDoctor,
  getTotalDoctors,
  listAllDoctors,
};
