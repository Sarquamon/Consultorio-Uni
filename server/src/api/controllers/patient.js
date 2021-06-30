const Patients = require("../../models/Patients");
const {
  findOnePatient,
  findAllPatients,
} = require("../functions/patientFunctions");

const registerPatient = async (req, res) => {
  const { email, phone, firstName, lastName } = req.body;
  try {
    const user = await findOnePatient(email);
    if (user) {
      res
        .status(409)
        .json({ message: "¡Un paciente con ese email ya existe!" });
    } else {
      try {
        await Patients.create({
          email,
          phone,
          firstname: firstName,
          lastname: lastName,
        });
        res.status(202).json({ message: "Paciente creado" });
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error al crear el paciente" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al crear el paciente" });
  }
};

const getTotalPatients = async (_req, res) => {
  try {
    const users = await findAllPatients();
    if (users && users.length > 0) {
      res.status(200).json({ totalUsers: users.length });
    } else {
      res.status(200).json({ totalUsers: 0 });
    }
  } catch (e) {
    console.log(e);
    res.status(502).json({ message: "Error on listing users" });
  }
};

const getAllPatients = async (_req, res) => {
  try {
    const users = await findAllPatients();
    if (users && users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(200).json({ message: "No users" });
    }
  } catch (e) {
    console.log(e);
    res.status(502).json({ message: "Error on listing users" });
  }
};

const deletePatient = async (req, res) => {
  const { email } = req.query;
  try {
    const patient = await findOnePatient(email, null);
    if (!patient) {
      res.status(409).json({
        message: "El paciente no existe",
      });
    } else {
      try {
        await Patients.destroy({
          where: {
            email,
          },
        });
        res.status(202).json({ message: "Paciente borrado" });
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Fallo al borrar el paciente" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(502).json({ message: "Fallo al borrar el paciente" });
  }
};

const updatePatient = async (req, res) => {
  const { email, phone } = req.body;
  try {
    const result = await findOnePatient(email, null);
    if (!result) {
      res.status(409).json({
        message: "El paciente no existe",
      });
    } else {
      await Patients.update(
        { phone },
        {
          where: {
            email,
          },
        }
      );
      res.status(202).json({ message: "paciente actualizado" });
    }
  } catch (e) {
    console.log("Error on finding patient");
    res.status(500).json({ message: "Error on finding patient" });
  }
};

module.exports = {
  getTotalPatients,
  registerPatient,
  getAllPatients,
  deletePatient,
  updatePatient,
};
