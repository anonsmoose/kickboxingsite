import { useState } from 'react';
import superagent from 'superagent'
import {FaEnvelope, FaLock, FaUserSecret} from 'react-icons/fa';
import { useRouter } from 'next/router'
import NavBar from 'components/navbar'
import Head from 'next/head'

export default function Register({user, setUser}) {
    const  [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [secret, setSecret] = useState("")
    const [usernameAvailable, setUsernameAvailable] = useState(true)
    const [secretCorrect, setSecretCorrect] = useState(true)
    const router = useRouter()


    
    const handleSubmit = async (event) => {
        event.preventDefault()
        if(!(username && password && confirmPassword && secret)) return
        if(password != confirmPassword || password.length < 5) return
        

        superagent.post("/api/auth/register")
        .send({
            username: username,
            password: password,
            secret: secret
        })
        .then(res => 
            {

                console.log(res);
                superagent.post("/api/auth/login")
                .send({
                    username: username,
                    password: password
                })
                .withCredentials() 
                .then(res => {
                    if(res.status == 200)
                    {
                        setUser(res.body.user)
                        router.push("/")
                    }

                })
                .catch(err.message)
            }
        )
        .catch(error => {
            if(error.status == 403)
            {
                console.log("bob");
                console.log(error.response);
                if(error.response.body.message == "user taken") setUsernameAvailable(false)
                if(error.response.body.message == 'incorrect secret') setSecretCorrect(false)
            }
            else console.log(error);
        })


    }
    
    const handleUsernameChanged = (event) => {
        setUsername(event.target.value)
    }
    
    const handlePasswordChanged = (event) => {
        setPassword(event.target.value)
    }

    const handleConfirmPasswordChanged = (event) => {
        setConfirmPassword(event.target.value)
    }

    const handleSecretChanged = (event) => {
        setSecret(event.target.value)
    }

    return (
        <>
            <section className="hero is-success is-fullheight">
                <Head>
                    <title>{`Kicksio | Register`}</title>
                    <meta name="description" content={`Register For Kicksio`}/>
                    <meta name="keywords" content={`Kickboxing, Muay Thai, Register, Sign Up, Kicksio`}/>
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
                                            <div className="message-body">
                                                Registration is currently limited to protect the site from malicious users. If you feel that you can contribute to the site, then email the administrator.
                                            </div>
                                        </div>
                                        <label className="label">Username</label>
                                        <div className="control has-icons-left">
                                            <input type="text" className="input" value={username} onChange={handleUsernameChanged} placeholder="e.g. bob@gmail.com"/>
                                            <span className="icon is-small is-left">
                                                <FaEnvelope />
                                            </span>
                                        </div>
                                        {!usernameAvailable && <p className="help is-danger">Username unavailable</p>}
                                    </div>
                                    <div className="field">
                                        <label className="label">Secret</label>
                                        <div className="control has-icons-left">
                                            <input type="text" className="input" value={secret} onChange={handleSecretChanged} placeholder="Provided By Site Admin"/>
                                            <span className="icon is-small is-left">
                                                <FaUserSecret />
                                            </span>
                                        </div>
                                        {!secretCorrect && <p className="help is-danger">Incorrect Secret</p>}
                                    </div>
                                    <div className="field">
                                        <label className="label">Password</label>
                                        <div className="control has-icons-left">
                                            <input type="password" className="input" value={password} onChange={handlePasswordChanged} placeholder="******"/>
                                            <span className="icon is-small is-left">
                                                <FaLock />
                                            </span>
                                        {password.length < 5 && password && <p className="help is-danger">Passwords must be at least 5 characters long</p>}
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Confirm Password</label>
                                        <div className="control has-icons-left">
                                            <input type="password" className="input" value={confirmPassword} onChange={handleConfirmPasswordChanged} placeholder="******"/>
                                            <span className="icon is-small is-left">
                                                <FaLock />
                                            </span>
                                        </div>
                                        {confirmPassword != password && confirmPassword && <p className="help is-danger">Passwords must match</p>}
                                    </div>
                                    <div className="field is-flex is-justify-content-space-evenly">
                                        {/* <button className="button is-success" type="submit" onClick={handleSubmit}>
                                            Login
                                        </button> */}
                                        <button className="button is-success" type="submit" onClick={handleSubmit}>
                                           Register 
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
