import Link from "next/link"
import {useState, useEffect, useRef} from "react"
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'

export default function navbar({ user, isLoading, skeletonTheme, opaqueDropdown }) {

    const [mobileMenuActive, setMobileMenuActive] = useState(false)
    const firstRun = useRef(true)

    // console.log(opaqueDropdown)

    return (
    <>
        <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link href="/">
                    <a className="navbar-item">
                      <img src="/taekwondo.png" />
                    </a>
                </Link>

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="true" data-target="navbarBasicExample" onClick={() => setMobileMenuActive(!mobileMenuActive)}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className={`navbar-menu ${mobileMenuActive ? "is-active" : ""}`}>
                <div className="navbar-start">
                    <Link href="/">
                        <a className="navbar-item">
                            Home
                        </a>
                    </Link>
                    <Link href="/fighterfinder/1">
                        <a className="navbar-item">
                            Fighter Finder
                        </a>
                    </Link>
                    {opaqueDropdown ? 
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                Rankings
                            </a>
                            <div className="navbar-dropdown">
                                <Link href="/rankings/alltimerankings/1">
                                    <a className="navbar-item">
                                        All-time Rankings
                                    </a>
                                </Link>
                            </div>
                        </div>
                        :
                        <div className="navbar-item has-dropdown is-hoverable" style={{color: "#ffffff"}}>
                            <a className="navbar-link">
                                Rankings
                            </a>
                            <div className="navbar-dropdown" style={{backgroundColor: "transparent"}}>
                                <Link href="/rankings/alltimerankings/1">
                                    <a className="navbar-item">
                                        All-time Rankings
                                    </a>
                                </Link>
                            </div>
                        </div>
                    }
                    <Link href="https://kixdb.com">
                        <a className="navbar-item">
                            Events
                        </a>
                    </Link>
                    <Link href="/about">
                        <a className="navbar-item">
                            About
                        </a>
                    </Link>
                    <Link href="/help">
                        <a className="navbar-item">
                            FAQ
                        </a>
                    </Link>
                </div>

                <div className="navbar-end">
                  <div className="navbar-item">
                    <div className="buttons">
                        {
                            isLoading ? 
                            <SkeletonTheme color={skeletonTheme.color} highlightColor={skeletonTheme.highlightColor}>
                                <Skeleton width={305} height={40} className="mb-3"/>
                            </SkeletonTheme>
                            :
                            !user ? 
                                <>
                                
                                    <Link href="/register">
                                        <a className="button is-primary">
                                            <strong>Sign up</strong>
                                        </a>
                                    </Link>
                                    <Link href="/login">
                                        <a className="button is-light">
                                            Log in
                                        </a>
                                    </Link>
                                    <Link href={`${user ? "/addfighter" : "/login"}`}>
                                        <a className="button is-light">
                                            Add a fighter
                                        </a>
                                    </Link>
                                </>
                            :
                                <Link href={`${user ? "/addfighter" : "/login"}`}>
                                    <a className="button is-light">
                                        Add a fighter
                                    </a>
                                </Link>
                                
                        }
                    </div>
                  </div>
                </div>
            </div>
        </nav>
    </>
    )
}
