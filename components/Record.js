import { GoTrashcan } from 'react-icons/go'
import {HiOutlinePencilAlt} from 'react-icons/hi'
import {BsArrowUp, BsArrowDown} from 'react-icons/bs'
import {useState, useEffect} from 'react'
import DeleteModal from 'components/modals/DeleteModal'
import EditModal from 'components/modals/EditModal'
import AddFightModal from 'components/modals/AddFightModal'
import  Link from 'next/link'

export default function Record({ fighterData, setFighterData, user, setUser, saveChangeSubmit, cancelChangesHandler}) {
    
    const [displayDeleteFightModal, setDisplayDeleteFightModal] =  useState("")
    const [displayEditFightModal, setDisplayEditFightModal] =  useState("")
    const [displayAddFightModal, setDisplayAddFightModal] =  useState("")
    const [fightIdToDelete, setFightIdToDelete] = useState()
    const [fightInfoToEdit, setFightInfoToEdit] = useState()
    

    const tblHeaderAndFooter = (
        <>
            <tr>
                <th>Result</th>
                <th>Date</th>
                <th>Opponent</th>
                <th>Event</th>
                <th>Location</th>
                <th>Method</th>
                <th>Round</th>
                <th>Time</th>
                {/* {user ? <th>Add Fight Above</th>: null}
                {user ? <th>Add Fight Below</th>: null} */}
                {user ? <th>Edit</th>: null}
                {user ? <th>Delete</th>: null}
            </tr>
        </>
    )


    const mobileTblHeaderAndFooter = (
        <>
            <tr>
                <th>Result</th>
                <th>Date</th>
                <th>Opponent</th>
                <th>Event, <br />Location</th>
                <th>Method, <br />Round, <br />Time</th>
                {/* {user ? <th>Add Fight Above</th>: null}
                {user ? <th>Add Fight Below</th>: null} */}
                {user ? <th>Edit</th>: null}
                {user ? <th>Delete</th>: null}
            </tr>
        </>
    )

    const deleteSubmit = (event) => {
        event.preventDefault()
        setDisplayDeleteFightModal("is-active")
        setFightIdToDelete(event.target.id)
    }
    
    const deleteConfirm = (event) => {
        event.preventDefault()
        const { fights } = fighterData
        const filteredFights = fights.filter(fight => fight._id != fightIdToDelete)
        setFighterData(prevState => {
            return {...prevState, fights: filteredFights}
        })

        //make put call with current fighterdata
        setDisplayDeleteFightModal("")
        
    }
    
    const editHandler = (event) => {
        event.preventDefault()
        setFightInfoToEdit(fighterData.fights.find(fight => fight._id == event.target.id))
        setDisplayEditFightModal("is-active")

        
    }
    
    const addHandler = (event) => {
        event.preventDefault()
        setDisplayAddFightModal("is-active")
        
    }
    
    
    const optionalRow = (clickHandler, icon, id, classNames="") => {
        return (
                <td>
                    <button className={`button ${classNames}`} onClick={clickHandler} id={id}>
                        {icon}
                    </button>
                </td>
        )
    }
    
    const patchHandler = (event) => {
        event.preventDefault()
        // check every fighter and filter ones with fake IDS (they have a fakeId property)
        
        const cleanedFighter = fighterData.map(fight => {
            if(fight.hasOwnProperty("fakeId"))
            {
                delete fight._id
                delete fight._fakeId
                return fight
            }
            else return fight
        })
    }

    const table = (additionalClasses, isMobile) => {

        return (
            <div className={`table-container ${additionalClasses}`}>
                <table className="table is-hoverable is-striped is-fullwidth">
                    <thead>{isMobile ? mobileTblHeaderAndFooter : tblHeaderAndFooter}</thead>
                    <tfoot>{isMobile ? mobileTblHeaderAndFooter : tblHeaderAndFooter}</tfoot>
                    <tbody>
                        {
                            fighterData.fights.map(fight => {
                                const opponentHasPage = fighterData.opponentLinks.find(opponent => opponent.opponentName == fight.opponent)
                                return (
                                    <tr key={fight._id}>
                                        {/* <th className={fight.result.toLowerCase() == "win"
                                        ? "is-success" : fight.result.toLowerCase() == "loss"
                                            ? "is-danger" : "is-warning"}>{fight.result}</th> */}
                                        <th>
                                            <span className="win">{fight.result}</span>
                                        </th>
                                        <td>{fight.eventDate}</td>
                                        <td>
                                        { opponentHasPage  ?
                                                <>
                                                    <Link href={`/fighters/${opponentHasPage.opponentPageId}`}><a>{fight.opponent}</a></Link>
                                                </>
                                                : fight.opponent}
                                        </td>
                                        {isMobile ?
                                            <>
                                                <td>{fight.eventName} <br/> <br /> {fight.location}</td>
                                                <td>{fight.method} <br /> <br /> {fight.round} <br /> <br /> {fight.time}</td>
                                            </>
                                        :
                                            <>
                                                <td>{fight.eventName}</td>
                                                <td>{fight.location}</td>
                                                <td>{fight.method}</td>
                                                <td>{fight.round}</td>
                                                <td>{fight.time}</td>
                                            </>
                                        }
                                        {user ?
                                           (
                                                <>
                                                    {/* {optionalRow(deleteSubmit, <BsArrowUp/>, fight._id )}
                                                    {optionalRow(deleteSubmit, <BsArrowDown/>, fight._id)} */}
                                                    {optionalRow(editHandler, <HiOutlinePencilAlt/>, fight._id)}
                                                    {optionalRow(deleteSubmit, <GoTrashcan/>, fight._id, "is-danger")}
                                                </>    
                                            ) : null
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <>
            <DeleteModal displayDeleteFightModal={displayDeleteFightModal} setDisplayDeleteFightModal={setDisplayDeleteFightModal} deleteConfirm={deleteConfirm}/>
            {/* {<EditModal displayEditFightModal={displayEditFightModal} setDisplayEditFightModal={setDisplayEditFightModal} editConfirm={editHandler} fightInfoToEdit={fightInfoToEdit} setFightInfoToEdit={setFightInfoToEdit}/>} */}
            {fightInfoToEdit && <EditModal displayEditFightModal={displayEditFightModal} setDisplayEditFightModal={setDisplayEditFightModal} fightInfoToEdit={fightInfoToEdit} fighterData={fighterData} setFighterData={setFighterData}/>}
            {<AddFightModal displayAddFightModal={displayAddFightModal} setDisplayAddFightModal={setDisplayAddFightModal} fighterData={fighterData} setFighterData={setFighterData}/>}
            
            <section className="section">
                <div className="container">
                    <div className="box">
                        {user &&
                            <div className="is-flex is-justify-content-flex-end">
                                <button className="button is-primary mb-3" onClick={addHandler}>Add Fight</button>
                            </div>
                        }            
                        {table("is-hidden-mobile", false)}
                        {table("is-hidden-tablet", true)}
                        {user &&
                            <div className="is-flex is-justify-content-space-between">
                                <button className="button is-warning" onClick={cancelChangesHandler}>Cancel Changes</button>
                                <button className="button is-danger" onClick={saveChangeSubmit}>Save Changes</button>
                            </div>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
