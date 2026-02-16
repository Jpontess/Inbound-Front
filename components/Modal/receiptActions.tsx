import { useState } from "react";

// --- FORMULÁRIO DE INICIAR (PLAY) ---
export function StartReceiptForm({ onClose, onConfirm }: any) {
    const [form, setForm] = useState({ notaFiscal: "", qtdVolumes: "" });

    return (
        <>
            <div className="modal-header">
                <h3>Iniciar Recebimento</h3>
                <button className="btn-close" onClick={onClose}>&times;</button>
            </div>
            <div className="modal-body">
                <div className="form-group">
                    <label>Nota Fiscal *</label>
                    <input className="receipt-input" 
                        value={form.notaFiscal}
                        onChange={e => setForm({...form, notaFiscal: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label>Qtd Volumes (Peso Nota)</label>
                    <input className="receipt-input" type="number"
                        value={form.qtdVolumes}
                        onChange={e => setForm({...form, qtdVolumes: e.target.value})}
                    />
                </div>
            </div>
            <div className="modal-footer">
                <button className="btn-modal btn-secondary" onClick={onClose}>Cancelar</button>
                <button className="btn-modal btn-confirm" onClick={() => onConfirm(form)}>Confirmar Início</button>
            </div>
        </>
    );
}

// --- FORMULÁRIO DE FINALIZAR (STOP) ---
export function FinishReceiptForm({ onClose, onConfirm }: any) {
    const [form, setForm] = useState({ pesoContado: "", observacao: "" });

    return (
        <>
            <div className="modal-header">
                <h3>Finalizar Recebimento</h3>
                <button className="btn-close" onClick={onClose}>&times;</button>
            </div>
            <div className="modal-body">
                <div className="form-group">
                    <label>Peso Balança / Contado *</label>
                    <input className="receipt-input" type="number"
                        value={form.pesoContado}
                        onChange={e => setForm({...form, pesoContado: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label>Observações</label>
                    <textarea className="receipt-input" rows={3}
                        value={form.observacao}
                        onChange={e => setForm({...form, observacao: e.target.value})}
                    />
                </div>
            </div>
            <div className="modal-footer">
                <button className="btn-modal btn-secondary" onClick={onClose}>Cancelar</button>
                <button className="btn-modal btn-confirm" onClick={() => onConfirm(form)}>Finalizar</button>
            </div>
        </>
    );
}

// --- CONFIRMAÇÃO DE EXCLUSÃO ---
export function DeleteReceiptConfirm({ onClose, onConfirm }: any) {
    return (
        <>
            <div className="modal-header">
                <h3 style={{color: '#ef4444'}}>Excluir Registro</h3>
                <button className="btn-close" onClick={onClose}>&times;</button>
            </div>
            <div className="modal-body">
                <p>Tem certeza que deseja excluir este recebimento? Esta ação não pode ser desfeita.</p>
            </div>
            <div className="modal-footer">
                <button className="btn-modal btn-secondary" onClick={onClose}>Cancelar</button>
                <button className="btn-modal" 
                    style={{background: '#ef4444', color: 'white', border:'none'}} 
                    onClick={onConfirm}
                >
                    Excluir Definitivamente
                </button>
            </div>
        </>
    );
}