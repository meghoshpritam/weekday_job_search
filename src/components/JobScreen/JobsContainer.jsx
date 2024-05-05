import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { jobState } from '@/reducer/job';
import JobCard from './JobCard';

function JobsContainer() {
  const jobDetails = useSelector(jobState);
  console.log('📢[JobsContainer.jsx:7]: job: ', jobDetails);

  return (
    <>
      <Grid container spacing={5}>
        {jobDetails.jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={job.jdUid}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
      {jobDetails.loading && <h1>Loading...</h1>}
    </>
  );
}

export default JobsContainer;
