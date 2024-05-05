import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { jobState } from '@/reducer/job';

function JobsContainer() {
  const job = useSelector(jobState);
  console.log('📢[JobsContainer.jsx:7]: job: ', job);

  if (job.loading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={5}>
      {/* {job.jobs.map((job) => ())} */}
    </Grid>
  );
}

export default JobsContainer;
