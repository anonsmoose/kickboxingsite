const mongoose = require('mongoose')

const FightSchema = new mongoose.Schema({
    result: String,
    opponent: String,
    eventDate: String,
    eventName: String,
    location: String,
    method: String,
    round: String,
    time: String
});

const RatingSchema = new mongoose.Schema({
    ratingHistory: [String],
    fightDates: [String]

})


const fighterSchema = new mongoose.Schema({
    name: String,
    image: String,
    nationality: String,
    birthDate: String,
    birthPlace: String,
    height: String,
    weight: String,
    reach: String,
    style: String,
    stance: String,
    total: String,
    wins: String,
    winsByKnockout: String,
    losses: String,
    lossesByKnockout: String,
    draws: String,
    fights: [FightSchema],
    history: RatingSchema
});



module.exports  = { fighterSchema };
