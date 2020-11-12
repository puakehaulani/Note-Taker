const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    const databuffer = fs.readFileSync(path.join(__dirname, "../db/db.json"));
    const dataJson = databuffer.toString();
    const dataParse = JSON.parse(dataJson);
    res.json(dataParse);

});
router.post("/", function (req, res) {
    const databuffer = fs.readFileSync(path.join(__dirname, "../db/db.json"));
    const dataJson = databuffer.toString();
    const dataParse = JSON.parse(dataJson);
    const newNote = { "title": req.body.title, "text": req.body.text };
    dataParse.push(newNote);
    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(dataParse), err => {
        if (err) throw err;
        console.log("New note added to database!");
    })
    res.send(newNote);
});

// app.delete("/:id", function (req, res) {

// });

module.exports = router
