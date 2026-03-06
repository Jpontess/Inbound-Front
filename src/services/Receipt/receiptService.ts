// src/services/ReceiptService.ts
import api from "../api";
import { type Receipt } from "../../interface/Receipt/receiptDto";
import type { CreateReceiptDto } from "../../interface/Receipt/createReceiptDto";
import type { UpdateReceiptDto } from "../../interface/Receipt/updateReceiptDto";
import type { StartReceiptDto } from "../../interface/Receipt/startReceipt.dto";

export const ReceiptService = {
    // 1. Listar Todos
    getAll: async () => {
        const response = await api.get<Receipt[]>("/receipt");
        return response.data;
    },

    // 2. Criar (Registrar Entrada)
    create: async (data: CreateReceiptDto) => {
        const response = await api.post("/receipt", data);
        return response.data;
    },

    // 2.1 Criar Agendamento
    createSchedule: async (data: CreateReceiptDto) => {
        const response = await api.post("/receipt/schedule", data);
        return response.data;
    },

    // 3. Atualizar Genérico (Editar)
    update: async (id: string, data: UpdateReceiptDto) => {
        const response = await api.patch(`/receipt/${id}`, data); 
        return response.data;
    },

    // 4. Iniciar Recebimento (Botão Play)
    start: async (id: string, data: StartReceiptDto) => {
        const payload = {
            ...data,
        };
        const response = await api.post(`/receipt/${id}/start`, payload);
        return response.data;
    },

    // 5. Finalizar Recebimento (Botão Stop)
    finish: async (id: string, data: UpdateReceiptDto) => {
        const response = await api.post(`/receipt/${id}/finish`, data); 
        return response.data;
    },

    // 6. Excluir
    delete: async (id: string) => {
        await api.delete(`/receipt/${id}`);
    },

    entryByPlate: async (id: string, data: { placa: string }) => {
        const response = await api.patch(`/receipt/${id}/input`, data);
        return response.data;
    }
};