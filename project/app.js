const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const cors = require("cors")
const passport = require("passport")
const mongoose = require("mongoose")
const config = require("./config/database")

mongoose.Promise = global.Promise
mongoose.connect(config.database)

mongoose.connection.on("connected", () => {
    console.log("connected to database " + config.database)
})

mongoose.connection.on("error", err => {
    console.log("database error" + err)
})

const app = express()

const PORT = 3000

const users = require("./routes/users")

app.use(cors())

// Set static folder
app.use(express.static(path.join(__dirname, "public")))

// Based on user "AJS" answer on https://stackoverflow.com/questions/9049993/node-js-how-to-limit-the-http-request-size-and-upload-file-size
app.use(bodyParser.json({ limit: "50mb" }))
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "50mb",
    })
)

// Passport middleware
app.use(
    require("express-session")({
        secret: config.secret,
        resave: true,
        saveUninitialized: true,
    })
)
app.use(passport.initialize())
app.use(passport.session())

require("./config/passport")(passport)

app.use("/users", users)

app.get("/", (req, res) => {
    res.send("Invalid endpoint")
})

app.listen(PORT, () => {
    console.log("Server started on port " + PORT)
})
