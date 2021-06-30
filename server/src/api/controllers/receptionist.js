const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Receptionists = require("../../models/Receptionists");
const {
  findOneReceptionist,
  findAllReceptionists,
} = require("../functions/receptionistFunctions");

const loginReceptionist = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findOneReceptionist(null, email);
    if (!user) {
      console.log("Receptionists not found");
      res.status(404).json({ message: "Receptionists not found" });
    } else {
      try {
        const result = await bcrypt.compare(password, user.dataValues.pwd);
        if (result) {
          const token = jwt.sign(
            {
              receptionist: user.dataValues.id,
              email: user.dataValues.email,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "200h",
            }
          );

          res.status(200).json({ message: "ok", token });
        } else {
          res.status(403).json({ message: "Auth failed" });
        }
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Auth failed" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Wrong password" });
  }
};

const registerReceptionist = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const user = await findOneReceptionist(null, email);
    if (user) {
      res
        .status(409)
        .json({ message: "Receptionists with that email already exists" });
    } else {
      try {
        const hashedPwd = await bcrypt.hash(password, 10);
        await Receptionists.create({
          email,
          pwd: hashedPwd,
          firstname: firstName,
          lastname: lastName,
        });
        res.status(202).json({ message: "Receptionists created" });
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error on password hashing" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error on Receptionists" });
  }
};

const getAllReceptionists = async (_req, res) => {
  try {
    const result = await findAllReceptionists();
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(200).json({ message: "No receptionists were found" });
    }
  } catch (e) {
    console.log("Error on list all receptionists");
    res.status(500).json({ message: "Error on find all receptionist" });
  }
};

const updateReceptionist = async (req, res) => {
  const { email, name, lastname } = req.body;
  try {
    const result = await findOneReceptionist(null, email);
    if (!result) {
      res.status(409).json({
        message: "El recepcionista no existe",
      });
    } else {
      await Receptionists.update(
        { firstname: name, lastname: lastname },
        {
          where: {
            email,
          },
        }
      );
      res.status(202).json({ message: "Recepcionista actualizado" });
    }
  } catch (e) {
    console.log("Error on finding receptionist");
    res.status(500).json({ message: "Error on finding receptionist" });
  }
};

const deleteReceptionist = async (req, res) => {
  const { email } = req.query;
  try {
    const doctor = await findOneReceptionist(null, email);
    if (!doctor) {
      res.status(409).json({
        message: "El recepcionista no existe",
      });
    } else {
      try {
        await Receptionists.destroy({
          where: {
            email,
          },
        });
        res.status(202).json({ message: "Recepcionista borrado" });
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Fallo al borrar del recepcionista" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(502).json({ message: "Fallo al borrar el recepcionista" });
  }
};

module.exports = {
  loginReceptionist,
  registerReceptionist,
  updateReceptionist,
  getAllReceptionists,
  deleteReceptionist,
};
