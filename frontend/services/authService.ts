import api from "./api";
import {
    LoginRequest,
    RegisterRequest,
    AuthResponse
} from "@/types/auth";

export const register = async (
    data: RegisterRequest
) => {
    const response = await api.post(
        "/auth/register",
        data
    );

    return response.data;
};

export const login = async (
    data: LoginRequest
): Promise<AuthResponse> => {

    const response = await api.post(
        "/auth/login",
        data
    );

    return response.data;
};