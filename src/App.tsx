import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Create from './pages/Create/create'
import Edit from './pages/Edit/edit'
import Home from './pages/Home/home'
import { QueryClientProvider } from '@tanstack/react-query'

import SignIn from './pages/auth/signin'
import Registration from './pages/auth/registration'
import queryClient from './lib/client'
import AuthProvider from './contexts/auth'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create' element={<Create />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/registration' element={<Registration />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
