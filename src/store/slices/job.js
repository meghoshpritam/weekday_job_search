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
    addJobs: (state, action) => {
      const { jobs } = state;
      const jobIdsMap = jobs.reduce((acc, job) => {
        acc[job.jdUid] = true;
        return acc;
      }, {});

      const newJobs = action.payload?.jobs?.filter((job) => !jobIdsMap[job.jdUid]) || [];

      return {
        ...state,
        jobs: [...state.jobs, ...newJobs],
        availableNumberOfJobs: action.payload.availableNumberOfJobs || state.availableNumberOfJobs || 0,
      };
    },
  },
});

export const { startLoading, stopLoading, addJobs } = jobSlice.actions;

export const jobState = (state) => state.job;

export default jobSlice.reducer;
