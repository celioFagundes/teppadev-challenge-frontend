import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Create from './pages/create'
import Edit from './pages/edit'
import Home from './pages/home'
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>
    </Router>
  )
}

export default App
