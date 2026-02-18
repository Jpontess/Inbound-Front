// src/components/ActionButtons.tsx
import {type Recebimento, type Modal}  from "../../src/interface/recebimento";

interface ActionButtonsProps {
    veiculo: Recebimento;
    onAction: (tipo: Modal, veiculo: Recebimento) => void;
}

export default function ActionButtons({ veiculo, onAction }: ActionButtonsProps) {
    
    return (
        <div className="icon-group">
            
            <button className="btn-icon btn-view" title="Visualizar" onClick={() => onAction('visualizar', veiculo)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
            </button>

            <button className="btn-icon btn-edit" title="Editar" onClick={() => onAction('editar', veiculo)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            </button>

            <button className="btn-icon btn-delete" title="Deletar" onClick={() => onAction('deletar', veiculo)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
            </button>
            
            {veiculo.status === "Aguardando" && (
                <button className="btn-icon btn-play" title="Iniciar" onClick={() => onAction('iniciar', veiculo)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3L19 12L5 21V3Z" /></svg>
                </button>
            )}

            {veiculo.status === "Agendado" && (
                <button className="btn-icon btn-entry" title="Dar Entrada" onClick={() => onAction('entrada', veiculo)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>
                </button>
            )}

            {veiculo.status === "Conferindo" && (
                <button className="btn-icon btn-stop" title="Finalizar" onClick={() => onAction('finalizar', veiculo)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
                </button>
            )}
        </div>
    );
}