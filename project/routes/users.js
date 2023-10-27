const express = require("express")
const router = express.Router()
const passport = require("passport")
const jwt = require("jsonwebtoken")
const config = require("../config/database")

const User = require("../models/user")
const Quote = require("../models/quote")

// Register
router.post("/register", (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        images: req.body.images,
    })

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: "User registration failed" })
        } else {
            res.json({ success: true, msg: "User registered" })
        }
    })
})

// Authentication
router.post("/authenticate", (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err
        if (!user) {
            return res.json({ success: false, msg: "User not found" })
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err

            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800,
                })

                res.json({
                    success: true,
                    token: "JWT " + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                    },
                })
            } else {
                return res.json({ success: false, msg: "Incorrect password" })
            }
        })
    })
})

// Profile
router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
        res.json({ user: req.user })
    }
)

// Quoting page
router.get(
    "/quote",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
        res.json({ user: req.user })
    }
)

// Save quote
router.post("/saveQuote", (req, res, next) => {
    let newQuote = new Quote({
        quote: req.body.quote,
        username: req.body.username,
        date: req.body.date,
    })

    Quote.saveQuote(newQuote, (err, quote) => {
        if (err) {
            console.log(err)
            res.json({ success: false, msg: "Saving quote failed" })
        } else {
            res.json({ success: true, msg: "Quote saved" })
        }
    })
})

// Single user quotes
router.get(
    "/quotes",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
        Quote.findUserQuotes(req.query.username, (err, docs) => {
            if (err) {
                console.log(err)
            } else {
                res.json({ quotes: docs })
            }
        })
    }
)

// Featured quotes
router.get("/quotes/featured", (req, res, next) => {
    Quote.getFeaturedQuotes((err, docs) => {
        if (err) {
            console.log(err)
        } else {
            res.json({ featuredQuotes: docs })
        }
    })
})

module.exports = router
