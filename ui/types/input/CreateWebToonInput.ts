// WARNING: Do not change this file manually. Use npm run generate:types from the api project to update it

 export type CreateWebToonInput = {
    title: string;
    description: string;
    image: string;
    totalSeries: number;
    category: {
        id: string;
        name: string;
    };
    tags: {
        id: string;
        name: string;
    }[];
};