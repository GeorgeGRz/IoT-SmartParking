const express = require('express')
const util = require("./utility")
const cors = require('cors');

const twofactor = require("node-2fa");
var qs = require('querystring');

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


app.post("/register",function(req,res){
    console.log("REGISTER " + req.body.user_passwd);
     util.registerVehicle(req.body.carId,req.body.user_passwd).then((value)=>res.send(JSON.stringify({"status":"Car registered succesfully"})));
});

app.post("/nodes",function(req,res){
    console.log("NODES " + req.body);
    util.getNodes().then((value)=>{console.log(value);res.send(JSON.stringify({"status":"1",nodes:value}))});
});

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
app.post('/authenticate', function(request, response){
    console.log("AUTHENTICATE " + request.body);
    util.authenticate(request.body._id,request.body.passwd).then((value)=>{
        if(value.length == 0){
            response.json({
                status:false,
                message : "Wrong username or password"
            })
        }
        else{
            
            /*
                user authenticated
                Now we have to
                1. Generate secret for this specific car _id
                2. Save this secret for this specific car
                3. Generate token using that secret
                4. Send this token as response
             */
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
});
