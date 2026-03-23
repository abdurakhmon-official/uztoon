// WARNING: Do not change this file manually. Use npm run generate:types from the api project to update it

 export type CreateSerieInput = {
    title: string;
    description: string;
    serie: number;
    images: {
        order: number;
        image: string;
        new: boolean;
    }[];
    tags: {
        id: string;
        name: string;
    }[];
};