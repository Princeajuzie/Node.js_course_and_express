const express = require("express");
const { people } = require("./data");
const App = express();

// static assets
App.use(express.static("./methods-public"));
// parse form data 
App.use(express.urlencoded({ extended: false }))
// parse json
App.use(express.json()) 
 
App.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });

});

App.post('/api/people', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(401).json({success:false, msg:"please provide name value"})
  }
  res.status(201).json({success: true, person:name})
})

App.post('/api/postman/people', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(401)
      .json({ success: false, msg: "please provide name value" });
  }
  res.status(201).json({ success: true, date: [...people,name] });
})

App.post('/login', (req, res) => {
  const { name, email } = req.body;
  if (name && email) {
    
    res.status(201).send(`hello ${name} with the email of ${email} welcome`)
  } else {
    res.status(401).send('please provide cresidentials')
  }
})



App.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const person = people.find((persons) => persons.id === Number(id));
  if (!person) {
    return res.status(404).json({success: false, msg: `no person with id ${id}`})
  }
  const newPerson = people.map((persons) => {
    if (persons.id === Number(id)) {
      persons.name = name
    }
    return person
  })
   res.status(200).json({success: true, data:newPerson})

})
App.delete('/api/people/:id', (req, res) => {
   const person = people.find((persons) => persons.id === Number(req.params.id ));
   if (!person) {
     return res
       .status(404)
       .json({ success: false, msg: `no person with id ${id}` });
   }

})
App.listen(5000, () => {
  console.log("server is listening to port 5000..");
});
