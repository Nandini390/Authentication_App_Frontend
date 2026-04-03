import type User from "./User";

export default interface LoginResponseData{
    accessToken: String;
    user: User;
    refreshToken: String;
    expiresIn: number;
}