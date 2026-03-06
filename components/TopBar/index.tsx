import { useEffect, useState } from "react";
import "./styles.css"
import { jwtDecode } from "jwt-decode";
import { type UserDecod }  from "../../src/interface/Auth/AuthDecodUser"

export default function Topbar() {
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (token){
            try{
                const decoded = jwtDecode<UserDecod>(token);
                
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setUserName(decoded.name);
            }
            catch (Error) {
                console.log("Token inválido ", Error)
            }
        }
    }, [])

    return (
        <header className="topbar">
            {/* LADO ESQUERDO: Logo e Menu Mobile */}
            <div className="topbar__left">
                <div className="brand-logo">
                    <span className="brand-highlight">LIV </span> UP
                </div>
            </div>
            <div className="topbar__right">
                <div className="user-profile">
                    <div className="user-info">
                        <span className="user-name">{userName}</span>
                        <span className="user-role">Online</span>
                    </div>
                    <div className="user-avatar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                </div>
            </div>
        </header>
    );
}