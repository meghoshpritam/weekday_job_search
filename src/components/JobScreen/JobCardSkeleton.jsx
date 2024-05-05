import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function JobCardSkeleton() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Grid
          container
          sx={{
            mb: 1.5,
          }}
        >
          <Grid item sm={2}>
            <div className="image-skeleton" />
          </Grid>
          <Grid
            item
            sm={10}
            sx={{
              pl: 1.5,
            }}
          >
            <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 0.5 }} className="company-name-skeleton" />
            <Typography className="capitalized role-skeleton" sx={{ fontSize: 16, mb: 0.7 }} />
            <Typography className="capitalized location-skeleton" sx={{ fontSize: 13, fontWeight: 500 }} gutterBottom />
          </Grid>
        </Grid>
        <Typography className="text-gray" sx={{ fontSize: 14, fontWeight: 700, mb: 1.5 }}>
          Estimated Salary:
          <span className="salary-skeleton" />
        </Typography>
        <Typography sx={{ fontSize: 15, fontWeight: 700, mb: 0.3 }}>About Company:</Typography>
        <div className="skeleton job-description-skeleton" />
        <div className="skeleton job-description-skeleton" />
        <div className="skeleton job-description-skeleton" />
        <div className="skeleton job-description-skeleton" />
        <div className="skeleton job-description-skeleton" />
        <Typography className="text-secondary" sx={{ fontSize: 14, fontWeight: 700 }}>
          Minimum Experience:
        </Typography>
        <Typography className="skeleton experience-skeleton" sx={{ fontSize: 14 }} />
      </CardContent>
      <CardActions
        sx={{
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        <div className="easy-apply-button easy-apply-button-skeleton skeleton" />
      </CardActions>
    </Card>
  );
}

export default JobCardSkeleton;
