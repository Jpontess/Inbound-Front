import ReceiptDetails from "./receiptDetails";
import ReceiptEdit from "./receiptEdit"
import { StartReceiptForm, FinishReceiptForm, DeleteReceiptConfirm } from "./receiptActions";
import type { Receipt } from "../../src/interface/Receipt/receiptDto";

interface ActionsModalsProps {
    isOpen: boolean;
    type: string | null; // 'visualizar' | 'iniciar' | 'finalizar' | 'deletar'
    veiculo: Receipt | null;
    onClose: () => void;
    onConfirm: (dados?: any) => void;
}

export default function ActionsModals({ isOpen, type, veiculo, onClose, onConfirm }: ActionsModalsProps) {
    if (!isOpen || !veiculo) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                
                {/* 1. VISUALIZAR DETALHES */}
                {type === 'visualizar' && (
                    <ReceiptDetails data={veiculo} onClose={onClose} />
                )}

                {type === 'editar' && (
                    <ReceiptEdit data={veiculo} onClose={onClose} onConfirm={onConfirm} />
                )}

                {/* 2. DAR PLAY (INICIAR) */}
                {type === 'iniciar' && (
                    <StartReceiptForm onClose={onClose} onConfirm={onConfirm} />
                )}

                {/* 3. PARAR (FINALIZAR) */}
                {type === 'finalizar' && (
                    <FinishReceiptForm onClose={onClose} onConfirm={onConfirm} />
                )}

                {/* 4. EXCLUIR */}
                {type === 'deletar' && (
                    <DeleteReceiptConfirm onClose={onClose} onConfirm={onConfirm} />
                )}

            </div>
        </div>
    );
}