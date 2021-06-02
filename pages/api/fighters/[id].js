import { mongoose, Fighter } from "lib/db"

const ObjectId  = mongoose.Types.ObjectId

export default async function getFighter(req, res) {
    // console.log(req.session.user)

    const id = req.query.id

    if(req.method == 'PUT')
    {
        if(!req.body)  return res.status(400).send("include a body that defines a fighter")
        if(!id) return res.status(400).send("Please invalid an ID")
        if(!ObjectId.isValid(id)) return res.status(400).send("Fighter ID is invalid")
        
        const requestedFighter = await Fighter.findOne({_id: id})
        if(!requestedFighter) return res.status(404).send("couldn't find fighter")
        
        // const updatedFighter = await Fighter.updateOne({_id: id}, req.body)
        const updatedFighter = await Fighter.findOneAndUpdate({_id: id}, req.body)
        
        return res.send(updatedFighter)
    }

    if(req.method == 'GET')
    {
        if(!id) return res.status(400).send("Please include an id")
        if(!ObjectId.isValid(id)) return res.status(400).send("fighter ID is invalid")
        const requestedFighter = await Fighter.findOne({_id: id})
        if(!requestedFighter) return res.status(404).send("couldn't find fighter")
        res.status(200).send(requestedFighter)
    }

    if(req.method == 'DELETE')
    {
        if(!id) return res.status(400).send("include a fighter ID");
        if(!ObjectId.isValid(id)) return res.status(400).send("Fighter ID is invalid")
        
        const deleteFighter = await Fighter.deleteOne({_id: id})
        console.log(deleteFighter);
        if(deleteFighter) return res.send(deleteFighter)
        return res.status(400).send(deleteFighter)
    }


}
