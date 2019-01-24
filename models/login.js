module.exports = (sequelize, DataTypes) => {
  const Login = sequelize.define('login', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
      firstName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      freezeTableName: true,
    }
  );
  return Login;
}