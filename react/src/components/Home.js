import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

function Home() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to My App
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        This is a simple React application with a calculator feature.
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/calculator')}
          sx={{ borderRadius: 2, textTransform: 'none', px: 4, py: 1.5 }}
        >
          Go to Calculator
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
