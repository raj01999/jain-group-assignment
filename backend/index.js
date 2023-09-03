const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DataBase = {};

app.get("/data/:id", async (req, res) => {
  const id = req.params.id;
  res.status(200).json(DataBase[id] ? DataBase[id] : []);
});

app.post("/data/:id", async (req, res) => {
  const id = req.params.id;
  if (DataBase[id]) {
    DataBase[id] = [...DataBase[id], req.body.input];
  } else {
    DataBase[id] = [req.body.input];
  }
  res.status(200).json(DataBase[id] ? DataBase[id] : []);
});

app.delete("/data/:id", async (req, res) => {
  const id = req.params.id;
  const index = req.body.index;
  if (DataBase[id]) {
    DataBase[id] = DataBase[id].filter((value, idx) => index != idx);
  }
  res.status(200).json(DataBase[id] ? DataBase[id] : []);
});

app.listen(process.env.PORT || 8000, (err) => {
  console.log("Server is running");
});
