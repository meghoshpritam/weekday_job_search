import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="up" ref={ref} {...props} />;
});

function JobDescriptionDIalog({ onCloseHandler, showDialog, jobDescription }) {
  return (
    <Dialog maxWidth="md" open={showDialog} TransitionComponent={Transition} onClose={onCloseHandler}>
      <DialogTitle
        sx={{
          textAlign: 'center',
        }}
      >
        Job Description
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{jobDescription}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default JobDescriptionDIalog;
