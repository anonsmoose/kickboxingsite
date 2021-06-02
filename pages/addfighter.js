import react, {useState, useEffect, useRef} from 'react'
import Record from 'components/Record'
import FighterInformation from 'components/FighterInformation'
import superagent from 'superagent'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function addfighter({ user, setUser }) {

    const  router = useRouter()
    const [fighterDataModified, setFighterDataModified] = useState({fights: []})


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




        superagent.post(`/api/fighters`)
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
                    router.push(`/fighters/${res.body._id}`)
                }
            })
            .catch(error => console.log(error))
    }

    const cancelChangesHandler = (e) => {
        e.preventDefault()
        setFighterDataModified({fights: []})
    }

    return (
        <div>
            <Head>
                <title>{`Kicksio | Add A Fighter`}</title>
                <meta name="description" content={`Add a Fighter To Kicksio's Database`}/>
                <meta name="keywords" content={`Kickboxing, Muay Thai, Database, Add, Fighter, Kicksio`}/>
            </Head>
            {/* <section className="hero is-primary"> */}
            {/*     <div className="hero-body"> */}
            {/*         <p className="title"> */}
            {/*             {fighterData.name} */}
            {/*         </p> */}
            {/*     </div> */}
            {/* </section> */}
            <div>
                <FighterInformation fighterData={fighterDataModified} setFighterData={setFighterDataModified} user={user} setUser={setUser}/>
                <Record fighterData={fighterDataModified} setFighterData={setFighterDataModified} user={user} setUser={setUser} saveChangeSubmit={saveChangeSubmit} cancelChangesHandler={cancelChangesHandler}/>
            </div>
            <button className="button" onClick={() => setFighterDataCopy(Math.random()*100)}> test</button>
        </div>
    )
}
