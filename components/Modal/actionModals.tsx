import "./styles.css"
import { type Recebimento, type Modal } from "../../src/interface/recebimento";

interface SystemModalsProps {
    isOpen: boolean;
    type: Modal;
    veiculo: Recebimento | null;
    onClose: () => void;
    onConfirm: () => void;
}

export default function SystemModals({ isOpen, type, veiculo, onClose, onConfirm }: SystemModalsProps) {
    if (!isOpen || !veiculo) return null;

    const renderContent = () => {
        switch (type) {
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
                                        <label>última atualização</label>
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
                                    <span className="value">{veiculo.fim || "--:--"}</span>
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
                                    <span className="kpi-value text-orange"></span> 
                                </div>
                                <div className="kpi-card">
                                    <span className="kpi-label">Duração Recebimento</span>
                                    <span className="kpi-value text-blue"></span>
                                </div>
                                <div className="kpi-card">
                                    <span className="kpi-label">Permanência Total</span>
                                    <span className="kpi-value text-dark"></span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-modal btn-secondary" onClick={onClose}>Fechar</button>
                        </div>
                    </>
                );

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
                            {/* Adicionei campo para editar placa se quiser */}
                            <div className="form-group">
                                <label>Placa</label>
                                <input type="text" className="form-input" defaultValue={veiculo.placa} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-modal btn-secondary" onClick={onClose}>Cancelar</button>
                            <button className="btn-modal btn-confirm" onClick={onConfirm}>Salvar</button>
                        </div>
                    </>
                );

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
                            <button className="btn-modal btn-danger" onClick={onConfirm}>Excluir</button>
                        </div>
                    </>
                );

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
                            <button className="btn-modal btn-confirm" onClick={onConfirm}>Confirmar Entrada</button>
                        </div>
                    </>
                );

            default:
                return (
                    <>
                        <div className="modal-header">
                            <h3>Confirmar Ação</h3>
                            <button className="btn-close" onClick={onClose}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <p>Deseja alterar o status de <strong>{veiculo.nome}</strong> para a próxima etapa?</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-modal btn-secondary" onClick={onClose}>Cancelar</button>
                            <button className="btn-modal btn-confirm" onClick={onConfirm}>Confirmar</button>
                        </div>
                    </>
                );
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