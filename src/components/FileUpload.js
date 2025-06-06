import React from "react";
import { Box, Button, Typography, TextField, Paper } from "@mui/material";
import "../styles/FileUpload.css";

export default function UploadAndQuestion({
  pdfFile,
  setPdfFile,
  question,
  setQuestion,
  resetState,
}) {
  const handleFileChange = (e) => {
    resetState();
    setPdfFile(e.target.files[0]);
  };

  const handleQuestionChange = (e) => {
    resetState();
    setQuestion(e.target.value);
  };

  return (
    <Box className="upload-question-container">
      <Paper className="upload-question-paper" elevation={5}>


        <Button
          variant="contained"
          component="label"
          fullWidth
          className="upload-button"
        >
          Upload KPI PDF
          <input
            type="file"
            accept="application/pdf"
            hidden
            onChange={handleFileChange}
          />
        </Button>

        {pdfFile && (
          <Typography variant="body2" className="upload-selected-file">
            Selected File: {pdfFile.name}
          </Typography>
        )}

        <TextField
          label="Enter your question"
          variant="outlined"
          fullWidth
          value={question}
          onChange={handleQuestionChange}
          multiline
          minRows={2}
          className="upload-textfield"
        />
      </Paper>
    </Box>
  );
}
