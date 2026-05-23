import React, { useState, useEffect } from 'react';
import "./styles.css"
import type { Receipt } from '../../src/interface/Receipt/receiptDto';


interface ReceiptEnterProps {
    onClose: () => void;
    onConfirm: (dados: Receipt) => void;
}

export default function ReceiptEnter({ onClose, onConfirm }: ReceiptEnterProps) {
    const [plate, setPlate] = useState('');

    // Fecha o modal ao pressionar ESC
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose(); 
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!plate) return;

        onConfirm({license_plate: plate });
        setPlate('');
    };

    return (
        <> 
            <div className="modal-header">
                <h3>Portaria - Registrar Entrada</h3>
                <button className="btn-close" onClick={onClose}>&times;</button>
            </div>

            <div className="modal-body">
                <form id="entryForm" onSubmit={handleSubmit}>
                    <label htmlFor="plate">Placa do Veículo:</label>
                    <input 
                        id="plate"
                        type="text"
                        className="receipt-input"
                        value={plate}
                        onChange={e => setPlate(e.target.value.toUpperCase())}
                        placeholder="Ex: ABC-1234"
                        required
                        style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}
                    />
                </form>
            </div>

            <div className="modal-footer">
                <button type="button" className="btn-modal btn-secondary" onClick={onClose}>
                    Cancelar
                </button>
                <button type="submit" form="entryForm" className="btn-modal btn-confirm">
                    Confirmar Entrada
                </button>
            </div>
        </>
    );
}