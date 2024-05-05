import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {
  jobState,
  setFilterCompanyName,
  setFilterLocation,
  setFilterMinBasePay,
  setFilterMinExperience,
  setFilterRemote,
  setFilterRole,
} from '@/reducer/job';
import { useDispatch, useSelector } from 'react-redux';
import { searchStringInArray } from '@/helpers/stringSearch.helper';

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

function SelectWithCustomInput({ label, sx = {}, options = [], value, onChange, ...props }) {
  const [inputValue, setInputValue] = useState('');
  const allOptions = [...options, ...(inputValue?.length > 0 ? [inputValue] : [])];

  const onChangeHandler = (event) => {
    if (event.target.value?.length > 0 && searchStringInArray(event.target.value, options)?.length === 0) {
      setInputValue(() => event.target.value);
    } else {
      setInputValue(() => '');
    }
  };

  return (
    <SelectComponent
      label={label}
      sx={sx}
      options={allOptions}
      value={value}
      onInput={onChangeHandler}
      onChange={(event, newValue) => {
        onChange(event, newValue);
        setInputValue(() => '');
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

function JobFilters() {
  const jobDetails = useSelector(jobState);
  const dispatch = useDispatch();

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
        getOptionLabel={(option) => (option === -1 ? '' : `${option}`)} // TODO"
        options={jobDetails?.filterOptions?.minBasePay || []}
      />

      <SelectWithCustomInput
        label="Company"
        sx={{
          minWidth: 240,
          mr: 3,
        }}
        disabled={(jobDetails?.filterOptions?.companyName || [])?.length === 0}
        value={jobDetails?.filter?.companyName || ''}
        onChange={(_, newValue) => {
          dispatch(setFilterCompanyName(newValue));
        }}
        getOptionLabel={(option) => capitalizeText(option)}
        options={jobDetails?.filterOptions?.companyName || []}
      />
    </div>
  );
}

export default JobFilters;
