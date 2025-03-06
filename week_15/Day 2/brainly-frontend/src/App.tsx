import './App.css'
import './index.css' 
import { Dashboard } from './pages/Dashboard'
import { LogIn } from './pages/LogInPage'
import { Signup } from './pages/SignupPage'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import SharedDashboard from './pages/SharedDashboard'


function App() {
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signup/>} />
      <Route path='/signin' element={<LogIn/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path="/api/share/:sharableLink" element={< SharedDashboard/>} />

    </Routes>
  </BrowserRouter>
  
}

export default App
