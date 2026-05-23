import "./styles.css"
import Logo from  "/logistics-delivery.png"
import { useNavigate } from "react-router-dom"
// import { isAuthorized } from "../../src/services/Auth/auth.payload"

export default function SideBar()
{
    const navigate = useNavigate()
    async function handleLogout() {
        const deleteToken = localStorage.removeItem('authToken')        
        navigate('/login')
        return deleteToken
    }

    return(
        <aside>
            <div>
                <img src={Logo} alt="Logo da Liv Up" />
            </div>
            <h1>Gestão Logístico</h1>
            <nav> 
                <ul className="lista-sidebar">
                    <li>
                        <a href="/home">Página de início</a>
                    </li>
                    <li>
                        <a href="/receipt">Portaria</a>
                    </li>
                    <li>
                        <a href="/schedule">Agendamento</a>
                    </li>
                    <li>
                            <a href="/supplier">Fornecedores</a>
                        </li>
                    {/* {isAuthorized('') && (
                        
                    )} */}
                </ul>
            </nav>
            <button
            className="button-logout" 
            onClick={handleLogout}
            type="submit">Sair</button>
        </aside>
    )
}