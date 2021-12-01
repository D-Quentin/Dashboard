// Constant
const {Sequelize, DataTypes} = require("sequelize");
const {POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST} = process.env
const sequelize = new Sequelize('postgresql://'+POSTGRES_USER+':'+POSTGRES_PASSWORD+'@'+POSTGRES_HOST+'/user');
const queryInterface = sequelize.getQueryInterface();

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
  if (finder === null) {
    const user = User.build(username, password);
    await user.save();
  }
  else
    console.log();
}