const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const config = require("../config/database")

// Quote schema
const QuoteSchema = mongoose.Schema({
    quote: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
})

const Quote = (module.exports = mongoose.model("quote", QuoteSchema))

module.exports.saveQuote = (quote, callback) => {
    quote
        .save()
        .then(quoteData => {
            callback(null, quoteData)
        })
        .catch(err => {
            console.log(err)
            callback("error")
        })
}

module.exports.findUserQuotes = (username, callback) => {
    Quote.find({ username: username }, (err, docs) => {
        if (err) {
            console.log(err)
            callback(err, null)
        } else {
            callback(null, docs)
        }
    })
}

module.exports.getFeaturedQuotes = callback => {
    Quote.count({}, (err, totalDocuments) => {
        const pipeline = [{ $sample: { size: 10 } }]

        Quote.aggregate(pipeline)
            .then(featuredQuotes => {
                callback(null, featuredQuotes)
            })
            .catch(err => {
                callback(err, null)
            })
    })
}
