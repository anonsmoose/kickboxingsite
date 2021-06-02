import { mongoose, Fighter } from 'lib/db'
import sessionMiddleware from "middlewares/session"
import nextConnect from "next-connect"
import isUserLoggedIn from 'middlewares/isUserLoggedIn.js'

const handler = nextConnect()
// handler.use(sessionMiddleware)
// handler.use(isUserLoggedIn)

handler.post(async  (req, res) =>  {

    if(!req.body)  return res.status(400).send("include a fighter")
    const fighter = new Fighter(req.body)
    const fighterSave = await fighter.save();
    if(fighterSave) return res.send(fighterSave)
})
export default handler
