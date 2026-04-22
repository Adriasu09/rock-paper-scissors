import { renderStartScreen } from "./screens/startScreen.js";
import { renderPlayScreen } from "./screens/playScreen.js";
import { renderGameOverScreen } from "./screens/gameOverScreen.js";

export function renderGameScreen(state) {
  const view = state?.view ?? "start";
  switch (view) {
    case "play":
      return renderPlayScreen(state);
    case "gameOver":
      return renderGameOverScreen(state);
    case "start":
    default:
      return renderStartScreen();
  }
}
