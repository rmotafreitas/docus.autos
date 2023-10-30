import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HomePage } from "./pages";
import { LoginPage } from "./pages/Login";
import { VideosAppPage } from "./pages/apps/Videos";
import { WebsitesAppPage } from "./pages/apps/Websites";
import { ProfilePage } from "./pages/me/Profile";
import { AppsPage } from "./pages/apps";
import { HistoryPage } from "./pages/me/logs/History";
import { ArticleAppPage } from "./pages/apps/Articles";
import { AudiosAppPage } from "./pages/apps/Audios";
import { UserIdContext, UserIdContextProps } from "./contexts/user.context";
import { useMemo, useState } from "react";
import { ThemeProvider } from "./components/theme-provider";

export function App() {
  const [userId, setUserId] = useState<string>("");

  const providerUser = useMemo<UserIdContextProps>(
    () => ({
      userId,
      setUserId,
    }),
    [userId, setUserId]
  );

  // TODO: Make something like app.routes or routes folder
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <UserIdContext.Provider value={providerUser}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<LoginPage />} />
            <Route path="/apps/videos" element={<VideosAppPage />} />
            <Route path="/me" element={<ProfilePage />} />
            <Route path="/apps/websites" element={<WebsitesAppPage />} />
            <Route path="/apps/articles" element={<ArticleAppPage />} />
            <Route path="/apps/audios" element={<AudiosAppPage />} />
            <Route path="/me/history" element={<HistoryPage />} />
            <Route path="/apps" element={<AppsPage />} />
            {/* <Route path="*" element={<NotFound />} />*/}
          </Routes>
        </Router>
      </UserIdContext.Provider>
    </ThemeProvider>
  );
}
