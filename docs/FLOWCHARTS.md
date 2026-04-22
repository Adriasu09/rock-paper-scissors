# Flowcharts — Lógica del Juego

Diagramas de los algoritmos principales del juego **Piedra, Papel o Tijera**.
Las APIs externas (clima, noticias, geolocalización) quedan fuera de este alcance.

---

## 1. Flujo general de la aplicación (máquina de estados de vistas)

Controlada por `setGameState` en [index.js](../index.js) que re-renderiza según `gameState.view`.

```mermaid
flowchart TD
    A([Inicio app]) --> B[Render layout]
    B --> C{gameState.view}
    C -->|start| D[StartScreen]
    C -->|play| E[PlayScreen / GameController]
    C -->|gameOver| F[GameOverScreen]

    D -->|click Play| G[Abrir NameModal]
    G --> H{Nombre válido?<br/>longitud >= 3}
    H -->|No| G
    H -->|Sí| I[handleStartGame]
    I --> J[resetGameState<br/>setPlayerName<br/>SFX startGame]
    J -->|view = play| E

    E -->|isGameOver| F
    F -->|Replay| I
    F -->|Home| K[handleGoHome]
    K -->|view = start| D
```

---

## 2. Algoritmo de una ronda (countdown + resolución)

Implementado en [gameController.js](../scripts/ui/gameController.js) y [gameService.js](../scripts/services/gameService.js).

```mermaid
flowchart TD
    A([Jugador elige:<br/>rock / paper / scissor]) --> B{isPlaying?}
    B -->|Sí| Z([Ignorar click])
    B -->|No| C[isPlaying = true]

    C --> D[Mostrar mensaje '3...2...1...'<br/>SFX countdown<br/>Animación shake manos]
    D --> E[count = 3]
    E --> F[Mostrar count en pantalla]
    F --> G{count == 0?}
    G -->|No| H[Esperar 1000 ms]
    H --> I[count -= 1]
    I --> F
    G -->|Sí| J[Parar interval<br/>Quitar shake<br/>Mostrar '⚡']

    J --> K[cpuChoice = getCpuChoice<br/>índice aleatorio en CHOICES]
    K --> L[result = resolveRound<br/>player vs cpu]
    L --> M[showResult]
    M --> N[isPlaying = false]
    N --> O([Fin de ronda])
```

---

## 3. Algoritmo `resolveRound` (decidir ganador de la ronda)

Función pura en [gameService.js:14](../scripts/services/gameService.js#L14).

```mermaid
flowchart TD
    A([playerChoice, cpuChoice]) --> B{playerChoice == cpuChoice?}
    B -->|Sí| C([return 'draw'])
    B -->|No| D{rock vs scissor?}
    D -->|Sí| W([return 'win'])
    D -->|No| E{paper vs rock?}
    E -->|Sí| W
    E -->|No| F{scissor vs paper?}
    F -->|Sí| W
    F -->|No| L([return 'lose'])
```

---

## 4. Flujo de `showResult` (aplicar resultado y verificar fin de partida)

Sección `showResult` en [gameController.js:25](../scripts/ui/gameController.js#L25).

```mermaid
flowchart TD
    A([playerChoice, cpuChoice, result]) --> B[Actualizar imágenes<br/>de manos]
    B --> C{result}
    C -->|win| D[SFX roundWin]
    C -->|lose| E[SFX roundLose]
    C -->|draw| F[Sin SFX]

    D --> G[applyRoundResult<br/>actualizar marcador]
    E --> G
    F --> G

    G --> H[Render scores en DOM]
    H --> I[showRoundResult modal<br/>auto-cierre 3s]
    I --> J{isGameOver?<br/>player>=3 o cpu>=3}

    J -->|Sí| K[getWinner<br/>resetGameState<br/>SFX gameWin/gameLose]
    K -->|setGameState view=gameOver| L([GameOverScreen])

    J -->|No| M[Reset UI:<br/>countdown=3<br/>mensaje '¡Elige tu movimiento!'<br/>imágenes por defecto]
    M --> N([Lista para próxima ronda])
```

---

## 5. Selección CPU — `getCpuChoice`

Función en [gameService.js:9](../scripts/services/gameService.js#L9).

```mermaid
flowchart LR
    A([Inicio]) --> B["r = Math.random() — rango [0, 1)"]
    B --> C["index = floor(r * 3)"]
    C --> D["return CHOICES[index]"]
    D --> E([rock / paper / scissor])
```

---

## 6. Entrada: click y atajos de teclado

Binding en [gameController.js:112](../scripts/ui/gameController.js#L112).

```mermaid
flowchart TD
    A([Evento de usuario]) --> B{Tipo}
    B -->|click btn-rock| R[startCountdown 'rock']
    B -->|click btn-paper| P[startCountdown 'paper']
    B -->|click btn-scissors| S[startCountdown 'scissor']
    B -->|keydown| K{tecla}
    K -->|a| R
    K -->|s| P
    K -->|d| S
    K -->|otra| X([Ignorar])
    B -->|mouseenter botón| H[SFX hover]
```

---

## 7. Estado global del juego (`gameService` state)

```mermaid
flowchart LR
    subgraph State
      PS[playerScore: 0]
      CS[cpuScore: 0]
      PN[playerName: '']
    end

    setPlayerName --> PN
    applyRoundResult -->|result=win| PS
    applyRoundResult -->|result=lose| CS
    resetGameState -->|scores=0| PS
    resetGameState -->|scores=0| CS
    isGameOver -->|lee| PS
    isGameOver -->|lee| CS
    getWinner -->|lee| PS
    getWinner -->|lee| CS
```

---

## Constantes clave

| Constante | Valor | Origen |
|---|---|---|
| `CHOICES` | `["rock","paper","scissor"]` | [game.js:1](../scripts/constants/game.js#L1) |
| `WIN_SCORE` | `3` | [game.js:3](../scripts/constants/game.js#L3) |
| `COUNTDOWN_START` | `3` | [game.js:4](../scripts/constants/game.js#L4) |
| `COUNTDOWN_INTERVAL_MS` | `1000` | [game.js:5](../scripts/constants/game.js#L5) |
| `MIN_LENGTH` (nombre) | `3` | [nameModal.js:1](../scripts/ui/nameModal.js#L1) |
