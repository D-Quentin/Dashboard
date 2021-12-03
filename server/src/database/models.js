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
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uuid: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
User.sync();

const Widget = sequelize.define("widgets", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  order: {
    type: DataTypes.INTEGER
  },
  config: {
    type: DataTypes.STRING,
    allowNull: true,
  }
})
Widget.sync();

User.hasMany(Widget, {as: "widget"});
Widget.belongsTo(User, {
  foreignKey: "userId", 
  as: "user",
});

module.exports =
{
  isUsernameTaken: async function(username) {
    const user = await User.findOne({where: {username: username}});
    if (user === null)
      return false;
    return true;
  },

  addUser: async function (username, password, uuid) {
    await (User.build({username: username, password: password, uuid: uuid})).save();
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
      return null
    return user.uuid;
  },

  addWidget: async function (id_user, type, order, config) {
    await Widget.build({userId: id_user, type: type, order: order, config: config}).save();
  },

  getAllWidgetsFromUser : async function (id_user) {
    const answer = await Widget.findAll({where: {user: id_user}})
    console.log(answer);
  },

  getUserFromUuid: async function(uuid) {
    const user = await User.findOne({where: {uuid: uuid}});
    if (user == null)
      return null;
    return user.id;
  }
}