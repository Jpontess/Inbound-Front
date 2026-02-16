export interface UpdateReceiptDto {
    fornecedor?: string 
    usuario?: string
    placa?: string
    notaFiscal?: string
    pesoNota?:number
    pesoBalanca?: number
    obs?:string
    dataChegada?: Date
    dataFim?: Date
    dataInicio?: Date
    tempoEsperaMin?: number
    tempoExecusaoMin?: number
    tempoPemanenciaMin?: number
    status?: string
}