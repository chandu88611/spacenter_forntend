import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./baseQuery";

export const BUSINESS_API = "businessApi";

export const businessApi = createApi({
  reducerPath: BUSINESS_API,
  baseQuery: axiosBaseQuery,
  tagTypes: ["Business"],

  endpoints: (builder) => ({
    // **1. Get All Businesses (With Pagination, Search, Filters)**
    getAllBusinesses: builder.query({
      query: ({ page = 1, limit = 10, search = "", category = "" }) => ({
        url: `businesses?page=${page}&limit=${limit}&search=${search}&category=${category}`,
        method: "GET",
      }),
      providesTags: ["Business"],
    }),

    // **2. Get Single Business By ID**
    getBusinessById: builder.query({
      query: (id) => ({
        url: `businesses/${id}`,
        method: "GET",
      }),
      providesTags: ["Business"],
    }),

    // **3. Create New Business**
    createBusiness: builder.mutation({
      query: (newBusiness) => ({
        url: "businesses",
        method: "POST",
        body: newBusiness,
      }),
      invalidatesTags: ["Business"],
    }),

    // **4. Update Business By ID**
    updateBusiness: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `businesses/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Business"],
    }),

    // **5. Delete Business By ID**
    deleteBusiness: builder.mutation({
      query: (id) => ({
        url: `businesses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Business"],
    }),

    // **6. Get Businesses Owned by Current User**
    getUserBusinesses: builder.query({
      query: () => ({
        url: "businesses/my",
        method: "GET",
      }),
      providesTags: ["Business"],
    }),

    // **7. Add a Review to a Business**
    addReview: builder.mutation({
      query: ({ businessId, reviewData }) => ({
        url: `businesses/${businessId}/reviews`,
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["Business"],
    }),

    // **8. Get Reviews for a Business**
    getBusinessReviews: builder.query({
      query: (businessId) => ({
        url: `businesses/${businessId}/reviews`,
        method: "GET",
      }),
      providesTags: ["Business"],
    }),

    // **9. Upload Photos for a Business**
    uploadBusinessPhotos: builder.mutation({
      query: ({ businessId, formData }) => ({
        url: `businesses/${businessId}/photos`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Business"],
    }),
    // 10. Get all businesses by category
    getAllBusinessesByCategory: builder.query({
      query: ({ category = "" }) => ({
        url: `businesses/category?category=${category}`,
        method: "GET",
      }),
      providesTags: ["Business"],
    }),
    // **11. Get Latest Business**
    getLatestBusinesses: builder.query({
      query: () => ({
        url: "businesses/latest",
        method: "GET",
      }),
      providesTags: ["Business"],
    }),

    // **12. Get All Categories**
    getAllCategories: builder.query({
      query: () => ({
        url: "categories",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllBusinessesQuery,
  useGetBusinessByIdQuery,
  useCreateBusinessMutation,
  useUpdateBusinessMutation,
  useDeleteBusinessMutation,
  useGetUserBusinessesQuery,
  useAddReviewMutation,
  useGetBusinessReviewsQuery,
  useUploadBusinessPhotosMutation,
  useGetAllBusinessesByCategoryQuery,
  useGetAllCategoriesQuery,
  useGetLatestBusinessesQuery,
} = businessApi;
