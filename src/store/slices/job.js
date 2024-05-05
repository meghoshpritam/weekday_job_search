import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  loading: false,
  filter: {
    minExperience: '',
    companyName: '',
    location: '',
    remote: '',
    techStack: '',
    role: '',
    minBasePay: '',
  },
  error: '',
};

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    startLoading: (state) => ({
      ...state,
      loading: true,
    }),
    stopLoading: (state) => ({
      ...state,
      loading: false,
    }),
  },
});

export const { startLoading, stopLoading } = jobSlice.actions;

export const jobState = (state) => state.job;

export default jobSlice.reducer;
