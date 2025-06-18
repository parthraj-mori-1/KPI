import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(",")[1];
      setLoading(true);

      try {
        const response = await axios.post(
          "https://7cveka0ooc.execute-api.ap-south-1.amazonaws.com/dev/upload_excel", // 🔁 Replace with actual API URL
          base64,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        navigate("/result", { state: { result: response.data } });
      } catch (err) {
        navigate("/result", { state: { result: "Error: " + err.message } });
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="card">
      <h1>KPI Evaluator</h1>
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        className="file-input"
      />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="btn"
      >
        {loading ? "Evaluating..." : "Upload & Evaluate"}
      </button>
    </div>
  );
};

export default FileUpload;
