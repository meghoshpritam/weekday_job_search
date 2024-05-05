import { BASE_URL } from '.';

export const JOB_LIMIT_PER_REQUEST = 12;

export const getJobs = async ({ limit = JOB_LIMIT_PER_REQUEST, offset = 0 } = {}) => {
  const getJobHeader = new Headers();
  getJobHeader.append('Content-Type', 'application/json');

  const body = JSON.stringify({
    limit,
    offset,
  });

  const requestOptions = {
    method: 'POST',
    headers: getJobHeader,
    body,
  };

  const response = await fetch(`${BASE_URL}adhoc/getSampleJdJSON`, requestOptions);
  const result = await response.json();

  return result;
};
