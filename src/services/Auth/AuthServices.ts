import type { SingInDto } from "../../interface/Auth/singIn.dto"
import api from "../api"

export const AuthService = {
    singIn: async (data: SingInDto) => {
        const response = await api.post('/login', data)
        return response;
    }
}