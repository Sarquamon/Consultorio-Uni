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
          email,
          phone,
          firstname: firstName,
          lastname: lastName,
          speciality,
        });
        res.status(202).json({ message: "Doctor created" });
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error on doctor creation" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error on doctors" });
  }
};

const getAllDoctors = async (_req, res) => {
  try {
    const result = await findAllDoctors();
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(200).json({ message: "No doctors were found" });
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
      res.status(200).json({ totalDoctors: 0 });
    }
  } catch (e) {
    console.log("Error on list all doctors");
    res.status(500).json({ message: "Error on find all doctors" });
  }
};

const updateDoctor = async (req, res) => {
  const { email, phone } = req.body;
  try {
    const result = await findOneDoctor(null, email);
    if (!result) {
      res.status(409).json({
        message: "El doctor no existe",
      });
    } else {
      await Doctors.update(
        { phone },
        {
          where: {
            email,
          },
        }
      );
      res.status(202).json({ message: "doctor actualizado" });
    }
  } catch (e) {
    console.log("Error on finding doctor");
    res.status(500).json({ message: "Error on finding doctor" });
  }
};

const deleteDoctor = async (req, res) => {
  const { email } = req.query;
  try {
    const doctor = await findOneDoctor(null, email);
    if (!doctor) {
      res.status(409).json({
        message: "El doctor no existe",
      });
    } else {
      try {
        await Doctors.destroy({
          where: {
            email,
          },
        });
        res.status(202).json({ message: "Doctor borrado" });
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Fallo al borrar del doctor" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(502).json({ message: "Fallo al borrar el doctor" });
  }
};

module.exports = {
  registerDoctor,
  getTotalDoctors,
  getAllDoctors,
  updateDoctor,
  deleteDoctor,
};
