import type { Supplier } from "../Supplier/supplier";

export interface Receipt {
    _id?: string;
    supplier?: Supplier; 
    supplierName?: string
    usuario?: string;
    nomeUsuario?: string       
    licensePlate?: string;
    invoiceNumber?: string;
    invoiceWeight?: number;
    scaleWeight?: number;
    
    
    schedulingDate?: string;
    arrivalDate?: string;
    startDate?: string;
    endDate?: string;
    
    waitTimeMin?: number;
    executionTimeMin?: number;  
    stayTimeMin?: number;

    status?: "Agendado" | "Aguardando" | "Conferindo" | "Finalizado" | "Divergencia";
    notes?: string;
}