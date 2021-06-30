const Sequelize = require("sequelize");
require("dotenv").config();

const conn = new Sequelize(
  `postgres://${process.env.dbUser}:${process.env.dbUserPwd}@127.0.0.1:5432/consultorio`,
  {
    logging: (...msg) => console.log(msg),
    // logging: false,
  }
);

module.exports = conn;
