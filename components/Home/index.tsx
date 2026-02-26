import "./styles.css";
import { useState, useEffect } from "react";
import Kpis from "../Cards/kpis";
import Toolbar from "../Toolbar/toolbar"; 
import ActionButtons from "../Buttons/actionButtons";
import ActionsModals from "../Modal/actionModals";
import { ReceiptService } from "../../src/services/Receipt/receiptService";
import type { Receipt } from "../../src/interface/Receipt/receiptDto";
import type { Modal } from "../../src/interface/recebimento"; 
import type { ReceiptForm } from "../../src/interface/Receipt/receiptForm";

export default function Home() {

    const [modalAberto, setModalAberto] = useState<Modal>(null);
    const [veiculoSelecionado, setVeiculoSelecionado] = useState<Receipt | null>(null);
    
    // Estados de Filtro (Ficam aqui na Home)
    const [busca, setBusca] = useState("");
    const [dataFiltro, setDataFiltro] = useState(new Date().toLocaleDateString("en-CA")); 

    // --- ESTADO DOS DADOS (SUBSTITUI O MOCK) ---
    const [receipts, setReceipts] = useState<Receipt[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- 1. BUSCAR DADOS DO BACKEND ---
    const loadData = async () => {
        try {
            setIsLoading(true);
            const data = await ReceiptService.getAll();
            setReceipts(data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleOpenModal = (tipo: Modal, veiculo: Receipt) => {
        setVeiculoSelecionado(veiculo);
        setModalAberto(tipo);
    };

    const handleCloseModal = () => {
        setModalAberto(null);
        setVeiculoSelecionado(null);
    };

    // --- 2. AÇÕES CONECTADAS NA API ---
    const handleConfirmAction = async (dadosForm?: ReceiptForm) => {
        if (!veiculoSelecionado || !veiculoSelecionado._id) return;

        try {
            // Lógica de INICIAR
            if (modalAberto === 'iniciar') {
                await ReceiptService.start(veiculoSelecionado._id, {
                    notaFiscal: dadosForm!.notaFiscal,
                    pesoNota: Number(dadosForm!.pesoNota) 
                });
                alert("Iniciado com sucesso!");
            }
            // Lógica de FINALIZAR
            else if (modalAberto === 'finalizar') {
                await ReceiptService.finish(veiculoSelecionado._id, {
                    pesoBalanca: Number(dadosForm!.pesoBalanca),
                    obs: dadosForm!.obs
                });
                alert("Finalizado com sucesso!");
            }
            // Lógica de DELETAR
            else if (modalAberto === 'deletar') {
                await ReceiptService.delete(veiculoSelecionado._id);
                alert("Deletado com sucesso!");
            }
            else if(modalAberto === "entrada") {
                await ReceiptService.entryByPlate(veiculoSelecionado._id, {
                    placa: dadosForm!.placa,
                });
                alert("Registrado entrada de veículo com sucesso!");
            }

            // Atualiza a tabela e fecha o modal
            loadData();
            handleCloseModal();

        } catch (error) {
            console.error("Erro na ação:", error);
            alert("Erro ao processar ação. Tente novamente.");
        }
    };

    const veiculosFiltrados = receipts.filter(v => {
        const nomeFornecedor = v.nomeFornecedor || ""; 
        const matchTexto = nomeFornecedor.toLowerCase().includes(busca.toLowerCase()) || 
                           (v.notaFiscal || "").includes(busca) ||
                           (v.placa || "").toLowerCase().includes(busca.toLowerCase());
        const dataParaFiltro = v.dataChegada || v.dataAgendamento || "";
        const dataV = dataParaFiltro.substring(0, 10); // Extrai apenas a parte da data (YYYY-MM-DD)
        const matchData = dataFiltro ? dataV === dataFiltro : true;
        
        return matchTexto && matchData;
    });

    return (
        <div className="dashboard-container">
            <Kpis dados={veiculosFiltrados}/>
            
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
                            {isLoading ? (
                                <tr><td colSpan={6} style={{padding: 20, textAlign: 'center'}}>Carregando...</td></tr>
                            ) : veiculosFiltrados.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{textAlign: 'center', padding: '40px', color: '#94a3b8'}}>
                                        Nenhum registro encontrado.
                                    </td>
                                </tr>
                            ) : (
                                veiculosFiltrados.map((v) => (
                                    <tr key={v._id}>
                                        <td>
                                            <span className={`badge badge-${v.status?.toLowerCase()}`}>
                                                {v.status}
                                            </span>
                                        </td>
                                        {/* Acessando nome dentro do objeto fornecedor */}
                                        <td className="fw-bold">{v.nomeFornecedor || "---"}</td>
                                        <td>{v.notaFiscal || "-"}</td>
                                        <td>
                                            <span className="plate-badge">
                                                {v.placa || "---"}
                                            </span>
                                        </td>
                                        <td>
                                            {v.dataChegada 
                                                ? new Date(v.dataChegada).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
                                                : "--:--"}
                                        </td>
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
                veiculo={veiculoSelecionado as Receipt}
                onClose={handleCloseModal}
                onConfirm={handleConfirmAction}
            />
        </div>
    );
}