import './styles.css';

export default function Toolbar() {
    
    const handleExportar = () => alert("Exportando...");
    const handleNovoRegistro = () => alert("Novo registro...");

    return (
        <div className="toolbar-container">
            <div className="toolbar-left">
                <div className="date-box">
                    <input type="date" className="date-input" />
                </div>
            </div>

            {/* 2. CENTRO: Busca (Vai ficar no meio e esticar) */}
            <div className="toolbar-center">
                <div className="search-box">
                    <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input type="text" placeholder="Buscar placa, fornecedor ou nota..." />
                </div>
            </div>

            {/* 3. DIREITA: Botões de Ação */}
            <div className="toolbar-right">
                <button className="btn btn-excel" onClick={handleExportar} title="Exportar para Excel">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <span className="btn-text">Excel</span>
                </button>

                <button className="btn btn-primary" onClick={handleNovoRegistro}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    <span>Registrar</span>
                </button>
            </div>

        </div>
    );
}