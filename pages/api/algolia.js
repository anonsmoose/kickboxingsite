import algoliasearch from "algoliasearch"
import superagent from 'superagent'
import { mongoose, Fighter } from 'lib/db'

const client = algoliasearch("3FEE2RU1FH", "081d4d3a3e58df517cb3ef027d86b0f3")

const algoliaHandler = async (req, res) => {
    const index = client.initIndex("fighters")

    const allFighter = await Fighter.find({}, "_id name nationality total wins losses")


    // console.log(allFighter.body)

    const fightersFormatted = allFighter.map(fighter => {
        return {
            objectID: fighter._id,
            name: fighter.name
        }
    })


    const fighters = await index.saveObjects(fightersFormatted)
    res.send(fighters)
}

export default algoliaHandler
