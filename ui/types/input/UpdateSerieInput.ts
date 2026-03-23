// WARNING: Do not change this file manually. Use npm run generate:types from the api project to update it

 export type UpdateSerieInput = {
    title?: string | undefined;
    description?: string | undefined;
    serie?: number | undefined;
    images?: {
        order: number;
        image: string;
        new: boolean;
    }[] | undefined;
    tags?: {
        id: string;
        name: string;
    }[] | undefined;
};