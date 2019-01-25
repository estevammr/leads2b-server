const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];

module.exports = (app, db) => {
  app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

  app.post( "/login", (req, res) =>
    db.login.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (login) {
      if (!login) {
        res.json({message: "Invalid params"});
      } else {
        bcrypt.compare(req.body.password, login.password, function (err, result) {
          if (result == true) {
            let token = jwt.sign(login.toJSON(), config.jwt, {
              expiresIn: 1440
            });
            res.json({ 
              user: login,
              token: token
            });
          } else {
            res.json({message: "Incorrect password"});
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

  app.use(function(req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if (token) {
      jwt.verify(token, config.jwt, function(err, decoded) {      
        if (err) {
          return res.json({success: false, message: 'Token is invalid!'});    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      return res.status(403).send({ 
        success: false, 
        message: 'Token is not provided.' 
      });       
    }
  });
}