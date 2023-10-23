import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HomePage } from "./pages";
import { LoginPage } from "./pages/Login";
import { VideosAppPage } from "./pages/apps/Videos";
import { ProfilePage } from "./pages/me/Profile";
import { AppsPage } from "./pages/apps";
import { HistoryPage } from "./pages/me/History";

export function App() {
  // TODO: Make something like app.routes or routes folder
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/apps/videos" element={<VideosAppPage />} />
        <Route path="/me" element={<ProfilePage />} />
        <Route path="/me/history" element={<HistoryPage />} />
        <Route path="/apps" element={<AppsPage />} />
        {/* <Route path="*" element={<NotFound />} />*/}
      </Routes>
    </Router>
  );
}
