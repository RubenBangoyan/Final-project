import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialStateValue {
  searchValue: string;
  currentPage: number;
  employmentFilter: string | null;
  techFilter: string | null;
  salaryRange: [number, number];
}

const initialState: InitialStateValue = {
  searchValue: "",
  currentPage: 1,
  employmentFilter: null,
  techFilter: null,
  salaryRange: [0, 100000],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setEmploymentFilter(state, action: PayloadAction<string | null>) {
      state.employmentFilter = action.payload;
    },
    setTechFilter(state, action: PayloadAction<string | null>) {
      state.techFilter = action.payload;
    },
    setSalaryRange(state, action: PayloadAction<[number, number]>) {
      state.salaryRange = action.payload;
    },
    resetFilters(state) {
      state.searchValue = "";
      state.currentPage = 1;
      state.employmentFilter = null;
      state.techFilter = null;
      state.salaryRange = [0, 100000];
    },
  },
});

export const {
  setSearchValue,
  setCurrentPage,
  setEmploymentFilter,
  setTechFilter,
  setSalaryRange,
  resetFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
