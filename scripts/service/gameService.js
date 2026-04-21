let cpuScore = 0
let playerScore = 0


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
function showResult(playerChoice, cpuChoice, result) {
    //1. Cambio las imágenes de las manos
    const imgCPU = document.getElementById("img-cpu")
    const imgPlayer = document.getElementById("img-player")

    imgCPU.src = "./assets/images/" + cpuChoice + "-right.png"
    imgPlayer.src = "./assets/images/" + playerChoice + "-left.png"

    //2. Cambio el mensaje
    const messageEl = document.getElementById("message")

    if (result === "win") {
        messageEl.textContent = " 🎉 ¡Ganaste esta ronda!"
    }

    else if (result === "lose") {
        messageEl.textContent = " 😞 La CPU gana esta ronda"
    }

    else {(result === "draw") 
        messageEl.textContent = "🤝 ¡Empate!"
    }

    //3. Actualizo el marcador
    if (result === "win") {
        playerScore = playerScore + 1
    }
    else if(result === "lose") {
        cpuScore = cpuScore + 1
    }

    document.getElementById("cpu-score").textContent = cpuScore
    document.getElementById("player-score").textContent = playerScore
}

//variable para evitar clics durante la cuenta atrás
let isPlaying = false

//función de cuenta atrás
function startCountdown(playerChoice) {
    //si ya hay una ronda en curso, no hacemos nada
    if (isPlaying) {
        return
    }
    isPlaying = true

    const countdownEl = document.getElementById("countdown")
    const messageEl = document.getElementById("message")
    messageEl.textContent = "3...2...1..."

    let count = 3
    countdownEl.textContent = count

    const interval = setInterval(function () {
        count = count - 1
        countdownEl.textContent = count

        if (count === 0) {
            clearInterval(interval)
            countdownEl.textContent = " ⚡"

            //Ahora juega la ronda
            const cpuChoice = getComputerChoice()
            const result = getResult(playerChoice, cpuChoice)
            showResult(playerChoice, cpuChoice, result)

            isPlaying = false

            //Después de 1.5 segundos, vuelve a poner el 3
            setTimeout(function () {
                countdownEl.textContent = "3"
            }, 1500)
        }
    }, 700)
}

//Función que conecta con la lógica del juego
export function initGameListeners() {
    const btnRock = document.getElementById("btn-rock")
    const btnPaper = document.getElementById("btn-paper")
    const btnScissors = document.getElementById("btn-scissors")

    btnRock.addEventListener("click", function () {
        startCountdown("rock")
    })

    btnPaper.addEventListener("click", function () {
        startCountdown("paper")
    })

    btnScissors.addEventListener("click", function () {
        startCountdown("scissor")
    })

    //Eventos del teclado (A, S, D)
    document.addEventListener("keydown", function (e) {
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