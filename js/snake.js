'use strict'

var SNAKE_IMG = `<div class="snake"></div>`

var gSnake = { location: { i: 7, j: 10 } }

var gDiraction = ''

function createSnake(board) {
  gSnake = {
    // location: {
    //   i: 7,
    //   j: 10,
    // },
    location: [
      { i: 7, j: 10 },
      { i: 8, j: 10 },
      { i: 9, j: 10 },
      { i: 10, j: 10 },
      { i: 11, j: 10 },
      { i: 12, j: 10 },
    ],
  }
  //   board[Snake.location.i][gSnake.location.j] = SNAKE_IMG

  gSnake.location.forEach((pos) => {
    board[pos.i][pos.j] = SNAKE_IMG
  })
}

function getNextLocation(dir) {
  var nextLocation = {
    i: gSnake.location[0].i,
    j: gSnake.location[0].j,
  }

  switch (dir) {
    case 'ArrowUp':
      nextLocation.i--
      dir = 'ArrowUp'
      break
    case 'ArrowDown':
      nextLocation.i++
      dir = 'ArrowDown'
      break
    case 'ArrowLeft':
      nextLocation.j--
      dir = 'ArrowLeft'
      break
    case 'ArrowRight':
      nextLocation.j++
      dir = 'ArrowRight'
      break
    default:
      return null
  }
  return nextLocation
}
