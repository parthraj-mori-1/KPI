import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button
} from "@mui/material";

export default function ResponseDisplay() {
  const location = useLocation();
  const navigate = useNavigate();
  const rawResponse = location.state?.responseData;

  // Safely extract meaningful content
  const responseText =
    typeof rawResponse === "string"
      ? rawResponse
      : rawResponse?.answer || rawResponse?.body || JSON.stringify(rawResponse, null, 2);

  // If no response data, show fallback UI
  if (!rawResponse) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" gutterBottom>
              No response available
            </Typography>
            <Typography variant="body1" gutterBottom>
              Please upload a KPI PDF and submit a question to view analysis.
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => navigate("/")}
            >
              Go Back
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: "20px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            KPI Analysis Result
          </Typography>

          <Box
            sx={{
              maxHeight: "500px",
              overflowY: "auto",
              mt: 3,
              p: 2,
              backgroundColor: "#f9f9f9",
              borderRadius: 2,
              whiteSpace: "pre-line",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "#444",
            }}
          >
            {responseText}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
