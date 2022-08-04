'use strict';

document.querySelector('.check').addEventListener('click', function () {
  const userName = document.querySelector('.input-name').value;
  if (!userName) {
    alert('Enter your name!');
  } else {
    const modes = document.querySelectorAll('.game-modes');
    for (let i = 0; i < modes.length; i++)
      modes[i].style.visibility = 'visible';
    window.localStorage.setItem('user', userName);
  }
});
