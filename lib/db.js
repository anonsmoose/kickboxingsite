const mongoose = require('mongoose')
const { userSchema } = require("lib/models/user")
const { fighterSchema }  = require("lib/models/fighter")

import dotenv from 'dotenv'
dotenv.config()

const kickConnection = mongoose.createConnection(process.env.KICK_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const userConnection = mongoose.createConnection(process.env.USER_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

// const kickConnection = mongoose.createConnection('mongodb://localhost:27017/kickboxing', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
// const userConnection = mongoose.createConnection('mongodb://localhost:27017/users', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
// mongoose.connect('mongodb+srv://bob123:syntax@cluster0.upmwt.azure.mongodb.net/mma?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const Fighter = kickConnection.model("Fighter", fighterSchema)
const User = userConnection.model("User", userSchema)

module.exports = { Fighter, User, mongoose}
