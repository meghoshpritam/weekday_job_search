import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  loading: true,
  availableNumberOfJobs: 0,
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
    addJobs: (state, action) => ({
      ...state,
      jobs: [...state.jobs, ...(action.payload?.jobs || [])],
      availableNumberOfJobs: action.payload.availableNumberOfJobs || state.availableNumberOfJobs || 0,
    }),
  },
});

export const { startLoading, stopLoading, addJobs } = jobSlice.actions;

export const jobState = (state) => state.job;

export default jobSlice.reducer;
