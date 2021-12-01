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
  }
});
User.sync();

const Widget = sequelize.define("widgets", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_user: {
    type: DataTypes.INTEGER
  },
  order: {
    type: DataTypes.INTEGER
  },
  widget: {
    type: DataTypes.JSON,
    allowNull: true,
  }
})
Widget.sync();
User.hasMany(Widget);
Widget.belongsTo(User);

async function addUser(username, password) {
  const finder = await User.findOne({where: {username: username}});
  if (finder === null)
    await (User.build(username, password)).save();
  else
    console.log();
}

async function addWidget(id_user, order, widget) {
  await (Widget.build(id_user, order, widget)).save();
}
