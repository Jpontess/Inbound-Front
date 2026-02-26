export interface CreateReceiptDto {
    fornecedor: string
    placa?: string;
    dataAgendamento?: string;
    pesoNota?: number;
}