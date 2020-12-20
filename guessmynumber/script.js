'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const bodyBackground = document.querySelector('body').style.backgroundColor;
const numberStyle = document.querySelector('.number').style.width;

document.querySelector('.again').addEventListener('click', function () {
  document.querySelector('.number').style.width = numberStyle;
  document.querySelector('.number').textContent = '?';
  document.querySelector('body').style.backgroundColor = bodyBackground;
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.highscore').textContent = highScore;
  score = 20;
  document.querySelector('.score').textContent = score;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
});

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  if (!score) return;
  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No number!';
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '👍 Correct Number!';
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    highScore = highScore < score ? score : highScore;
  } else {
    document.querySelector('.message').textContent =
      guess > secretNumber ? '📈 Too High!' : '📉 Too Low!';
    score--;
    document.querySelector('.score').textContent = score;
  }
  if (!score) {
    document.querySelector('.message').textContent = '💥 You lost the game!';
    document.querySelector('.number').textContent = secretNumber;
    return;
  }
});
