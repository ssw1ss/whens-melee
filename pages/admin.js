import { supabase } from '../utils/initSupabase'
import Layout from "../components/Layout"

const Admin = () => {
  const user = supabase.auth.user()
  console.log("USER::::", user)
  return (
    <Layout>
      <h1>Admin</h1>
    </Layout>
  )
}

export default Admin

// export async function getServerSideProps({ req }) {
//   const { user } = await supabase.auth.api.getUserByCookie(req)

//   console.log(user)

//   if (!user) {
//     // If no user, redirect to index.
//     return { props: {}, redirect: { destination: '/', permanent: false } }
//   }

//   // If there is a user, return it.
//   return { props: { user } }
// }