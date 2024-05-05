import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { jobState } from '@/reducer/job';
import { JOB_LIMIT_PER_REQUEST } from '@/services/job.service';
import JobCard from './JobCard';
import JobCardSkeleton from './JobCardSkeleton';

function JobsContainer() {
  const jobDetails = useSelector(jobState);

  return (
    <>
      <Grid container spacing={5}>
        {jobDetails.jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={job.jdUid}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>

      {jobDetails.loading && (
        <Grid container spacing={5} sx={{ pt: 6 }}>
          {Array.from({ length: JOB_LIMIT_PER_REQUEST }, (_, i) => i).map((index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <JobCardSkeleton />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default JobsContainer;
