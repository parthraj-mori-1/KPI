import ResponseDisplay from "./components/ResponseDisplay";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Render";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/answer" element={<ResponseDisplay />} />
      </Routes>
    </Router>
  );
}
