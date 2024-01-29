const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());


const mongodbConnectionString = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1";

mongoose.connect(mongodbConnectionString, {})
    .then(() => {console.log("Connected to MongoDB")})
        .catch((error) => {console.error("Error connecting to MongoDb", error)});

const memoSchema = new mongoose.Schema({
    content: String,
});

const Memos = mongoose.model("Memos", memoSchema)


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});