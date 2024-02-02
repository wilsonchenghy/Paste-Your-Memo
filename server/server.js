const express = require("express");
const mongoose = require("mongoose");
const { ObjectId } = require('mongoose').Types;
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());


const mongodbConnectionString = "mongodb://127.0.0.1:27017/memos?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1";

mongoose.connect(mongodbConnectionString, {})
    .then(() => {console.log("Connected to MongoDB")})
        .catch((error) => {console.error("Error connecting to MongoDb: ", error)});

const memoSchema = new mongoose.Schema({
    content: String,
});

const Memos = mongoose.model("memos", memoSchema)


app.post("/memos", async(request, response) => {
    const {content} = request.body;

    try {
        const newMemo = new Memos({content});
        await newMemo.save();
        response.status(201).json(newMemo);
    } catch(error) {
        response.json({error: error.message});
    }
});


app.get("/memos", async(request, response) => {
    try{
        const memos = await Memos.find();
        response.json(memos);
    } catch(error) {
        response.json({error: error.message});
    }
});


app.delete("/memos/:id", async(request, response) => {
    const id = request.params.id;

    try{
        const memoToBeDeleted = await Memos.findByIdAndDelete(id);
        response.json(memoToBeDeleted);
    } catch(error) {
        response.json({ error: error.message });
    }
});


app.put("/memos/:id", async(request, response) => {
    const id = request.params.id;
    const content = request.body.content;

    try{
        const updatedMemo = await Memos.findByIdAndUpdate(id, {content: content}, {new: true});
        response.json(updatedMemo);
    } catch(error) {
        response.json({error: error.message})
    }
});


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});