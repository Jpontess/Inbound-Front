import { Navigate, Outlet } from "react-router-dom"
import SideBar from '../Sidebar/index'
import TopBar from '../TopBar/index'

const ProtectedRoutes = () => {
  const token = localStorage.getItem('authToken')

  if (!token) {
    return <Navigate to='/login' />
  }

  return (
    <div className='app-container'>
      <SideBar />
      <div className='content-wrapper'>
        <TopBar />
        <main className='scrollable-content'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default ProtectedRoutes;