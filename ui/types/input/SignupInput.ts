// WARNING: Do not change this file manually. Use npm run generate:types from the api project to update it

 export type SignupInput = {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email?: (string | undefined) | null;
    phone?: (string | undefined) | null;
    profileImage?: (string | undefined) | null;
    avatar?: (string | undefined) | null;
    region?: (string | undefined) | null;
    country?: (string | undefined) | null;
};