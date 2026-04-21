import { renderGameScreen } from "./gameScreen.js";

export function renderShell({ leftHTML, rightHTML, gameState }) {
  return `
    <aside class="sidebar sidebar--left">
      ${leftHTML}
    </aside>
    <main class="game-area">
      ${renderGameScreen(gameState)}
    </main>
    <aside class="sidebar sidebar--right">
      ${rightHTML}
    </aside>
  `;
}
