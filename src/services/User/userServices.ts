import type { User } from "../../interface/User/User"
import type { UserDTO } from "../../interface/User/UserDto"
import api from "../api"

export const UserService = {
    getAll: async () => {
        const response = await api.get<User[]>("/user")
        return response.data
    },
    create: async (data: UserDTO) => {
        const response = await api.post('/user', data);
        return response.data;
    },

    update: async (id: string, data: UserDTO) => {
        const response = await api.patch(`/user/update/${id}`, data); 
        return response.data;
    },

    delete: async (id: string) => {
        await api.delete(`/user/delete/${id}`);
    }
}