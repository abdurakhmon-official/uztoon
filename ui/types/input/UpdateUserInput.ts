// WARNING: Do not change this file manually. Use npm run generate:types from the api project to update it

 export type UpdateUserInput = {
    firstName?: string | undefined;
    lastName?: string | undefined;
    username?: string | undefined;
    email?: ((string | undefined) | null) | undefined;
    phone?: ((string | undefined) | null) | undefined;
    profileImage?: ((string | undefined) | null) | undefined;
    avatar?: ((string | undefined) | null) | undefined;
    region?: ((string | undefined) | null) | undefined;
    country?: ((string | undefined) | null) | undefined;
};