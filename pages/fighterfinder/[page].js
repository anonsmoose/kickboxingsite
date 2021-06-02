import FighterSearch from "components/FighterSearch"
import superagent from "superagent"
import Link from 'next/link'
import { Fighter } from "lib/db"
import Head from 'next/head'
import { useRouter } from 'next/router'
import fs from 'fs'
import saveDatabaseLocally from 'lib/saveDatabaseLocally'
import os from 'os'


export default function fighterfinder({ fighterNames, page, lastPage }) {
    const router = useRouter()

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

    const fighterStringOfNames = fighterNames.map(fighter => fighter.name).join(", ")
    return (
        <>
            <Head>
                <title>{`Kicksio | Fighter Finder`}</title>
                <meta name="description" content={`Search for Kickboxers and Muay Thai Fighters`}/>
                <meta name="keywords" content={`Kickboxing, Muay Thai, Finder, Search, ${fighterStringOfNames}`}/>
            </Head>
            <FighterSearch />
            <section className="section">
                <div className="container">
                    <div className="box">
                        <div className="table-container">
                            <table className="table is-striped is-hoverable is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>Nationality</th>
                                        <th>Name</th>
                                        <th>Wins</th>
                                        <th>Losses</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Nationality</th>
                                        <th>Name</th>
                                        <th>Wins</th>
                                        <th>Losses</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {fighterNames.map((fighter, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{fighter.nationality}</td>
                                                <td>
                                                    <Link href={`/fighters/${fighter._id}`}><a>{fighter.name}</a></Link>
                                                </td>
                                                <td>{fighter.wins}</td>
                                                <td>{fighter.losses}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                        <nav className="pagination" role="navigation" aria-label="pagination">
                            
                            <Link href={page != 1 ? `/fighterfinder/${Number(page) - 1}` : "/fighterfinder/1"}>
                                <a className="pagination-previous">Previous</a>
                            </Link>
                            <Link href={page != lastPage ? `/fighterfinder/${Number(page) + 1}` : `/fighterfinder/${lastPage}`}>
                                <a className="pagination-next">Next page</a>
                            </Link>
                            <ul className="pagination-list">
                            {page - 1 > 1 && 
                                <li>
                                    <Link href="/fighterfinder/1">
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
                                    <Link href={`/fighterfinder/${Number(page) - 1}`}>
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
                                        <Link href={`/fighterfinder/${Number(page) + 1}`}>
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
                                    <Link href={`/fighterfinder/${lastPage}`}>
                                        <a className="pagination-link" aria-label={`Goto page ${lastPage}`}>{lastPage}</a>
                                    </Link>
                                </li>
                            }
                          </ul>
                        </nav>
                </div>
            </section>
        </>
    )
}


export async function getStaticPaths() {
    const allFights = await Fighter.find({}, "_id name nationality total wins losses")
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
        // paths: pages.slice(0, 200),
        paths: pages,
        fallback: true

    }

}

export async function getStaticProps({ params }) {


    // const allFights = await Fighter.find({}, "_id name nationality total wins losses")
    // const lastPage = Math.ceil(allFights.length / 20)
    // const page = params.page


    // const fighterNames = JSON.parse(JSON.stringify(allFights.slice((params.page - 1) * 20, (params.page * 20))))


    // using local file instead of calling to the db every time.
    if(!fs.existsSync(os.tmpdir() + '/fighters.json'))
    {
        await saveDatabaseLocally()
    }

    const fighters = JSON.parse(fs.readFileSync(os.tmpdir() + '/fighters.json', 'utf8'))
    const fightersList = Object.keys(fighters)
    const lastPage = Math.ceil(fightersList.length / 20)
    const page = params.page

    const fighterNamesList = fightersList.slice((params.page - 1) * 20, (params.page * 20))

    const fighterNames = fighterNamesList.map(fighterName => fighters[fighterName])





    return {
        props: {
            fighterNames,
            page,
            lastPage
        },
        revalidate: 10
    }

}
