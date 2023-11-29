import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const petitionsAdapter = createEntityAdapter({});

const initialState = petitionsAdapter.getInitialState();

export const petitionsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPetitions: builder.query({
            query: () => ({
                url: '/petitions',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: (responseData) => {
                const loadedPetitions = responseData.map((petition) => {
                    petition.id = petition._id;
                    return petition;
                });
                return petitionsAdapter.setAll(initialState, loadedPetitions);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Petition", id: "LIST" },
                        ...result.ids.map((id) => ({ type: "Petition", id })),
                    ];
                } else return [{ type: "Petition", id: "LIST" }];
            },
        }),
        addNewPetition: builder.mutation({
            query: (initialPetitionData) => ({
                url: "/petitions",
                method: "POST",
                body: {
                    ...initialPetitionData,
                },
            }),
            invalidatesTags: [{ type: "Petition", id: "LIST" }],
        }),
        updatePetition: builder.mutation({
            query: (initialPetitionData) => ({
                url: "/petitions",
                method: "PATCH",
                body: {
                    ...initialPetitionData,
                },
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Petition", id: arg.id }],
        }),
        deletePetition: builder.mutation({
            query: ({ id }) => ({
                url: `/petitions`,
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Petition", id: arg.id }],
        }),
    }),
});

export const {
    useGetPetitionsQuery,
    useAddNewPetitionMutation,
    useUpdatePetitionMutation,
    useDeletePetitionMutation,
} = petitionsApiSlice;

// returns the query result object
export const selectPetitionsResult = petitionsApiSlice.endpoints.getPetitions.select();

// creates memoized selector
const selectPetitionsData = createSelector(
    selectPetitionsResult,
    (petitionsResult) => petitionsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPetitions,
    selectById: selectPetitionById,
    selectIds: selectPetitionIds,
    // Pass in a selector that returns the petitions slice of state
} = petitionsAdapter.getSelectors(
    (state) => selectPetitionsData(state) ?? initialState
);
