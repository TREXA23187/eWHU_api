const { Sequelize } = require("sequelize");
const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PWD,
  POSTGRES_DB,
} = require("../config/config.default");

// const seq = new Sequelize()

const seq = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PWD, {
  host: POSTGRES_HOST,
  dialect: "postgres",
});

// seq
//   .authenticate()
//   .then(() => console.log("okkkkkkkkkkkkkkkkk"))
//   .catch((err) => console.log(err));

module.exports = seq;
