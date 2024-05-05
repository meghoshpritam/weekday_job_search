import { BASE_URL } from '.';

export const getJobs = async ({ limit = 10, offset = 0 } = {}) => {
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
