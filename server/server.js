

const express = require("express")
const bodyParser = require('body-parser')
const cors = require("cors")
const app = express()
app.use(cors())
app.use(bodyParser.json())
/*
const mysql = require('mysql');
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "lab1"
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});
*/
const mysql = require('mysql');
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "charity_org"
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

/*
const con_online = mysql.createConnection({
  host: "sql11.freemysqlhosting.net",
  user: "sql11667038",
  password: "y5ZKWH7dtf",
  database: "sql11667038"
});



con_online.connect((err) => {
  if (err) throw err;
  console.log("Connected online!");
});
*/


app.post("/api/signin", (req,res)=>{
    con.query('SELECT * FROM volunteers where V_ID = ? and Pass = ?' ,[req.body.V_ID,req.body.Pass], function (err, result) {
      if (err) throw err
      if (result[0] === undefined)
      {
        return res.json("Not found")
      }
      return res.json(JSON.stringify(result[0]))
    });
})

app.post("/api/leader/updateAccount", (req,res)=>{
  con.query('Update volunteers set FName = ? , LName = ? , Email = ? , Phone = ? , Pass = ? where V_ID = ?' ,[req.body.FName,req.body.LName,req.body.Email,req.body.Phone,req.body.Pass,req.body.V_ID], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("Not found")
    }
    return res.json(JSON.stringify(result[0]))
  });
})

app.post("/api/leader/selectTeam", (req,res)=>{
  con.query('SELECT * FROM volunteers where TeamID = ? and V_ID != ?' ,[req.body.TeamID,req.body.V_ID], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No team members")
    }
    return res.json(JSON.stringify(result))
  });
})

app.post("/api/leader/selectTeamOrdered", (req,res)=>{
  con.query('SELECT * FROM volunteers where TeamID = ? and V_ID != ? order by Points DESC' ,[req.body.TeamID,req.body.V_ID], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No team members")
    }
    return res.json(JSON.stringify(result))
  });
})

app.post("/api/leader/addVolunteer", (req,res)=>{
  con.query('INSERT INTO Volunteers (FName, LName, VRole, Email, Phone, Pass, Join_Date, DoB, Gender, Promoted, Event_Request, Points, TeamID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)' ,[req.body.FName,req.body.LName,req.body.VRole,req.body.Email,req.body.Phone,req.body.Pass,req.body.Join_Date,req.body.DoB,req.body.Gender,req.body.Promoted,req.body.Event_Request,req.body.Points,req.body.TeamID], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No team members")
    }
    return res.json(JSON.stringify(result))
  });
})

app.post("/api/leader/updatePoints", (req,res)=>{
  con.query('Update volunteers set Points = ? where V_ID = ?' ,[req.body.Points,req.body.V_ID], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("Not found")
    }
    return res.json(JSON.stringify(result[0]))
  });
})


app.get("/api/leader/selectBenef", (req,res)=>{
  con.query('SELECT * FROM beneficiarires', function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No Beneficiariaries")
    }
    return res.json(JSON.stringify(result))
  });
})

app.post("/api/leader/addBenef", (req,res)=>{
  con.query('INSERT INTO beneficiarires (Address,FirstName, LastName, State) VALUES (?, ?, ?, ?)' ,[req.body.Address,req.body.FirstName,req.body.LastName,req.body.State], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No team members")
    }
    return res.json(JSON.stringify(result))
  });
})

app.post("/api/leader/createAid", (req,res)=>{
  con.query('INSERT INTO aid (A_Type, A_Date, Quantity, B_ID) VALUES (?, ?, ?, ?)' ,[req.body.A_Type,req.body.A_Date,req.body.Quantity,req.body.B_ID], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No team members")
    }
    return res.json(JSON.stringify(result))
  });
})

app.post("/api/leader/eventRequest", (req,res)=>{
  con.query('Update volunteers set Event_Request = ? where V_ID = ?' ,[req.body.Event,req.body.V_ID], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("Not found")
    }
    return res.json(JSON.stringify(result[0]))
  });
})

app.get("/api/leader/getEvents", (req,res)=>{
  con.query('SELECT * FROM Events', function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No Beneficiariaries")
    }
    return res.json(JSON.stringify(result))
  });
})

app.post("/api/leader/selectVechicle", (req,res)=>{
  con.query('SELECT D_ID , Capacity FROM transportation where Is_Cargo = ? and next_event = null',[req.body.Type], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No Beneficiariaries")
    }
    return res.json(JSON.stringify(result))
  });
})


var listener = app.listen(5000,()=>{console.log(listener.address().port)})