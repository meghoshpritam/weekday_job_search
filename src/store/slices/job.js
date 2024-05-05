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
    minBasePay: -1,
  },
  filterOptions: {
    minExperience: [],
    companyName: '',
    location: [],
    remote: ['remote', 'on-site'],
    techStack: '',
    role: [],
    minBasePay: [],
  },
  error: '',
};

const createNElemArray = (n) => Array.from({ length: n }, (_, i) => i + 1);
const getUniqueValues = (arr) => Array.from(new Set(arr));
const combineArrays = (arr1, arr2) => [...(arr1 || []), ...(arr2 || [])];

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
      const minBasePay = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const job of newJobs) {
        newRoles.push(job.jobRole.toLowerCase());
        newLocations.push(job.location.toLowerCase());

        if (job.minExp && job.minExp > maxExp) {
          maxExp = job.minExp;
        }

        if (job.minJdSalary && !minBasePay.includes(job.minJdSalary)) {
          minBasePay.push(job.minJdSalary);
        }
      }

      return {
        ...state,
        jobs: [...state.jobs, ...newJobs],
        availableNumberOfJobs: action.payload.availableNumberOfJobs || state.availableNumberOfJobs || 0,
        filterOptions: {
          ...state.filterOptions,
          role: getUniqueValues(combineArrays(state.filterOptions.role, newRoles)).sort((a, b) => a.localeCompare(b)),
          location: getUniqueValues(combineArrays(state.filterOptions.location, newLocations))
            .filter((location) => location !== 'remote')
            .sort((a, b) => a.localeCompare(b)),
          minExperience: createNElemArray(maxExp),
          minBasePay: getUniqueValues(combineArrays(state.filterOptions.minBasePay, minBasePay)).sort((a, b) => a - b),
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
    setFilterMinBasePay: (state, action) => ({
      ...state,
      filter: {
        ...state.filter,
        minBasePay: action.payload || -1,
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
  setFilterMinBasePay,
} = jobSlice.actions;

export const jobState = (state) => state.job;

export default jobSlice.reducer;
