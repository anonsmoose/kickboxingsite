import superagent from 'superagent'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import algoliasearch from 'algoliasearch/lite'
import styles from "styles/fightersearch.module.css"
import { VscSearch } from 'react-icons/vsc'

const searchClient = algoliasearch("3FEE2RU1FH", "6ab7937d3b2203d442cbaec721b71462")



export default function FighterSearch() {

    const [query, setQuery] = useState("")
    const [hits, setHits] = useState([])
    const [activeIndex, setActiveIndex] = useState(-1)

    useEffect(async () => {
        const index = searchClient.initIndex("fighters")
        const result  = await index.search(query)
        setHits(result.hits)
    }, [query])



    return (
        <>
            <section className="section">
                <div className="container">
                    <div className="box">
                        <div className="field">
                            <div className={`dropdown  ${styles.dropdown} ${query ? 'is-active' : ""}`}>
                                    <div className="dropdown-trigger">
                                    </div>
                                        <input className={`input is-large ${styles.dropdown}`} type="text" placeholder="Takeru Segawa" value={query} onChange={(e) => setQuery(e.target.value)} />
                                        
                                        <div id="dropdown-menu" className={`dropdown-menu ${styles.dropdown}`} role="menu">
                                            <div className={`${hits.length != 0 ? "dropdown-content" : ""}`}>
                                                {hits.map( (fighter, index) => {
                                                    if(index > 4) return
                                                    return (
                                                        <React.Fragment key={index}>
                                                            {index != 0 && <hr className="dropdown-divider"/>}
                                                            <Link href={`/fighters/${fighter.objectID}`}>
                                                                <a className={`dropdown-item ${styles.dropdownItem} ${activeIndex == index ? "is-active" : ""}`} onMouseEnter={() => setActiveIndex(index)} onMouseLeave={() => setActiveIndex(-1)} key={index}>
                                                                        {fighter.name}
                                                                    </a>
                                                            </Link>
                                                        </React.Fragment>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}
