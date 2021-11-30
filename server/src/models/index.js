// Constant
const {Sequelize, DataTypes} = require("sequelize");
const queryInterface = sequelize.getQueryInterface();
const {POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST} = process.env

const sq_user = new Sequelize('postgresql://'+POSTGRES_USER+':'+POSTGRES_PASSWORD+'@'+POSTGRES_HOST+'/user');
const sq_widgets = new Sequelize('postgresql://'+POSTGRES_USER+':'+POSTGRES_PASSWORD+'@'+POSTGRES_HOST+'/widgets')

sq_user.authenticate().then(() => {
  console.log("Connection to user database has been established sucessfully.");
}).catch(err => {
  console.log("Error: ", err);
});

sq_widgets.authenticate().then(() => {
  console.log("Connection to user database has been established sucessfully.");
}).catch(err => {
  console.log("Error: ", err);
})

const User = sq_user.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
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

const Widget = sq_widgets.define("widgets", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_user: {
    type: DataTypes.INTEGER
  },
  list: {
    type: DataTypes.JSON,
    allowNull: true,
  }
})
Widget.sync();

User.addUser = function (username, password) {
  const finder = await User.findOne({where: {username: username}});
  if (finder === null)
    queryInterface.addColumn("user", username, password);
  else
    console.log("User " + username + " already exist");
}

module.exports = sq_user;