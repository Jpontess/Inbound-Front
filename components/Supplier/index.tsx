import { useState } from "react";
// Certifique-se de que o CSS que você me mandou está neste arquivo
import "../../components/Users/styles.css"; 

interface Supplier {
    id: number;
    razaoSocial: string;
    cnpj: string;
    categoria: "Transporte" | "Alimentos" | "Embalagens" | "Serviços";
    contato: string;
    status: "Ativo" | "Inativo";
}

export default function Supplier() {
    // --- ESTADOS ---
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    // Dados Mockados
    const [fornecedores, setFornecedores] = useState<Supplier[]>([
        { id: 1, razaoSocial: "Nestlé Brasil Ltda", cnpj: "60.409.075/0001-52", categoria: "Alimentos", contato: "(11) 5555-1234", status: "Ativo" },
        { id: 2, razaoSocial: "Klabin S.A.", cnpj: "89.637.490/0001-45", categoria: "Embalagens", contato: "contato@klabin.com", status: "Ativo" },
        { id: 3, razaoSocial: "Loggi Transportes", cnpj: "12.345.678/0001-90", categoria: "Transporte", contato: "(11) 9999-8888", status: "Inativo" },
    ]);

    // Form do Modal
    const [formData, setFormData] = useState<Partial<Supplier>>({
        razaoSocial: "", cnpj: "", categoria: "Alimentos", contato: "", status: "Ativo"
    });

    // --- FUNÇÕES ---
    const handleOpenModal = (supplier?: Supplier) => {
        if (supplier) {
            setEditingId(supplier.id);
            setFormData(supplier);
        } else {
            setEditingId(null);
            setFormData({ razaoSocial: "", cnpj: "", categoria: "Alimentos", contato: "", status: "Ativo" });
        }
        setIsModalOpen(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            setFornecedores(fornecedores.map(f => f.id === editingId ? { ...f, ...formData } as Supplier : f));
        } else {
            const newId = fornecedores.length > 0 ? Math.max(...fornecedores.map(f => f.id)) + 1 : 1;
            setFornecedores([...fornecedores, { ...formData, id: newId } as Supplier]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id: number) => {
        if (confirm("Tem certeza que deseja excluir este fornecedor?")) {
            setFornecedores(fornecedores.filter(f => f.id !== id));
        }
    };

    // Filtro
    const filteredSuppliers = fornecedores.filter(f => 
        f.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.cnpj.includes(searchTerm)
    );

    return (
        <div className="crud-page">
            <div className="crud-container">
                
                {/* CABEÇALHO CRUD */}
                <div className="crud-header">
                    <div>
                        <h2>Fornecedores</h2>
                        <p style={{color: '#64748b', margin: '5px 0 0 0'}}>Gerencie seus parceiros comerciais.</p>
                    </div>
                    <button className="btn-add" onClick={() => handleOpenModal()}>
                        + Novo Fornecedor
                    </button>
                </div>

                {/* CARD DA TABELA */}
                <div className="crud-card">
                    
                    {/* Barra de Busca Simples dentro do Card */}
                    <div style={{padding: '20px', borderBottom: '1px solid #e2e8f0'}}>
                        <input 
                            type="text" 
                            placeholder="Buscar por nome ou CNPJ..." 
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

                    <table className="crud-table">
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Razão Social</th>
                                <th>CNPJ</th>
                                <th>Categoria</th>
                                <th>Contato</th>
                                <th style={{textAlign: 'right'}}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSuppliers.map((f) => (
                                <tr key={f.id}>
                                    <td>
                                        <span className={`status-badge ${f.status === 'Ativo' ? 'status-active' : 'status-inactive'}`}>
                                            {f.status}
                                        </span>
                                    </td>
                                    <td style={{fontWeight: 600}}>{f.razaoSocial}</td>
                                    <td>{f.cnpj}</td>
                                    <td>{f.categoria}</td>
                                    <td>{f.contato}</td>
                                    <td style={{textAlign: "right"}}>
                                        <button className="action-btn edit-btn" title="Editar" onClick={() => handleOpenModal(f)}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                                        </button>
                                        <button className="action-btn delete-btn" title="Excluir" onClick={() => handleDelete(f.id)}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {filteredSuppliers.length === 0 && (
                        <div style={{padding: '30px', textAlign: 'center', color: '#94a3b8', fontStyle: 'italic'}}>
                            Nenhum fornecedor encontrado.
                        </div>
                    )}
                </div>
            </div>

            {/* --- MODAL (Mantive a estrutura padrão pois o CSS do modal é global) --- */}
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
                                        value={formData.razaoSocial}
                                        onChange={e => setFormData({...formData, razaoSocial: e.target.value})}
                                    />
                                </div>
                                
                                <div style={{display: 'flex', gap: 15}}>
                                    <div className="form-group" style={{flex: 1}}>
                                        <label>CNPJ *</label>
                                        <input 
                                            className="form-input" 
                                            required 
                                            placeholder="00.000.000/0000-00"
                                            value={formData.cnpj}
                                            onChange={e => setFormData({...formData, cnpj: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group" style={{flex: 1}}>
                                        <label>Categoria</label>
                                        <select 
                                            className="form-input"
                                            value={formData.categoria}
                                            onChange={e => setFormData({...formData, categoria: e.target.value as any})}
                                        >
                                            <option value="Alimentos">Alimentos</option>
                                            <option value="Embalagens">Embalagens</option>
                                            <option value="Transporte">Transporte</option>
                                            <option value="Serviços">Serviços</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{display: 'flex', gap: 15}}>
                                    <div className="form-group" style={{flex: 1}}>
                                        <label>Contato</label>
                                        <input 
                                            className="form-input" 
                                            value={formData.contato}
                                            onChange={e => setFormData({...formData, contato: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group" style={{width: '120px'}}>
                                        <label>Status</label>
                                        <select 
                                            className="form-input"
                                            value={formData.status}
                                            onChange={e => setFormData({...formData, status: e.target.value as any})}
                                        >
                                            <option value="Ativo">Ativo</option>
                                            <option value="Inativo">Inativo</option>
                                        </select>
                                    </div>
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