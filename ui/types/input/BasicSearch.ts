// WARNING: Do not change this file manually. Use npm run generate:types from the api project to update it

 export type BasicSearch = {
    size?: number | null;
    page?: number | null;
    search?: (string | undefined) | null;
    sort?: string;
    direction?: string;
};