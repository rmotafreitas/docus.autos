import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";

export function App() {
  // TODO: Make something like app.routes or routes folder
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<LoginPage />} />
        {/* <Route path="*" element={<NotFound />} />*/}
      </Routes>
    </Router>
  );
}
