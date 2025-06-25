import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Box, Paper } from '@mui/material';

function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      clearInput();
    } else {
      setInput((prev) => prev + value);
    }
  };

  const calculateResult = () => {
    try {
      // Basic validation to avoid invalid expressions
      const validInput = input.replace(/[^0-9+\-*/.]/g, '');
      if (validInput) {
        // eslint-disable-next-line no-eval
        const calculatedResult = eval(validInput);
        if (!isNaN(calculatedResult)) {
          setResult(calculatedResult.toString());
          setInput(calculatedResult.toString());
        } else {
          setResult('Error');
        }
      } else {
        setResult('Error');
      }
    } catch (error) {
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h5" component="h1" gutterBottom align="center">
        Simple Calculator
      </Typography>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, maxWidth: 400, margin: '0 auto' }}>
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter expression"
          sx={{ mb: 2, input: { fontSize: '1.5rem', textAlign: 'right' } }}
          disabled
        />
        <TextField
          fullWidth
          variant="outlined"
          value={result}
          placeholder="Result"
          sx={{ mb: 2, input: { fontSize: '1.5rem', textAlign: 'right', fontWeight: 'bold' } }}
          disabled
        />
        <Grid container spacing={1.5}>
          {buttons.map((btn) => (
            <Grid item xs={3} key={btn}>
              <Button
                fullWidth
                variant={btn === '=' ? 'contained' : 'outlined'}
                color={btn === '=' ? 'primary' : btn === 'C' ? 'secondary' : 'default'}
                onClick={() => handleButtonClick(btn)}
                sx={{ height: 60, fontSize: '1.2rem', borderRadius: 2 }}
              >
                {btn}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}

export default Calculator;
