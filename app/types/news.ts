export type News = {
    id?: number;

    title: string;
    description: string;

    url?: string; // NotMapped bên .NET → FE nhận nhưng không gửi
    view: number;
    image: string;
    author: string;
    active: boolean;
    order: number;
    createdAt?: string;
};
