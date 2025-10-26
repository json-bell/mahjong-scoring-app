import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ScorePage from "./pages/ScorePage";
import CreateGamePage from "./pages/CreateGamePage";
import NotFoundPage from "./pages/NotFoundPage";
import ScoreRulesPage from "./pages/ScoreRulesPage";
import GameDetailPage from "./pages/GameDetailPage";
import JoinGamePage from "./pages/JoinGamePage";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/score" element={<ScorePage />} />
          <Route path="/score/rules" element={<ScoreRulesPage />} />
          <Route path="/game">
            <Route path="create" element={<CreateGamePage />} />
            <Route path="join" element={<JoinGamePage />} />
            <Route path=":gameId" element={<GameDetailPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
