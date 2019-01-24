const bcrypt = require('bcrypt');

module.exports = (app, db) => {
  app.post( "/login", (req, res) =>
    db.login.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (login) {
      if (!login) {
        res.json('Invalid params');
      } else {
        bcrypt.compare(req.body.password, login.password, function (err, result) {
          if (result == true) {
            res.json(login);
          } else {
            res.json('Incorrect password');
          }
        })
      }
    })
  );
  
  app.post("/signup", (req, res) => 
    db.login.create({
      firstName: req.body.firstName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    }).then( (result) => res.json(result) )
  );
}