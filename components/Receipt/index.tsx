import { useState } from "react";
import "./styles.css"

interface NovoRecebimentoForm {
    fornecedor: string;
    placa?: string;
    notaFiscal?: string;
    qtdVolumes?: string;
    dataPrevista?: string;
}

interface NewReceiptProps {
    onSalvar: (dados: NovoRecebimentoForm) => void;
}

export default function NewReceipt({ onSalvar }: NewReceiptProps) {
    
    const [form, setForm] = useState<NovoRecebimentoForm>({
        fornecedor: "", placa: "", notaFiscal: "", qtdVolumes: "",  dataPrevista: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSalvar(form);
    };

    return (
        <div className="receipt-container">
            
            <div className="receipt-card">
                {/* Cabeçalho dentro do card */}
                <div className="receipt-header">
                    <h2 className="receipt-title">Novo Recebimento</h2>
                    <p className="receipt-subtitle">Preencha os dados da carga e transporte</p>
                </div>

                <form onSubmit={handleSubmit}>
                    
                    {/* SEÇÃO 1 */}
                    <h4 style={{marginBottom: 15, color: '#d9224a', fontSize: '0.9rem'}}>DADOS DO TRANSPORTE</h4>
                    <div className="receipt-grid">
                        <div className="input-group">
                            <label>Fornecedor *</label>
                            <input 
                                name="fornecedor" 
                                className="receipt-input" 
                                placeholder="Ex: Nestlé Brasil" 
                                required 
                                value={form.fornecedor} onChange={handleChange}
                            />
                        </div>
                        
                        <div className="input-group">
                            <label>Placa do Veículo *</label>
                            <input 
                                name="placa" 
                                className="receipt-input" 
                                placeholder="ABC-1234" 
                                style={{textTransform: 'uppercase'}} 
                                maxLength={8}
                                required
                                value={form.placa} onChange={handleChange}
                            />
                        </div>
                    </div>

                    <hr style={{border: 0, borderTop: '1px solid #f1f5f9', margin: '20px 0'}} />

                    {/* SEÇÃO 2 */}
                    <h4 style={{marginBottom: 15, color: '#d9224a', fontSize: '0.9rem'}}>DADOS DA CARGA</h4>
                    <div className="receipt-grid">
                        <div className="input-group">
                            <label>Nota Fiscal *</label>
                            <input 
                                name="notaFiscal" 
                                className="receipt-input" 
                                placeholder="000.000.000-00" 
                                type="number"
                                required
                                value={form.notaFiscal} onChange={handleChange}
                            />
                        </div>

                        <div className="input-group">
                            <label>Peso / Volumes (Kg)</label>
                            <input 
                                name="qtdVolumes" 
                                className="receipt-input" 
                                placeholder="Ex: 500"
                                value={form.qtdVolumes} onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Botão de Ação */}
                    <div className="receipt-actions">
                        <button type="submit" className="btn-save">
                            SALVAR RECEBIMENTO
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}