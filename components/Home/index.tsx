import "./styles.css";
import { useState } from "react";
import Kpis from "../Cards/kpis";
// IMPORTANTE: Importe o seu Toolbar aqui
import Toolbar from "../Toolbar/toolbar"; 
import ActionButtons from "../Buttons/actionButtons";
import ActionsModals from "../Modal/actionModals";
import type { Modal, Recebimento } from "../../src/interface/recebimento";

export default function Home() {

    // Função para lidar com a ação de divergência vinda do botão

    const [modalAberto, setModalAberto] = useState<Modal>(null);
    const [veiculoSelecionado, setVeiculoSelecionado] = useState<Recebimento | null>(null);
    
    // Estados de Filtro (Ficam aqui na Home)
    const [busca, setBusca] = useState("");
    const [dataFiltro, setDataFiltro] = useState(""); 

    // --- FUNÇÕES MODAL ---
    const handleOpenModal = (tipo: Modal, veiculo: Recebimento) => {
        setVeiculoSelecionado(veiculo);
        setModalAberto(tipo);
    };

    const handleCloseModal = () => {
        setModalAberto(null);
        setVeiculoSelecionado(null);
    };

    const handleConfirmAction = () => {
        console.log(`Ação ${modalAberto} confirmada para ID ${veiculoSelecionado?.id}`);
        handleCloseModal();
    };

    // --- DADOS MOCKADOS ---
    const filaVeiculos: any[] = [ 
        { id: 1, nome: "Nestlé Brasil", nf: "102030", placa: "ABC-1234", chegada: "08:15", data: "2026-02-10", status: "Aguardando" },
        { id: 2, nome: "Coca-Cola Fem.", nf: "550123", placa: "GHI-9090", chegada: "08:30", data: "2026-02-10", status: "Finalizado" },
        { id: 3, nome: "Ambev S.A.", nf: "900201", placa: "DEF-5678", chegada: "08:45", data: "2026-02-11", status: "Conferindo" },
        { id: 4, nome: "M Dias Branco", nf: "882100", placa: "JKL-3456", chegada: "12:00", data: "2026-02-10", status: "Agendado" },
    ];

    // --- LÓGICA DE FILTRO ---
    const veiculosFiltrados = filaVeiculos.filter(v => {
        const matchTexto = v.nome.toLowerCase().includes(busca.toLowerCase()) || v.nf.includes(busca);
        const matchData = dataFiltro ? v.data === dataFiltro : true;
        return matchTexto && matchData;
    });

    return (
        <div className="dashboard-container">
            <Kpis/>
            
            <div className="main-panel">
                <section className="table-card">
                    <div className="card-header">
                        <Toolbar 
                            busca={busca} 
                            setBusca={setBusca} 
                            data={dataFiltro} 
                            setData={setDataFiltro} 
                        />
                    </div>

                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th style={{width: '120px'}}>Status</th>
                                <th>Fornecedor</th>
                                <th>Nota Fiscal</th>
                                <th>Placa</th>
                                <th>Chegada</th>
                                <th style={{textAlign: 'right', width: '140px'}}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {veiculosFiltrados.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{textAlign: 'center', padding: '40px', color: '#94a3b8'}}>
                                        Nenhum registro encontrado.
                                    </td>
                                </tr>
                            ) : (
                                veiculosFiltrados.map((v) => (
                                    <tr key={v.id}>
                                        <td>
                                            <span className={`badge badge-${v.status.toLowerCase()}`}>
                                                {v.status}
                                            </span>
                                        </td>
                                        <td className="fw-bold">{v.nome}</td>
                                        <td>{v.nf || "-"}</td>
                                        <td>
                                            <span className="plate-badge">
                                                {v.placa || "---"}
                                            </span>
                                        </td>
                                        <td>{v.chegada || "--:--"}</td>
                                        <td style={{textAlign: "right"}}>
                                            <ActionButtons
                                                veiculo={v} 
                                                onAction={handleOpenModal} 
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </section>
            </div>

            <ActionsModals
                isOpen={!!modalAberto}
                type={modalAberto}
                veiculo={veiculoSelecionado}
                onClose={handleCloseModal}
                onConfirm={handleConfirmAction}
            />
        </div>
    );
}