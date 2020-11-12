// DEPENDENCIES

const express = require("express");

// EXPRESS CONFIGURATION

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// ROUTER
app.use("/api/notes", require("./routes/apiRoutes"));
app.use("/", require("./routes/htmlRoute"));

// LISTENER

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
