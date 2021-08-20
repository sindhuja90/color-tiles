'use strict';

for (let i = 0; i < 2; i++) {
  let red,
    green,
    blue,
    flag1 = 0,
    flag2 = 0,
    pos;

  let chosenColors = [`128 + 128 + 128`],
    filled = [];

  let dragObj;
  let emptyCellIndex = 24;
  let noOfMoves = 0;
  let start, stop;
  let timeTaken, score;

  const setText = () => {
    document.querySelector('.username').textContent =
      window.localStorage.getItem('user');
    document.querySelector('.moves').textContent = noOfMoves;

    if (window.localStorage.getItem('easyHighScore')) {
      document.querySelector(
        '.score'
      ).textContent = `${window.localStorage.getItem('easyHighScoreUser')} 
    ${window.localStorage.getItem('easyHighScore')}`;
    } else {
      document.querySelector('.score').textContent = 'Nil';
    }
  };
}
