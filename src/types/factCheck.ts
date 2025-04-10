export interface Source {
    title: string;
    url: string;
    accessDate: string;
}

export interface FactCheck {
    id: number;
    linkedClaim: number;
    factCheckedBy: number;
    result: string;
    fullReport: string;
    language: string;
    sources: Source[];
    createdAt: string;
    category?: string;
}