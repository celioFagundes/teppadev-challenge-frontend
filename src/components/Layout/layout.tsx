import React from 'react'
import { Header } from './Header/header'
import { Footer } from './Footer/footer'
import styles from './layout.module.css'
interface ILayoutProps {
  children: React.ReactNode
}
function Layout({ children }: ILayoutProps) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  )
}
export default Layout
