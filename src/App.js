import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileUpload from "./components/FileUpload";
import ResultPage from "./components/ResultPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<FileUpload />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
