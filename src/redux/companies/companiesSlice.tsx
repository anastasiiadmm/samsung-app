import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosApi from '@/utils/axios-api';
import { RootState } from '@/hooks/reduxHooks';
import { IError } from '@/interfaces/IError';
import { getParams } from '@/utils/helper';
import { ICompany } from '@/interfaces/ICompany';
import { IPagination } from '@/interfaces/IDevice';

const nameSpace = 'companies';

interface CompaniesState {
  companies: ICompany[] | null;
  companiesPagination: IPagination | null;
  companiesLoading: Boolean;
  companiesError: IError | null;
}

const INITIAL_STATE = {
  companies: null,
  companiesPagination: null,
  companiesLoading: false,
  companiesError: null,
} as CompaniesState;

export const fetchCompanies = createAsyncThunk<ICompany[], object>(
  `${nameSpace}/fetchCompanies`,
  async (query, { rejectWithValue }) => {
    try {
      const { data: companies } = await axiosApi.get<ICompany[]>(
        `/companies/${getParams(query)}`,
      );

      if (!companies) return [];
      return companies;
    } catch (error) {
      return rejectWithValue({ detail: error?.message });
    }
  },
);

export const companiesSlice = createSlice({
  name: nameSpace,
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCompanies.pending, (state) => {
      state.companiesLoading = true;
      state.companiesError = null;
    });
    builder.addCase(fetchCompanies.fulfilled, (state, { payload }: any) => {
      state.companiesLoading = false;
      state.companiesError = null;
      state.companies = payload.results;
      state.companiesPagination = {
        ...state.companiesPagination,
        count: payload.count,
        next: payload.next,
        previous: payload.previous,
      };
    });
    builder.addCase(fetchCompanies.rejected, (state, { payload }) => {
      state.companiesLoading = false;
      if (payload && typeof payload === 'object' && 'detail' in payload) {
        state.companiesError = { detail: payload.detail as string | null };
      }
    });
  },
});

export const commandsSelector = (state: RootState) => state.companies;
export const companyReducers = companiesSlice.reducer;
