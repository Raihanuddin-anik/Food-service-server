const express = require('express');
const app = express();
var cors = require('cors');
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
 
});
app.listen(process.env.PORT || 4000);