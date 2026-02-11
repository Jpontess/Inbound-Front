import { useState } from "react";
import "./styles.css"

// Interface do Objeto que será enviado ao Backend
interface NovoRecebimentoForm {
    fornecedorId: string; // Mudamos para ID (mais correto p/ backend) ou mantenha nome se preferir
    fornecedorNome: string; 
    placa: string;
    notaFiscal: string;
    qtdVolumes: string;
    dataPrevista: string;
}

interface NewReceiptProps {
    onSalvar: (dados: NovoRecebimentoForm) => void;
}

// Simulando dados que viriam da API (/api/fornecedores)
const FORNECEDORES_MOCK = [
    { id: 1, nome: "Nestlé Brasil Ltda" },
    { id: 2, nome: "Klabin S.A." },
    { id: 3, nome: "Ambev S.A." },
    { id: 4, nome: "Coca-Cola FEMSA" },
    { id: 5, nome: "M Dias Branco" }
];

export default function NewReceipt({ onSalvar }: NewReceiptProps) {
    
    const [form, setForm] = useState<NovoRecebimentoForm>({
        fornecedorId: "", 
        fornecedorNome: "",
        placa: "", 
        notaFiscal: "", 
        qtdVolumes: "",  
        dataPrevista: ""
    });

    // Função específica para o Select de Fornecedor
    const handleFornecedorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const idSelecionado = e.target.value;
        const fornecedorEncontrado = FORNECEDORES_MOCK.find(f => f.id.toString() === idSelecionado);
        
        setForm(prev => ({ 
            ...prev, 
            fornecedorId: idSelecionado,
            fornecedorNome: fornecedorEncontrado ? fornecedorEncontrado.nome : ""
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validação simples
        if (!form.fornecedorId) {
            alert("Selecione um fornecedor da lista!");
            return;
        }
        onSalvar(form);
    };

    return (
        <div className="receipt-container">
            
            <div className="receipt-card">
                <div className="receipt-header">
                    <h2 className="receipt-title">Novo Recebimento</h2>
                    <p className="receipt-subtitle">Preencha os dados da carga e transporte</p>
                </div>

                <form onSubmit={handleSubmit}>
                    
                    {/* SEÇÃO 1 */}
                    <h4 style={{marginBottom: 15, color: '#d9224a', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.05em'}}>DADOS DO TRANSPORTE</h4>
                    <div className="receipt-grid">
                        
                        {/* MUDANÇA AQUI: Select em vez de Input */}
                        <div className="input-group">
                            <label>Fornecedor *</label>
                            <select 
                                name="fornecedorId" 
                                className="receipt-input" // Reaproveita o estilo do input
                                required 
                                value={form.fornecedorId} 
                                onChange={handleFornecedorChange}
                                style={{backgroundColor: '#fff', cursor: 'pointer'}}
                            >
                                <option value="" disabled>Selecione um fornecedor...</option>
                                {FORNECEDORES_MOCK.map((fornecedor) => (
                                    <option key={fornecedor.id} value={fornecedor.id}>
                                        {fornecedor.nome}
                                    </option>
                                ))}
                            </select>
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
                    <hr style={{border: 0, borderTop: '1px solid #f1f5f9', margin: '25px 0'}} />
                    <div className="receipt-actions">
                        <button type="submit" className="btn-save">
                            Registrar entrada
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}