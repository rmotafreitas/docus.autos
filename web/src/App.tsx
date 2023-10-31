import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { useMemo, useState } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { UserIdContext, UserIdContextProps } from "./contexts/user.context";
import { HomePage } from "./pages";
import { LoginPage } from "./pages/Login";
import { AppsPage } from "./pages/apps";
import { ArticleAppPage } from "./pages/apps/Articles";
import { AudiosAppPage } from "./pages/apps/Audios";
import { VideosAppPage } from "./pages/apps/Videos";
import { WebsitesAppPage } from "./pages/apps/Websites";
import { ProfilePage } from "./pages/me/Profile";
import { HistoryPage, linker } from "./pages/me/logs/History";

export type ViewParams = {
  viewid: string;
};

export type HistoryTypeParams = {
  typeid: keyof typeof linker;
};

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
            <Route path="/me" element={<ProfilePage />} />
            <Route path="/me/history" element={<HistoryPage />} />
            <Route path="/me/history/:typeid" element={<HistoryPage />} />
            <Route path="/apps" element={<AppsPage />} />
            <Route path="/apps/videos" element={<VideosAppPage />} />
            <Route path="/apps/websites" element={<WebsitesAppPage />} />
            <Route path="/apps/articles" element={<ArticleAppPage />} />
            <Route path="/apps/audios" element={<AudiosAppPage />} />
            <Route path="/apps/videos/:viewid" element={<VideosAppPage />} />
            <Route
              path="/apps/websites/:viewid"
              element={<WebsitesAppPage />}
            />
            <Route path="/apps/articles/:viewid" element={<ArticleAppPage />} />
            <Route path="/apps/audios/:viewid" element={<AudiosAppPage />} />
            {/* <Route path="*" element={<NotFound />} />*/}
          </Routes>
        </Router>
      </UserIdContext.Provider>
    </ThemeProvider>
  );
}
