// 'use strict';

// // Constant
// const {POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT} = process.env
// const {Sequelize, DataTypes} = require("sequelize");

// console.log(POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT)
// const sq_user = new Sequelize("user", POSTGRES_USERNAME, POSTGRES_PASSWORD, {
//   host: POSTGRES_HOST,
//   // port: POSTGRES_PORT,
//   dialect: "postgres",
// })

// sq_user.authenticate().then(() => {
//   console.log("Connection to user database has been established sucessfully.");
// }).catch(err => {
//   console.log("Error: ", err);
// });

// const User = sq_user.define("user", {
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   }
// });
// User.sync();

// module.exports = sq_user;