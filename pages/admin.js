import { supabase } from '../utils/initSupabase'
import Layout from "../components/Layout"
import { useEffect, useState } from 'react'

const Admin = () => {
  const [name, setName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [bracket, setBracket] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()
    const { data, error } = await supabase
      .from("events")
      .insert([
        {name, startDate, endDate, bracket}
      ])
    if (error) console.log("trevor you fucked up", error)
    else {
      console.log("nice!", data)
    }
  }

  const user = supabase.auth.user()
  useEffect(() => {
    let timeout
    if (!user) {
      timeout = setTimeout(() => {window.location.replace("/")}, 2000)
    }
    return () => clearTimeout(timeout)
  }, [user])
  if (!user) {
    return (
      <Layout>
        <h1>You must be signed in to view this page</h1>
      </Layout>
    )
  }
  return (
    <Layout>
      <h1>Create Tournament</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="start-date">Start Date</label>
          <input type="date" id="start-date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="end-date">End Date</label>
          <input type="date" id="end-date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="bracket">Bracket</label>
          <input type="text" id="bracket" value={bracket} onChange={e => setBracket(e.target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
    </Layout>
  )
}

export default Admin
