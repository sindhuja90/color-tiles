'use strict';

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

const randomGrid = document.querySelectorAll('.random-pattern > div');
const gameGrid = document.querySelectorAll('.game-tiles > div');

const fillGrid = () => {
  for (let i = 0; i < randomGrid.length; i++) {
    do {
      flag1 = 0;

      red = Math.trunc(Math.random() * 255) + 1;
      green = Math.trunc(Math.random() * 255) + 1;
      blue = Math.trunc(Math.random() * 255) + 1;

      if (chosenColors.includes(`${red} + ${green} + ${blue}`)) flag1 = 1;
    } while (flag1);

    randomGrid[i].style.backgroundColor =
      'rgb(' + red + ',' + green + ',' + blue + ')';

    chosenColors.push(`${red} + ${green} + ${blue}`);

    do {
      flag2 = 0;
      pos = Math.trunc(Math.random() * 23) + 1;
      if (filled.includes(pos)) flag2 = 1;
    } while (flag2);

    gameGrid[pos].style.backgroundColor =
      'rgb(' + red + ',' + green + ',' + blue + ')';

    filled.push(pos);
  }

  for (let i = 0; i < 24; i++) {
    if (!filled.includes(i)) {
      do {
        flag1 = 0;

        red = Math.trunc(Math.random() * 255) + 1;
        green = Math.trunc(Math.random() * 255) + 1;
        blue = Math.trunc(Math.random() * 255) + 1;

        if (chosenColors.includes(`${red} + ${green} + ${blue}`)) flag1 = 1;
      } while (flag1);

      gameGrid[i].style.backgroundColor =
        'rgb(' + red + ',' + green + ',' + blue + ')';

      chosenColors.push(`${red} + ${green} + ${blue}`);
      filled.push(pos);
    }
  }
  gameGrid[24].style.backgroundColor = 'gray';
};

const innerGrid = document.querySelectorAll('.inner-grid');

const checkWin = () => {
  let winFlag = 0;
  for (let i = 0; i < randomGrid.length; i++)
    if (
      randomGrid[i].style.backgroundColor !== innerGrid[i].style.backgroundColor
    )
      winFlag = 1;
  return winFlag;
};

const findEmptyCell = grid => {
  for (let i = 0; i < grid.length; i++)
    if (grid[i].style.backgroundColor === 'gray') return i;
};

const setDroppable = () => {
  for (let i = 0; i < gameGrid.length; i++) {
    if (
      gameGrid[i].style.backgroundColor === '' ||
      gameGrid[i].style.backgroundColor === 'gray'
    ) {
      gameGrid[i].setAttribute('ondrop', 'drop_handler(event);');
      gameGrid[i].setAttribute('ondragover', 'dragover_handler(event);');
    }
  }
};

