import type { Supplier } from "../../interface/Supplier/supplier"
import type { SupplierDto } from "../../interface/Supplier/supplier.dto"
import api from "../api"

export const SupplierService = {
    getAll: async () => {
        const response = await api.get<Supplier[]>("/supplier")
        return response.data
    },

    create: async (data: SupplierDto) => {
        const response = await api.post(("/supplier"),data)
        return response.data
    },

    update: async (id: string, updateSupplier: SupplierDto) => {
        const editSupplier = await api.patch(`/supplier/${id}`, updateSupplier)
        return editSupplier.data
    },

    delete: async (id: string) => {
        const deleteSupplier = await api.delete(`/supplier/${id}`)
        return deleteSupplier.data
    }
}