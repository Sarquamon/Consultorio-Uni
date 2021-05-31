const JWT = require("jsonwebtoken");

const isValidSession = async (req, res, next) => {
  const { jwt } = req.body;
  if (jwt) {
    try {
      const isValid = JWT.verify(jwt, process.env.JWT_KEY);
      if (!isValid) {
        console.log("Session expired");
        res.status(400).json({ message: "Session expired" });
      } else {
        next();
      }
    } catch (e) {
      console.log("No token was provided");
      res.status(400).json({ message: "No jwt was provided" });
    }
  } else {
    console.log("No token was provided");
    res.status(400).json({ message: "No jwt was provided" });
  }
};

module.exports = {
  isValidSession,
};
