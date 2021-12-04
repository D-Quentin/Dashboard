// Constant
const {Sequelize, DataTypes} = require("sequelize");
const {POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_DB} = process.env
const sequelize = new Sequelize('postgres://'+POSTGRES_USER+':'+POSTGRES_PASSWORD+'@'+POSTGRES_HOST+'/'+POSTGRES_DB);

sequelize.authenticate().then(() => {
  console.log("Connection to user database has been established sucessfully.");
}).catch(err => {
  console.log("Error: ", err);
});

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  widgets: {
    type: DataTypes.STRING,
  }
});
User.sync();

module.exports =
{
  isUsernameTaken: async function(username) {
    const user = await User.findOne({where: {username: username}});
    if (user === null)
      return false;
    return true;
  },

  addUser: async function (username, password, uuid) {
    await (User.build({username: username, password: password, uuid: uuid, widgets: "{data: []}"})).save();
  },

  getUuidFromUsernameAndPassword: async function (username, password) {
    const user = await User.findOne({where: {username: username, password: password}});
    if (user === null)
      return null
    return user.uuid;
  },

  getUuidFromUsername: async function (username) {
    const user = await User.findOne({where: {username: username}});
    if (user === null)
      return null;
    return user.uuid;
  },

  setWidgets: async function (uuid, widgets) {
    User.update(
      {widgets: widgets},
      {where: {uuid: uuid}}
    ).then(console.log("success"))
    .catch((err) => {console.log(err)});
  },

  getAllWidgetsFromUser : async function (id_user) {
    const user = await User.findOne({where: {uuid: id_user}});
    if (user === null)
      return null;
    return user.widgets;
  },

  getUserFromUuid: async function(uuid) {
    const user = await User.findOne({where: {uuid: uuid}});
    if (user === null)
      return null;
    return user.id;
  }
}