import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { jobState } from '@/reducer/job';
import { JOB_LIMIT_PER_REQUEST } from '@/services/job.service';
import { searchStringInArray } from '@/helpers/stringSearch.helper';
import { Typography } from '@mui/material';
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

      if (show && filter.minBasePay > 0) {
        show = job.minJdSalary && job.minJdSalary >= filter.minBasePay;
      }

      if (show && filter.companyName.length > 0) {
        show = searchStringInArray(job.companyName, [filter.companyName]).length > 0;
      }

      return show;
    }) || []
  );
};

function JobsContainer() {
  const jobDetails = useSelector(jobState);
  const jobsToShow = filterJobs(jobDetails.jobs, jobDetails.filter);

  return (
    <Grid container spacing={5}>
      {jobsToShow.map((job) => (
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
      {jobDetails.jobs.length > 0 && jobsToShow.length === 0 && !jobDetails.loading && (
        <Grid item xs={12}>
          <Typography
            textAlign="center"
            sx={{
              fontWeight: 500,
              fontSize: 14,
              mt: 5,
              mb: 2,
            }}
          >
            No Jobs Found
          </Typography>
        </Grid>
      )}
      {jobDetails.jobs.length > 0 &&
        jobsToShow.length !== 0 &&
        jobDetails.jobs.length >= jobDetails.availableNumberOfJobs && (
          <Grid item xs={12}>
            <Typography
              textAlign="center"
              sx={{
                fontWeight: 500,
                fontSize: 14,
                mt: 5,
                mb: 2,
              }}
            >
              No More Jobs Available
            </Typography>
          </Grid>
        )}
    </Grid>
  );
}

export default JobsContainer;
