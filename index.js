const express = require('express');
const app = express();
var cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
app.use(cors());
var bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://food-serviceApp:dDi9qq9GdD9YWtMj@cluster0.ostva.mongodb.net/food-service?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const StudentCollection = client.db("food-service").collection('student-collection');
  const FoodCollection = client.db("food-service").collection('food-collection');
  const FoodDistribution = client.db("food-service").collection('food-distribution');

  app.post('/addStudent', (req, res) => {
    const Order = req.body
    StudentCollection.insertOne(Order)
      .then(result => {
        console.log(result)
        res.send(result.insertedCount > 0)

      })

  })
  app.post('/addFood', (req, res) => {
    const Order = req.body
    FoodCollection.insertOne(Order)
      .then(result => {
        console.log(result)
        res.send(result.insertedCount > 0)

      })

  })
  app.post('/distribution', (req, res) => {
    const Order = req.body
    FoodDistribution.insertOne(Order)
      .then(result => {
        console.log(result)
        res.send(result.insertedCount > 0)

      })

  })
  app.get('/students', (req, res) => {
    StudentCollection.find({})
      .toArray((err, document) => {
        res.send(document)
      })
  })

  app.get('/foods', (req, res) => {
    FoodCollection.find({})
      .toArray((err, document) => {
        res.send(document)
      })
  })

  app.patch('/update/:id', (req, res) => {
    console.log(req.body)
    StudentCollection.updateOne({ _id: ObjectId(req.params.id) },

      {
        $set: { sId: req.body.data.sId, 
              sName: req.body.data.sName ,
              roll: req.body.data.roll ,
              age: req.body.data.age ,
              class: req.body.data.class ,
              hall: req.body.data.hall ,
              status: req.body.data.status ,
        }

      })
      .then(result => {
        console.log(result)
        res.send(result.modifiedCount > 0)
      })
  })
  app.get('/student/:id', (req, res) => {
    StudentCollection.find({ _id: ObjectId(req.params.id) })
      .toArray((err, documents) => {
        res.send(documents[0])
      })
  })

});
app.listen(process.env.PORT || 4000);