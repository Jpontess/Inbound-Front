import './login.css'
import logo from "../Sidebar/assets/livUpLogo.png"

export function Login() {
    return (
        <div className='container'>
            <div className="login-box">
                <div className='img-container'>
                    <img src={logo} alt="Logo" />
                </div>

                <div className="login-form-container">
                    <div className="login-form">
                        <div className="brand-container">
                            <span className="brand-main">Gestão</span>
                            <span className="brand-sub">Log</span>
                        </div>
                        <p className="system-desc">Controle de Fluxo e Recebimento</p>
                        <div className='input-group'>
                            <input type="email" placeholder="Email"/>
                            <input type="password" placeholder="Senha" />
                        </div>
                        <button type="submit">Entrar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}