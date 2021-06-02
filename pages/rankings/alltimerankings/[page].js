import Link from 'next/link'
import Head from 'next/head'
import { Fighter } from "lib/db"
import react, {useState, useEffect, useRef} from 'react'
import { useRouter } from 'next/router'
import fs from 'fs'
import saveDatabaseLocally from 'lib/saveDatabaseLocally'
import os from 'os'


export default function AllTimeRankings( {fighters, page, lastPage} )
{

    const router = useRouter()

    if(router.isFallback) {
        return (
            <div>Loading...</div>
        )
    }

    const fighterStringOfNames = fighters.map(fighter => fighter.name).join(", ")
    return (
        <>
            <Head>
                <title>{`Kicksio | All-time P4P Kickboxing Rankings`}</title>
                <meta name="description" content={`All-time P4P Kickboxing and Muay Thai Rankings, Fighters Ranked ${(page - 1) * fighters.length + 1} - ${page * fighters.length}`}/>
                <meta name="keywords" content={`Kickboxing, Muay Thai, Record, Rankings, Elo, ${fighterStringOfNames}`}/>
            </Head>
            <section className="section">
                <div className="container">
                    <h1 className="title has-text-centered">All-time Absolute Rankings</h1>
                    <article className="message is-warning">
                        <div className="message-header">
                            <p>A disclaimer on algorithmic rankings</p>
                        </div>
                        <div className="message-body">
                            The rating of a fighter is based on their fight history and in order to have a fair comparison between two fighters, they should have a similar history. Comparing  Buakaw and Giorgio Petrosyan is fair, but comparing Jemyma Betrian to Buakaw doesn't make much sense. These rankings shouldn't be taken as definitive and are meant to be a conversation starter.
                        </div>
                    </article>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="box">
                        <div className="table-container">
                            <table className="table is-fullwidth is-striped is-hoverable is-scrollable">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Name</th>
                                        <th>Nationality</th>
                                        <th>Peak Rating</th>
                                        <th>Wins</th>
                                        <th>Losses</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Name</th>
                                        <th>Nationality</th>
                                        <th>Peak Rating</th>
                                        <th>Wins</th>
                                        <th>Losses</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {
                                        fighters.map((fighter, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1 + ( (page - 1) * 20)}</td>
                                                    <td><Link href={`/fighters/${fighter._id}`}><a>{fighter.name}</a></Link></td>
                                                    <td>{fighter.nationality}</td>
                                                    <td>{Math.round(Math.max(...fighter.history.ratingHistory))}</td>
                                                    <td>{fighter.wins}</td>
                                                    <td>{fighter.losses}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <nav className="pagination" role="navigation" aria-label="pagination">
                            
                            <Link href={page != 1 ? `/rankings/alltimerankings/${Number(page) - 1}` : "/rankings/alltimerankings/1"}>
                                <a className="pagination-previous">Previous</a>
                            </Link>
                            <Link href={page != lastPage ? `/rankings/alltimerankings/${Number(page) + 1}` : `/rankings/alltimerankings/${lastPage}`}>
                                <a className="pagination-next">Next page</a>
                            </Link>
                            <ul className="pagination-list">
                            {page - 1 > 1 && 
                                <li>
                                    <Link href="/rankings/alltimerankings/1">
                                        <a className={`pagination-link`}>
                                            {1}
                                        </a>
                                    </Link>
                                </li>
                            }
                            {page - 1 > 1 && 
                                <li>
                                  <span className="pagination-ellipsis">&hellip;</span>
                                </li>
                            }
                            {page - 1 > 0 && 
                                <li>
                                    <Link href={`/rankings/alltimerankings/${Number(page) - 1}`}>
                                        <a className={`pagination-link`}>
                                            {Number(page) - 1}
                                        </a>
                                    </Link>
                                </li>
                            }
                            {
                                <li>
                                    <a className={`pagination-link is-current`}>
                                        {Number(page)}
                                    </a>
                                </li>
                            }
                            {page < lastPage - 1 && 
                                    <li>
                                        <Link href={`/rankings/alltimerankings/${Number(page) + 1}`}>
                                            <a className={`pagination-link`}>
                                                {Number(page) + 1}
                                            </a>
                                        </Link>
                                    </li>
                            }
                            {lastPage - page > 1 && 
                                <li>
                                    <span className="pagination-ellipsis">&hellip;</span>
                                </li>
                            }
                            {page - lastPage != 0 && 
                                <li>
                                    <Link href={`/rankings/alltimerankings/${lastPage}`}>
                                        <a className="pagination-link" aria-label={`Goto page ${lastPage}`}>{lastPage}</a>
                                    </Link>
                                </li>
                            }
                          </ul>
                        </nav>
                    </div>
                </div>
            </section>
        </>
    )
}

export async function getStaticPaths() {
    const allFights = await Fighter.find({}, "_id name nationality total wins losses history")
    const pagesNeeded = Math.ceil(allFights.length / 20)
    const pages = []

    for(let i = 0; i < pagesNeeded; i++)
    {
        const pathObject = {
            params: {
                page: (i + 1).toString()
            }
        }

        pages.push(pathObject)
    }


    return {
        paths: pages.slice(0, 100),
        // paths: pages,
        fallback: true

    }
}

export async function getStaticProps({ params }) {
    // const allFights = await Fighter.find({}, "_id name nationality total wins losses history")

    // const rankedFighters = allFights
    //     .filter(fighter => fighter.history)
    // rankedFighters.sort((fighterOne, fighterTwo) => {
    //     return Math.max(...fighterTwo.history.ratingHistory) - Math.max(...fighterOne.history.ratingHistory)
    // })

    // const lastPage = Math.ceil(rankedFighters.length / 20)
    // const page = params.page


    // const fighters = JSON.parse(JSON.stringify(rankedFighters.slice((params.page - 1) * 20, (params.page * 20))))

    // using the local system to get fighters

    if(!fs.existsSync(os.tmpdir() + '/fighters.json'))
    {
        await saveDatabaseLocally()
    }

    const fighterTable = JSON.parse(fs.readFileSync(os.tmpdir() + '/fighters.json', 'utf8'))
    const fightersList = Object.keys(fighterTable)
    const rankedFighters = fightersList.filter(fighter => fighterTable[fighter].history)
    rankedFighters.sort((fighterOne, fighterTwo) => {
        return Math.max(...fighterTable[fighterTwo].history.ratingHistory) - Math.max(...fighterTable[fighterOne].history.ratingHistory)
    })


    const lastPage = Math.ceil(rankedFighters.length / 20)
    const page = params.page

    const fighterNamesList = rankedFighters.slice((params.page - 1) * 20, (params.page * 20))

    const fighters = fighterNamesList.map(fighterName => fighterTable[fighterName])

    return {
        props: {
            fighters,
            page,
            lastPage
        },
        revalidate: 10
    }
}
