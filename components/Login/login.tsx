import './login.css'
import logo from "/logistics-delivery.png"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { AuthService } from '../../src/services/Auth/AuthServices';


export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function  handleLogin() {
        try{
            const response = await AuthService.singIn({email, password})
            const { token } = response.data 
            
            localStorage.setItem('authToken', token);
            navigate('/home');
        }
        catch(error)
        {
            console.log(error);
            alert('Erro ao fazer login');   
        }
    
    }


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
                            <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}/>
                            <input 
                            type="password" 
                            placeholder="Senha" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button onClick={handleLogin} type="submit">Entrar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}