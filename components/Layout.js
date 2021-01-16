import { useEffect } from 'react'
import { supabase } from '../utils/initSupabase'
import Link from './Link'

const Layout = ({ children }) => {
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log("error signing out")
  }

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session)

      fetch('/api/auth', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session }),
      })
        .then((res) => res.json())
        .then(() => {
          if (event === "SIGNED_IN") setTimeout(window.location.replace("http://localhost:3000/admin"), 1000)
          if (event === "SIGNED_OUT") window.location.replace("/")
        })
    })

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  return (
    <div>
      <header>
        <div>
          <Link href="/">Home</Link>
        </div>
        <div>
          <Link href="/admin">Admin</Link>
        </div>
        <div>
          <Link href="/sign-in">
            Sign In
          </Link>
        </div>
        <div>
          <Link href="/sign-up">
            Sign Up
          </Link>
        </div>
        <div>
          <a onClick={signOut}>Sign out</a>
        </div>
      </header>
      <div>
        {children}
      </div>
    </div>
  )
}

export default Layout