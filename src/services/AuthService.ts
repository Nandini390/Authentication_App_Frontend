import type RegisterData from "@/models/RegisterData"
import apiClient from "@/config/ApiClient"
import { LogIn } from "lucide-react";
import type LoginData from "@/models/LoginData";
import type LoginResponseData from "@/models/LoginResponseData";

export const registerUser =async (signupData: RegisterData) => {
   //api call to server to save data
    const response = await apiClient.post("/auth/register",signupData);
    return response.data;
}

export const loginUser = async (logInData: LoginData) => {
    const response = await apiClient.post<LoginResponseData>("/auth/login",logInData);
    return response.data;
}

export const logoutUser = async () => {
    const response=await apiClient.post("/auth/logout");
    return response.data;
}