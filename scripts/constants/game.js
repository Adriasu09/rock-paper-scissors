export const CHOICES = ["rock", "paper", "scissor"];

export const WIN_SCORE = 3;
export const COUNTDOWN_START = 3;
export const COUNTDOWN_INTERVAL_MS = 1000;

export const HAND_IMAGES = {
  rock: {
    left: "./assets/images/rock-left.png",
    right: "./assets/images/rock-right.png",
  },
  paper: {
    left: "./assets/images/paper-left.png",
    right: "./assets/images/paper-right.png",
  },
  scissor: {
    left: "./assets/images/scissor-left.png",
    right: "./assets/images/scissor-right.png",
  },
};

export const SFX = {
  hover: "./assets/sounds/btn-hover.wav",
  countdown: "./assets/sounds/3-2-1-fight.flac",
  roundWin: "./assets/sounds/succes-sound.wav",
  roundLose: "./assets/sounds/error-sound.mp3",
  gameWin: "./assets/sounds/win.mp3",
  gameLose: "./assets/sounds/lose-2.wav",
  startGame: "./assets/sounds/start-game.wav",
};

export const MUSIC_PATH = "./assets/sounds/music-game.mp3";

export const AUDIO_ICONS = {
  on: "./assets/icon/volume-2.svg",
  off: "./assets/icon/volume-off.svg",
};
