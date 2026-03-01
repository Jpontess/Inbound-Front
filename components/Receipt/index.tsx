import { useState, useEffect, useRef } from "react"; // Adicione useRef
import "./styles.css"

// Imports do Backend (Mantenha igual)
import { SupplierService } from "../../src/services/Supplier/supplierService";
import { ReceiptService } from "../../src/services/Receipt/receiptService";
import type { Supplier } from "../../src/interface/Supplier/supplier";
import type { CreateReceiptDto } from "../../src/interface/Receipt/createReceiptDto"; 

interface NewReceiptProps {
    onSalvar: (dados: CreateReceiptDto) => void;
}

export default function NewReceipt({ onSalvar }: NewReceiptProps) {
    
    // 1. Dados da API
    const [listaFornecedores, setListaFornecedores] = useState<Supplier[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 2. Estado do Formulário
    const [form, setForm] = useState({
        fornecedorId: "", 
        fornecedorname: "", 
        placa: ""
    });

    // 3. ESTADOS NOVOS PARA O AUTOCOMPLETE
    const [buscaFornecedor, setBuscaFornecedor] = useState(""); // O texto que o usuário digita
    const [mostrarSugestoes, setMostrarSugestoes] = useState(false); // Abre/fecha a lista
    const wrapperRef = useRef<HTMLDivElement>(null); // Para detectar clique fora

    // Carregar dados (Igual ao anterior)
    useEffect(() => {
        const carregarDados = async () => {
            try {
                const data = await SupplierService.getAll();
                setListaFornecedores(data);
            } catch (error) {
                console.error("Erro", error);
            } finally {
                setIsLoading(false);
            }
        };
        carregarDados();
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setMostrarSugestoes(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);


    const fornecedoresFiltrados = listaFornecedores.filter(f => 
        f.name.toLowerCase().includes(buscaFornecedor.toLowerCase())
    );

    const selecionarFornecedor = (fornecedor: Supplier) => {
        setForm(prev => ({ 
            ...prev, 
            fornecedorId: fornecedor._id, 
            fornecedorname: fornecedor.name 
        }));
        setBuscaFornecedor(fornecedor.name); 
        setMostrarSugestoes(false); 
    };

    // Quando o usuário digita
    const handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBuscaFornecedor(e.target.value);
        setMostrarSugestoes(true);
        if (e.target.value === "") {
            setForm(prev => ({ ...prev, fornecedorId: "" }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ 
            ...prev, 
            [name]: name === 'placa' ? value.toUpperCase() : value 
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validação extra: O usuário digitou mas não clicou em ninguém da lista?
        if (!form.fornecedorId) {
            alert("Por favor, selecione um fornecedor válido da lista.");
            return;
        }

        try {
            const payload: CreateReceiptDto = {
                fornecedor: form.fornecedorId,
                placa: form.placa
            };

            await ReceiptService.create(payload);
            
            alert("Entrada registrada com sucesso!");
            onSalvar(payload);

            // Limpa tudo
            setForm({
                fornecedorId: "", fornecedorname: "", placa: ""
            });
            setBuscaFornecedor("");

        } catch (error) {
            console.error(error);
            alert("Erro ao registrar entrada.");
        }
    };

    return (
        <div className="receipt-container">
            <div className="receipt-card">
                <div className="receipt-header">
                    <h2 className="receipt-title">Novo Recebimento</h2>
                    <p className="receipt-subtitle">Preencha os dados do veículo</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <h4 style={{marginBottom: 15, color: '#d9224a', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.05em'}}>
                        DADOS DO TRANSPORTE
                    </h4>
                    
                    <div className="receipt-grid">
                        
                        {/* --- AUTOCOMPLETE DE FORNECEDOR --- */}
                        <div className="input-group" ref={wrapperRef} style={{position: 'relative'}}>
                            <label>Fornecedor *</label>
                            <input 
                                type="text"
                                className="receipt-input"
                                placeholder={isLoading ? "Carregando..." : "Digite para buscar..."}
                                value={buscaFornecedor}
                                onChange={handleBuscaChange}
                                onFocus={() => setMostrarSugestoes(true)}
                                disabled={isLoading}
                                required 
                            />
                            
                            {/* LISTA FLUTUANTE DE SUGESTÕES */}
                            {mostrarSugestoes && (
                                <ul className="autocomplete-list">
                                    {isLoading && <li className="autocomplete-item disabled">Carregando...</li>}
                                    
                                    {!isLoading && fornecedoresFiltrados.length === 0 && (
                                        <li className="autocomplete-item disabled">Nenhum fornecedor encontrado</li>
                                    )}

                                    {fornecedoresFiltrados.map((fornecedor) => (
                                        <li 
                                            key={fornecedor._id} 
                                            className="autocomplete-item"
                                            onClick={() => selecionarFornecedor(fornecedor)}
                                        >
                                            {fornecedor.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        
                        {/* INPUT PLACA */}
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
                    <hr style={{border: 0, borderTop: '1px solid #f1f5f9', margin: '8px 0'}} />
                    <div className="receipt-actions">
                        <button type="submit" className="btn-save">Registrar entrada</button>
                    </div>
                </form>
            </div>
        </div>
    );
}