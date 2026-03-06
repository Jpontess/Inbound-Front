export interface CreateReceiptDto {
    supplier_Id: string
    licensePlate?: string;
    arrivalDate?: string;
    invoiceWeight?: number;
    schedulingDate?: string
}