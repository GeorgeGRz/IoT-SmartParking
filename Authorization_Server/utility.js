var mongoose = require('mongoose');
const uri = require("./conf.js").uri;
const { MongoClient } = require('mongodb');
const findItems = async() => {
    const client = await MongoClient.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    // specify the DB's name
    const db = client.db('parking');
    // execute find query
    const items = await db.collection('Car').find({}).project({carId:1,_id :1,parked:1 }).toArray();
    // close connection
    
    client.close();
    
    return items;
}

const getNodes = async() => {
     const client = await MongoClient.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });   
    const db = client.db('parking');
    
    const items = await db.collection('Node').find({}).project({carId:1,nodeCol:1, nodeRow:1,_id :1,occupied:1 }).toArray();
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

const registerVehicle = async(carName,carPasswd)=>{
    const client = await MongoClient.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    const db = client.db('parking');
    
    const items = await db.collection('Car').insertOne(
        { carId : carName,password : carPasswd,
            authenticated : false,
            secret : "",
            entry : new Date(),
            parked:false,
           });
        client.close();
    
    return items;

}

module.exports = {findItems,getNodes,authenticate,updateSecret,verifySecret,updateVerificationFlag, registerVehicle}
