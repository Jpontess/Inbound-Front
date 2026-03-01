import './App.css'
import Home from "../components/Home"
import Receipt from "../components/Receipt"
import Schedule from "../components/Schedule"
import Supplier from  "../components/Supplier"
import { Login } from "../components/Login/login"
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import ProtectedRoutes from '../components/Utils/protectedRoutes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/home' element={<Home />} />
          <Route path='/receipt' element={<Receipt onSalvar={(dados) => console.log(dados)} />} />
          <Route path='/schedule' element={<Schedule />} />
          <Route path='/supplier' element={<Supplier />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App