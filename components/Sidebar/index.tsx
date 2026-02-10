import "./styles.css"
import Logo from  "./assets/livup.png"

export default function SideBar()
{
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
                        <a href="/receipt">Recebimento</a>
                    </li>
                    <li>
                        <a href="/schedule">Agendamento</a>
                    </li>
                    <li>
                        <a href="/users">Usuário</a>
                    </li>
                    <li>
                        <a href="/supplier">Fornecedores</a>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}