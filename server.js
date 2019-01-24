const express = require("express");
const bodyParser = require("body-parser");
const faker = require("faker");
const times = require("lodash.times");
const random = require("lodash.random");
const db = require("./models");
const apiLogin = require("./app/api/login");
const apiEmployee = require("./app/api/employee");
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());
app.use(express.static("app/public"));

apiLogin(app, db);
apiEmployee(app, db);

db.sequelize.sync().then(() => {
  db.login.bulkCreate(
    times(10, () => ({
      firstName: faker.name.firstName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync('1234', 10)
    }))
  );
  db.employee.bulkCreate(
    times(10, () => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      office: faker.company.bsAdjective()
    }))
  );
  app.listen(8080, () => console.log("App listening on port 8080!"));
});