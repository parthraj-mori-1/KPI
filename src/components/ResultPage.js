import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  return (
    <div className="card">
      <h2>KPI Evaluation Result</h2>
      {result ? (
        <pre className="result-box">{result}</pre>
      ) : (
        <p className="error">No result available.</p>
      )}
      <button onClick={() => navigate("/")} className="btn">
        Evaluate Another File
      </button>
    </div>
  );
};

export default ResultPage;
