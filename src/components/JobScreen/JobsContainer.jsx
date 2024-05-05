import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import { jobState } from '@/reducer/job';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function JobsContainer() {
  const jobDetails = useSelector(jobState);
  console.log('📢[JobsContainer.jsx:7]: job: ', jobDetails);

  return (
    <>
      <Grid container spacing={5}>
        {jobDetails.jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={job.jdUid}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Grid container>
                  <Grid item sm={4}>
                    <img src={job.logoUrl} alt={job.companyName} title={job.companyName} width="100" height="100" />
                  </Grid>
                  <Grid item sm={8}>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      {job.companyName}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      {job.jobRole}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} gutterBottom>
                      {job.location}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  Estimated Salary: {job.minBasePay} - {job.maxBasePay}
                </Typography>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  About Company:
                  <br />
                  {job.jobDetailsFromCompany}
                </Typography>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  Minimum Experience: {job.minExp} - {job.maxExp} years
                </Typography>
              </CardContent>
              {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
            </Card>
          </Grid>
        ))}
      </Grid>
      {jobDetails.loading && <h1>Loading...</h1>}
    </>
  );
}

export default JobsContainer;
