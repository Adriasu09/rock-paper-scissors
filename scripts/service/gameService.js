import { setGameState } from "../../index.js"
import { playSfx } from "./audioController.js"

const HOVER_SOUND = "./assets/sounds/btn-hover.wav"
const COUNTDOWN_SOUND = "./assets/sounds/3-2-1-fight.flac"

let cpuScore = 0
let playerScore = 0
let isPlaying = false
let currentPlayerName = ""
let keyboardBound = false

export function setPlayerName(name) {
    currentPlayerName = name
}

export function resetGameState() {
    cpuScore = 0
    playerScore = 0
    isPlaying = false
}

//Función que genera la elección aleatoria de la máquina
function getComputerChoice() {
    const choices = ["rock", "paper", "scissor"];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber]
}

//Función que compara y decide quién gana
function getResult(player, cpu) {
    if (player === cpu) {
        return "draw"
    }

    else if (player === "rock" && cpu === "scissor") {
        return "win"
    }
    else if (player === "paper" && cpu === "rock") {
        return "win"
    }
    else if (player === "scissor" && cpu === "paper") {
        return "win"
    }
    else{
    return "lose"
    }
}

//Función que actualiza la pantalla con el resultado
async function showResult(playerChoice, cpuChoice, result) {
    //1. Cambio las imágenes de las manos
    const imgCPU = document.getElementById("img-cpu")
    const imgPlayer = document.getElementById("img-player")

    imgCPU.src = "./assets/images/" + cpuChoice + "-right.png"
    imgPlayer.src = "./assets/images/" + playerChoice + "-left.png"

    //2. El resultado lo muestra el modal, limpio el mensaje
    const messageEl = document.getElementById("message")
    messageEl.textContent = ""

    //3. Actualizo el marcador
    if (result === "win") {
        playerScore = playerScore + 1
    }
    else if(result === "lose") {
        cpuScore = cpuScore + 1
    }

    document.getElementById("cpu-score").textContent = cpuScore
    document.getElementById("player-score").textContent = playerScore

    //4. Muestro el modal de la ronda y espero a que se cierre
    const modalResult = result === "draw" ? "tie" : result
    if (typeof window.__showRoundResult === "function") {
        await window.__showRoundResult(modalResult)
    }

    //5. ¿Hay ganador de la partida?
    if (playerScore >= 3 || cpuScore >= 3) {
        const winner = playerScore >= 3 ? "player" : "cpu"
        const finalScores = { player: playerScore, cpu: cpuScore }
        const finalName = currentPlayerName
        resetGameState()
        setGameState({
            view: "gameOver",
            winner,
            playerName: finalName,
            scores: finalScores,
        })
        return
    }

    //6. Si la partida continúa, reiniciamos countdown, mensaje y puños
    const countdownEl = document.getElementById("countdown")
    if (countdownEl) countdownEl.textContent = "3"
    if (messageEl) messageEl.textContent = "¡Elige tu movimiento!"
    imgCPU.src = "./assets/images/rock-right.png"
    imgPlayer.src = "./assets/images/rock-left.png"
}

//función de cuenta atrás
function startCountdown(playerChoice) {
    //si ya hay una ronda en curso, no hacemos nada
    if (isPlaying) {
        return
    }
    isPlaying = true

    const countdownEl = document.getElementById("countdown")
    const messageEl = document.getElementById("message")
    const imgCPU = document.getElementById("img-cpu")
    const imgPlayer = document.getElementById("img-player")

    messageEl.textContent = "3...2...1..."

    //Sonido sincronizado con la cuenta atrás
    playSfx(COUNTDOWN_SOUND, 0.7)

    //Animación de shake en las manos
    imgCPU.classList.add("is-shaking")
    imgPlayer.classList.add("is-shaking")

    let count = 3
    countdownEl.textContent = count

    const interval = setInterval(async function () {
        count = count - 1
        countdownEl.textContent = count

        if (count === 0) {
            clearInterval(interval)
            countdownEl.textContent = " ⚡"

            //Paramos el shake antes de revelar el resultado
            imgCPU.classList.remove("is-shaking")
            imgPlayer.classList.remove("is-shaking")

            //Ahora juega la ronda
            const cpuChoice = getComputerChoice()
            const result = getResult(playerChoice, cpuChoice)

            await showResult(playerChoice, cpuChoice, result)

            isPlaying = false
        }
    }, 1000)
}

//Función que conecta con la lógica del juego
export function initGameListeners() {
    const btnRock = document.getElementById("btn-rock")
    const btnPaper = document.getElementById("btn-paper")
    const btnScissors = document.getElementById("btn-scissors")

    if (!btnRock || !btnPaper || !btnScissors) return

    for (const btn of [btnRock, btnPaper, btnScissors]) {
        btn.addEventListener("mouseenter", () => playSfx(HOVER_SOUND, 0.5))
    }

    btnRock.addEventListener("click", function () {
        startCountdown("rock")
    })

    btnPaper.addEventListener("click", function () {
        startCountdown("paper")
    })

    btnScissors.addEventListener("click", function () {
        startCountdown("scissor")
    })

    //Eventos del teclado (A, S, D) — solo se enganchan una vez
    if (!keyboardBound) {
        keyboardBound = true
        document.addEventListener("keydown", function (e) {
            if (!document.getElementById("btn-rock")) return
            const key = e.key.toLowerCase()

            if (key === "a") {
                startCountdown("rock")
            }
            else if (key === "s") {
                startCountdown("paper")
            }
            else if (key === "d") {
                startCountdown("scissor")
            }
        })
    }
}
