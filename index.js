const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const FoodModel = require("./models/Food");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://gabrie_castilho:senha123456@pedrotech-tutorial-usin.zovde.mongodb.net/food?retryWrites=true&w=majority"
);

app.post("/insert", async (req, res) => {
  const { foodName, daysSinceIAte } = req.body;

  const food = new FoodModel({
    foodName,
    daysSinceIAte,
  });

  try {
    await food.save();
  } catch (error) {
    console.log(error);
  }
});

app.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }

    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("BackEnd ouvindo.");
});
