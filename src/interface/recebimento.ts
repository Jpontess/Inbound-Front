export interface Recebimento{
    id: number,
    nome: string;
    responsavel?: string;
    placa?: string;
    nf?: string;
    inicio?: string
    chegada?: string;
    fim?: string;
    status: "Aguardando" | "Finalizado" | "Conferindo" | "Agendado";
}

export type Modal = "visualizar" | "editar" | "deletar" | "entrada" | "iniciar" | "finalizar" | null;