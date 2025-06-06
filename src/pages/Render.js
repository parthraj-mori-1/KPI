import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Alert,
  Box,
  Button,
} from "@mui/material";

import FileUpload from "../components/FileUpload";
import FollowUpForm from "../components/FollowUpForm";
import Loader from "../components/Loader";

import { callLambda1, callLambda2 } from "../api/api";

function Render() {
  const [pdfFile, setPdfFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const resetState = () => {
    setResponseData(null);
    setError("");
  };

  const handleSubmitQuestion = async () => {
    if (!pdfFile) {
      setError("Please upload a PDF file.");
      return;
    }
    if (!question.trim()) {
      setError("Please enter your question.");
      return;
    }

    setError("");
    setLoading(true);
    setResponseData(null);

    try {
      const data = await callLambda1(pdfFile, question);
      setResponseData(data);

      // if context is sufficient, directly proceed to Lambda 2
      if (data.sufficient) {
        handleGetAnalysis(data);
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to process the request (Lambda 1)."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGetAnalysis = async (dataToUse) => {
    if (!dataToUse) return;

    setError("");
    setLoading(true);
    try {
      const payload = {
        sufficient: true,
        Full_context: dataToUse.Full_context,
        Question: dataToUse.Question,
      };
      const rawData = await callLambda2(payload);

      let parsedData;
      try {
        parsedData = typeof rawData === "string" ? JSON.parse(rawData) : rawData;
      } catch {
        parsedData = { answer: rawData };
      }

      navigate("/answer", { state: { responseData: parsedData } });
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to process the request (Lambda 2)."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitUserAnswer = async (answers) => {
    const nonSkippedAnswers = Object.values(answers)
      .filter(ans => ans && ans.trim() && ans.trim().toLowerCase() !== '[skipped]');

    const userAnswerString = nonSkippedAnswers.length > 0
      ? nonSkippedAnswers.join(' ')
      : '';

    setError("");
    setLoading(true);

    try {
      const payload = {
        sufficient: false,
        Question: responseData.Question,
        user_answers: userAnswerString,
        Full_context: responseData.Full_context,
      };
      const rawData = await callLambda2(payload);

      let parsedData;
      try {
        parsedData = typeof rawData === "string" ? JSON.parse(rawData) : rawData;
      } catch {
        parsedData = { answer: rawData };
      }

      navigate("/answer", { state: { responseData: parsedData } });
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to process the request (Lambda 2)."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: "19vh" }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          KPI Assistant
        </Typography>

        <FileUpload
          pdfFile={pdfFile}
          setPdfFile={setPdfFile}
          resetState={resetState}
          question={question}
          setQuestion={setQuestion}
        />

        <Box mb={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmitQuestion}
            disabled={loading}
          >
            Submit Question
          </Button>
        </Box>

        {loading && <Loader />}

        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        {/* Show follow-up only if not sufficient */}
        {responseData?.sufficient === false &&
          responseData.followup_questions && (
            <FollowUpForm
              questions={responseData.followup_questions}
              onSubmit={handleSubmitUserAnswer}
            />
          )}
      </Paper>
    </Container>
  );
}

export default Render;
