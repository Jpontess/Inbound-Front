import "./styles.css"

export default function Topbar() {
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
                        <span className="user-name">João Pedro</span>
                        <span className="user-role">Gestor</span>
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