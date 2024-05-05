import { jobState } from '@/reducer/job';
import { useSelector } from 'react-redux';

const JobsContainer = () => {
  const job = useSelector(jobState);
};

export default JobsContainer;
