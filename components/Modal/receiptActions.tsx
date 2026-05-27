import { useState } from "react";
import type { StartReceiptDto } from "../../src/interface/Receipt/startReceipt.dto";
import type { FinishReceiptDto } from "../../src/interface/Receipt/finishReceipt.dto";

// Interface genérica para suportar diferentes tipos de dados nos formulários
interface ReceiptActionProps<T> {
    onClose: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onConfirm: (form: any) => void; // mudei para any
    data?: T;
}

// --- FORMULÁRIO DE INICIAR (PLAY) ---
export function StartReceiptForm({ onClose, onConfirm, data }: ReceiptActionProps<StartReceiptDto>) {
    const [form, setForm] = useState<StartReceiptDto>({
        invoice_number: data?.invoice_number || "",
        invoice_weight: data?.invoice_weight || 0
    });

    const handleConfirm = () => {
        // Validação básica antes de enviar
        if (!form.invoice_number) {
            alert("Por favor, preencha a Nota Fiscal.");
            return;
        }
        onConfirm(form);
    };

    return (
        <>
            <div className="modal-header">
                <h3>Iniciar Recebimento</h3>
                <button className="btn-close" onClick={onClose}>&times;</button>
            </div>
            <div className="modal-body">
                <div className="form-group">
                    <label>Nota Fiscal *</label>
                    <input 
                        className="receipt-input" 
                        type="text"
                        placeholder="Digite o número da NF"
                        value={form.invoice_number}
                        onChange={e => setForm({...form, invoice_number: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label>Qtd Volumes (Peso Nota)</label>
                    <input 
                        className="receipt-input" 
                        type="number"
                        placeholder="0"
                        value={form.invoice_weight === 0 ? "" : form.invoice_weight}
                        onChange={e => {
                            setForm({...form, invoice_weight: Number(e.target.value)});
                        }}
                    />
                </div>
            </div>
            <div className="modal-footer">
                <button className="btn-modal btn-secondary" onClick={onClose}>Cancelar</button>
                <button className="btn-modal btn-confirm" onClick={handleConfirm}>
                    Confirmar Início
                </button>
            </div>
        </>
    );
}

// --- FORMULÁRIO DE FINALIZAR (STOP) ---
export function FinishReceiptForm({ onClose, onConfirm }: ReceiptActionProps<FinishReceiptDto>) {
    const [form, setForm] = useState<FinishReceiptDto>({ 
        scale_weight: 0, 
        notes: "" 
    });

    return (
        <>
            <div className="modal-header">
                <h3>Finalizar Recebimento</h3>
                <button className="btn-close" onClick={onClose}>&times;</button>
            </div>
            <div className="modal-body">
                <div className="form-group">
                    <label>Peso Balança / Contado *</label>
                    <input 
                        className="receipt-input" 
                        type="number"
                        placeholder="Digite o peso final"
                        value={form.scale_weight === 0 ? "" : form.scale_weight}
                        onChange={e => {
                            const val = e.target.value;
                            setForm({...form, scale_weight: val === "" ? 0 : Number(val)});
                        }}
                    />
                </div>
                <div className="form-group">
                    <label>Observações</label>
                    <textarea 
                        className="receipt-input" 
                        rows={3}
                        placeholder="Alguma divergência ou detalhe?"
                        value={form.notes}
                        onChange={e => setForm({...form, notes: e.target.value})}
                    />
                </div>
            </div>
            <div className="modal-footer">
                <button className="btn-modal btn-secondary" onClick={onClose}>Cancelar</button>
                <button 
                    className="btn-modal btn-confirm" 
                    onClick={() => onConfirm(form)}
                >
                    Finalizar
                </button>
            </div>
        </>
    );
}

// --- CONFIRMAÇÃO DE EXCLUSÃO ---
export function DeleteReceiptConfirm({ onClose, onConfirm }: ReceiptActionProps<void>) {
    return (
        <>
            <div className="modal-header">
                <h3 style={{color: '#ef4444'}}>Excluir Registro</h3>
                <button className="btn-close" onClick={onClose}>&times;</button>
            </div>
            <div className="modal-body">
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                    <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>
                        Tem certeza que deseja excluir este recebimento?
                    </p>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                        Esta ação é irreversível e removerá todos os dados deste veículo.
                    </p>
                </div>
            </div>
            <div className="modal-footer">
                <button className="btn-modal btn-secondary" onClick={onClose}>Cancelar</button>
                <button 
                    className="btn-modal" 
                    style={{background: '#ef4444', color: 'white', border:'none'}} 
                    onClick={() => onConfirm('')}
                >
                    Excluir Definitivamente
                </button>
            </div>
        </>
    );
}