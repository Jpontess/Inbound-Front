import "./styles.css"; // Certifique-se que o CSS novo da toolbar está aqui ou global

// Criamos uma interface para definir o que a Toolbar recebe do Pai (Home)
interface ToolbarProps {
    busca: string;
    setBusca: (valor: string) => void;
    data: string;
    setData: (valor: string) => void;
}

export default function Toolbar({ busca, setBusca, data, setData }: ToolbarProps) {
    return (
        <div className="toolbar-header">
            
            {/* Lado Esquerdo: Filtros */}
            <div className="filter-group">
                <div className="input-wrapper">
                    {/* Ícone Lupa */}
                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    
                    <input 
                        type="text" 
                        placeholder="Buscar Fornecedor, NF..." 
                        className="search-input"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)} // Avisa a Home que mudou
                    />
                </div>
                
                <input 
                    type="date" 
                    className="date-input"
                    value={data}
                    onChange={(e) => setData(e.target.value)} // Avisa a Home que mudou
                />
            </div>

            {/* Lado Direito: Botões */}
            <div className="action-group">
                <button className="btn-outline" title="Exportar Excel">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Exportar
                </button>
                <button className="btn-outline" title="Atualizar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                </button>
            </div>

        </div>
    );
}