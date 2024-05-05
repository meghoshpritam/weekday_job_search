import Container from '@mui/material/Container';
import { useEffect } from 'react';
import { getJobs } from '@/services/job.service';
import { useDispatch } from 'react-redux';
import { stopLoading, startLoading } from '@/reducer/job';
import JobsContainer from '@/components/JobsContainer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoading());
    getJobs()
      .then((data) => {})
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
