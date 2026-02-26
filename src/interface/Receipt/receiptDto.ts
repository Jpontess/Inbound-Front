import type { Supplier } from "../Supplier/supplier";
import type { User } from "../User/User";

export interface Receipt {
    _id?: string;
    fornecedor?: Supplier; 
    nomeFornecedor?: string
    usuario?: User;
    nomeUsuario?: string       
    placa?: string;
    notaFiscal?: string;
    pesoNota?: number;
    pesoBalanca?: number;
    
    
    dataAgendamento?: string;
    dataChegada?: string;
    dataInicio?: string;
    dataFim?: string;
    
    tempoEsperaMin?: number;
    tempoExecucaoMin?: number;
    tempoPermanenciaMin?: number;

    status?: "Agendado" | "Aguardando" | "Conferindo" | "Finalizado" | "Divergencia";
    obs?: string;
}