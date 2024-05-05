import React from 'react';
import Container from '@mui/material/Container';
import JobScreen from './components/JobScreen';

function App() {
  return (
    <Container maxWidth="xl" sx={{ pt: 6, pb: 10 }}>
      <JobScreen />
    </Container>
  );
}

export default App;
