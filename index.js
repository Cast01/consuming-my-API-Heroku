const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const FoodModel = require("./models/Food");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASEURI);

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

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("BackEnd ouvindo.");
});
