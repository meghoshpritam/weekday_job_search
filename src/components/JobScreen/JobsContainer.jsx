import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { jobState } from '@/reducer/job';
import { JOB_LIMIT_PER_REQUEST } from '@/services/job.service';
import JobCard from './JobCard';
import JobCardSkeleton from './JobCardSkeleton';

const filterJobs = (jobs, filter) => {
  return (
    jobs?.filter((job) => {
      let show = true;

      if (filter.role.length > 0) {
        show = filter.role.includes(job.jobRole.toLowerCase());
      }

      if (show && filter.minExperience > 0) {
        const minExp = job.minExp || job.maxExp;

        show = minExp && minExp <= filter.minExperience;
      }

      if (show && filter.location.length > 0) {
        show = filter.location.includes(job.location.toLowerCase());
      }

      if (show && filter.remote) {
        if (filter.remote === 'remote') {
          show = job.location.toLowerCase() === 'remote';
        } else {
          show = job.location.toLowerCase() !== 'remote';
        }
      }
      return show;
    }) || []
  );
};

function JobsContainer() {
  const jobDetails = useSelector(jobState);

  return (
    <Grid container spacing={5}>
      {filterJobs(jobDetails.jobs, jobDetails.filter).map((job) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={job.jdUid}>
          <JobCard job={job} />
        </Grid>
      ))}
      {jobDetails.loading && (
        <>
          {Array.from({ length: JOB_LIMIT_PER_REQUEST }, (_, i) => i).map((index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <JobCardSkeleton />
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
}

export default JobsContainer;
