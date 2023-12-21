
const cors = require("cors")
const mysql = require('mysql')
const express = require("express")
const bodyParser = require('body-parser')


const app = express()
app.use(cors())
app.use(bodyParser.json())


const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "charity_org1"
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

// Signin 
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



//Leader
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

app.post("/api/leader/updateBest", (req,res)=>{
  con.query('Update volunteers set best_member = ? where V_ID = ?' ,[req.body.best,req.body.V_ID], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("Not found")
    }
    return res.json(JSON.stringify(result[0]))
  });
})

app.post("/api/leader/updatePromoted", (req,res)=>{
  con.query('Update volunteers set Promoted = 1 where V_ID = ?' ,[req.body.V_ID], function (err, result) {
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
  con.query('SELECT ID, FirstName, LastName, State, Max(A_Date) as Last_AID_Date FROM beneficiaries left join aid on B_ID = ID group by ID', function (err, result) {
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
  con.query('INSERT INTO beneficiaries (Address,FirstName, LastName, State) VALUES (?, ?, ?, ?)' ,[req.body.Address,req.body.FirstName,req.body.LastName,req.body.State], function (err, result) {
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

app.get("/api/leader/selecttrans", (req,res)=>{
  con.query('SELECT D_ID, FirstName, LastName, Capacity, Is_Cargo FROM transportation', function (err, result) {
    console.log(result)
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No Drivers Yet ya 7ob")
    }
    return res.json(JSON.stringify(result))
  });
})

app.post("/api/leader/addtrans", (req,res)=>{
  con.query('INSERT INTO transportation (FirstName, LastName, Capacity, Is_Cargo, Production_Year, Plate, Phone) VALUES (?, ?, ?, ?, ?, ?, ?)' ,[req.body.FirstName,req.body.LastName,req.body.Capacity,req.body.Is_Cargo,req.body.Production_Year,req.body.Plate,req.body.Phone], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("error ya 7ob")
    }
    return res.json(JSON.stringify(result))
  });
})


//Volunteer
app.get("/api/volunteer/getEvents", (req,res)=>{
  con.query('SELECT * FROM Events', function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No team members")
    }
    return res.json(JSON.stringify(result))
  });
})



app.post("/api/volunteer/selectVechicle", (req,res)=>{
  con.query('SELECT D_ID , Capacity FROM transportation where Is_Cargo = ? and next_event = null',[req.body.Type], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No team members")
    }
    return res.json(JSON.stringify(result))
  });
})


app.post("/api/volunteer/getParticipations", (req,res)=>{
  con.query('SELECT * FROM participation where V_ID = ?' ,[req.body.V_ID], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No team members")
    }
    return res.json(JSON.stringify(result))
  });
})

//Admin

app.post("/api/Admin/addevent", (req,res)=>{
  con.query('INSERT INTO events (Descrip, url, Location, E_Date) VALUES (?, ?, ?, ?)' ,[req.body.Descrip,req.body.url,req.body.Location,req.body.E_Date], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("error ya 7ob")
    }
    return res.json(JSON.stringify(result))
  });
})

app.post("/api/Admin/updateevent", (req,res)=>{
  con.query('Update events set Descrip = ? , url = ? , Location = ? , E_date = ? where E_ID = ?' ,[req.body.Descrip,req.body.url,req.body.Location,req.body.E_Date,req.body.E_ID], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("Not found")
    }
    return res.json(JSON.stringify(result[0]))
  });
})
app.get("/api/Admin/selectallteams", (req,res)=>{
  con.query('SELECT T_ID, Location, Department, TPoints, Leader, Best_Team FROM teams', function (err, result) {
    console.log(result)
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No teams Yet ya 7ob")
    }
    return res.json(JSON.stringify(result))
  });
})

app.get("/api/Admin/selectleaders", (req,res)=>{
  con.query('SELECT V_ID, FName, LName, Email, Phone, DoB FROM volunteers WHERE VRole="Head"', function (err, result) {
    console.log(result)
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No Heads Yet ya 7ob")
    }
    return res.json(JSON.stringify(result))
  });
})

app.post("/api/Admin/addleader", (req,res)=>{
  con.query('INSERT INTO volunteers (FName, LName, VRole, Email, Phone, Pass, Join_Date, DoB, Gender, Promoted, Event_Request, Points,TeamID, best_member) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)' ,[req.body.FName,req.body.LName,req.body.VRole,req.body.Email,req.body.Phone,req.body.Pass,req.body.Join_Date,req.body.DoB,req.body.Gender,req.body.Promoted,req.body.Event_Request,req.body.Points,req.body.TeamID,req.body.best_member], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No team members")
    }
    return res.json(JSON.stringify(result))
  });
})

var listener = app.listen(5000,()=>{console.log(listener.address().port)})