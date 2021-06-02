import bcrypt from 'bcrypt'
import { mongoose, User } from 'lib/db'
import dotenv from 'dotenv'
dotenv.config()


export default async function register(req, res) {

    if(!req.body) return res.status(400).send("include a username, password, and secret");
    if(!req.body.username) return res.status(400).send("include a username");
    if(!req.body.password) return res.status(400).send("include a password");

    //uncomment to force users to enter a secret to login
    if(!req.body.secret) return res.status(400).send("include a secret")
    if(req.body.secret != process.env.SECRET) return res.status(403).send({message: "incorrect secret"})
    
    const numUsers = await User.countDocuments({username: req.body.username})
    
    console.log(numUsers);

    if(numUsers) return res.status(403).send({message: "user taken"})
    
    const saltRounds = 10
    bcrypt.hash(req.body.password, saltRounds, async (error, hash) => {
        const user = new User({username: req.body.username, password: hash})
        const userSave = await user.save()
        if(!userSave) return res.status(400).send({message: "couldn't save user"})
        res.send("user added!")
    })
}
