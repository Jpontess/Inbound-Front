import { useState, useEffect } from "react";
import "./styles.css"; // Certifique-se que seus estilos globais estão aqui
import { type Recebimento, type Modal } from "../../src/interface/recebimento";

interface SystemModalsProps {
    isOpen: boolean;
    type: Modal;
    veiculo: Recebimento | null;
    onClose: () => void;
    onConfirm: (dados?: any) => void;
}

export default function SystemModals({ isOpen, type, veiculo, onClose, onConfirm }: SystemModalsProps) {
    
    // --- ESTADOS: INICIAR ---
    const [formInicio, setFormInicio] = useState({ 
        notaFiscal: "", 
        qtdVolumes: "" 
    });

    // --- ESTADOS: FINALIZAR ---
    const [finalizarForm, setFinalizarForm] = useState({
        pesoContado: "",
        observacao: ""
    });
    const [showWarningMaior, setShowWarningMaior] = useState(false);

    // Resetar estados sempre que o modal abre
    useEffect(() => {
        if (isOpen) {
            setFormInicio({ notaFiscal: "", qtdVolumes: "" });
            setFinalizarForm({ pesoContado: "", observacao: "" });
            setShowWarningMaior(false);
        }
    }, [isOpen]);

    if (!isOpen || !veiculo) return null;

    // --- LÓGICA: PLAY (INICIAR) ---
    const handleConfirmarInicio = () => {
        if (!formInicio.notaFiscal) {
            alert("A Nota Fiscal é obrigatória para iniciar.");
            return;
        }
        onConfirm(formInicio);
    };

    // --- LÓGICA: STOP (FINALIZAR) ---
    const pesoNFMock = Number(veiculo.nf || 1000); // Simula 1000kg se não tiver dados
    const pesoDigitado = Number(finalizarForm.pesoContado);
    const isDivergenteMenor = finalizarForm.pesoContado !== "" && pesoDigitado < pesoNFMock;

    const handleValidarFinalizacao = () => {
        if (!finalizarForm.pesoContado) {
            alert("Informe o peso contado na balança.");
            return;
        }

        // 1. Peso Maior (Aviso)
        if (pesoDigitado > pesoNFMock) {
            setShowWarningMaior(true);
            return;
        }

        // 2. Peso Menor (Divergência)
        if (pesoDigitado < pesoNFMock) {
            if (!finalizarForm.observacao.trim()) {
                alert("Para peso menor que a NF, a observação é obrigatória!");
                return;
            }
            onConfirm({ 
                ...finalizarForm, 
                statusCalculado: 'Divergência',
                tipo: 'Peso Menor'
            });
            return;
        }

        // 3. Peso Igual (Sucesso)
        onConfirm({ 
            ...finalizarForm, 
            statusCalculado: 'Finalizado' 
        });
    };

    const handleConfirmarMaior = () => {
        // Usuário confirmou o aviso de peso excedente
        onConfirm({ 
            ...finalizarForm, 
            statusCalculado: 'Finalizado',
            obs: 'Peso excedente autorizado.'
        });
    };


    const renderContent = () => {
        switch (type) {
            
            // =================================================================
            // CASO: INICIAR (PLAY)
            // =================================================================
            case 'iniciar':
                return (
                    <>
                        <div className="modal-header">
                            <h3>Iniciar Recebimento</h3>
                            <button className="btn-close" onClick={onClose}>&times;</button>
                        </div>
                        
                        <div className="modal-body">
                            <p style={{marginBottom: 20, color: '#64748b'}}>
                                Confirmar início da conferência para <strong>{veiculo.nome}</strong>?
                            </p>

                            <h4 style={{marginBottom: 15, color: '#d9224a', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.05em'}}>
                                DADOS DA CARGA
                            </h4>
                            
                            <div className="receipt-grid">
                                <div className="input-group">
                                    <label>Nota Fiscal *</label>
                                    <input 
                                        name="notaFiscal" 
                                        className="receipt-input" 
                                        placeholder="000.000.000" 
                                        type="number"
                                        required
                                        autoFocus
                                        value={formInicio.notaFiscal}
                                        onChange={(e) => setFormInicio({...formInicio, notaFiscal: e.target.value})}
                                    />
                                </div>

                                <div className="input-group">
                                    <label>Qtd. Volumes / Peso</label>
                                    <input 
                                        name="qtdVolumes" 
                                        className="receipt-input" 
                                        placeholder="Ex: 500 Kg"
                                        value={formInicio.qtdVolumes}
                                        onChange={(e) => setFormInicio({...formInicio, qtdVolumes: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn-modal btn-secondary" onClick={onClose}>Cancelar</button>
                            <button className="btn-modal btn-confirm" onClick={handleConfirmarInicio}>
                                Iniciar Conferência
                            </button>
                        </div>
                    </>
                );

            // =================================================================
            // CASO: FINALIZAR (STOP)
            // =================================================================
            case 'finalizar':
                // TELA DE AVISO (Peso Maior)
                if (showWarningMaior) {
                    return (
                        <>
                            <div className="modal-header" style={{backgroundColor: '#fffbeb', borderBottom: '1px solid #fcd34d'}}>
                                <h3 style={{color: '#d97706'}}>⚠️ Atenção: Peso Excedente</h3>
                            </div>
                            <div className="modal-body" style={{textAlign: 'center', padding: '30px 20px'}}>
                                <div style={{fontSize: '3rem', marginBottom: 10}}>⚖️</div>
                                <p style={{fontSize: '1.1rem', color: '#1e293b'}}>
                                    O peso contado (<strong>{finalizarForm.pesoContado}kg</strong>) é MAIOR que o da Nota Fiscal (<strong>{pesoNFMock}kg</strong>).
                                </p>
                                <p style={{color: '#64748b', marginTop: 10}}>
                                    Deseja confirmar a entrada mesmo com essa diferença?
                                </p>
                            </div>
                            <div className="modal-footer" style={{justifyContent: 'center', gap: 15}}>
                                <button className="btn-modal btn-secondary" onClick={() => setShowWarningMaior(false)}>
                                    Voltar e Corrigir
                                </button>
                                <button className="btn-modal btn-confirm" onClick={handleConfirmarMaior}>
                                    Confirmar Mesmo Assim
                                </button>
                            </div>
                        </>
                    );
                }

                // TELA DE CONFERÊNCIA NORMAL
                return (
                    <>
                        <div className="modal-header">
                            <h3>Conferência Final</h3>
                            <button className="btn-close" onClick={onClose}>&times;</button>
                        </div>
                        <div className="modal-body">
                            
                            {/* Resumo */}
                            <div className="info-box" style={{background: '#f8fafc', padding: 15, borderRadius: 8, marginBottom: 20, border: '1px solid #e2e8f0'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span style={{color: '#64748b'}}>Fornecedor:</span>
                                    <span style={{fontWeight: 600}}>{veiculo.nome}</span>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 5}}>
                                    <span style={{color: '#64748b'}}>Peso na NF:</span>
                                    <span style={{fontWeight: 600}}>{pesoNFMock} Kg</span>
                                </div>
                            </div>

                            {/* Campo Peso */}
                            <div className="form-group">
                                <label style={{fontSize: '0.9rem', fontWeight: 700, color: '#1e293b'}}>
                                    Peso Contado (Kg) *
                                </label>
                                <input 
                                    type="number" 
                                    className="receipt-input" 
                                    placeholder="Digite o peso balança..."
                                    value={finalizarForm.pesoContado}
                                    autoFocus
                                    onChange={(e) => setFinalizarForm({...finalizarForm, pesoContado: e.target.value})}
                                    style={{
                                        borderColor: isDivergenteMenor ? '#d9224a' : '#cbd5e1',
                                        fontSize: '1.2rem',
                                        fontWeight: 'bold',
                                        color: isDivergenteMenor ? '#d9224a' : '#1e293b'
                                    }}
                                />
                                {isDivergenteMenor && (
                                    <span style={{fontSize: '0.8rem', color: '#d9224a', marginTop: 4, display: 'block'}}>
                                        Divergência detectada: Peso menor que a nota.
                                    </span>
                                )}
                            </div>

                            {/* Campo Observação */}
                            <div className="form-group" style={{marginTop: 15}}>
                                <label>
                                    Observação {isDivergenteMenor && <span style={{color: 'red'}}>*</span>}
                                </label>
                                <textarea 
                                    className="receipt-input" 
                                    rows={3}
                                    placeholder={isDivergenteMenor ? "Justifique a falta de peso..." : "Observações gerais (opcional)"}
                                    value={finalizarForm.observacao}
                                    onChange={(e) => setFinalizarForm({...finalizarForm, observacao: e.target.value})}
                                    style={{resize: 'none', fontFamily: 'inherit'}}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-modal btn-secondary" onClick={onClose}>Cancelar</button>
                            <button className="btn-modal btn-confirm" onClick={handleValidarFinalizacao}>
                                Finalizar Conferência
                            </button>
                        </div>
                    </>
                );

            // =================================================================
            // CASO: VISUALIZAR
            // =================================================================
            case 'visualizar':
               return (
                    <>
                        <div className="modal-header">
                            <h3>Detalhes do Veículo</h3>
                            <button className="btn-close" onClick={onClose}>&times;</button>
                        </div>
                        
                        <div className="modal-body">  
                            {/* SEÇÃO 1: Identificação */}
                            <div className="details-section">
                                <div className="detail-row">
                                    <div className="detail-group">
                                        <label>Fornecedor</label>
                                        <span className="value-lg">{veiculo.nome}</span>
                                    </div>
                                    <div className="detail-group">
                                        <label>Status Atual</label>
                                        <span className={`badge badge-${veiculo.status.toLowerCase()}`}>
                                            {veiculo.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="details-grid-3">
                                    <div className="detail-group">
                                        <label>Placa</label>
                                        <span className="value-md">{veiculo.placa || "---"}</span>
                                    </div>
                                    <div className="detail-group">
                                        <label>Nota Fiscal</label>
                                        <span className="value-md">{veiculo.nf || "---"}</span>
                                    </div>
                                    <div className="detail-group">
                                        <label>Última atualização</label>
                                        <span className="value-md">{veiculo.responsavel || "---"}</span>
                                    </div>
                                </div>
                            </div>

                            <hr className="divider" />
                            
                            {/* SEÇÃO 2: Tempos */}
                            <h4 className="section-title">Linha do Tempo</h4>
                            <div className="details-grid-2">
                                <div className="detail-item">
                                    <span className="label">Chegada Prev.</span>
                                    <span className="value">{veiculo.chegada || "--:--"}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Chegada</span>
                                    <span className="value">{veiculo.chegada}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Início Recebimento</span>
                                    <span className="value">{veiculo.inicio || "--:--"}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="label">Fim Recebimento</span>
                                    <span className="value">{veiculo.fim || "--:--"}</span>
                                </div>
                            </div>

                            <hr className="divider" />
                            
                            {/* SEÇÃO 3: KPIs */}
                            <h4 className="section-title">Indicadores</h4>
                            <div className="kpi-grid">
                                <div className="kpi-card">
                                    <span className="kpi-label">Tempo de Espera</span>
                                    <span className="kpi-value text-orange">--</span> 
                                </div>
                                <div className="kpi-card">
                                    <span className="kpi-label">Duração Recebimento</span>
                                    <span className="kpi-value text-blue">--</span>
                                </div>
                                <div className="kpi-card">
                                    <span className="kpi-label">Permanência Total</span>
                                    <span className="kpi-value text-dark">--</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-modal btn-secondary" onClick={onClose}>Fechar</button>
                        </div>
                    </>
                );

            // =================================================================
            // CASO: EDITAR
            // =================================================================
            case 'editar':
                return (
                    <>
                        <div className="modal-header">
                            <h3>Editar Registro</h3>
                            <button className="btn-close" onClick={onClose}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Fornecedor</label>
                                <input type="text" className="form-input" defaultValue={veiculo.nome} />
                            </div>
                            <div className="form-group">
                                <label>Placa</label>
                                <input type="text" className="form-input" defaultValue={veiculo.placa} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-modal btn-secondary" onClick={onClose}>Cancelar</button>
                            <button className="btn-modal btn-confirm" onClick={() => onConfirm()}>Salvar</button>
                        </div>
                    </>
                );

            // =================================================================
            // CASO: DELETAR
            // =================================================================
            case 'deletar':
                return (
                    <>
                        <div className="modal-header">
                            <h3>Excluir Registro?</h3>
                            <button className="btn-close" onClick={onClose}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <p>Deseja excluir o agendamento de <strong>{veiculo.nome}</strong>?</p>
                            <p style={{fontSize: '0.9rem', color: '#64748b', marginTop: '8px'}}>Esta ação não pode ser desfeita.</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-modal btn-secondary" onClick={onClose}>Cancelar</button>
                            <button className="btn-modal btn-danger" onClick={() => onConfirm()}>Excluir</button>
                        </div>
                    </>
                );

            // =================================================================
            // CASO: REGISTRAR ENTRADA
            // =================================================================
            case 'entrada':
                return (
                    <>
                        <div className="modal-header">
                            <h3>Registrar Entrada</h3>
                            <button className="btn-close" onClick={onClose}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <p>Liberar entrada para <strong>{veiculo.nome}</strong>?</p>
                            <div className="form-group" style={{marginTop: 15}}>
                                <label>Confirmar Placa</label>
                                <input type="text" className="form-input" defaultValue={veiculo.placa} placeholder="ABC-1234" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-modal btn-secondary" onClick={onClose}>Cancelar</button>
                            <button className="btn-modal btn-confirm" onClick={() => onConfirm()}>Confirmar Entrada</button>
                        </div>
                    </>
                );

            default: return null;
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {renderContent()}
            </div>
        </div>
    );
}