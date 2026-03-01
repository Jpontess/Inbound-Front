import React, { useState } from "react";
import type { Receipt } from "../../src/interface/Receipt/receiptDto";
import "./styles.css"

interface Props {
    data: Receipt;
    onClose: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onConfirm: (dadosAtualizados: any) => void;
}

// Helper: Converte data ISO do Mongo (2026-02-14T10:00:00.000Z) 
// para o formato do input HTML (2026-02-14T10:00)
const formatDateForInput = (isoString?: string) => {
    if (!isoString) return "";
    return new Date(isoString).toISOString().slice(0, 16); // Pega apenas YYYY-MM-DDThh:mm
};

export default function ReceiptEdit({ data, onClose, onConfirm }: Props) {
    
    // Inicializamos o state com os dados atuais do veículo
    const [form, setForm] = useState({
        placa: data.licensePlate || "",
        notaFiscal: data.invoiceNumber || "",
        status: data.status,
        pesoNota: data.invoiceWeight || 0,
        pesoBalanca: data.scaleWeight || 0,
        obs: data.notes || "",
        // Datas (tratamento para não quebrar se vier null)
        dataChegada: formatDateForInput(data.arrivalDate),
        dataInicio: formatDateForInput(data.startDate),
        dataFim: formatDateForInput(data.endDate),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        setForm(prev => ({
            ...prev,
            // Se for número, converte. Se for texto, mantém.
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const handleSave = () => {
        onConfirm({
            ...form,
            arrivalDate: form.dataChegada ? new Date(form.dataChegada): null ,
            startDate: form.dataInicio ? new Date(form.dataInicio) : null,
            endDate: form.dataFim ? new Date(form.dataFim) : null,
        });
    };

    return (
        <>
            <div className="modal-header">
                <h3>Editar Registro (Admin)</h3>
                <button className="btn-close" onClick={onClose}>&times;</button>
            </div>
            
            <div className="modal-body">
                {/* Aviso visual de que é edição de admin */}
                <div style={{marginBottom: 15, padding: 10, background: '#fff7ed', borderLeft: '4px solid #f97316', fontSize: '0.85rem', color: '#c2410c'}}>
                    <strong>Atenção:</strong> Você está editando dados brutos do sistema.
                </div>

                <div className="form-group">
                    <label>Fornecedor (Apenas Leitura)</label>
                    <input className="receipt-input" disabled value={data.supplier?.name || "---"} style={{background: '#f1f5f9'}} />
                </div>

                {/* GRIDS PARA ORGANIZAR */}
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15, marginTop: 15}}>
                    <div className="form-group">
                        <label>Placa</label>
                        <input name="placa" className="receipt-input" 
                            value={form.placa} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select name="status" className="receipt-input" value={form.status} onChange={handleChange}>
                            <option value="Agendado">Agendado</option>
                            <option value="Aguardando">Aguardando</option>
                            <option value="Conferindo">Conferindo</option>
                            <option value="Finalizado">Finalizado</option>
                            <option value="Divergencia">Divergência</option>
                        </select>
                    </div>
                </div>

                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15, marginTop: 15}}>
                    <div className="form-group">
                        <label>Nota Fiscal</label>
                        <input name="notaFiscal" className="receipt-input" 
                            value={form.notaFiscal} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Peso Nota (Kg)</label>
                        <input name="pesoNota" type="number" className="receipt-input" 
                            value={form.pesoNota} onChange={handleChange} />
                    </div>
                </div>

                 <div className="form-group" style={{marginTop: 15}}>
                    <label>Peso Balança (Kg)</label>
                    <input name="pesoBalanca" type="number" className="receipt-input" 
                        value={form.pesoBalanca} onChange={handleChange} />
                </div>

                <hr className="divider" />

                {/* DATAS (PERIGOSO EDITAR, MAS PEDIDO PARA ADMIN) */}
                <h4 className="section-title">Ajuste de Horários</h4>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10}}>
                    <div className="form-group">
                        <label style={{fontSize: '0.8rem'}}>Chegada</label>
                        <input name="dataChegada" type="datetime-local" className="receipt-input" 
                            value={form.dataChegada} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label style={{fontSize: '0.8rem'}}>Início</label>
                        <input name="dataInicio" type="datetime-local" className="receipt-input" 
                            value={form.dataInicio} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label style={{fontSize: '0.8rem'}}>Fim</label>
                        <input name="dataFim" type="datetime-local" className="receipt-input" 
                            value={form.dataFim} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-group" style={{marginTop: 15}}>
                    <label>Observações</label>
                    <textarea name="obs" className="receipt-input" rows={3} 
                        value={form.obs} onChange={handleChange} />
                </div>
            </div>

            <div className="modal-footer">
                <button className="btn-modal btn-secondary" onClick={onClose}>Cancelar</button>
                <button className="btn-modal btn-confirm" onClick={handleSave}>Salvar Alterações</button>
            </div>
        </>
    );
}