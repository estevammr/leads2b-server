module.exports = (app, db) => {
  app.get( "/employees", (req, res) =>
    db.employee.findAll().then( (result) => res.json(result) )
  );
  
  app.get( "/employee/:id", (req, res) =>
    db.employee.findById(req.params.id).then( (result) => res.json(result))
  );
  
  app.post("/employee", (req, res) => 
    db.employee.create({
      title: req.body.title,
      content: req.body.content
    }).then( (result) => res.json(result) )
  );
  
  app.put( "/employee/:id", (req, res) =>
    db.employee.update({
      title: req.body.title,
      content: req.body.content
    },
    {
      where: {
        id: req.params.id
      }
    }).then( (result) => res.json(result) )
  );
  
  app.delete( "/employee/:id", (req, res) =>
    db.employee.destroy({
      where: {
        id: req.params.id
      }
    }).then( (result) => res.json(result) )
  );
}