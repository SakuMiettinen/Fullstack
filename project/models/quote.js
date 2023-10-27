const mongoose = require("mongoose")

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
        // All the code under this is created by asking chatGPT to give a way to get 10
        // random documents from a collection. ChatGPT created a bunch of unnecessary code which
        // has been removed
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