const setDraggable = () => {
  let top = 100,
    right = 100,
    bottom = 100,
    left = 100;

  if (
    emptyCellIndex === 6 ||
    emptyCellIndex === 7 ||
    emptyCellIndex === 8 ||
    emptyCellIndex === 11 ||
    emptyCellIndex === 12 ||
    emptyCellIndex === 13 ||
    emptyCellIndex === 16 ||
    emptyCellIndex === 17 ||
    emptyCellIndex === 18
  ) {
    top = emptyCellIndex - 5;
    right = emptyCellIndex + 1;
    bottom = emptyCellIndex + 5;
    left = emptyCellIndex - 1;
  } else if (
    emptyCellIndex === 5 ||
    emptyCellIndex === 10 ||
    emptyCellIndex === 15
  ) {
    top = emptyCellIndex - 5;
    right = emptyCellIndex + 1;
    bottom = emptyCellIndex + 5;
  } else if (
    emptyCellIndex === 9 ||
    emptyCellIndex === 14 ||
    emptyCellIndex === 19
  ) {
    top = emptyCellIndex - 5;
    bottom = emptyCellIndex + 5;
    left = emptyCellIndex - 1;
  } else if (
    emptyCellIndex === 1 ||
    emptyCellIndex === 2 ||
    emptyCellIndex === 3
  ) {
    right = emptyCellIndex + 1;
    bottom = emptyCellIndex + 5;
    left = emptyCellIndex - 1;
  } else if (
    emptyCellIndex === 21 ||
    emptyCellIndex === 22 ||
    emptyCellIndex === 23
  ) {
    top = emptyCellIndex - 5;
    right = emptyCellIndex + 1;
    left = emptyCellIndex - 1;
  } else if (emptyCellIndex === 0) {
    right = emptyCellIndex + 1;
    bottom = emptyCellIndex + 5;
  } else if (emptyCellIndex === 4) {
    bottom = emptyCellIndex + 5;
    left = emptyCellIndex - 1;
  } else if (emptyCellIndex === 20) {
    top = emptyCellIndex - 5;
    right = emptyCellIndex + 1;
  } else if (emptyCellIndex === 24) {
    top = emptyCellIndex - 5;
    left = emptyCellIndex - 1;
  }

  if (top != 100) {
    gameGrid[top].setAttribute('draggable', 'true');
    gameGrid[top].setAttribute('ondragstart', 'dragstart_handler(event)');
    gameGrid[top].setAttribute('ondragend', 'dragend_handler(event)');
  }

  if (right != 100) {
    gameGrid[right].setAttribute('draggable', 'true');
    gameGrid[right].setAttribute('ondragstart', 'dragstart_handler(event)');
    gameGrid[right].setAttribute('ondragend', 'dragend_handler(event)');
  }

  if (bottom != 100) {
    gameGrid[bottom].setAttribute('draggable', 'true');
    gameGrid[bottom].setAttribute('ondragstart', 'dragstart_handler(event)');
    gameGrid[bottom].setAttribute('ondragend', 'dragend_handler(event)');
  }

  if (left != 100) {
    gameGrid[left].setAttribute('draggable', 'true');
    gameGrid[left].setAttribute('ondragstart', 'dragstart_handler(event)');
    gameGrid[left].setAttribute('ondragend', 'dragend_handler(event)');
  }
};

const removeDroppable = () => {
  for (let i = 0; i < gameGrid.length; i++) {
    gameGrid[i].setAttribute('ondrop', '');
    gameGrid[i].setAttribute('ondragover', '');
    gameGrid[i].setAttribute('draggable', 'false');
    gameGrid[i].setAttribute('ondragstart', '');
    gameGrid[i].setAttribute('ondragend', '');
  }
};

const setUp = () => {
  setText();
  fillGrid();
  setDroppable();
  setDraggable();
  start = new Date().getTime();
};

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  document.querySelector('.win-moves').textContent = noOfMoves;
  document.querySelector('.time-taken').textContent = `${timeTaken} s`;
  document.querySelector('.your-score').textContent = score;
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const reset = () => {
  chosenColors = [`128 + 128 + 128`];
  filled = [];

  emptyCellIndex = 24;
  noOfMoves = 0;
  timeTaken = 0;
  score = 0;
  document.querySelector('body').style.backgroundColor = '#222';
};

const replay = document.querySelector('.replay');
replay.addEventListener('click', function () {
  closeModal();
  reset();
  setUp();
});

const dragstart_handler = ev => {
  ev.dataTransfer.dropEffect = 'move';
  dragObj = ev.target;
};

const dragover_handler = ev => {
  ev.preventDefault();
};

const drop_handler = ev => {
  ev.preventDefault();
  ev.target.style.backgroundColor = dragObj.style.backgroundColor;
  dragObj.style.backgroundColor = 'gray';
  noOfMoves++;
  document.querySelector('.moves').textContent = noOfMoves;
  const clickAudio = new Audio('../audio/drop-tile.mp3');
  clickAudio.play();
  removeDroppable();

  if (checkWin() === 0) {
    document.querySelector('body').style.backgroundColor = '#60b347';
    stop = new Date().getTime();
    timeTaken = (stop - start).toFixed(3) / 1000;
    score = (noOfMoves + timeTaken).toFixed(3);
    if (
      score < window.localStorage.getItem('easyHighScore') ||
      !window.localStorage.getItem('easyHighScore')
    ) {
      window.localStorage.setItem(
        'easyHighScoreUser',
        window.localStorage.getItem('user')
      );
      window.localStorage.setItem('easyHighScore', score);
    }
    openModal();
    const winAudio = new Audio('../audio/win.mp3');
    winAudio.play();
  } else {
    emptyCellIndex = findEmptyCell(gameGrid);
    setDroppable();
    setDraggable();
  }
};

const dragend_handler = ev => {
  ev.dataTransfer.clearData();
};
