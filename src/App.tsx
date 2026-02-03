import './App.css'
import Menu from "../components/Sidebar"
import Criar from "../components/Usuarios/Index"
import Usuarios from '../components/Usuarios/Index'

function App() {
 

  return (
    <div className='container'>
      <Menu/>
      <Criar/>
      <Usuarios/>
    </div>

  )
}
export default App
