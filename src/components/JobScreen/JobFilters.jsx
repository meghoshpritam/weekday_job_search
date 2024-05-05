import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {
  jobState,
  setFilterLocation,
  setFilterMinBasePay,
  setFilterMinExperience,
  setFilterRemote,
  setFilterRole,
} from '@/reducer/job';
import { useDispatch, useSelector } from 'react-redux';

function capitalizeText(text) {
  const spites = text?.split(' ') || [];
  if (spites.length > 1) {
    return spites.map((split) => split[0].toUpperCase() + split.slice(1)).join(' ');
  }

  return (text?.[0]?.toUpperCase() || '') + (text?.slice(1) || '');
}

function SelectComponent({ label, multiple = false, sx = {}, options = [], value, onChange, ...props }) {
  return (
    <Autocomplete
      disablePortal
      multiple={multiple}
      size="small"
      sx={sx}
      value={value}
      onChange={onChange}
      options={options}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      // eslint-disable-next-line react/jsx-props-no-spreading
      renderInput={(params) => <TextField size="small" {...params} label={label} />}
    />
  );
}

function JobFilters() {
  const jobDetails = useSelector(jobState);
  const dispatch = useDispatch();

  console.log('📢[JobFilters.jsx:29]: jobDetails: ', jobDetails.filter, jobDetails.filterOptions);

  return (
    <div className="job-filter-container">
      <SelectComponent
        label="Role"
        sx={{
          minWidth: 140,
          mr: 3,
        }}
        multiple
        disabled={(jobDetails?.filterOptions?.role || [])?.length === 0}
        value={jobDetails?.filter?.role || []}
        onChange={(_, newValue) => {
          dispatch(setFilterRole(newValue));
        }}
        getOptionLabel={(option) => capitalizeText(option)}
        options={jobDetails?.filterOptions?.role || []}
      />

      <SelectComponent
        label="Experience"
        sx={{
          minWidth: 140,
          mr: 3,
        }}
        disabled={(jobDetails?.filterOptions?.minExperience || [])?.length === 0}
        value={jobDetails?.filter?.minExperience || -1}
        onChange={(_, newValue) => {
          dispatch(setFilterMinExperience(newValue));
        }}
        getOptionLabel={(option) => (option === -1 ? '' : `${option} years`)}
        options={jobDetails?.filterOptions?.minExperience || []}
      />

      <SelectComponent
        label="Location"
        sx={{
          minWidth: 140,
          mr: 3,
        }}
        multiple
        disabled={(jobDetails?.filterOptions?.location || [])?.length === 0}
        value={jobDetails?.filter?.location || []}
        onChange={(_, newValue) => {
          dispatch(setFilterLocation(newValue));
        }}
        getOptionLabel={(option) => capitalizeText(option)}
        options={jobDetails?.filterOptions?.location || []}
      />

      <SelectComponent
        label="Remote"
        sx={{
          minWidth: 140,
          mr: 3,
        }}
        disabled={(jobDetails?.filterOptions?.remote || [])?.length === 0}
        value={jobDetails?.filter?.remote || ''}
        onChange={(_, newValue) => {
          dispatch(setFilterRemote(newValue));
        }}
        getOptionLabel={(option) => capitalizeText(option)}
        options={jobDetails?.filterOptions?.remote || []}
      />

      <SelectComponent
        label="Min Base Pay"
        sx={{
          minWidth: 160,
          mr: 3,
        }}
        disabled={(jobDetails?.filterOptions?.minBasePay || [])?.length === 0}
        value={jobDetails?.filter?.minBasePay || -1}
        onChange={(_, newValue) => {
          dispatch(setFilterMinBasePay(newValue));
        }}
        getOptionLabel={(option) => (option === -1 ? '' : `${option}`)}
        options={jobDetails?.filterOptions?.minBasePay || []}
      />
    </div>
  );
}

export default JobFilters;
