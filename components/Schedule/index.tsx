import { useState } from "react";
import "./styles.css"; 

interface Agendamento {
    id: number;
    fornecedor: string;
    data: string;
    hora: string;
    status: "Agendado" | "Confirmado" | "Pendente";
}

export default function Scheduling() {
    
    // Estados do Formulário
    const [novoFornecedor, setNovoFornecedor] = useState("");
    const [novaData, setNovaData] = useState("");
    const [novaHora, setNovaHora] = useState("");

    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([
        { id: 1, fornecedor: "Klabin S.A.", data: "2023-10-25", hora: "08:00", status: "Confirmado" },
        { id: 2, fornecedor: "Seara Alimentos", data: "2023-10-25", hora: "10:30", status: "Pendente" },
        { id: 3, fornecedor: "Hortifruti Natural", data: "2023-10-26", hora: "07:00", status: "Agendado" },
    ]);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!novoFornecedor || !novaData || !novaHora) return;

        const novoItem: Agendamento = {
            id: Date.now(),
            fornecedor: novoFornecedor,
            data: novaData,
            hora: novaHora,
            status: "Agendado" // Padrão inicial
        };

        // Ordena por Data e depois por Hora
        const listaAtualizada = [...agendamentos, novoItem].sort((a, b) => {
            const dateA = new Date(`${a.data}T${a.hora}`);
            const dateB = new Date(`${b.data}T${b.hora}`);
            return dateA.getTime() - dateB.getTime();
        });
        
        setAgendamentos(listaAtualizada);
        setNovoFornecedor("");
        setNovaHora("");
        // Mantemos a data para facilitar múltiplos agendamentos no mesmo dia
    };

    const handleDelete = (id: number) => {
        if(confirm("Remover este agendamento?")) {
            setAgendamentos(agendamentos.filter(item => item.id !== id));
        }
    };

    return (
        <div className="scheduling-page">
            <div className="scheduling-container">
                
                {/* Cabeçalho */}
                <div className="scheduling-header">
                    <h2>Agenda de Recebimento</h2>
                    <p>Planejamento de chegada de fornecedores.</p>
                </div>

                <div className="scheduling-grid">
                    
                    {/* ESQUERDA: LISTA */}
                    <div className="list-section">
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15}}>
                            <h3 className="section-title">Próximos ({agendamentos.length})</h3>
                        </div>
                        
                        <div className="cards-wrapper">
                            {agendamentos.length === 0 && (
                                <div className="empty-state">
                                    <p>Nenhum agendamento encontrado.</p>
                                </div>
                            )}

                            {agendamentos.map((item) => {
                                const dateObj = new Date(item.data + 'T12:00:00'); // Trick para fuso horário
                                const dia = dateObj.getDate();
                                const mes = dateObj.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '');
                                const semana = dateObj.toLocaleDateString('pt-BR', { weekday: 'long' });

                                return (
                                    <div key={item.id} className="schedule-card">
                                        {/* Box da Data */}
                                        <div className="date-badge">
                                            <span className="day">{dia}</span>
                                            <span className="month">{mes}</span>
                                        </div>
                                        
                                        {/* Informações */}
                                        <div className="info-col">
                                            <h4>{item.fornecedor}</h4>
                                            <div className="meta-info">
                                                <span className="weekday">{semana}</span>
                                                <span className="separator">•</span>
                                                <span className="time-badge">
                                                    <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                    {item.hora}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Status */}
                                        <span className={`status-pill status-${item.status.toLowerCase()}`}>
                                            {item.status}
                                        </span>

                                        {/* Botão Remover */}
                                        <button className="btn-remove-icon" onClick={() => handleDelete(item.id)} title="Remover">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* DIREITA: FORMULÁRIO (STICKY) */}
                    <div className="form-section">
                        <div className="form-card">
                            <h3>Novo Agendamento</h3>
                            <p>Adicione um fornecedor à fila.</p>
                            
                            <form onSubmit={handleSave}>
                                <div style={{display: 'flex', gap: 15}}>
                                    <div className="input-group" style={{flex: 1}}>
                                        <label>Data</label>
                                        <input 
                                            type="date" 
                                            className="custom-input" 
                                            required
                                            value={novaData}
                                            onChange={e => setNovaData(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group" style={{width: '100px'}}>
                                        <label>Hora</label>
                                        <input 
                                            type="time" 
                                            className="custom-input" 
                                            required
                                            value={novaHora}
                                            onChange={e => setNovaHora(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label>Fornecedor</label>
                                    <input 
                                        type="text" 
                                        className="custom-input" 
                                        placeholder="Ex: Coca-Cola"
                                        required
                                        value={novoFornecedor}
                                        onChange={e => setNovoFornecedor(e.target.value)}
                                    />
                                </div>

                                <button type="submit" className="btn-submit">
                                    Agendar Entrega
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}