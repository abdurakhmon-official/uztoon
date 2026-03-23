// WARNING: Do not change this file manually. Use npm run generate:types from the api project to update it

 export type UpdateWebToonInput = {
    title?: string | undefined;
    description?: string | undefined;
    image?: string | undefined;
    totalSeries?: number | undefined;
    category?: {
        id: string;
        name: string;
    } | undefined;
    tags?: {
        id: string;
        name: string;
    }[] | undefined;
};