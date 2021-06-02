export default async function(req, res, next) {

    console.log(req.cookies)
    if(!req.session.user) return res.status(403).send("unauthorized")
    return next()

}
