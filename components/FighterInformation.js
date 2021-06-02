import {useState} from 'react'
import EditFighterInfo from 'components/modals/EditFighterInfo.js'
import { Line } from 'react-chartjs-2'


export default function FighterInformation({fighterData, setFighterData,  user, setUser}) {
    const [displayFighterInfoModal, setDisplayFighterInfoModal] = useState("")

    const editFighterInfoHandler = (e) => {
        e.preventDefault();
        setDisplayFighterInfoModal("is-active")
    }

    // const formattedData = []

    // for(let i = 1; i < fighterData.history.ratingHistory.length; i++)
    // {
    //     formattedData.push({
    //         // t: i != 0 ? new Date(fighterData.history.fightDates[i]) : new Date(fighterData.history.fightDates[i + 1]) - 5184000,
    //         t: new Date(fighterData.history.fightDates[i]),
    //         y: Math.round(fighterData.history.ratingHistory[i])
    //     })
    // }


    const fighterStatLookup = 
    {
        "total": "Total Bouts",
        "winsByKnockout": "Wins By Knockout",
        "lossesByKnockout": "Losses By Knockout",
        "birthPlace": "Birth Place",
        "birthDate": "Birth Date"
    }

    const fighterStatLookupProperties = Object.getOwnPropertyNames(fighterStatLookup)


    const data = {}
    const options = {}

    if(fighterData.history)
    {


        data.labels = fighterData.history.fightDates
        data.datasets = 
            [
                {
                    label: 'rating',
                    data: fighterData.history.ratingHistory.map(rating => Math.round(rating)),
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)'
                }
            ]

        options.title = {display: true, text: 'Fighter Rating Over Time'}
        options.legends = {display: false}
        // options.scales = {
        //     xAxes: [{
        //         type: 'time',
        //         time: {unit: 'month'}
        //     }]
        // }
    }


    return (
        <>
            {user && <EditFighterInfo  displayFighterInfoModal={displayFighterInfoModal} setDisplayFighterInfoModal={setDisplayFighterInfoModal} fighterData={fighterData}  setFighterData={setFighterData}/ >}

            <section className="section">
                <div className="container">
                    <section className="section">
                        {user && <div className="is-flex is-justify-content-flex-end"><button className="button is-primary" onClick={editFighterInfoHandler}>Edit Fighter Information</button></div>}
                    </section>
                    <div className="tile is-ancestor">
                        <div className="tile is-parent">
                            <div className="tile is-child box">
                                <figure className="image">
                                    {fighterData.image ?
                                        <img src={fighterData.image} alt="fighter picture"/>
                                        :
                                        <img src="/placeholderavatar.jpg" alt="fighter picture"/>
                                    }
                                </figure>
                            </div>
                        </div>
                        <div className="tile is-vertical is-parent is-7">
                            <article className="tile is-child message fighter-bio">
                                <div className="message-header">
                                    Fight Information
                                </div>
                                {fighterData.bio &&
                                    <div className="message-body">
                                        {fighterData.bio}
                                    </div>
                                }
                            </article>
                        </div>
                        <article className="tile is-child message fighter-info">
                            <div className="message-header">
                                Information
                            </div>
                            <div className="message-body">
                                <ul>
                                    {
                                        (() => {
                                            const { image, fights, _id, __v, opponentLinks, history, bio, name, ...filteredFighterData } = fighterData
                                            let properties = Object.getOwnPropertyNames(filteredFighterData)
                                            return properties.map(property => {
                                                if(fighterStatLookupProperties.includes(property))
                                                {
                                                    return <li key={property}>{`${fighterStatLookup[property]}: ${fighterData[property]}`}</li>
                                                }
                                                return <li key={property}>{`${property.charAt(0).toUpperCase() + property.slice(1)}: ${fighterData[property]}`}</li>
                                            })
                                        })()
                                    }
                                </ul>
                            </div>
                        </article>
                    </div>
                    {fighterData.history &&
                        <div className="box">
                            <Line data={data} options={options}/>
                        </div>
                    }
                </div>
            </section>
        </>
    )
}
