var express = require("express");
var app = express();
var cors = require("cors");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
var routers = express.Router();
var Complaint = require('../models/complaints.model')
var Zonal = require('../models/zonal.model')
var mcurl = 'mongodb+srv://jvdimvp:Pradeep903@cluster0.d2cwd.mongodb.net/Bhashyam?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mcurl)
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch((err)=>{
    console.log(err)
})


routers.get("/complaintsbybranch",(req,res)=>{
    Complaint.find()
    .then((data)=>{
        console.log(data);
        res.json(data);
    })
    .catch((err)=>{
        console.log(err)
    })
})

routers.post('/addzonal',(req,res)=>{
    var newBranch = new Zonal(req.body);
    newBranch.save()
    .then((zonalofficer)=>{
        console.log(zonalofficer);
        res.json({msg:'Zonal Added'})
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({ msg: "zonal add failed", error: err.message });
    })
})

module.exports = routers;