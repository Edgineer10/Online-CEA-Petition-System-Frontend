import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const coursesAdapter = createEntityAdapter({});

const initialState = coursesAdapter.getInitialState();

export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "/courses",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedCourses = responseData.map((course) => {
          course.id = course._id;
          return course;
        });
        return coursesAdapter.setAll(initialState, loadedCourses);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Course", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Course", id })),
          ];
        } else return [{ type: "Course", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetCoursesQuery } = coursesApiSlice;

// returns the query result object
export const selectCoursesResult =
  coursesApiSlice.endpoints.getCourses.select();

// creates memoized selector
const selectCoursesData = createSelector(
  selectCoursesResult,
  (coursesResult) => coursesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllCourses,
  selectById: selectCourseById,
  selectIds: selectCourseIds,
  // Pass in a selector that returns the courses slice of state
} = coursesAdapter.getSelectors(
  (state) => selectCoursesData(state) ?? initialState
);
