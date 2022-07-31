import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Create from './pages/create'
import Edit from './pages/edit'
import Home from './pages/Home/home'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from '../lib/client'
import AuthProvider from '../contexts/auth'
import SignIn from './pages/auth/signin'
import Registration from './pages/auth/registration'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create' element={<Create />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/registration' element={<Registration />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
