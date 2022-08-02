import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../contexts/auth'
import styles from './header.module.css'

function Header() {
  const auth = useContext(AuthContext)

  const handleSignOut = () => {
    auth?.userSignOut()
  }
  return (
    <header className={styles.header}>
      <p className={styles.title}>MediaTrack</p>
      <button className={styles.button} onClick={handleSignOut} >Sign out</button>
    </header>
  )
}
export { Header }
