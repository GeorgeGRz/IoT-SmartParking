const express = require('express')
const { MongoClient } = require('mongodb');
const uri = require("./conf.js").uri;
var mongoose = require('mongoose');
const twofactor = require("node-2fa");
var qs = require('querystring');

const app = express()
const port = 3030

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

const findItems = async() => {
    const client = await MongoClient.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    // specify the DB's name
    const db = client.db('parking');
    // execute find query
    const items = await db.collection('Car').find({}).project({carId:1, carIp:1,_id :1 }).toArray();
    // close connection
    
    client.close();
    
    return items;
}

const authenticate = async(id,passwd) =>{
    const client = await MongoClient.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    const db = client.db('parking');
    var cid = mongoose.Types.ObjectId(id);
    const items = await db.collection('Car').find({
        $and: [{ _id : cid }, { password: passwd }]
      }).toArray();
    
     //console.log(items); 

     client.close();
     return items;
}

const updateSecret = async(id,secret) => {
    const client = await MongoClient.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    const db = client.db('parking');
    var cid = mongoose.Types.ObjectId(id);
    const items = await db.collection('Car').updateOne(
        { _id: cid  },
        {
          $set: { 'secret': secret},
        });
    client.close();
    return items;
}

const verifySecret = async(id) => {
    const client = await MongoClient.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    const db = client.db('parking');
    var cid = mongoose.Types.ObjectId(id);

    const items = await db.collection('Car').find({_id:cid}).project({carId:1,secret : 1 }).toArray();

    client.close();

    return items;

}

const updateVerificationFlag = async(id,value)=>{
    const client = await MongoClient.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    const db = client.db('parking');
    var cid = mongoose.Types.ObjectId(id);
    const items = await db.collection('Car').updateOne(
    { _id: cid  },
    {
        $set: { 'authenticated': value},
    });
    client.close();

    return items;
}


app.get('/cars', function(req,res){
    
    
    res.contentType('application/json');
    //res.send(JSON.stringify({"cars":result}));
    findItems().then((value) => res.send(JSON.stringify({"cars":value})));
    
});

app.post('/verify',function(request,response){
    console.log("/VERIFY RECEIVED " + request.body["_id"] +" "+ request.body["token"]);
    
    verifySecret(request.body["_id"]).then((value)=>{
        if(twofactor.verifyToken(value[0].secret.secret,request.body["token"]) === null){
            updateVerificationFlag(request.body["_id"],false);
            response.send(JSON.stringify({"status":"Wrong token, user unidentified!"}))
        }
        else{
            updateVerificationFlag(request.body["_id"],true);
            response.send(JSON.stringify({"status":"User verified"}));
        }
        
    })

    
});
app.post('/authenticate', function(request, response){
    console.log(request.body);
    authenticate(request.body._id,request.body.passwd).then((value)=>{
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
            
            updateSecret(request.body._id,newSecret);
            const newToken = twofactor.generateToken(newSecret.secret);
            console.log(newToken);
            response.json({
                status:true,
                message : newToken
            })
        }
    });
});
