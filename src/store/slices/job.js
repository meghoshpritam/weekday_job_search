import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  loading: true,
  availableNumberOfJobs: 0,
  filter: {
    minExperience: -1,
    companyName: '',
    location: [],
    remote: '',
    techStack: '',
    role: [],
    minBasePay: '',
  },
  filterOptions: {
    minExperience: [],
    companyName: '',
    location: [],
    remote: ['remote', 'on-site'],
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

      const newJobs =
        action.payload?.jobs?.filter((job) => {
          return !jobIdsMap[job.jdUid];
        }) || [];

      const newRoles = [];
      const newLocations = [];
      let maxExp = state.filterOptions.minExperience?.[state.filterOptions.minExperience.length - 1] || 1;

      // eslint-disable-next-line no-restricted-syntax
      for (const job of newJobs) {
        newRoles.push(job.jobRole.toLowerCase());
        newLocations.push(job.location.toLowerCase());

        if (job.minExp && job.minExp > maxExp) {
          maxExp = job.minExp;
        }
      }

      return {
        ...state,
        jobs: [...state.jobs, ...newJobs],
        availableNumberOfJobs: action.payload.availableNumberOfJobs || state.availableNumberOfJobs || 0,
        filterOptions: {
          ...state.filterOptions,
          role: Array.from(new Set([...(state.filterOptions.role || []), ...(newRoles || [])])),
          location: Array.from(new Set([...(state.filterOptions.location || []), ...(newLocations || [])])).filter(
            (location) => location !== 'remote',
          ),
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
    setFilterLocation: (state, action) => ({
      ...state,
      filter: {
        ...state.filter,
        location: action.payload || [],
      },
    }),
    setFilterRemote: (state, action) => ({
      ...state,
      filter: {
        ...state.filter,
        remote: action.payload || '',
      },
    }),
  },
});

export const {
  startLoading,
  stopLoading,
  addJobs,
  setFilterRole,
  setFilterMinExperience,
  setFilterLocation,
  setFilterRemote,
} = jobSlice.actions;

export const jobState = (state) => state.job;

export default jobSlice.reducer;
