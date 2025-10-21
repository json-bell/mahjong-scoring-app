import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ScorePage from "./pages/ScorePage";
import CreateGamePage from "./pages/CreateGamePage";
import NotFoundPage from "./pages/NotFoundPage";
import ScoreRulesPage from "./pages/ScoreRulesPage";
import GameDetailPage from "./pages/GameDetailPage";
import JoinGamePage from "./pages/JoinGamePage";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomePage />} />

          <Route path="/score" element={<ScorePage />} />
          <Route path="/score/rules" element={<ScoreRulesPage />} />

          <Route path="/game">
            <Route path="create" element={<CreateGamePage />} />
            <Route path="join" element={<JoinGamePage />} />
            <Route path=":gameId" element={<GameDetailPage />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
