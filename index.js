window.addEventListener('load', () => {
  let boardX = ['', '', '', '', '', '', '', '', ''];
  let boardO = ['', '', '', '', '', '', '', '', ''];
  const announcer = document.querySelector('.announcer');
  const turn = document.querySelector('.display-player');
  const container = document.querySelector('.container');
  const reset = document.querySelector('#reset');
  const icons = document.querySelectorAll('.avatar-icon');
  const avatar_container = document.querySelectorAll('.avatar-container');
  let j = 0;
  let winX = false;
  let winO = false;
  let correctCombinations = [];
  correctCombinations.push([0, 1, 2]);
  correctCombinations.push([3, 4, 5]);
  correctCombinations.push([6, 7, 8]);
  correctCombinations.push([0, 3, 6]);
  correctCombinations.push([1, 4, 7]);
  correctCombinations.push([2, 5, 8]);
  correctCombinations.push([0, 4, 8]);
  correctCombinations.push([2, 4, 6]);
  function chooseWinner(board, index, value) {
    board[index] = value;
    let choosen = false;
    for (let i = 0; i < 8; i++) {
      const combination = correctCombinations[i];
      const first = board[combination[0]];
      const second = board[combination[1]];
      const third = board[combination[2]];
      if (first !== '' && second !== '' && third !== '') {
        choosen = true;
        break;
      }
    }
    return choosen;
  }
  for (let i = 0; i < 9; i++) {
    const param = document.createElement('div');
    param.setAttribute('class', 'tile');
    container.appendChild(param);
  }
  const OX = document.querySelectorAll('.tile');
  for (let i = 0; i < 9; i++) {
    OX[i].addEventListener('click', () => {
      if (announcer.innerHTML === '') {
        if (OX[i].innerHTML === '') {
          if (j % 2 === 0) {
            OX[i].classList.add('playerX');
            OX[i].innerHTML = 'X';
            boardX[i] = 'X';
            winX = chooseWinner(boardX, i, 'X');
            turn.innerHTML = 'O';
            turn.classList.remove('playerX');
            turn.classList.add('playerO');
          } else {
            OX[i].classList.add('playerO');
            OX[i].innerHTML = 'O';
            boardO[i] = 'O';
            winO = chooseWinner(boardO, i, 'O');
            turn.innerHTML = 'X';
            turn.classList.remove('playerO');
            turn.classList.add('playerX');
          }
          j++;
          if (winX) {
            announcer.innerHTML = `Player <span class="playerX">X</span> Won`;
            announcer.classList.remove('hide');
          } else if (winO) {
            announcer.innerHTML = `Player <span class="playerO">O</span> Won`;
            announcer.classList.remove('hide');
          } else if (j === 9 && !winX && !winO) {
            announcer.innerHTML = 'TIE';
            announcer.classList.remove('hide');
          }
        }
      }
    });
  }
  avatar_container.forEach((container) => {
    let n = 0;
    icons.forEach((icon) => {
      icon.addEventListener('dragstart', () => {
        n = icon.getAttribute('data-item');
      });
    });
    container.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    container.addEventListener('drop', () => {
      if (container.innerHTML === '') {
        container.append(icons[n - 1]);
      }
    });
  });
  let l = 0;
  window.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') {
      if (l === 0) {
        l++;
        OX[l].classList.add('active');
        OX[l - 1].classList.remove('active');
      } else if (l > 0 && l < 8) {
        l++;
        OX[l].classList.add('active');
        OX[l - 1].classList.remove('active');
      } else {
        OX[l].classList.add('active');
        OX[l - 1].classList.remove('active');
      }
    }
    if (e.code === 'ArrowLeft') {
      console.log(l);
      if (l === 8) {
        l--;
        OX[l].classList.add('active');
        OX[l + 1].classList.remove('active');
      } else if (l > 0 && l < 8) {
        l--;
        OX[l].classList.add('active');
        OX[l + 1].classList.remove('active');
      } else if (l === 0) {
        OX[l].classList.add('active');
        OX[l + 1].classList.remove('active');
      }
    }
  });
  let m = 0;
  window.addEventListener('keydown', (e) => {
    for (let i = 0; i < 9; i++) {
      if (OX[i].classList.contains('active')) {
        if (e.code === 'Enter') {
          console.log(e.code);
          if (announcer.innerHTML === '') {
            if (OX[i].innerHTML === '') {
              if (m % 2 === 0) {
                OX[i].classList.add('playerX');
                OX[i].innerHTML = 'X';
                boardX[i] = 'X';
                winX = chooseWinner(boardX, i, 'X');
                turn.innerHTML = 'O';
                turn.classList.remove('playerX');
                turn.classList.add('playerO');
              } else {
                OX[i].classList.add('playerO');
                OX[i].innerHTML = 'O';
                boardO[i] = 'O';
                winO = chooseWinner(boardO, i, 'O');
                turn.innerHTML = 'X';
                turn.classList.remove('playerO');
                turn.classList.add('playerX');
              }
              m++;
              if (winX) {
                announcer.innerHTML = `Player <span class="playerX">X</span> Won`;
                announcer.classList.remove('hide');
              } else if (winO) {
                announcer.innerHTML = `Player <span class="playerO">O</span> Won`;
                announcer.classList.remove('hide');
              } else if (m === 9 && !winX && !winO) {
                announcer.innerHTML = 'TIE';
                announcer.classList.remove('hide');
              }
            }
          }
        }
      }
    }
  });
  reset.addEventListener('click', () => {
    for (let i = 0; i < 9; i++) {
      OX[i].innerHTML = '';
      OX[i].classList.remove('playerX');
      OX[i].classList.remove('playerO');
      OX[i].classList.remove('active');
    }
    j = 0;
    m = 0;
    l = 0;
    boardX = ['', '', '', '', '', '', '', '', ''];
    boardO = ['', '', '', '', '', '', '', '', ''];
    announcer.innerHTML = '';
    announcer.classList.add('hide');
    winX = false;
    winO = false;
    turn.innerHTML = 'X';
    turn.classList.remove('playerO');
    turn.classList.add('playerX');
  });
});
