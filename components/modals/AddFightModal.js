import React, { useState, useEffect } from 'react'

export default function AddFightModal({ displayAddFightModal, setDisplayAddFightModal, setFighterData, fighterData }) {

    const [result, setResult] = useState("")
    const [date, setDate] = useState("")
    const [opponent, setOpponent] = useState("")
    const [event, setEvent] = useState("")
    const [location, setLocation] = useState("")
    const [method, setMethod] = useState("")
    const [round, setRound] = useState("")
    const [time, setTime] = useState("")

    const textInput = (label, currentValue, inputHandler, placeHolder) => {
        return (
            <div className="field">
                <label className="label">{label}</label>
                <div className="control">
                    <input className="input" type="text" placeholder={placeHolder} value={currentValue} onChange={inputHandler} />
                </div>
            </div>
        )
    }

    const confirmClickHandler = (e) => {
        e.preventDefault()
        let fightsCopy = [...fighterData.fights]
        fightsCopy = [
            ...fightsCopy,
            {
                _id: Math.floor(Math.random() * 1000000),
                fakeId: true,
                result: result,
                eventDate: date,
                opponent: opponent,
                eventName: event,
                location: location,
                method: method,
                round: round,
                time: time
            }
        ]
        const sortedFights = fightsCopy.sort((fightOne, fightTwo) => new Date(fightTwo.eventDate) - new Date(fightOne.eventDate))



        setFighterData(prevState => {
            return {
                ...prevState,
                fights: fightsCopy
            }
        })
        setDisplayAddFightModal("")
        setResult("")
        setDate("")
        setOpponent("")
        setEvent("")
        setLocation("")
        setMethod("")
        setRound("")
        setTime("")



    }



    return (
        <div className={`modal ${displayAddFightModal}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Fight Editor</p>
                    <button className="delete" aria-label="close" onClick={() => setDisplayAddFightModal("")}></button>
                </header>
                <section className="modal-card-body">
                    {
                        <>
                            {textInput("Result", result, (e) => setResult(e.target.value), "e.g. Win or Loss or Draw")}
                            {textInput("Date", date, (e) => setDate(e.target.value), "e.g. 19 November 2016")}
                            {textInput("Opponent", opponent, (e) => setOpponent(e.target.value), "e.g. Sagat Petyindee")}
                            {textInput("Event", event, (e) => setEvent(e.target.value), "e.g. Glory 77: Rotterdam")}
                            {textInput("Location", location, (e) => setLocation(e.target.value), "e.g. Rotterdam, Netherlands")}
                            {textInput("Method", method, (e) => setMethod(e.target.value), "e.g. Decision (Split)")}
                            {textInput("Round", round, (e) => setRound(e.target.value), "e.g. 4")}
                            {textInput("Time", time, (e) => setTime(e.target.value), "e.g. 3:53")}

                        </>
                    }
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-danger" onClick={confirmClickHandler}>Save Changes</button>
                    <button className="button" onClick={() => setDisplayAddFightModal("")}>Cancel</button>
                </footer>
            </div>
        </div>
    )
}
