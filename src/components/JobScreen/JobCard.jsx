import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import JobDescriptionDIalog from './JobDescriptionDIalog';

const formatCurrencyByCountryCode = (salary, countryCode) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: countryCode,
  });

  return formatter.format(salary);
};

const formatSalary = ({ minSalary, maxSalary, currencyCode }) => {
  if (minSalary && minSalary === maxSalary) {
    return minSalary;
  }

  if (minSalary && maxSalary) {
    return `${formatCurrencyByCountryCode(minSalary, currencyCode)} - ${formatCurrencyByCountryCode(maxSalary, currencyCode)}`;
  }

  if (minSalary) {
    return formatCurrencyByCountryCode(minSalary, currencyCode);
  }

  if (maxSalary) {
    return formatCurrencyByCountryCode(maxSalary, currencyCode);
  }

  return 'Not Specified';
};

const formatExperience = ({ minExp, maxExp }) => {
  if (minExp && minExp === maxExp) {
    return `${minExp} years`;
  }

  if (minExp && maxExp) {
    return `${minExp} - ${maxExp} years`;
  }

  if (minExp) {
    return `${minExp} years`;
  }

  if (maxExp) {
    return `${maxExp} years`;
  }

  return 'Not Specified';
};

function JobCard({ job }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const onToggleShowFullDescriptionHandler = () => {
    setShowFullDescription((prev) => !prev);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Grid
          container
          sx={{
            mb: 1.5,
          }}
        >
          <Grid item sm={2} className="img-container">
            <img src={job.logoUrl} alt={job.companyName} title={job.companyName} width="100" height="100" />
          </Grid>
          <Grid
            item
            sm={10}
            sx={{
              pl: 1.5,
            }}
          >
            <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 0.1 }} className="text-secondary">
              {job.companyName}
            </Typography>
            <Typography className="capitalized" sx={{ fontSize: 16, mb: 0.1 }}>
              {job.jobRole}
            </Typography>
            <Typography className="capitalized" sx={{ fontSize: 13, fontWeight: 500 }} gutterBottom>
              {job.location}
            </Typography>
          </Grid>
        </Grid>
        <Typography className="text-gray" sx={{ fontSize: 14, fontWeight: 700, mb: 1.5 }}>
          {`Estimated Salary: ${formatSalary({
            minSalary: job.minJdSalary,
            maxSalary: job.maxJdSalary,
            currencyCode: job.salaryCurrencyCode,
          })}`}
        </Typography>
        <Typography sx={{ fontSize: 15, fontWeight: 700, mb: 0.3 }}>About Company:</Typography>
        <div className="relative">
          <Typography className="truncate-after-5-lines" sx={{ fontSize: 14 }} gutterBottom>
            {job.jobDetailsFromCompany}
          </Typography>
          <div className="show-more-details-container">
            <button type="button" onClick={onToggleShowFullDescriptionHandler}>
              Show more
            </button>
          </div>
        </div>
        <Typography className="text-secondary" sx={{ fontSize: 14, fontWeight: 700 }}>
          Minimum Experience:
        </Typography>
        <Typography sx={{ fontSize: 14 }}>{formatExperience({ minExp: job.minExp, maxExp: job.maxExp })}</Typography>
      </CardContent>
      {/* <CardActions>
  <Button size="small">Learn More</Button>
</CardActions> */}

      <JobDescriptionDIalog
        jobDescription={job.jobDetailsFromCompany}
        showDialog={showFullDescription}
        onCloseHandler={onToggleShowFullDescriptionHandler}
      />
    </Card>
  );
}

export default JobCard;
