import "./styles.css";
import Kpis from "../Cards/kpis";
import Toolbar from "../Toolbar/toolbar";

export default function Home() {
    
    // Dados simulados
    const filaVeiculos = [
        { id: 1, inicio: "08:20", fornecedor: "Nestlé Brasil", chegada: "08:15", status: "Aguardando" },
        { id: 2, inicio: "08:30", fornecedor: "Coca-Cola Fem.", chegada: "08:30", status: "Aguardando" },
        { id: 3, inicio: "09:50", fornecedor: "Ambev S.A.", chegada: "08:45", status: "Conferindo" },
        { id: 4, inicio: "12:12", fornecedor: "M Dias Branco", chegada: "09:00", status: "Aguardando" },
    ];

    return (
        <div className="dashboard-container">
            
            {/* 1. KPIs no topo */}
            <Kpis />

            {/* 2. Área Principal */}
            <div className="main-panel">
                
                <section className="table-card">
                    
                    {/* A Toolbar entra AQUI para parecer parte da tabela */}
                    <div className="card-header">
                        <Toolbar />
                    </div>

                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Fornecedor</th>
                                <th>Chegada</th>
                                <th>Saída Prev.</th>
                                <th style={{textAlign: 'right'}}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filaVeiculos.map((v) => (
                                <tr key={v.id}>
                                    <td>
                                        <span className={`badge badge-${v.status.toLowerCase()}`}>
                                            {v.status}
                                        </span>
                                    </td>
                                    <td className="fw-bold">{v.fornecedor}</td>
                                    <td>{v.chegada}</td>
                                    <td>{v.inicio}</td>
                                    
                                    {/* Ações com Ícones (SVG) em vez de texto */}
                                    <td style={{textAlign: 'right'}}>
                                        <div className="action-buttons">
                                            <button className="btn-icon-action edit" title="Editar">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                            </button>
                                            <button className="btn-icon-action view" title="Visualizar">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                            </button>
                                            <button className="btn-icon-action delete" title="Excluir">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
}