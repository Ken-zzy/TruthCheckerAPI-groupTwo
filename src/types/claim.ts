export interface Claim {
    id: number;
    submittedBy: number;
    title: string;
    description: string;
    category: string;
    language: string;
    status: string;
    createdAt: string;
    comments?: string;
}