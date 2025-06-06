import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const FollowUpForm = ({ questions, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState('');

  const handleNext = (skipped = false) => {
    const updatedAnswers = {
      ...answers,
      [questions[currentStep]]: skipped ? '[Skipped]' : input,
    };
    setAnswers(updatedAnswers);
    setInput('');

    if (currentStep + 1 === questions.length) {
      onSubmit(updatedAnswers);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  if (!questions || questions.length === 0) {
    return <Typography>No follow-up questions provided.</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Follow-up Question {currentStep + 1} of {questions.length}:
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {questions[currentStep]}
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Your answer"
        sx={{ mb: 2 }}
      />
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => handleNext(true)}
        >
          Skip
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleNext()}
          disabled={!input.trim()}
        >
          {currentStep + 1 === questions.length ? 'Submit' : 'Next'}
        </Button>
      </Box>
    </Paper>
  );
};

export default FollowUpForm;
