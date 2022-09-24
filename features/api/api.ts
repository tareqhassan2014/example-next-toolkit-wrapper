import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const baseUrl = process.env.REACT_APP_BASE_URL;
const baseUrl = 'https://end-game-hostel-hub-server.herokuapp.com/api/v1/';

const baseQuery = fetchBaseQuery({
    baseUrl,
    // prepareHeaders: (headers, { getState }) => {
    //     const token = (getState() as RootState).auth.token;

    //     // If we have a token set in state, let's assume that we should be passing it.
    //     if (token) {
    //         headers.set('authorization', `Bearer ${token}`);
    //     }

    //     return headers;
    // },
});

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface SignupRequest {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

const api = createApi({
    tagTypes: ['hostelMemberRequest', 'product', 'hostelAdd', 'hostelBooking'],
    baseQuery,
    endpoints: (builder) => ({
        login: builder.mutation<User, LoginRequest>({
            query: (credentials) => ({
                url: '/users/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        getMe: builder.query<User, void>({
            query: () => ({
                url: '/users/me',
                method: 'GET',
            }),
        }),

        signUp: builder.mutation<User, SignupRequest>({
            query: (credentials) => ({
                url: '/users/signup',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation, useSignUpMutation, useGetMeQuery } = api;

export default api;
