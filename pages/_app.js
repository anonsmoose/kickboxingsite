// import '../styles/globals.css'
// import '../styles/bulma.scss'
import { useState, useEffect } from 'react'
import superagent from 'superagent'
import '../styles/bulma.scss'
import Navbar from 'components/navbar'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
    const [user, setUser] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

  
  useEffect(() => {

    const check = () => {
      superagent.get("/api/auth/me")
          .withCredentials()
          .then(res => {
            console.log("are you logged in?");

            console.log(res.body);

            if(res.status == 200) {
                setUser(res.body.user)
                setIsLoading(false)
            }
          })
            .catch(error => {
                console.log(error)
                setIsLoading(false)
            })
    }
    check()


  }, [])
  
    // console.log(router.pathname)
  return (
  <div>
      {!['/', '/login', '/register', '/fighters/[id]'].includes(router.pathname) && <Navbar user={user} isLoading={isLoading} skeletonTheme={{color: "", highlightColor: ""}}/>}
    <Component {...pageProps} user={user} setUser={setUser} isLoading={isLoading}/>
  </div>
  )
}

export default MyApp
