import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import MainPage from './templates/MainPage'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<MainPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
