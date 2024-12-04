const fs = require('fs');
const {validationResult} = require('express-validator');
let Users = JSON.parse(fs.readFileSync('./data/users.json','utf-8'));

const getAllUsers = (req, res) => {
  res.json(Users);
};

const getSingleUser = (req, res) => {
  const id = +req.params.id;
  const user = Users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  res.json(user);
};

const addUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  let user = { id: Users[Users.length - 1].id + 1, ...req.body };
  Users.push(user);
  fs.writeFile("./data/users.json", JSON.stringify(Users), "utf-8", (err) => {
    if (err) {
      throw err;
    }
  });
  res.status(201).json(user);
};

const updateUser = (req,res)=>{
  const id = +req.params.id;
  let user = Users.find(user=>user.id === id);
  if (!user) {
    return res.status(404).json({message:"user not found"});
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  Users[id-1] = {...user,...req.body};
  fs.writeFile('./data/users.json',JSON.stringify(Users),'utf-8',(err)=>{
    if (err) {
      throw err;
    }
  });
  res.status(200).json(Users[id-1]);
 
};

const deleteUser = (req,res)=>{
  const id = +req.params.id;
  let user = Users.find(user => user.id === id);
  if (!user) {
    return res.status(404).json({message:"user not found"});
  }
  //Users.splice(id-1,1);
  Users = Users.filter(user => user.id !== id);
  fs.writeFile('./data/users.json',JSON.stringify(Users),'utf-8',(err)=>{
    if (err) {
      throw err;
    }
  });
  res.status(200).json(Users);
 
};

module.exports = {
  getAllUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser
};