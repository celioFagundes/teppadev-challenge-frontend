import { useContext } from 'react'

import { Link, Navigate } from 'react-router-dom'
import Layout from '../../components/Layout/layout'
import List from './List'
import styles from './home.module.css'
import { AuthContext } from '../../contexts/auth'

function Home() {
  const auth = useContext(AuthContext)

  if (auth && auth.loading && auth.user === null) {
    return <Navigate to='/signin' />
  }
  return (
    <Layout>
      <div className={styles.home}>
        <Link to={'/create'} className={styles.create_button}>
          Add new
        </Link>
        <List />
      </div>
    </Layout>
  )
}
export default Home
