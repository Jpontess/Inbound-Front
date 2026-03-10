import { useState, useEffect } from "react";
import "./styles.css"; 
import { ReceiptService } from "../../src/services/Receipt/receiptService";
import { SupplierService } from "../../src/services/Supplier/supplierService";
import type { Receipt } from "../../src/interface/Receipt/receiptDto";

interface Supplier {
    _id: string;
    name: string;
}

export default function Scheduling() {
    // Estados dos Dados da API
    const [agendamentos, setAgendamentos] = useState<Receipt[]>([]);
    const [fornecedores, setFornecedores] = useState<Supplier[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [buscarFornecedor, setBuscarFornecedor] = useState("");
    const [mostrarLista, setMostrarLista] = useState(false);


    // Estados do Formulário
    const [selectedFornecedorId, setSelectedFornecedorId] = useState("");
    const [novaData, setNovaData] = useState("");
    const [novoPesoNota, setNovoPesoNota] = useState<number | "" >("");

    // --- CARREGAR DADOS ---
    const loadInitialData = async () => {
        try {
            setIsLoading(true);
            const [dataReceipts, dataSuppliers] = await Promise.all([
                ReceiptService.getAll(),
                SupplierService.getAll()
            ]);
            
            // Filtra apenas os que estão com status "Agendado"
            setAgendamentos(dataReceipts.filter((r: Receipt) => r.status === "Agendado"));
            setFornecedores(dataSuppliers);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        loadInitialData();
    }, []);

    // --- SALVAR AGENDAMENTO ---
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFornecedorId || !novaData || novoPesoNota === "") return;

        try {
            await ReceiptService.createSchedule({
                supplier_Id: selectedFornecedorId,
                schedulingDate: novaData,
                invoiceWeight: Number(novoPesoNota)
            });

            setSelectedFornecedorId("");
            setNovaData("");
            setNovoPesoNota("");
            loadInitialData();
            console.log(handleSave)
        } catch (error) {
            alert("Erro ao salvar agendamento." + error);
        }
    };

    const handleDelete = async (id: string) => {
        if(confirm("Remover este agendamento?")) {
            try {
                await ReceiptService.delete(id);
                loadInitialData();
            } catch (error) {
                alert("Erro ao remover." + error);
            }
        }
    };
    
    const handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Atualiza o que o usuário está digitando
        setBuscarFornecedor(e.target.value); 
        
        // Abre a lista suspensa
        setMostrarLista(true); 
        
        // Limpa o ID do fornecedor, já que o usuário está buscando um novo
        setSelectedFornecedorId(""); 
    };
   

    const fornecedoresFiltrados = fornecedores.filter(filtro => 
        filtro.name.toLowerCase().includes(buscarFornecedor.toLowerCase())
    );

    return (
        <div className="scheduling-page">
            <div className="scheduling-container">
                <div className="scheduling-header">
                    <h2>Agenda de Recebimento</h2>
                    <p>Planejamento de chegada de fornecedores.</p>
                </div>

                <div className="scheduling-grid">
                    <div className="list-section">
                        <h3 className="section-title">Próximos ({agendamentos.length})</h3>
                        
                        <div className="cards-wrapper">
                         {agendamentos.map((item) => {
                            const apenasData = item.schedulingDate?.split('T')[0];
                            
                            const dateObj = new Date(`${apenasData}T12:00:00`);

                            const isValid = !isNaN(dateObj.getTime());

                            const dia = isValid ? String(dateObj.getDate()).padStart(2, '0') : "--";
                            const mes = isValid 
                                ? dateObj.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '') 
                                : "ERR";
                            const semana = isValid 
                                ? dateObj.toLocaleDateString('pt-BR', { weekday: 'long' }) 
                                : "Data Inválida";

                                return (
                                <div key={item._id} className="schedule-card">
                                    {/* Box da Data */}
                                    <div className="date-badge">
                                        <span className="day">{dia}</span>
                                        <span className="month">{mes}</span>
                                    </div>
                                    
                                    {/* Informações */}
                                        <div className="info-col">
                                            <h4>{item.supplierName || "Fornecedor não identificado"}</h4>
                                            <div className="meta-info">
                                                <span className="weekday">{semana}</span>
                                                <span className="separator">•</span>
                                                <span className="time-badge">
                                                    {item.invoiceWeight} Kg
                                                </span>
                                            </div>
                                        </div>

                                        {/* Restante do seu código (Status e Botão Remover) */}
                                        <button className="btn-remove-icon" onClick={() => handleDelete(item._id!)}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                            </svg>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* FORMULÁRIO */}
                    <div className="form-section">
                        <div className="form-card">
                            <h3>Novo Agendamento</h3>
                            <form onSubmit={handleSave}>
                                <div className="input-group">
                                <label>Fornecedor</label>
                               <input 
                                        type="text"
                                        className="custom-input"
                                        placeholder={isLoading ? "Carregando..." : "Digite para buscar..."}
                                        value={buscarFornecedor}
                                            onChange={handleBuscaChange}
                                        onFocus={() => setMostrarLista(true)}
                                        disabled={isLoading}
                                        required 
                                    />
                                    
                                    {mostrarLista && (
                                        <ul className="autocomplete-list">
                                            {isLoading && <li className="autocomplete-item disabled">Carregando...</li>}
                                            
                                            {!isLoading && fornecedoresFiltrados.length === 0 && (
                                                <li className="autocomplete-item disabled">Nenhum fornecedor encontrado</li>
                                            )}

                                           {fornecedoresFiltrados.map((fornecedor) => (
                                                <li 
                                                    key={fornecedor._id} 
                                                    className="autocomplete-item"
                                                    onClick={() => {
                                                        setSelectedFornecedorId(fornecedor._id);
                                                        setBuscarFornecedor(fornecedor.name);
                                                        setMostrarLista(false);
                                                    }}
                                                >
                                                    {fornecedor.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div style={{display: 'flex', gap: 15}}>
                                    <div className="input-group" style={{flex: 1}}>
                                        <label>Data</label>
                                        <input type="date" className="custom-input" required
                                            value={novaData} onChange={e => setNovaData(e.target.value)} />
                                    </div>
                                    <div className="input-group" style={{width: '120px'}}>
                                        <label>Peso NF</label>
                                        <input type="number" className="custom-input" required
                                            value={novoPesoNota} onChange={e => setNovoPesoNota(e.target.value ? Number(e.target.value) : "")} />
                                    </div>
                                </div>

                                <button type="submit" className="btn-submit" disabled={isLoading}>
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