import type { Receipt } from "../../src/interface/Receipt/receiptDto";

interface Props {
    data: Receipt;
    onClose: () => void;
}

// Helper para formatar hora
const formatTime = (dateString?: string) => {
    if (!dateString) return "--:--";
    return new Date(dateString).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

// Helper para formatar Status (para o CSS funcionar)
const getStatusClass = (status: string) => {
    return status.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export default function ReceiptDetails({ data, onClose }: Props) {
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
                            {/* Backend retorna objeto fornecedor populado */}
                            <span className="value-lg">{data.supplierName || "---"}</span>
                        </div>
                        <div className="detail-group">
                            <label>Status Atual</label>
                            <span className={`badge badge-${getStatusClass(data.status || "---")}`}>
                                {data.status}
                            </span>
                        </div>
                    </div>

                    <div className="details-grid-3">
                        <div className="detail-group">
                            <label>Peso Nota (kg) </label>
                            <span className="value-md">{data.invoiceWeight || "---"}</span>
                        </div>
                        <div className="detail-group">
                            <label>Nota Fiscal</label>
                            <span className="value-md">{data.invoiceNumber || "---"}</span>
                        </div>
                        <div className="detail-group">
                            <label>Responsável</label>
                            {/* Backend retorna objeto usuario populado */}
                            <span className="value-md">{data.nomeUsuario || "---"}</span>
                        </div>
                    </div>
                </div>

                <hr className="divider" />
                
                {/* SEÇÃO 2: Tempos */}
                <h4 className="section-title">Linha do Tempo</h4>
                <div className="details-grid-2">
                    <div className="detail-item">
                        <span className="label">Chegada</span>
                        <span className="value">{formatTime(data.arrivalDate)}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Início Recebimento</span>
                        <span className="value">{formatTime(data.startDate)}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Fim Recebimento</span>
                        <span className="value">{formatTime(data.endDate)}</span>
                    </div>
                </div>

                <hr className="divider" />
                
                {/* SEÇÃO 3: KPIs (Calculados no Backend) */}
                <h4 className="section-title">Indicadores (minutos)</h4>
                <div className="kpi-grid">
                    <div className="kpi-card">
                        <span className="kpi-label">Tempo de Espera</span>
                        <span className="kpi-value text-orange">{data.waitTimeMin!= null ? `${data.waitTimeMin} Min` : "--"}</span> 
                    </div>
                    <div className="kpi-card">
                        <span className="kpi-label">Duração Recebimento</span>
                        <span className="kpi-value text-blue">{data.executionTimeMin != null ? `${data.executionTimeMin} Min` : "--"}</span>
                    </div>
                    <div className="kpi-card">
                        <span className="kpi-label">Permanência Total</span>
                        <span className="kpi-value text-dark">{data.stayTimeMin != null ? `${data.stayTimeMin} Min` : "--"}</span>
                    </div>
                </div>

                {/* Seção Extra: Observações e Pesos */}
                {(data.notes|| data.scaleWeight) && (
                    <div style={{marginTop: 20, background: '#f8fafc', padding: 10, borderRadius: 6}}>
                        <p style={{fontSize: '0.85rem', margin: 0}}><strong>Peso Balança:</strong> {data.scaleWeight} kg</p>
                        <p style={{fontSize: '0.85rem', margin: '5px 0 0 0'}}><strong>Obs:</strong> {data.notes}</p>
                    </div>
                )}
            </div>
            
            <div className="modal-footer">
                <button className="btn-modal btn-secondary" onClick={onClose}>Fechar</button>
            </div>
        </>
    );
}