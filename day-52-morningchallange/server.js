const express = require("express");
const mongoose = require("mongoose");

const DB_URI = "mongodb+srv://placesapi:D0r0mrcoA5k0BYiJ@cluster0.byl7yuy.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log("Connected to DB"))
    .catch((e) => console.log(e))

const router = require("./routes/place")
const app = express();

app.use(express.json());

app.use('/place', router);

app.listen(8000 || process.env.PORT);