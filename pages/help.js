import React, {useState} from "react"
import Head from 'next/head'

function help(){
    return(
        <div>
            <Head>
                <title>{`Kicksio | Help`}</title>
                <meta name="description" content={`Frequently Asked Questions`}/>
                <meta name="keywords" content={`Kickboxing, Muay Thai, Kicksio, Help, Elo, Calculated, Rankings, Contact`}/>
            </Head>
            <section className="section" style={{paddingLeft: "20%", paddingRight: "20%"}}>
                <div className="container">
                    <h1 className="title has-text-centered is-2">
                        Frequently Asked Questions
                    </h1>
                    <hr />
                    <h4 className="title is-4">Is there anything I can do to help?</h4>
                    
                    <p>
                        Yes! You can contribute to the database by adding fights to existing fighters or by adding new fighters. Registration isn't open to the public to avoid defacement of records, but if you're known in the community you can contact the site administrator via the email below to get started.
                    </p>
                    <hr />
                    <h4 className="title is-4">How are your rankings calculated?</h4>
                    <p>Ratings and the resulting rankings are calculated using FIDE's implementation of ELO.</p>
                    <hr />
                    <h4 className="title is-4">How can I contact you?</h4>
                    <p>Via email: nulldev2@protonmail.com</p>
                    <hr />
                    <h4 className="title is-4">How many fighters are in the database?</h4>
                    <p>Over 12000 fighters are currently in the database.</p>
                </div>
            </section>
        </div>
        )
}

export default help
