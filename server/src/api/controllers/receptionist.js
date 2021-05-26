const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Receptionists = require("../../models/Receptionists");
const { findOneReceptionist } = require("../functions/receptionistFunctions");

exports.loginReceptionist = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findOneReceptionist(null, email);
    if (!user) {
      console.log("Receptionists not found");
      res.status(404).json({ message: "Receptionists not found" });
    } else {
      try {
        const result = await bcrypt.compare(password, user.PWD);
        if (result) {
          const token = jwt.sign(
            { receptionist: user.ID_RECEPTIONIST, email: user.email },
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

exports.registerReceptionist = async (req, res) => {
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
          EMAIL: email,
          PWD: hashedPwd,
          FIRST_NAME: firstName,
          LAST_NAME: lastName,
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
