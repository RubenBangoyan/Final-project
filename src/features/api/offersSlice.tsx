import { createSlice } from "@reduxjs/toolkit";
import { fetchOffers } from "./offersThunk";

export interface Offer {
  id: string;
  aboutCompany: string;
  companyName: string;
  companyWebsite: string;
  contactEmail: string;
  createdAt: string;
  employmentType: string[];
  level: string;
  location: string;
  position: string;
  requirements: string;
  salaryFrom: number;
  salaryTo: number;
  technologies: string[];
  telegram: string;
  userId: string;
}

interface OffersState {
  offers: Offer[] | null;
  loading: Boolean;
  error: string | null;
}
const initialState: OffersState = {
  offers: [],
  loading: false,
  error: null,
};

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка";
      });
  },
});

export const {} = offersSlice.actions;

export default offersSlice.reducer;
