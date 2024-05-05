import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { jobState, setFilterRole } from '@/reducer/job';
import { useDispatch, useSelector } from 'react-redux';

function capitalizeText(text) {
  const spites = text.split(' ');
  if (spites.length > 1) {
    return spites.map((split) => split[0].toUpperCase() + split.slice(1)).join(' ');
  }

  return text[0].toUpperCase() + text.slice(1);
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
        }}
        multiple
        value={jobDetails?.filter?.role || []}
        onChange={(_, newValue) => {
          dispatch(setFilterRole(newValue));
        }}
        getOptionLabel={(option) => capitalizeText(option)}
        options={jobDetails?.filterOptions?.role || []}
      />
    </div>
  );
}

export default JobFilters;
