import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './pages/Home/Homepage'
import { QueryClientProvider } from '@tanstack/react-query'

import SignIn from './pages/auth/signin'
import Registration from './pages/auth/registration'
import queryClient from './lib/client'
import AuthProvider from './contexts/auth'
import EditPage from './pages/Edit/EditPage'
import CreatePage from './pages/Create/CreatePage'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create' element={<CreatePage />} />
            <Route path='/edit/:id' element={<EditPage />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/registration' element={<Registration />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
