import './App.css'
import Home from "../components/Home"
import Receipt from "../components/Receipt"
import Schedule from "../components/Schedule"
import Supplier from  "../components/Supplier"
import { Login } from "../components/Login/login"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SideBar from '../components/Sidebar'
import TopBar from '../components/TopBar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/*" 
          element={
            <div className='app-container'>
              <SideBar/>
              <div className='content-wrapper'>
                <TopBar/>
                <main className='scrollable-content'>
                  <Routes>
                    <Route path='/home' element={<Home/>}/>
                    <Route path='/receipt' element={<Receipt/>} />
                    <Route path='/schedule' element={<Schedule/>}/>
                    <Route path='/supplier' element={<Supplier/>}/>
                    {/* Redireciona a raiz para o login por segurança */}
                    <Route path="/" element={<Navigate to="/login" />} />
                  </Routes>
                </main>
              </div>
            </div>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App