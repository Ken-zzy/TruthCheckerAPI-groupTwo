export interface User {
    id: number;
    name: string;
    email: string;
    password?: string;  //  Password should ideally not be part of the typical User type, handle separately
    userType: string;
    preferredLanguage?: string;
    organizationId: number | null;
    createdAt: string;
}