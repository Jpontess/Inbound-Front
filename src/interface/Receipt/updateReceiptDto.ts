export interface UpdateReceiptDto {
    supplier?: string 
    usuario?: string
    licensePlate?: string
    invoiceNumber?: string
    invoiceWeight?:number
    scaleWeight?: number
    notes?:string   
    arrivalDate?: Date | null
    endDate?: Date | null
    startDate?: Date | null
    waitTimeMin?: number
    executionTimeMin?: number
    stayTimeMin?: number
    status?: string
}