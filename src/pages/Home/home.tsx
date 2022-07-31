import { useContext } from 'react'
import { AuthContext } from '../../../contexts/auth'
import { Navigate } from 'react-router-dom'
import Layout from '../../../components/Layout/layout'
import List from './list'

function Home() {
  const auth = useContext(AuthContext)
  if (auth && auth.loading && auth.user === null) {
    return <Navigate to='/signin' />
  }
  return (
    <Layout>
      <List />
    </Layout>
  )
}
export default Home
