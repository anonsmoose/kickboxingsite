import bcrypt from 'bcrypt'
import { mongoose, User } from 'lib/db'
// import session from "express-session"
import sessionMiddleware from "middlewares/session"
import nextConnect from "next-connect"

const handler = nextConnect()

handler.use(sessionMiddleware)
handler.post(async (req, res) => {
    console.log("HELLO")

    if(!req.body) return res.status(400).send("include a username and password");
    if(!req.body.username) return res.status(400).send("include a username");
    if(!req.body.password) return res.status(400).send("include a password");

    
    
    
    const user = await User.findOne({username: req.body.username})
    if(!user) return res.status(404).send("either incorrect username or password")
    
    bcrypt.compare(req.body.password, user.password, (error, result) => {
        if(!result) return res.status(403).send("either incorrect username or password")
        req.session.user = user._id
        return res.send({user: user._id})
        // return res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3000')
        // .setHeader("Access-Control-Allow-Credentials", true)
        // .send({user: user._id})
    })
})

export default handler
