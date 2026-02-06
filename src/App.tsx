import './App.css'
import Home from "../components/Home"
import Users from '../components/Users/'
import Receipt from "../components/Receipt"
import Schedule from "../components/Schedule"
import Supplier from  "../components/Supplier"
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import SideBar from '../components/Sidebar'
import TopBar from '../components/TopBar';

function App() {
  return (
    <BrowserRouter>
      <div className='container' style={{display: 'flex'}}>
        <SideBar/>
        <TopBar/>
        <main>
          <Routes>
            <Route path='/home' element={<Home/>}/>
            <Route path='/receipt' element={<Receipt/>} />
            <Route path='/schedule' element={<Schedule/>}/>
            <Route path='/supplier' element={<Supplier/>}/>
            <Route path='/users' element={<Users/>}/>
          </Routes>
        </main>

      </div>
    </BrowserRouter>
)
}
export default App
