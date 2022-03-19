const { Sequelize } = require("sequelize");
const {
  POSTGRES_HOST_DEV,
  POSTGRES_HOST_PRO,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PWD,
  POSTGRES_DB,
  NODE_ENV,
} = require("../config/config.default");

const POSTGRES_HOST =
  NODE_ENV === "production" ? POSTGRES_HOST_PRO : POSTGRES_HOST_DEV;

const seq = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PWD, {
  host: POSTGRES_HOST,
  dialect: "postgres",
});

// seq
//   .authenticate()
//   .then(() => console.log("okkkkkkkkkkkkkkkkk"))
//   .catch((err) => console.log(err));

module.exports = seq;
