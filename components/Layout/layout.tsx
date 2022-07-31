import React from 'react'
import { Header } from './Header/header'
import { Footer } from './Footer/footer'

interface ILayoutProps {
  children: React.ReactNode
}
function Layout({ children }: ILayoutProps) {
  return (
    <div>
      <Header />
      {children}
      <Footer/>
    </div>
  )
}
export default Layout
