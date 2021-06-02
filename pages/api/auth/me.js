import sessionMiddleware from "middlewares/session"
import nextConnect from "next-connect"

const handler = nextConnect()

handler.use(sessionMiddleware)
handler.get(async (req, res) => {
    console.log(req.session);
    if(!req.session.user) return res.status(400).send("no user is logged in")
    console.log("desu");

    res.send({user: req.session.user})
})

export default handler
