import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ICountry {
  id: number;
  name: string;
}

export const countriesApi = createApi({
  reducerPath: 'countriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://oa.kg/api/' }),
  endpoints: (builder) => ({
    getCountries: builder.query<ICountry[], void>({
      query: () => 'countries/',
    }),
  }),
});

export const { useGetCountriesQuery } = countriesApi;
