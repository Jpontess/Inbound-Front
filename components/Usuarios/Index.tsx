import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import api from "../../src/services/api";
import "./styles.css";

interface Usuario {
    id?: number; 
    nome: string;
    funcao: string;
}

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [nome, setNome] = useState("");
    const [funcao, setFuncao] = useState("");

    // 1. BUSCAR USUÁRIOS (GET)
    useEffect(() => {
        api.get('/usuarios')
            .then(response => setUsuarios(response.data))
            .catch(err => console.error("Erro ao buscar usuários:", err));
    }, []);

    // 2. ADICIONAR USUÁRIO (POST)
    const handleAddUser = async (e: FormEvent) => {
        e.preventDefault();
        if (!nome || !funcao) return;

        try {
            const response = await api.post('/usuarios', { nome, funcao });
            // Atualiza a lista com o que voltou do banco (que já tem o ID real)
            setUsuarios([...usuarios, response.data]); 
            setNome("");
            setFuncao("");
        } catch (err) {
            console.error("Erro ao salvar usuário:", err);
            alert("Falha ao salvar no servidor.");
        }
    };

    // 3. EXCLUIR USUÁRIO (DELETE)
    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/usuarios/${id}`);
            setUsuarios(usuarios.filter(user => user.id !== id));
        } catch (err) {
            alert("Erro ao excluir.");
        }
    };

    return (
        <main className="content">
            <h1>Gerenciamento de Usuários</h1>

            <form className="form-container" onSubmit={handleAddUser}>
                <input 
                    className="input-field"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
                />
                <input 
                    className="input-field"
                    placeholder="Função"
                    value={funcao}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFuncao(e.target.value)}
                />
                <button type="submit" className="btn-add">Salvar no Banco</button>
            </form>

            <section className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Função</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(user => (
                            <tr key={user.id}>
                                <td>{user.nome}</td>
                                <td>{user.funcao}</td>
                                <td>
                                    <button 
                                        className="btn-delete" 
                                        onClick={() => user.id && handleDelete(user.id)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}