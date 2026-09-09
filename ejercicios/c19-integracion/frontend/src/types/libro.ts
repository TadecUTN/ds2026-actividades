export type Libro = {
    id: number;
    title: string;
    author: string;
    category: string;
    cover?: string;
    precio?: number;
    disponible?: boolean;
}