import { mongoose, Fighter } from 'lib/db'
import sessionMiddleware from "middlewares/session"
import nextConnect from "next-connect"
import isUserLoggedIn from 'middlewares/isUserLoggedIn.js'
import Elo from 'elo-calculator'


const handler = nextConnect()
// handler.use(sessionMiddleware)
// handler.use(isUserLoggedIn)

handler.post(async  (req, res) =>  {
    const elo  = new Elo({
        rating: 2200
    })

    const fighters = await Fighter.find({}, "_id name fights")

    
    const fighterTable = {}

    // filter duplicate fights out
    const fightList = fighters.reduce((fights, fighter) => {
        // const listOfFights = fights.concat(fighter.fights)
        const modifiedFights = fighter.fights.map(fight => {
            const newFight = {fightId: fight._id, eventDate: fight.eventDate, name: fighter.name, fighterId: fighter._id, opponent: fight.opponent, result: fight.result, eventName: fight.eventName}
            if(!fighterTable.hasOwnProperty(newFight.name)) fighterTable[newFight.name] = [newFight]
            else {
                fighterTable[newFight.name].push(newFight)
            }
            if(!fighterTable.hasOwnProperty(newFight.opponent)) fighterTable[newFight.opponent] = [newFight]
            else {
                fighterTable[newFight.opponent].push(newFight)
            }
            return newFight
        })

        modifiedFights.filter(fightCandidate => {
            const fights = fighterTable[fightCandidate.name]
            for(let i = 0; i < fights.length; i++)
            {
                const fightCandidateDate = new Date (fightCandidate.eventDate)
                const existingFightDate = new Date(fights[i].eventDate)

                if(fightCandidate.eventName && fights[i].eventName)
                {
                    if(fightCandidate.eventName.toLowerCase() == fights[i].eventName.toLowerCase() && fightCandidateDate == existingFightDate) return false
                }

                if(fightCandidate.opponent && fights[i].name && fightCandidate.eventName && fights[i].eventName)
                {
                    if(fightCandidate.opponent.toLowerCase() == fights[i].name.toLowerCase() && fightCandidate.eventName.toLowerCase() == fights[i].eventName.toLowerCase())
                    {
                        return false
                    }
                }

            }

            return true
        })

        const listOfFights = fights.concat(modifiedFights)

        return listOfFights
    }, [])


    const filteredFightList = fightList.filter(fight => {
        const fightDate = new Date(fight.eventDate)
        return fightDate != "Invalid Date"
    })
        .filter(fight => {
            const validResults = ["Win", "Loss", "Draw"]
            return validResults.includes(fight.result)
        })
    filteredFightList.sort((fightOne, fightTwo) => {
        const fightOneDate = new Date(fightOne.eventDate)
        const fightTwoDate = new Date(fightTwo.eventDate)
        return fightOneDate - fightTwoDate

    })
    // console.log(filteredFightList)
    // res.send(filteredFightList)


    let players = {};
    for(let i = 0; i < filteredFightList.length; i++)
    {
        const fighterName = filteredFightList[i].name;
        const opponentName = filteredFightList[i].opponent
        if(!players.hasOwnProperty(fighterName))
        {
            players[fighterName] = elo.createPlayer();
            players[fighterName].history = {ratingHistory: [players[fighterName].rating], fightDates: ["Initial Rating"]}
        }
        if(!players.hasOwnProperty(opponentName)) 
        {
            players[opponentName] = elo.createPlayer();
            // players[opponentName].ratingHistory = [players[fighterName].rating]
            players[opponentName].history = {ratingHistory: [players[opponentName].rating], fightDates: [filteredFightList[i].eventDate]}
        }
    }

    for(let i = 0; i < filteredFightList.length; i++)
    {
        const resultTable = {"Loss": 0, "Win": 1, "Draw": 0.5}
        const fight = filteredFightList[i]
        const player = players[fight.name]
        const opponent = players[fight.opponent]
        elo.updateRatings([[
            player,
            opponent,
            resultTable[fight.result]
        ]])

        // player.ratingHistory.push(player.rating)
        player.history.ratingHistory.push(player.rating)
        player.history.fightDates.push(fight.eventDate)


    }

    const rankings = [];
    for (const fighter in players)
    {
        rankings.push({
            name: fighter,
            numFights: players[fighter].numberOfGamesPlayed,
            // peakRating: players[fighter].rating
            peakRating: players[fighter].highestRating,
            history: players[fighter].history
        })
    }

    rankings.sort((fighterOne, fighterTwo) => {
        return fighterTwo.peakRating - fighterOne.peakRating
    })
    
    for(let i = 0; i < rankings.length; i++)
    {
        const fighter = fighters.find(fighter => fighter.name == rankings[i].name)
        if(fighter)
        {
            fighter.history = rankings[i].history
            const updatedFighter = await Fighter.findOneAndUpdate({_id: fighter._id}, fighter)
        }
    }

    // res.send(rankings)
    // res.send(players)


    res.send("Finished updating rankings")
    

    // if(!req.body)  return res.status(400).send("include a fighter")
    // const fighter = new Fighter(req.body)
    // const fighterSave = await fighter.save();
    // if(fighterSave) return res.send(fighterSave)
})
export default handler
