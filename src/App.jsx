import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { getJobs } from '@/services/job.service';
import { stopLoading, startLoading, addJobs } from '@/reducer/job';
import JobsContainer from '@/components/JobsContainer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoading());
    getJobs()
      .then((data) => {
        console.log('📢[App.jsx:15]: data: ', data);
        dispatch(
          addJobs({
            jobs: data.jdList,
            availableNumberOfJobs: data.totalCount,
          }),
        );
      })
      .catch((error) => {})
      .finally(() => {
        dispatch(stopLoading());
      });
  }, []);

  return (
    <Container maxWidth="xl">
      <JobsContainer />
    </Container>
  );
}

export default App;
