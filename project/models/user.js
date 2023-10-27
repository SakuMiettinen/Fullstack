const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const config = require("../config/database")

// User schema
const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

const User = (module.exports = mongoose.model("User", UserSchema))

module.exports.getUserById = (id, callback) => {
    User.findById(id).then(user => {
        if (user) {
            callback(null, user)
        } else {
            callback("error", null)
        }
    })
}

module.exports.getUserByUsername = (username, callback) => {
    const query = { username: username }
    User.findOne(query).then(user => {
        if (user) {
            callback(null, user)
        } else {
            callback("error", null)
        }
    })
}

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err

            newUser.password = hash
            newUser
                .save()
                .then(user => {
                    callback(null, user)
                })
                .catch(err => {
                    console.log(err)
                    callback("error")
                })
        })
    })
}

module.exports.comparePassword = (candidatePass, hash, callback) => {
    bcrypt.compare(candidatePass, hash, (err, isMatch) => {
        if (err) throw err
        callback(null, isMatch)
    })
}
