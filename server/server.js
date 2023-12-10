

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



app.get("/api/v1",(req,res)=>{
    return res.json({"users" : "user2"})
})


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

app.post("/api/updateAccount", (req,res)=>{
  console.log(JSON.stringify(req.body.V_ID))
  con.query('Update volunteers set FName = ? , LName = ? , Email = ? , Phone = ?  where V_ID = ?' ,[req.body.FName,req.body.LName,req.body.Email,req.body.Phone,req.body.V_ID], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("Not found")
    }
    return res.json(JSON.stringify(result[0]))
  });
})


var listener = app.listen(5000,()=>{console.log(listener.address().port)})