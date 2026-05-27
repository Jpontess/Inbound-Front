export interface CreateReceiptDto {
    supplier_id: string
    license_plate?: string;
    arrival_date?: string;
    invoice_weight?: number;
    scheduling_date?: string
}