module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('employee', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      office: DataTypes.STRING
    },
    {
      freezeTableName: true,
    }
  );
  return Employee;
}