import React, { useState, useEffect } from 'react'


export default function EditModal({ displayEditFightModal, setDisplayEditFightModal, fightInfoToEdit, fighterData, setFighterData}) {
    // console.log(fightInfoToEdit);

    const [result, setResult] = useState("")
    const [date, setDate] = useState("")
    const [opponent, setOpponent] = useState("")
    const [event, setEvent] = useState("")
    const [location, setLocation] = useState("")
    const [method, setMethod] = useState("")
    const [round, setRound] = useState("")
    const [time, setTime] = useState("")

    useEffect(() => {
        setResult(fightInfoToEdit.result)
        setDate(fightInfoToEdit.eventDate)
        setOpponent(fightInfoToEdit.opponent)
        setEvent(fightInfoToEdit.eventName)
        setLocation(fightInfoToEdit.location)
        setMethod(fightInfoToEdit.method)
        setRound(fightInfoToEdit.round)
        setTime(fightInfoToEdit.time)
    }, [fightInfoToEdit])

    const textInput = (label, currentValue, inputHandler) => {
        return (
            <div className="field">
                <label className="label">{label}</label>
                <div className="control">
                    <input className="input" type="text" placeholder="Text input" value={currentValue} onChange={inputHandler} />
                </div>
            </div>
        )
    }

    const confirmClickHandler = (e) => {
        e.preventDefault()
        const fightsCopy = [...fighterData.fights]
        const fightIndex = fightsCopy.findIndex(fight => fight._id == fightInfoToEdit._id)
        fightsCopy[fightIndex] = {
            ...fightInfoToEdit,
            result: result,
            eventDate: date,
            opponent: opponent,
            eventName: event,
            location: location,
            method: method,
            round: round,
            time: time
        }
        const sortedFights = fightsCopy.sort((fightOne, fightTwo) => new Date(fightTwo.eventDate) - new Date(fightOne.eventDate))
        


        setFighterData(prevState => {
            return {
                ...prevState,
                fights: fightsCopy
            }
        })
        setDisplayEditFightModal("")
    }

    return (
        <div className={`modal ${displayEditFightModal}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Fight Editor</p>
                    <button className="delete" aria-label="close" onClick={() => setDisplayEditFightModal("")}></button>
                </header>
                <section className="modal-card-body">
                    {
                        <>
                            {textInput("Result", result, (e) => setResult(e.target.value))}
                            {textInput("Date", date, (e) => setDate(e.target.value))}
                            {textInput("Opponent", opponent, (e) => setOpponent(e.target.value))}
                            {textInput("Event", event, (e) => setEvent(e.target.value))}
                            {textInput("Location", location, (e) => setLocation(e.target.value))}
                            {textInput("Method", method, (e) => setMethod(e.target.value))}
                            {textInput("Round", round, (e) => setRound(e.target.value))}
                            {textInput("Time", time, (e) => setTime(e.target.value))}

                        </>
                    }
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-danger" onClick={confirmClickHandler}>Save Changes</button>
                    <button className="button" onClick={() => setDisplayEditFightModal("")}>Cancel</button>
                </footer>
            </div>
        </div>
    )
}
