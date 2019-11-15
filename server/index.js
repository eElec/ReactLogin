const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const sql = require("mysql");
const path = require("path");

//SETUP
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8080;

//ROUTES
const api = require("./routes/api");
const auth = require("./routes/auth");
app.use("/api", api);
app.use("/auth", auth);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/../build")));
    app.get("*", (req, res) => {
        res.sendfile(path.join((__dirname = "/../build/index.html")));
    });
} else {
    app.use(express.static(path.join(__dirname, "/../public")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + "/../public/index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
});
