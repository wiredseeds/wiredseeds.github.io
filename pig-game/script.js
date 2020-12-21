'use strict';

// Selecting elements
const idPlayers = {
  player1: 0,
  player2: 1,
  size: 2,
};
const WINSCORE = 20;
let activePlayer = 0;
const players = [];
const diceEl = document.querySelector('.dice');
const btnRollEl = document.querySelector('.btn--roll');
const btnNewEl = document.querySelector('.btn--new');
const btnHoldEl = document.querySelector('.btn--hold');

for (let i = 0; i < idPlayers.size; i++) {
  let player = {};
  player.section = document.querySelector(`.player--${i}`);
  player.name = document.querySelector(`#name--${i}`);
  player.score = document.querySelector(`#score--${i}`);
  player.current = document.querySelector(`#current--${i}`);
  players.push(player);
}

const newGame = function () {
  for (let i = 0; i < players.length; i++) {
    players[i].score.textContent = 0;
    players[i].current.textContent = 0;
    if (players[i].section.classList.contains('player--winner'))
      players[i].section.classList.remove('player--winner');
    deactivatePlayer(i);
  }
  activatePlayer(idPlayers.player1);
  diceEl.classList.add('hidden');
};

const deactivatePlayer = function (id) {
  if (players[id].section.classList.contains('player--active'))
    players[id].section.classList.remove('player--active');
  players[id].current.textContent = 0;
};

const activatePlayer = function (id) {
  if (!players[id].section.classList.contains('player--active'))
    players[id].section.classList.add('player--active');
  activePlayer = id;
};

const displayDice = function (number) {
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${number}.png`;
};

const displayCurrent = function (diceNumber) {
  players[activePlayer].current.textContent =
    Number(players[activePlayer].current.textContent) + diceNumber;
};
const endTurn = function () {
  deactivatePlayer(activePlayer);
  activePlayer =
    idPlayers.size - activePlayer - 1 ? activePlayer + 1 : idPlayers.player1;
  activatePlayer(activePlayer);
};

const rollDice = function () {
  if (players[activePlayer].section.classList.contains('player--winner'))
    return;
  const randomDiceNumber = Math.trunc(Math.random() * 6) + 1;
  displayDice(randomDiceNumber);
  if (randomDiceNumber !== 1) displayCurrent(randomDiceNumber);
  else endTurn();
};
const hasWonTheGame = function (currentPlayer) {
  let current = currentPlayer.section.classList.contains('player--winner');
  if (!current) {
    if (Number(players[activePlayer].score.textContent) >= WINSCORE) {
      players[activePlayer].section.classList.add('player--winner');
      currentPlayer.current.textContent = 0;
      current = true;
    }
  }
  return current;
};

const holdScore = function () {
  players[activePlayer].score.textContent =
    Number(players[activePlayer].score.textContent) +
    Number(players[activePlayer].current.textContent);
  if (hasWonTheGame(players[activePlayer])) return;
  endTurn();
};

// Implementation
// starting conditions
newGame();

// Event listeners
btnNewEl.addEventListener('click', newGame);
btnRollEl.addEventListener('click', rollDice);
btnHoldEl.addEventListener('click', holdScore);
