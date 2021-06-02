import React, {useState} from "react"
import Link from 'next/link'
import Head from 'next/head'

function about(){
    return(
            
        <section className="section">
            <Head>
                <title>{`Kicksio | About`}</title>
                <meta name="description" content={`About Kicksio, why it was created and its goals.`}/>
                <meta name="keywords" content={`Kickboxing, Muay Thai, About, Mission, Kicksio`}/>
            </Head>
            <div className="container" style={{maxWidth: "50em"}}>
                <h1 className="title is-1 has-text-centered">
                    About Kicksio
                </h1>
                <hr />
        <p>Kicksio is meant to the home of Kickboxing records. Recordkeeping is something that many more mainstream sports take for granted, but is something that kickfighting sports lack. The community has relied on Wikipedia as a crutch, but this has many problems. First, Wikipedia has a notorious <Link href="https://en.wikipedia.org/wiki/Wikipedia:Notability_(people)"><a>notability criteria</a></Link>, under which most kickboxers are excluded. Second, the criteria for notable kickboxers doesn't allow for any nuance, for instance, fighters with "world" titles in Muay Thai are seen as more notable than Lumpinee/Rajadamnern champions. The goal of the website is to be the kickboxing equivalent of Boxrec or Tapology.
                </p>
            </div>
        </section>
            
        )
}

export default about
