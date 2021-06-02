import Head from 'next/head'
import styles from '../styles/Home.module.css'
import superagent from 'superagent'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Navbar from 'components/navbar'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {  Fighter } from 'lib/db'


export default function Home( {user, setUser, fighterIds, isLoading, featuredFighters} ) {
    const router = useRouter()
    // console.log(featuredFighters)
    const fighterStringOfNames = featuredFighters.map(fighter => fighter.name).join(", ")

    return (
        <>
            <Head>
                <title>{`Kicksio | Home`}</title>
                <meta name="description" content={`The premiere record database and ranking system for Kickboxers and Muay Thai Fighters`}/>
                <meta name="keywords" content={`Kickboxing, Muay Thai, Home, ${fighterStringOfNames}`}/>
            </Head>
            <section className="hero is-dark is-fullheight"  style={{backgroundImage: 'url(tenshin.jpg)', backgroundSize: 'cover', backgroundBlendMode: 'soft-light'}}>
                <Navbar user={user} isLoading={isLoading} skeletonTheme={{color: "#363636", highlightColor: "#505050"}}/>
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">Kicksio</h1>
                        <h2 className="subtitle">The premiere kickboxing database</h2>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <h1 className="title has-text-centered">Featured Fighters</h1>
                    <div className="columns is-multiline mt-4">
                        {
                            featuredFighters.map((fighter, index) => {
                                console.log(fighter.featuredImage)
                                return (
                                    <div key={index} className="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen">
                                        <Link href={`/fighters/${fighter._id}`}>
                                            <a>
                                                <div className="card">
                                                    <div className="card-image">
                                                        <figure className="image is-4by3">
                                                            <img src={fighter.featuredImage} alt="Placeholder image"/>
                                                        </figure>
                                                    </div>
                                                    <div className="card-content">
                                                        <div className="media">
                                                            <div className="media-left">
                                                                <figure className="image is-48x48">
                                                                    <img src={fighter.flagImage} alt="Placeholder image" style={{border: "1px solid #a0a0a0"}}/>
                                                                </figure>
                                                            </div>
                                                            <div className="media-content">
                                                                <p className="title is-5">{fighter.name}</p>
                                                            </div>
                                                        </div>

                                                        <div className="content">
                                                            {fighter.shortBio}
                                                            <br />
                                                            <br />
                                                            <time datetime="2016-1-1">Last Fight: {fighter.lastFight}</time>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                )
                        })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export async function getStaticProps() {
    const takeru = JSON.parse(JSON.stringify(await Fighter.findOne({name: "Takeru Segawa"})))
    const petrosyan = JSON.parse(JSON.stringify(await Fighter.findOne({name: "Giorgio Petrosyan"})))
    const nasukawa = JSON.parse(JSON.stringify(await Fighter.findOne({name: "Tenshin Nasukawa"})))
    const doumbe = JSON.parse(JSON.stringify(await Fighter.findOne({name: "Cedric Doumbe"})))


    const naskuawaRecent = 
    [
        {
            opponent: "Shiro",
            method: "Dec",
            result: "Win"
        },
        {
            opponent: "Kumandoi Petcharoenvit",
            method: "Dec",
            result: "Win"
        },
        {
            opponent: "Yuki",
            method: "TKO",
            result: "Win"
        },
    ]

    const takeruRecent = 
    [
        {
            opponent: "Leona Pettas",
            method: "KO",
            result: "Win"
        },
        {
            opponent: "Petchdam Petchkiatpetch",
            method: "KO",
            result: "Win"
        },
        {
            opponent: "Yuta Murakoshi",
            method: "Dec",
            result: "Win"
        },
    ]

    const doumbeRecent = 
    [
        {
            opponent: "Murthel Groenhart",
            method: "KO",
            result: "Win"
        },
        {
            opponent: "Karim Ghajji",
            method: "TKO",
            result: "Win"
        },
        {
            opponent: "Alim Nabiev",
            method: "KO",
            result: "Win"
        },
    ]

    const petroRecent = 
    [
        {
            opponent: "Davit Kiria",
            method: "Dec",
            result: "Win"
        },
        {
            opponent: "Gaetan Dambo",
            method: "Dec",
            result: "Win"
        },
        {
            opponent: "Samy Sana",
            method: "TKO",
            result: "Win"
        },
    ]

    const featuredFighters = [
        {...nasukawa, featuredImage: "featured/tenshin.jpg", flagImage: "featured/flags/japan.svg",lastFight: (new Date(nasukawa.fights[0].eventDate)).toLocaleString('en-US', {weekday: undefined, year:  'numeric', month: 'long',  day: 'numeric'}), lastThree: naskuawaRecent, shortBio: "Tenshin Nasukawa is the reigning RISE Featherweight champion"},
        {...takeru, featuredImage: "featured/takeru.jpg", flagImage: "featured/flags/japan.svg" ,lastFight: (new Date(takeru.fights[0].eventDate)).toLocaleString('en-US', {weekday: undefined, year: 'numeric', month: 'long', day: 'numeric'}), lastThree: takeruRecent, shortBio: "Takeru Segawa is the reigning K-1 Super Featherweight champion"},
        {...doumbe, featuredImage: "featured/doumbe.jpg", flagImage: "featured/flags/france.svg",lastFight: (new Date(doumbe.fights[0].eventDate)).toLocaleString('en-US',{weekday: undefined, year: 'numeric', month: 'long', day: 'numeric'} ), lastThree: doumbeRecent, shortBio: "Cedric Doumbe is the reigning Glory welterweight champion"},
        {...petrosyan, featuredImage: "featured/petrosyan.jpg", flagImage: "featured/flags/italy.svg",lastFight: (new Date(petrosyan.fights[0].eventDate)).toLocaleString('en-US', {weekday: undefined, year: 'numeric', month: 'long', day: 'numeric'}), lastThree: petroRecent, shortBio: "Giorgio Petrosyan is the ONE featherweight grand prix champion"}
    ]

    return {
        props: {
            featuredFighters: JSON.parse(JSON.stringify(featuredFighters))
        }
    }

}
