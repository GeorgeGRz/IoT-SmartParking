const express = require('express')
const util = require("./utility")
const cors = require('cors');

const twofactor = require("node-2fa");
var qs = require('querystring');

const bcrypt = require("bcrypt")
const saltRounds = 10;
var mongoose = require('mongoose');

const uri = require("./conf.js").uri;


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var carSchema = new mongoose.Schema({
    carId: String,
    password: String,
    joined: { type: Date, default: Date.now },
    parked : {type: Boolean, default: false}
  });
const car = mongoose.model("Cars", carSchema);  

const app = express()
const port = 3030
app.use(cors())
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());



app.get('/cars', function(req,res){
    
    
    res.contentType('application/json');
    //res.send(JSON.stringify({"cars":result}));
    util.findItems().then((value) => {res.send(JSON.stringify({"cars":value}))});
    
});


app.post("/register",async (req,res)=>{
    console.log("REGISTER " + req.body.user_passwd);
    //util.registerVehicle(req.body.carId,req.body.user_passwd).then((value)=>res.send(JSON.stringify({"status":"Car registered succesfully"})));
    try {
        
        const hashedPwd = await bcrypt.hash(req.body.user_passwd, saltRounds);
        
        car.exists({carId:req.body.carId},async (err,result)=>{
            console.log(result)
            if(result == null){
                const insertResult = await car.create({
                    carId: req.body.carId,
                    password: hashedPwd,
                  })
                res.json({status:true,message:"USER CREATED"});
            }
            else{
                res.json({status:false,message:"USER EXISTS"});
            }
        })
        //util.findUsers().then((value)=>{console.log(value)})
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured");
      }

});
app.post("/login",async (req,res)=>{
    console.log("LOGIN " + req.body.user_passwd);
    /*
    OLD SEGMENT USING COLLECTION AND NOT SCHEMA
    util.login(req.body.carId,req.body.user_passwd).then((value)=>{
        if(value.length == 0){
            res.json({
                status:false,
                message : "Wrong username or password"
            })
        }
        else{
            res.json({
                status:true,
                message : "User logged in"
            })
            
        }
    });*/
    try {
        const user = await car.findOne({ carId: req.body.carId });
        console.log(user);
        if (user) {
          const cmp = await bcrypt.compare(req.body.user_passwd, user.password, function(err, result) { 
              if(result == true)
                res.json({status:true,message:"Sucess"});
              else
                res.json({status:false,message:"Wrong username or password"});
          });
        } else {
          res.send("Wrong username or password.");
        }
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured");
      }
});
app.post("/nodes",function(req,res){
    console.log("NODES " + req.body);
    util.getNodes().then((value)=>{console.log(value);res.send(JSON.stringify({"status":"1",nodes:value}))});
});

/*
app.post("/update",function(req,res){
    console.log("UPDATE " + req.body);
    
});

app.post('/verify',function(request,response){
    console.log("VERIFY  " + request.body["_id"] +" "+ request.body["token"]);
    
    util.verifySecret(request.body["_id"]).then((value)=>{
        if(twofactor.verifyToken(value[0].secret.secret,request.body["token"]) === null){
            util.updateVerificationFlag(request.body["_id"],false);
            //wrong token
            response.send(JSON.stringify({"status":"0"}))
        }
        else{
            util.updateVerificationFlag(request.body["_id"],true);
            response.send(JSON.stringify({"status":"1"}));
        }
        
    })

    
});


app.post('/authenticate', async (req, res)=>{
    console.log("AUTHENTICATE " + req.body.passwd);
    /*
        util.authenticate(request.body._id,request.body.passwd).then((value)=>{
            if(value.length == 0){
                response.json({
                    status:false,
                    message : "Wrong username or password"
                })
            }
            else{
                
                
                const newSecret = twofactor.generateSecret({ name: "IoTparking", account: request.body._id });
                
                util.updateSecret(request.body._id,newSecret);
                const newToken = twofactor.generateToken(newSecret.secret);
                console.log(newToken);
                response.json({
                    status:true,
                    message : newToken
                })
            }
        });
   
    try {
        const user = await car.findOne({ _id: req.body._id });
        console.log(user);
        if (user) {
          const cmp = await bcrypt.compare(req.body.passwd, user.password, function(err, result) { 
              if(result == true)
                res.json({status:true,message:"Sucess"});
              else
              res.json({status:false,message:"Wrong username or password"});
          });
        } else {
          res.send("Wrong username or password.");
        }
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured");
      }
});
 */
