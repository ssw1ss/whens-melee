import { supabase } from '../utils/initSupabase'
import Layout from "../components/Layout"

const Index = ({ tournaments }) => {
  console.log(tournaments)
  return (
    <Layout>
      <h1>Tournaments</h1>
      <div className="tournaments">
        {tournaments.map(({ id, name, startDate, endDate, bracket }) => (
          <div key={id}>
            <h3>{name}</h3>
            <div>From {(new Date(startDate)).toLocaleDateString()} to {new Date(endDate).toLocaleDateString()}</div>
            <a href={bracket} target="_blank">Bracket Link</a>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default Index

export async function getStaticProps() {
  const { data, error } = await supabase
    .from("events")
    .select()
  if (error) console.log(error)
  return {
    props: {
      tournaments: data
    }
  }
}