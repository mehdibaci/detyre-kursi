import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const transactionApi = createApi({
    reducerPath: 'transactionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    // 'Transaction' dhe 'Summary' jane tags qe rifreskohen automatikisht
    tagTypes: ['Transaction', 'Summary'],
    endpoints: (builder) => {
        return {
            getTransactions: builder.query({
                query: () => '/transactions',
                providesTags: ['Transaction'],
            }),
            getSummary: builder.query({
                query: () => '/transactions/summary',
                providesTags: ['Summary'],
            }),
            createTransaction: builder.mutation({
                query: (newTransaction) => ({
                    url: '/transactions',
                    method: 'POST',
                    body: newTransaction,
                }),
                // Pas krijimit, rifreskojme listen dhe permbledhjen
                invalidatesTags: ['Transaction', 'Summary'],
            }),
            updateTransaction: builder.mutation({
                query: ({ id, ...data }) => ({
                    url: `/transactions/${id}`,
                    method: 'PUT',
                    body: data,
                }),
                invalidatesTags: ['Transaction', 'Summary'],
            }),
            deleteTransaction: builder.mutation({
                query: (id) => ({
                    url: `/transactions/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Transaction', 'Summary'],
            }),
        }
    }
});

export const {
    useGetTransactionsQuery,
    useGetSummaryQuery,
    useCreateTransactionMutation,
    useUpdateTransactionMutation,
    useDeleteTransactionMutation
} = transactionApi;
