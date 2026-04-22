# User Flow — Piedra, Papel o Tijera

Diagrama del recorrido del usuario desde que abre la app hasta que termina una partida.
A diferencia de los flowcharts técnicos, aquí se modelan **acciones y pantallas que ve el jugador**, no la lógica interna.

---

## 1. User Flow completo

```mermaid
flowchart TD
    Start([Usuario abre la app]) --> Home[Pantalla de inicio<br/>Título + imagen + botones]

    Home --> Choice{¿Qué hace?}
    Choice -->|Click 'Reglas'| Rules[Ver modal de reglas]
    Rules -->|Cerrar| Home
    Choice -->|Click icono sonido| Mute[Activar / silenciar audio]
    Mute --> Home
    Choice -->|Click 'PLAY vs CPU'| NameModal[Modal: ingresar nombre]

    NameModal --> Valid{¿Nombre válido?<br/>mín. 3 caracteres}
    Valid -->|No| NameModal
    Valid -->|Cerrar modal| Home
    Valid -->|Sí — Comenzar| Play[Pantalla de juego]

    Play --> Pick[Usuario elige jugada<br/>Piedra / Papel / Tijera<br/>click o teclas A / S / D]
    Pick --> Count[Ve cuenta regresiva 3-2-1]
    Count --> Reveal[Se revelan las manos<br/>jugador vs CPU]
    Reveal --> RoundResult[Modal: Ganaste / Perdiste / Empate<br/>3 segundos]
    RoundResult --> Score[Se actualiza el marcador]

    Score --> Check{¿Alguien llegó a 3?}
    Check -->|No| Pick
    Check -->|Sí| GameOver[Pantalla Game Over<br/>muestra ganador y marcador final]

    GameOver --> End{¿Qué hace?}
    End -->|Replay| Play
    End -->|Home| Home
    End -->|Cerrar pestaña| Exit([Fin])
```

---

## 2. Recorrido feliz (happy path) simplificado

```mermaid
flowchart LR
    A([Abre app]) --> B[Inicio]
    B --> C[Play vs CPU]
    C --> D[Escribe nombre]
    D --> E[Elige jugada]
    E --> F[Ve resultado de ronda]
    F --> G{¿Partida terminada?}
    G -->|No| E
    G -->|Sí| H[Pantalla Game Over]
    H --> I([Replay o Home])
```

---

## 3. Pantallas y acciones disponibles

| Pantalla | Acciones del usuario | Siguiente pantalla |
|---|---|---|
| **Inicio** | Click `PLAY vs CPU` | Modal Nombre |
| **Inicio** | Click `Reglas` | Modal Reglas (overlay) |
| **Inicio** | Click icono sonido | Toggle audio (misma pantalla) |
| **Modal Nombre** | Escribir nombre + Enter / Comenzar | Juego |
| **Modal Nombre** | Click `×` / fuera / Esc | Inicio |
| **Juego** | Click Piedra/Papel/Tijera | Countdown → Resultado |
| **Juego** | Teclas `A` / `S` / `D` | Countdown → Resultado |
| **Modal Ronda** | (Auto-cierre 3s) | Siguiente ronda o Game Over |
| **Game Over** | Click `Replay` | Juego (nueva partida) |
| **Game Over** | Click `Home` | Inicio |

---
