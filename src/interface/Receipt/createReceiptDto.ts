export interface CreateReceiptDto {
    supplier: string
    licensePlate?: string;
    arrivalDate?: string;
    invoiceWeight?: number;
}