import "./styles.css"

export default function SideBar()
{
    return(
        <aside>
            <h1>Menu</h1>
            <nav> 
                <ul className="lista-sidebar">
                    <li>
                        <a href="#">Usuários</a>
                    </li>
                    <li>
                        <a href="#">Fornecedores</a>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}