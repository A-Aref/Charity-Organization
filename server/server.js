
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

app.post("/api/signinV", (req,res)=>{
    con.query('SELECT * FROM volunteers where V_ID = ? and Pass = ?' ,[req.body.ID,req.body.Pass], function (err, result) {
      if (err) throw err
      if (result[0] === undefined)
      {
        return res.json("Not found")
      }
      return res.json(JSON.stringify(result[0]))
    });
}) 

app.post("/api/signinD", (req,res)=>{
  con.query('SELECT * FROM donors where Email = ? and Pass = ?' ,[req.body.ID,req.body.Pass], function (err, result) {
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

app.post("/api/volunteer/updateAccount", (req,res)=>{
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

app.post("/api/volunteer/selectvolunteer", (req,res)=>{
  con.query('SELECT * FROM volunteers where  V_ID = ?' ,[req.body.V_ID], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No volunteers")
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
  con.query('CALL UpdatePromoted(?)' ,[req.body.V_ID], function (err, result) {
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
  con.query('CALL SelectBeneficiaries()', function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No Beneficiariaries")
    }
    return res.json(JSON.stringify(result[0]))
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

app.post("/api/volunteer/addpart", (req,res)=>{
  con.query('INSERT INTO participation VALUES (?, ?, ?, ?, ?)' ,[req.body.P_Date,req.body.P_type,req.body.B_value,req.body.Bonus_Type, req.body.V_ID], function (err, result) {
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

app.post("/api/leader/avialableQuantity", (req,res)=>{
  con.query('Select  Quantity FROM total_quantity where D_Type = ?' ,[req.body.type], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("0")
    }
    return res.json(JSON.stringify(result[0]))
  });
})

app.post("/api/leader/updateTotalQuantity", (req,res)=>{
  con.query('Update total_quantity set Quantity= ? where D_Type = ?' ,[req.body.newQunantity,req.body.type], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("0")
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

app.post("/api/leader/getEvents", (req,res)=>{
  con.query('SELECT * FROM Events where E_Date> ?',[req.body.date], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No Beneficiariaries")
    }
    return res.json(JSON.stringify(result))
  });
})

app.post("/api/leader/selectVechicles", (req,res)=>{
  con.query('CALL SelectVehicle(?)',[req.body.Type], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No Beneficiariaries")
    }
    return res.json(JSON.stringify(result[0]))
  });
})

app.post("/api/leader/selectedVechicle", (req,res)=>{
  con.query('Update transportation set next_event = ? where D_ID = ?',[req.body.next,req.body.ID], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No Beneficiariaries")
    }
    return res.json(JSON.stringify(result[0]))
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
  con.query('INSERT INTO transportation (FirstName, LastName, Capacity, Is_Cargo, Production_Year, Plate, Phone,Total_Trips,next_event) VALUES (?, ?, ?, ?, ?, ?, ?,?,?)' ,[req.body.FirstName,req.body.LastName,req.body.Capacity,req.body.Is_Cargo,req.body.Production_Year,req.body.Plate,req.body.Phone,req.body.Total_Trips,req.body.next_event], function (err, result) {
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

app.post("/api/volunteer/getEvents", (req,res)=>{
  con.query('SELECT * FROM Events where E_ID = ?',[req.body.E_ID], function (err, result) {
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
  con.query('SELECT * FROM transportation where Is_Cargo = 0 and next_event = ?',[req.body.E_ID], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No team members")
    }
    return res.json(JSON.stringify(result))
  });
})


app.post("/api/volunteer/comfirmtransportation", (req,res)=>{
  con.query('insert into event_v values(?,?,?)',[req.body.EventsID, req.body.DriverID,req.body.VolunteerID], function (err, result) {
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

//Donor


app.post("/api/Donor/updateAccount", (req,res)=>{
  con.query('Update donors set Fname = ? , Lname = ? , Email = ? , Phone = ? , Pass = ? , Address = ? where DonorID = ?' ,[req.body.Fname,req.body.Lname,req.body.Email,req.body.Phone,req.body.Pass,req.body.Address,req.body.DonorID], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("Not found")
    }
    return res.json(JSON.stringify(result[0]))
  });
})

app.post("/api/Donor/createmoneydonation", (req,res)=>{
  con.query('INSERT INTO moneydonations (D_Date,Delivery,Purpose,Currency,Amount) VALUES (?, ?, ?, ?,?)' ,[req.body.D_Date,req.body.Delivery,req.body.Purpose,req.body.Currency,req.body.Amount], function (err, result) {
    console.log("hello")
    if (err) throw err 
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No money donations")
    }
    return res.json(JSON.stringify(result))
  });  
}) 


app.post("/api/Donor/createclothesdonation", (req,res)=>{
  con.query('INSERT INTO clothes (D_Date,Delivery,Size,Quality,C_Type,Quantity) VALUES (?, ?, ?, ?,?,?)' ,[req.body.D_Date,req.body.Delivery,req.body.Size,req.body.Quality,req.body.C_Type,req.body.Capacity], function (err, result) {
    console.log("aywaan")
    if (err) throw err 
    if (result[0] === undefined) 
    {
      console.log(err)
      return res.json("No Clothes donations")
    }
    return res.json(JSON.stringify(result)) 
  });  
}) 

app.post("/api/Donor/creategeneraldonation", (req,res)=>{
  con.query('INSERT INTO generaldonations(D_Date,Delivery,Descrip,Quantity) VALUES (?, ?, ?, ?)' ,[req.body.D_Date,req.body.Delivery,req.body.Descrip,req.body.Quantity], function (err, result) {
    console.log("aywaan3")
    if (err) throw err 
    if (result[0] === undefined) 
    {
      console.log(err)
      return res.json("No general donations")
    }
    return res.json(JSON.stringify(result)) 
  });  
}) 

app.post("/api/RegisterCheck", (req,res)=>{
  con.query('select * from donors where Email = ?' ,[req.body.Email], function (err, result) {
    if (err) throw err 
    if (result[0] === undefined) 
    {
      console.log(err)
      return res.json("Inserted successfully")
    }
    return res.json("Another account is using the same email") 
  });  
}) 

app.post("/api/Register", (req,res)=>{
  con.query('INSERT INTO donors(Phone,Email,Address,Fname,Lname,Pass) VALUES (?, ?, ?, ?,?,?)' ,[req.body.Phone,req.body.Email,req.body.Address,req.body.Fname,req.body.Lname,req.body.Password], function (err, result) {
    if (err) throw err 
    if (result[0] === undefined) 
    {
      console.log(err)
      return res.json("No donors")
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

app.post("/api/leader/addteam", (req,res)=>{
  con.query('INSERT INTO teams (Location, Department, TPoints, Leader, Best_Team) VALUES (?, ?, ?, ?,?)' ,[req.body.Location,req.body.Department,req.body.TPoints,req.body.Leader,req.body.Best_Team], function (err, result) {
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("error ya 7ob")
    }
    return res.json(JSON.stringify(result))
  });
})

app.get("/api/Admin/selectprom", (req,res)=>{
  con.query('SELECT V_ID, FName, LName, TeamID FROM volunteers WHERE Promoted=1', function (err, result) {
    console.log(result)
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No promotions Yet ya 7ob")
    }
    return res.json(JSON.stringify(result))
  });
})

app.get("/api/Admin/aidcount", (req,res)=>{
  con.query('call assets_report1(?,?)',[req.body.Descrip,req.body.url], function (err, result) {
    console.log(result)
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No aids Yet ya 7ob")
    }
    return res.json(JSON.stringify(result))
  });
})

app.get("/api/Admin/get_tq", (req,res)=>{
  con.query('call get_tq()', function (err, result) {
    console.log(result)
    if (err) throw err
    if (result[0] === undefined)
    {
      console.log(err)
      return res.json("No quantities Yet ya 7ob")
    }
    return res.json(JSON.stringify(result))
  });
})

var listener = app.listen(5000,()=>{console.log(listener.address().port)})
