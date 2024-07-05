const express = require("express");
const cors = require("cors");
const { MongoClient}= require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const url = "mongodb+srv://aparnaprasad2004:SsAFXN7OpalNyCLP@contacts.hq3fuzm.mongodb.net/?retryWrites=true&w=majority&appName=contacts";
const dbName = "cont5july";

app.post("/add",(req, res) => {
    const client = new MongoClient(url);
    const db = client.db(dbName);
    const coll = db.collection("person");
    const record = {
        "_id":req.body.name,
        "phone": req.body.phone, 
        "email": req.body.email, 
        "address": req.body.address };
    coll.insertOne(record)
    .then(result => res.send(result))
    .catch(error => res.send(error));
});

app.get("/list", (req, res) => {
    const client = new MongoClient(url);
    client.connect();
    const db = client.db(dbName);
    const coll = db.collection("person");
    coll.find({}).toArray()
    .then(result => res.send(result))
    .catch(error => res.send(error));
    
});

app.delete("/del", (req, res) => {
    const client = new MongoClient(url);
    client.connect();
    const db = client.db(dbName);
    const coll = db.collection("person");
    coll.deleteOne({ _id: req.body.name})
    .then(result => res.send(result))
    .catch(error => res.send(error));
});

app.put("/update", (req, res) => {
    const client = new MongoClient(url);
    client.connect();
        const db = client.db(dbName);
        const coll = db.collection("person");
        const whom = {  "_id":  req.body.name};
        const what = { "$set": { 
                "name": req.body.name,
                "phone": req.body.phone,
                "email": req.body.email,
                "address": req.body.address
            } };
        coll.updateOne(whom, what)
        .then(result => res.send(result))
        .catch(error => res.send(error));
   
});

app.listen(9000, () => {
    console.log("ready @9000");
});