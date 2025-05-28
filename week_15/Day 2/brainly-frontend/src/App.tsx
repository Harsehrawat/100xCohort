import './App.css'
import './index.css' 
import { Dashboard } from './pages/Dashboard'
import { LogIn } from './pages/LogInPage'
import { Signup } from './pages/SignupPage'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import SharedDashboard from './pages/SharedDashboard'
import { HomePage } from './pages/HomePage'
import { TweetDashboard } from './DashBoard/TweetDashboard'
import { DocumentDashboard } from './DashBoard/DocumentDashboard'
import { YouTubeDashBoard } from './DashBoard/YouTubeDashboard'


function App() {
  return <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>} />
      <Route path='/' element={<LogIn/>} />
      <Route path='/homePage' element={<HomePage/>} />
      <Route path='/content' element={<Dashboard/>}/>
      <Route path='/content/tweet' element={<TweetDashboard isGuestView={false}/>}/>
      <Route path='/content/document' element={<DocumentDashboard isGuestView={false}/>}/>
      <Route path='/content/youtube' element={<YouTubeDashBoard isGuestView={false}/>}/>
      <Route path="/api/share/:sharableLink" element={< SharedDashboard/>} />
    </Routes>
  </BrowserRouter>
  
}

export default App
