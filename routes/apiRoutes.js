const fs = require("fs");
const path = require("path");
const express = require("express");
const { runInNewContext } = require("vm");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

function readFile() {
    const databuffer = fs.readFileSync(path.join(__dirname, "../db/db.json"));
    const dataJson = databuffer.toString();
    return JSON.parse(dataJson);
}

router.get("/", function (req, res) {
    const dataParse = readFile();
    res.json(dataParse);

});
router.post("/", function (req, res) {
    const dataParse = readFile();
    const newNote = { "title": req.body.title, "text": req.body.text, "id": uuidv4() };
    dataParse.push(newNote);
    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(dataParse), err => {
        if (err) throw err;
        console.log("New note added to database!");
    })
    res.send(newNote);
});

router.delete("/:id", function (req, res) {
    const notes = readFile();
    const updatedNotes = notes.filter(note => note.id !== req.params.id);
    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(updatedNotes), err => {
        if (err) throw err;
        console.log("Note deleted!");
    })
    res.end();
});

module.exports = router
