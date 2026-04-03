export default interface User {
    id: String;
    email: String;
    name?: String;
    enabled: boolean;
    image?: String;
    updatedAt?: String;
    createdAt?: String;
    provider: String;
}