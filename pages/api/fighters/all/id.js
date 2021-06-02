import { mongoose, Fighter } from 'lib/db'

export default async function(req, res) {

    const ids = await Fighter.find({}, "_id name nationality total wins losses")
    if(!ids) return res.status(404).send("couldn't find fighter")
    res.status(200).send(ids)
}
