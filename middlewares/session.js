import session from 'express-session'
import MongoStore from 'connect-mongo'
import mongoose from 'mongoose'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()


export default function sessionMiddleware(req, res, next) {

    return session({
    secret: process.env.SESSION_SECRET || "secret",
    store: MongoStore.create({ mongoUrl: process.env.SESSION_URI }),
    resave: false,
    saveUninitialized: true,
    cookie: {secure: process.env.NODE_ENV === 'production'},
    proxy: true
    // cookie: {secure: process.env.NODE_ENV === 'production', httpOnly: false}
    })(req, res, next)
}
