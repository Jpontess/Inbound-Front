export interface UpdateReceiptDto {
    supplier_id?: string 
    usuario?: string
    license_plate?: string
    invoice_number?: string
    invoice_weight?:number
    scale_weight?: number
    notes?:string   
    arrival_date?: Date | null
    end_date?: Date | null
    start_date?: Date | null
    wait_time_min?: number
    execution_time_min?: number
    stay_time_min?: number
    status?: string
}