import { useState } from 'react'
import { supabase } from '../utils/initSupabase'
import Layout from '../components/Layout'

const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()
    const { user, error } = await supabase.auth.signUp({
        email,
        password,
    })
    if (error) {console.log(error)}
    console.log("Signed Up", user)
  }
  return (
    <Layout>
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </Layout>
  )
}

export default SignUp