// Constant
const {Sequelize, DataTypes} = require("sequelize");
const {POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST} = process.env

console.log(POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST)
const sq_user = new Sequelize('user', POSTGRES_USER, POSTGRES_PASSWORD, {
  host: POSTGRES_HOST,
  dialect: "postgres",
})

sq_user.authenticate().then(() => {
  console.log("Connection to user database has been established sucessfully.");
}).catch(err => {
  console.log("Error: ", err);
});

const User = sq_user.define("user", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});
User.sync();

module.exports = sq_user;