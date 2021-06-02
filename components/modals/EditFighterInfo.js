
import React, { useState, useEffect } from 'react'


export default function EditFighterInfo({ displayFighterInfoModal, setDisplayFighterInfoModal, fighterData, setFighterData}) {
    // console.log(fightInfoToEdit);

    const [nationality, setNationality] = useState("")
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")
    const [style, setStyle] = useState("")
    const [stance, setStance] = useState("")
    const [total, setTotal] = useState("")
    const [wins, setWins] = useState("")
    const [losses, setLosses] = useState("")
    const [birthPlace, setBirthPlace] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [name, setName] = useState("")
    const [biography, setBiography] = useState("")

    useEffect(() => {
        setNationality(fighterData.nationality)
        setHeight(fighterData.height)
        setWeight(fighterData.weight)
        setStyle(fighterData.style)
        setStance(fighterData.stance)
        setTotal(fighterData.total)
        setWins(fighterData.wins)
        setLosses(fighterData.losses)
        setBirthPlace(fighterData.birthPlace)
        setBirthDate(fighterData.birthDate)
        setName(fighterData.name)
        setBiography(fighterData.biography)

    }, [fighterData])

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

    const textArea = (label, currentValue, inputHandler) => {
        return (
            <div className="field">
                <label className="label">{label}</label>
                <div className="control">
                    <textarea className="textarea" placeholder="e.g. Hello world" value={currentValue} onChange={inputHandler}></textarea>
                </div>
            </div>
        )
    }

    const confirmClickHandler = (e) => {
        e.preventDefault()


        setFighterData(prevState => {
            return {
                ...prevState,
                nationality: nationality,
                height: height,
                weight: weight,
                style: style,
                stance: stance,
                total: total,
                wins: wins,
                losses: losses,
                birthPlace: birthPlace,
                birthDate: birthDate,
                name: name
            }
        })
        setDisplayFighterInfoModal("")
    }

    return (
        <div className={`modal ${displayFighterInfoModal}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Fight Information Editor</p>
                    <button className="delete" aria-label="close" onClick={() => setDisplayFighterInfoModal("")}></button>
                </header>
                <section className="modal-card-body">
                    {
                        <>
                            {textArea("Biography", biography, (e) => setBiography(e.target.value))}
                            {textInput("Nationality", nationality, (e) => setNationality(e.target.value))}
                            {textInput("Height", height, (e) => setHeight(e.target.value))}
                            {textInput("Weight", weight, (e) => setWeight(e.target.value))}
                            {textInput("Style", style, (e) => setStyle(e.target.value))}
                            {textInput("Stance", stance, (e) => setStance(e.target.value))}
                            {textInput("Total", total, (e) => setTotal(e.target.value))}
                            {textInput("Wins", wins, (e) => setWins(e.target.value))}
                            {textInput("Losses", losses, (e) => setLosses(e.target.value))}
                            {textInput("Birth Place", birthPlace, (e) => setBirthPlace(e.target.value))}
                            {textInput("Birth Date", birthDate, (e) => setBirthDate(e.target.value))}
                            {textInput("Name", name, (e) => setName(e.target.value))}

                        </>
                    }
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-danger" onClick={confirmClickHandler}>Save Changes</button>
                    <button className="button" onClick={() => setDisplayFighterInfoModal("")}>Cancel</button>
                </footer>
            </div>
        </div>
    )
}
