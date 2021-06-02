import { useState, useEffect } from 'react';
import axios from 'axios'
import superagent from 'superagent'
import {FaEnvelope, FaLock} from 'react-icons/fa';
import { useRouter }  from 'next/router'
import NavBar from 'components/navbar'
import Head from 'next/head'

export default function Login( {user, setUser} ) {
    const  [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const router = useRouter()

    console.log(user);
    
// uncomment to redirect to home page if a user is already logged in
//   useEffect(() => {

//     const check = () => {
//       superagent.get("http://localhost:5000/auth/me")
//           .withCredentials()
//           .then(res => {
//             if(res.status == 200) 
//             {
//                 setUser(res.body.user)
//                 router.push("/")
//             }
//           })
//           .catch(error => console.log(error))
//     }
//     check()


//   }, [])
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        if(!(username && password)) return
        
        superagent.post("/api/auth/login")
            .send({
                username: username,
                password: password
            })
            .withCredentials()
            .then(res => {
                console.log(res);
                if(res.status  ==  200)
                {
                    setUser(res.body.user)
                    router.push("/")
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    const handleUsernameChanged = (event) => {
        setUsername(event.target.value)
    }
    
    const handlePasswordChanged = (event) => {
        setPassword(event.target.value)
    }
    
    return (
        <>
            <section className="hero is-success is-fullheight">
                <Head>
                    <title>{`Kicksio | Login`}</title>
                    <meta name="description" content={`Login To Kicksio`}/>
                    <meta name="keywords" content={`Kickboxing, Muay Thai, Login, Sign In, Kicksio`}/>
                </Head>
                <div className="hero-head">
                    <NavBar />
                </div>
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                                <form className="box">
                                    <div className="field">
                                        <div className="message is-danger">
                                        </div>
                                        <label className="label">Username</label>
                                        <div className="control has-icons-left">
                                            <input type="text" className="input" value={username} onChange={handleUsernameChanged} placeholder="e.g. bob@gmail.com"/>
                                            <span className="icon is-small is-left">
                                                <FaEnvelope />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Password</label>
                                        <div className="control has-icons-left">
                                            <input type="password" className="input" value={password} onChange={handlePasswordChanged} placeholder="******"/>
                                            <span className="icon is-small is-left">
                                                <FaLock />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="field is-flex is-justify-content-space-evenly">
                                        <button className="button is-success" type="submit" onClick={handleSubmit}>
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
