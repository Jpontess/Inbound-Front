import { useState, useEffect } from "react";
import "./styles.css"
import { SupplierService } from "../../src/services/Supplier/supplierService"; 
import { Supplier } from "../../src/interface/Supplier/supplier";
import { SupplierDto } from "../../src/interface/Supplier/supplier.dto";

export default function SupplierPage() {
    // --- ESTADOS ---
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [fornecedores, setFornecedores] = useState<Supplier[]>([]);

    const [formData, setFormData] = useState<SupplierDto>({
        supplier_name: "", 
    });

    // --- CARREGAR DADOS ---
    const fetchSuppliers = async () => {
        try {
            setIsLoading(true);
            const data = await SupplierService.getAll();
            setFornecedores(data); 
        } catch (error) {
            console.error("Erro ao buscar fornecedores:", error);
            alert("Erro ao carregar lista.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    // --- FUNÇÕES ---
    const handleOpenModal = (supplier?: Supplier) => {
        if (supplier) {
            setEditingId(supplier.id);
            setFormData({
                supplier_name: supplier.supplier_name
            });
        } else {
            setEditingId(null);
            setFormData({ supplier_name: ""});
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await SupplierService.update(editingId, formData);
                alert("Fornecedor atualizado!");
            } else {
                await SupplierService.create(formData);
                alert("Fornecedor criado!");
            }
            setIsModalOpen(false);
            fetchSuppliers(); 
        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao salvar fornecedor.");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Tem certeza que deseja excluir este fornecedor?")) {
            try {
                await SupplierService.delete(id);
                setFornecedores(prev => prev.filter(f => f.id !== id));
            } catch (error) {
                console.error("Erro ao excluir:", error);
                alert("Erro ao excluir fornecedor.");
            }
        }
    };
    
    const filteredSuppliers = fornecedores.filter(f => 
        (f.supplier_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (f.supplier_status ? "ativo" : "inativo").includes(searchTerm.toLowerCase())
    );

    return (
        <div className="crud-page">
            <div className="crud-container">
             
                <div className="crud-header">
                    <div>
                        <h2>Fornecedores</h2>
                        <p style={{color: '#64748b', margin: '5px 0 0 0'}}>Gerencie seus parceiros comerciais.</p>
                    </div>
                    <button className="btn-add" onClick={() => handleOpenModal()}>
                        + Novo Fornecedor
                    </button>
                </div>
                
                <div className="crud-card">
                    <div style={{padding: '20px', borderBottom: '1px solid #e2e8f0'}}>
                        <input 
                            type="text" 
                            placeholder="Buscar por name ou status..." 
                            style={{
                                padding: '10px 15px', 
                                borderRadius: '8px', 
                                border: '1px solid #cbd5e1', 
                                width: '100%',
                                maxWidth: '300px',
                                outline: 'none',
                                fontSize: '0.9rem'
                            }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {isLoading ? (
                        <div style={{padding: '40px', textAlign: 'center', color: '#64748b'}}>
                            Carregando fornecedores...
                        </div>
                    ) : (
                        <table className="crud-table">
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Name</th>
                                    <th style={{textAlign: 'right'}}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSuppliers.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} style={{padding: '30px', textAlign: 'center', color: '#94a3b8', fontStyle: 'italic'}}>
                                            Nenhum fornecedor encontrado.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredSuppliers.map((f) => (
                                        <tr key={f.id}>
                                            <td>
                                                <span className={`status-badge ${f.supplier_status ? 'status-active' : 'status-inactive'}`}>
                                                    {f.supplier_status ? "Ativo" : "Inativo"}
                                                </span>
                                            </td>
                                            <td style={{fontWeight: 600}}>{f.supplier_name}</td>
                                            <td style={{textAlign: "right"}}>
                                                <button className="action-btn edit-btn" title="Editar" onClick={() => handleOpenModal(f)}>
                                                    Editar
                                                </button>
                                                <button className="action-btn delete-btn" title="Excluir" onClick={() => handleDelete(f.id)}>
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* --- MODAL --- */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{editingId ? 'Editar Fornecedor' : 'Novo Fornecedor'}</h3>
                            <button className="btn-close" onClick={() => setIsModalOpen(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSave}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Razão Social *</label>
                                    <input 
                                        className="form-input" 
                                        required 
                                        value={formData.supplier_name}
                                        onChange={e => setFormData({...formData, supplier_name: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-modal btn-secondary" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                                <button type="submit" className="btn-modal btn-confirm">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}