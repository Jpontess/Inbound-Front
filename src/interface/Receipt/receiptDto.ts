import type { Supplier } from "../Supplier/supplier";

export interface Receipt {
    _id?: string;
    supplier?: Supplier; 
    supplier_name?: string
    user_name?: string;
    nomeUsuario?: string       
    license_plate?: string;
    invoice_number?: string;
    invoice_weight?: number;
    scale_weight?: number;
    
    
    scheduling_date?: string;
    arrival_date?: string;
    start_date?: string;
    end_date?: string;
    
    wait_time_min?: number;
    execution_time_min?: number;  
    stay_time_min?: number;

    status?: "Agendado" | "Aguardando" | "Conferindo" | "Finalizado" | "Divergencia";
    notes?: string;
}