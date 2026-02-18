import { useState, useEffect } from "react";
import "../../components/Home/styles.css"; 
import { UserService} from "../../src/services/User/userServices"; 
import { type User } from "../../src/interface/User/User";
import { type UserDTO } from "../../src/interface/User/UserDto";

export default function Users() {
    // --- ESTADOS ---
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Modal e Edição (ID agora é string ou null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    
    // Formulário (Refletindo sua interface)
    const [formData, setFormData] = useState<UserDTO>({
        nome: "", 
        email: "", 
        funcao: "Operador", 
        turno: "1º Turno"
    });

    // --- CARREGAR DADOS ---
    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const data = await UserService.getAll();
            setUsers(data);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            alert("Erro ao carregar lista.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // --- SALVAR (POST/PATCH) ---
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                // Editar (Passando string ID)
                await UserService.update(editingId, formData);
                alert("Usuário atualizado!");
            } else {
                // Criar
                await UserService.create(formData);
                alert("Usuário criado!");
            }
            setIsModalOpen(false);
            fetchUsers(); 
        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao salvar usuário.");
        }
    };

    // --- DELETAR ---
    const handleDelete = async (id: string) => {
        if (confirm("Tem certeza que deseja remover este usuário?")) {
            try {
                await UserService.delete(id);
                setUsers(prev => prev.filter(u => u._id !== id));
            } catch (error) {
                console.error("Erro ao excluir:", error);
                alert("Erro ao excluir usuário.");
            }
        }
    };

    // --- ABRIR MODAL ---
    const handleOpenModal = (user?: User) => {
        if (user) {
            setEditingId(user._id);
            setFormData({
                nome: user.nome,
                email: user.email,
                funcao: user.funcao,
                turno: user.turno
            });
        } else {
            setEditingId(null);
            setFormData({ nome: "", email: "", funcao: "Operador", turno: "1º Turno" });
        }
        setIsModalOpen(true);
    };

    return (
        <div className="crud-page">
            <div className="crud-container">
                
                <div className="crud-header">
                    <div>
                        <h2>Gestão de Usuários</h2>
                        <p style={{color: '#64748b', margin: 0}}>Controle de equipe e turnos.</p>
                    </div>
                    <button className="btn-add" onClick={() => handleOpenModal()}>+ Novo Usuário</button>
                </div>

                <div className="crud-card">
                    {isLoading ? (
                        <div style={{padding: '40px', textAlign: 'center', color: '#64748b'}}>
                            Carregando equipe...
                        </div>
                    ) : (
                        <table className="crud-table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Função</th>
                                    <th>Turno</th>
                                    <th style={{textAlign: 'right'}}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} style={{textAlign: 'center', padding: '20px', color: '#94a3b8'}}>
                                            Nenhum usuário encontrado.
                                        </td>
                                    </tr>
                                ) : (
                                    users.map(user => (
                                        <tr key={user._id}>
                                            <td style={{fontWeight: 600}}>{user.nome}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <span style={{
                                                    backgroundColor: '#eff6ff', 
                                                    color: '#3b82f6', 
                                                    padding: '4px 8px', 
                                                    borderRadius: '6px', 
                                                    fontSize: '0.8rem', 
                                                    fontWeight: 600
                                                }}>
                                                    {user.funcao}
                                                </span>
                                            </td>
                                            <td>
                                                <span style={{
                                                    backgroundColor: '#f1f5f9',
                                                    color: '#475569',
                                                    padding: '4px 8px',
                                                    borderRadius: '6px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 600,
                                                    border: '1px solid #e2e8f0'
                                                }}>
                                                    {user.turno}
                                                </span>
                                            </td>
                                            <td style={{textAlign: 'right'}}>
                                                <button className="action-btn edit-btn" onClick={() => handleOpenModal(user)}>Editar</button>
                                                <button className="action-btn delete-btn" onClick={() => handleDelete(user._id)}>Excluir</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* MODAL DE USUÁRIOS */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{editingId ? 'Editar Usuário' : 'Novo Usuário'}</h3>
                            <button className="btn-close" onClick={() => setIsModalOpen(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleSave}>
                            <div className="modal-body">
                                
                                {/* Campo NOME */}
                                <div className="form-group">
                                    <label>Nome Completo</label>
                                    <input 
                                        className="form-input" 
                                        required 
                                        value={formData.nome} 
                                        onChange={e => setFormData({...formData, nome: e.target.value})} 
                                    />
                                </div>
                                
                                {/* Campo EMAIL */}
                                <div className="form-group">
                                    <label>Email</label>
                                    <input 
                                        type="email" 
                                        className="form-input" 
                                        required 
                                        value={formData.email} 
                                        onChange={e => setFormData({...formData, email: e.target.value})} 
                                    />
                                </div>

                                <div className="detail-row">
                                    {/* Campo FUNÇÃO */}
                                    <div className="form-group" style={{flex: 1, marginRight: 10}}>
                                        <label>Função</label>
                                        <select 
                                            className="form-input" 
                                            value={formData.funcao} 
                                            onChange={e => setFormData({...formData, funcao: e.target.value})}
                                        >
                                            <option value="Operador">Operador</option>
                                            <option value="Líder">Líder</option>
                                            <option value="Portaria">Portaria</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                    
                                    {/* Campo TURNO */}
                                    <div className="form-group" style={{flex: 1}}>
                                        <label>Turno</label>
                                        <select 
                                            className="form-input" 
                                            value={formData.turno} 
                                            onChange={e => setFormData({...formData, turno: e.target.value})}
                                        >
                                            <option value="Manhã">Manhã</option>
                                            <option value="Tarde">Tarde</option>
                                            <option value="Noite">Noite</option>
                                            <option value="Administrativo">Administrativo</option>
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