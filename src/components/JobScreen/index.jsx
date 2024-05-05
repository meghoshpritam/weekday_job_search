import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { JOB_LIMIT_PER_REQUEST, getJobs } from '@/services/job.service';
import { stopLoading, startLoading, addJobs } from '@/reducer/job';
import JobsContainer from '@/components/JobScreen/JobsContainer';
import reduxStore from '../../store';
import '@/styles/jobScreen.css';
import JobFilters from './JobFilters';

function JobScreen() {
  const dispatch = useDispatch();

  const fetchJobs = async (offset = 0) => {
    dispatch(startLoading());
    try {
      const jobData = await getJobs({
        limit: JOB_LIMIT_PER_REQUEST,
        offset,
      });

      dispatch(
        addJobs({
          jobs: jobData.jdList,
          availableNumberOfJobs: jobData.totalCount,
        }),
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      dispatch(stopLoading());
    }
  };

  const onScrollLoadJobs = async () => {
    const jobDetails = reduxStore.getState().job;

    if (document.documentElement.offsetHeight - (window.innerHeight + document.documentElement.scrollTop) > 15) return;

    if (!jobDetails.loading) {
      await fetchJobs(jobDetails.jobs.length);
    }

    if (jobDetails.jobs.length >= jobDetails.availableNumberOfJobs) {
      window.removeEventListener('scroll', onScrollLoadJobs);
    }
  };

  useEffect(() => {
    fetchJobs();

    window.addEventListener('scroll', onScrollLoadJobs);
    return () => window.removeEventListener('scroll', onScrollLoadJobs);
  }, []);

  return (
    <div className="min-h-screen">
      <JobFilters />
      <JobsContainer />
    </div>
  );
}

export default JobScreen;
