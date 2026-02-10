import "./styles.css";
import { useState } from "react";
import Kpis from "../Cards/kpis";
import Toolbar from "../Toolbar/toolbar";
import ActionButtons from "../Buttons/actionButtons";
import ActionsModals from "../Modal/actionModals";
import type { Modal, Recebimento } from "../../src/interface/recebimento";

export default function Home() {
    const [modalAberto, setModalAberto] = useState<Modal>(null);
    const [veiculoSelecionado, setVeiculoSelecionado] = useState<Recebimento | null>(null);

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

    const filaVeiculos: Recebimento[] = [ 
        { id: 1, nome: "Nestlé Brasil", nf: "102030", chegada: "08:15", status: "Aguardando" },
        { id: 2, nome: "Coca-Cola Fem.", nf: "550123", chegada: "08:30", inicio: "08:45", fim:"09:00", status: "Finalizado" },
        { id: 3, nome: "Ambev S.A.", nf: "900201", chegada: "08:45", inicio: "09:50", status: "Conferindo" },
        { id: 4, nome: "M Dias Branco", nf: "882100", chegada: "12:00", status: "Agendado" },
    ];

    return (
        <div className="dashboard-container">
            <Kpis/>
            
            <div className="main-panel">
                <section className="table-card">
                    <div className="card-header">
                        <Toolbar />
                    </div>

                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th style={{width: '120px'}}>Status</th>
                                <th>Fornecedor</th>
                                <th>Nota Fiscal</th>
                                <th>Chegada</th>
                                <th style={{textAlign: 'right', width: '140px'}}>Ações</th>
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
                                    <td className="fw-bold">{v.nome}</td>
                                    <td>{v.nf || "-"}</td>
                                    <td>{v.chegada || "--:--"}</td>
                                    <td style={{textAlign: "right"}}>
                                        <ActionButtons
                                            veiculo={v} 
                                            onAction={handleOpenModal} 
                                        />
                                    </td>
                                </tr>
                            ))}
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