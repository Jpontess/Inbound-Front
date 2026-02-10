import { useState } from "react";
import "./styles.css"; // Importe seu CSS global

interface User {
    id: number;
    name: string;
    email: string;
    role: "Admin" | "Operador" | "Visualizador";
    status: "Ativo" | "Inativo";
}

export default function Users() {
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: "João Silva", email: "joao@empresa.com", role: "Admin", status: "Ativo" },
        { id: 2, name: "Maria Oliveira", email: "maria@empresa.com", role: "Operador", status: "Ativo" },
        { id: 3, name: "Carlos Souza", email: "carlos@empresa.com", role: "Visualizador", status: "Inativo" },
    ]);

    // Estado do Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    
    // Formulário
    const [formData, setFormData] = useState<Partial<User>>({
        name: "", email: "", role: "Operador", status: "Ativo"
    });

    const handleOpenModal = (user?: User) => {
        if (user) {
            setEditingId(user.id);
            setFormData(user);
        } else {
            setEditingId(null);
            setFormData({ name: "", email: "", role: "Operador", status: "Ativo" });
        }
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm("Tem certeza que deseja remover este usuário?")) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editingId) {
            // Editar existente
            setUsers(users.map(u => u.id === editingId ? { ...u, ...formData } as User : u));
        } else {
            // Criar novo
            const newUser = { ...formData, id: Date.now() } as User;
            setUsers([...users, newUser]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="crud-page">
            <div className="crud-container">
                
                <div className="crud-header">
                    <div>
                        <h2>Gestão de Usuários</h2>
                        <p style={{color: '#64748b', margin: 0}}>Controle de acesso e permissões.</p>
                    </div>
                    <button className="btn-add" onClick={() => handleOpenModal()}>+ Novo Usuário</button>
                </div>

                <div className="crud-card">
                    <table className="crud-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Permissão</th>
                                <th>Status</th>
                                <th style={{textAlign: 'right'}}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td style={{fontWeight: 600}}>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <span className={`status-badge ${user.status === 'Ativo' ? 'status-active' : 'status-inactive'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td style={{textAlign: 'right'}}>
                                        <button className="action-btn edit-btn" onClick={() => handleOpenModal(user)}>Editar</button>
                                        <button className="action-btn delete-btn" onClick={() => handleDelete(user.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL SIMPLES */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{editingId ? 'Editar Usuário' : 'Novo Usuário'}</h3>
                            <button className="btn-close" onClick={() => setIsModalOpen(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSave}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Nome Completo</label>
                                    <input className="form-input" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                </div>
                                <div className="form-group">
                                    <label>Email Corporativo</label>
                                    <input type="email" className="form-input" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                                </div>
                                <div className="detail-row">
                                    <div className="form-group" style={{flex: 1, marginRight: 10}}>
                                        <label>Permissão</label>
                                        <select className="form-input" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value as any})}>
                                            <option>Admin</option>
                                            <option>Operador</option>
                                            <option>Visualizador</option>
                                        </select>
                                    </div>
                                    <div className="form-group" style={{flex: 1}}>
                                        <label>Status</label>
                                        <select className="form-input" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                                            <option>Ativo</option>
                                            <option>Inativo</option>
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