import axios from 'axios';
import { FaGithub } from "react-icons/fa"
import { GoTrashcan } from 'react-icons/go'
import react, {useState, useEffect, useRef} from 'react'
import Record from 'components/Record'
import FighterInformation from 'components/FighterInformation'
import superagent from 'superagent'
import { useRouter } from 'next/router'
import {  Fighter } from 'lib/db'
import Head from 'next/head'
import fs from 'fs'
import saveDatabaseLocally from 'lib/saveDatabaseLocally'
import os from 'os'
import NavBar from 'components/navbar'



export default function fighter({ fighterData, user, setUser }) {

    const  router = useRouter()

    if(router.isFallback)
    {
        return (
            <section className="section">
                <div className="container">
                    <h1>Loading...</h1>
                </div>
            </section>
        )
    }

    const [fighterDataCopy, setFighterDataCopy] = useState(Object.assign({}, fighterData))
    const [fighterDataModified, setFighterDataModified] = useState(Object.assign({}, fighterData))
    const first = useRef(true)


    useEffect(() => {
        if(first.current) {
            first.current = false
            return
        }
        setFighterDataModified(Object.assign({}, fighterData))
        setFighterDataCopy(Object.assign({}, fighterData))
    }, [fighterData])

    const saveChangeSubmit = () => {

        const fightsCopy = [...fighterDataModified.fights]

        const fightsCleaned = fightsCopy.map(fight => {
            if(fight.hasOwnProperty("fakeId")) {
                delete fight.fakeId
                delete fight._id
                return fight
            } else {
                return fight
            }

        })




        superagent.put(`/api/fighters/${fighterDataModified._id}`)
            .send({
                ...fighterDataModified,
                fights: fightsCleaned
            })
            .withCredentials()
            .then(res => {
                if(res.status == 200)
                {
                    //successful modified the fighter data
                    //display notification
                    // setFighterDataCopy(res.body)
                    console.log(res.body)
                    router.reload()
                }
            })
            .catch(error => console.log(error))
    }

    const cancelChangesHandler = (e) => {
        e.preventDefault()
        setFighterDataModified(fighterData)
    }

    // console.log(fighterData.fights.length)
    // console.log(fighterData.history)

    // console.log(fighterData.opponentLinks)



    return (
        <div>
            <Head>
                <title>{`Kicksio | ${fighterData.name}'s Kickboxing/Muay Thai Record`}</title>
                <meta name="description" content={`Kickboxing and Muay Thai Record Of ${fighterData.name}`}/>
                <meta name="keywords" content={`Kickboxing, Muay Thai, Record, Rankings, Elo, ${fighterData.name}`}/>
            </Head>
            <NavBar opaqueDropdown={true}/>
            <section className="hero is-primary">
                <div className="hero-body">
                    <p className="title">
                        {fighterData.name}
                    </p>
                </div>
            </section>
            <div>
                <FighterInformation fighterData={fighterDataModified} setFighterData={setFighterDataModified} user={user} setUser={setUser}/>
                <Record fighterData={fighterDataModified} setFighterData={setFighterDataModified} user={user} setUser={setUser} saveChangeSubmit={saveChangeSubmit} cancelChangesHandler={cancelChangesHandler}/>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const fighters = await Fighter.find({}, "_id name nationality total wins losses fights")
    const paths = fighters.filter(fighter => {
        return fighter.fights && fighter.fights.length >= 2
    })
    .map(fighter => {
        return {
            params: {
                id: fighter._id.toString()
            }
        }
    })

    return {
        // paths,
        paths: paths,
        fallback: true
    }

}

export async function getStaticProps({ params }) {
    const fetchFighterData = await Fighter.findOne({_id: params.id})
    const fighterData = JSON.parse(JSON.stringify(fetchFighterData))
    const opponentLink = []

    if(!fs.existsSync(os.tmpdir() + '/fighters.json'))
    {
        await saveDatabaseLocally()
    }

    const fighters = JSON.parse(fs.readFileSync(os.tmpdir() + '/fighters.json', 'utf8'))

    // const fightersGrab = await Fighter.find({},"_id, name")
    // const fightersGrabData = JSON.parse(JSON.stringify(fightersGrab))
    // const fighters = {}
    // for (const fighter of fightersGrabData)
    // {
    //     fighters[fighter.name] = fighter._id
    // }

    for (const opponent of fighterData.fights)
    {
        const fetchOpponentData = fighters[opponent.opponent]
        const opponentData = fetchOpponentData
        if(opponentData)
        {
            opponentLink.push({
                opponentName: opponent.opponent,
                opponentPageId: opponentData._id
            })
        }
    }

    fighterData.opponentLinks = opponentLink.filter(opponent => (opponent.opponentName && opponent.opponentPageId))

    return {
        props: {
            fighterData
        },
        revalidate: 10
    }

}
