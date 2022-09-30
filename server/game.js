const { GRID_SIZE } = require('./constants');

module.exports = {
  initGame,
  gameLoop,
  getUpdatedVelocity,
}

function initGame() {
  const state = createGameState()
  return state;
}

function createGameState() {
  return {
    players: [{
      pos: {
        x: 33,
        y: 48,
      },
      vel: {
        x: 0,
        y: -1,
      },
      snake: [
        {x: 33, y: 48},
        {x: 33, y: 49},
        {x: 33, y: 50},
      ],
    }, {
      pos: {
        x: 66,
        y: 50,
      },
      vel: {
        x: 0,
        y: 1,
      },
      snake: [
        {x: 66, y: 50},
        {x: 66, y: 49},
        {x: 66, y: 48},
      ],
    }],
    gridsize: GRID_SIZE,
  };
}

function gameLoop(state) {
  if (!state) {
    return;
  }

  const playerOne = state.players[0];
  const playerTwo = state.players[1];

  playerOne.pos.x += playerOne.vel.x;
  playerOne.pos.y += playerOne.vel.y;

  playerTwo.pos.x += playerTwo.vel.x;
  playerTwo.pos.y += playerTwo.vel.y;

  // playerOne.snake.push({ ...playerOne.pos });
  // playerOne.pos.x += playerOne.vel.x;
  // playerOne.pos.y += playerOne.vel.y;

  // playerTwo.snake.push({ ...playerTwo.pos });
  // playerTwo.pos.x += playerTwo.vel.x;
  // playerTwo.pos.y += playerTwo.vel.y;

  if (playerOne.pos.x < 0 || playerOne.pos.x > GRID_SIZE || playerOne.pos.y < 0 || playerOne.pos.y > GRID_SIZE) {
    return 2;
  }

  if (playerTwo.pos.x < 0 || playerTwo.pos.x > GRID_SIZE || playerTwo.pos.y < 0 || playerTwo.pos.y > GRID_SIZE) {
    return 1;
  }

  if (playerOne.vel.x || playerOne.vel.y) {
    for (let cell of playerOne.snake) {
      if (cell.x === playerOne.pos.x && cell.y === playerOne.pos.y) {
        return 2;
      }
    }

    for (let cell of playerOne.snake) {
      if (cell.x === playerTwo.pos.x && cell.y === playerTwo.pos.y) {
        return 1;
      }
    }

    playerOne.snake.push({ ...playerOne.pos });
  }

  if (playerTwo.vel.x || playerTwo.vel.y) {
    for (let cell of playerTwo.snake) {
      if (cell.x === playerTwo.pos.x && cell.y === playerTwo.pos.y) {
        return 1;
      }
    }

    for (let cell of playerTwo.snake) {
      if (cell.x === playerOne.pos.x && cell.y === playerOne.pos.y) {
        return 2;
      }
    }

    playerTwo.snake.push({ ...playerTwo.pos });
  }

  return false;
}

function getUpdatedVelocity(keyCode) {
  switch (keyCode) {
    case 37: { // left
      return { x: -1, y: 0 };
    }
    case 38: { // down
      return { x: 0, y: -1 };
    }
    case 39: { // right
      return { x: 1, y: 0 };
    }
    case 40: { // up
      return { x: 0, y: 1 };
    }
  }
}
