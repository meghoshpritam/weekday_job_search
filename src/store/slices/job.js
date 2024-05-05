import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  loading: true,
  availableNumberOfJobs: 0,
  filter: {
    minExperience: -1,
    companyName: '',
    location: '',
    remote: '',
    techStack: '',
    role: [],
    minBasePay: '',
  },
  filterOptions: {
    minExperience: [],
    companyName: '',
    location: '',
    remote: '',
    techStack: '',
    role: [],
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

      let maxExp = state.filterOptions.minExperience?.[state.filterOptions.minExperience.length - 1] || 1;
      const newJobs =
        action.payload?.jobs?.filter((job) => {
          if (job.minExp > maxExp) {
            maxExp = job.minExp;
          }

          return !jobIdsMap[job.jdUid];
        }) || [];

      const newRoles = newJobs.map((job) => job.jobRole.toLowerCase());

      return {
        ...state,
        jobs: [...state.jobs, ...newJobs],
        availableNumberOfJobs: action.payload.availableNumberOfJobs || state.availableNumberOfJobs || 0,
        filterOptions: {
          ...state.filterOptions,
          role: Array.from(new Set([...(state.filterOptions.role || []), ...(newRoles || [])])),
          minExperience: Array.from(
            {
              length: maxExp,
            },
            (_, i) => i + 1,
          ),
        },
      };
    },
    setFilterRole: (state, action) => ({
      ...state,
      filter: {
        ...state.filter,
        role: action.payload || [],
      },
    }),
    setFilterMinExperience: (state, action) => ({
      ...state,
      filter: {
        ...state.filter,
        minExperience: action.payload || -1,
      },
    }),
  },
});

export const { startLoading, stopLoading, addJobs, setFilterRole, setFilterMinExperience } = jobSlice.actions;

export const jobState = (state) => state.job;

export default jobSlice.reducer;
