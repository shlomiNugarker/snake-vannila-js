'use strict'

const SNAKE = `<div class="snake"></div>`
var HEAD = `<div class="snake head"></div>`

var gSnake

var gDiraction = ''

function createSnake(board) {
  gSnake = {
    location: [{ i: 7, j: 10 }],
  }

  gSnake.location.forEach((pos, idx) => {
    board[pos.i][pos.j] = SNAKE
  })
}

function increaseSnake() {
  gSnake.location.unshift(gSnake.location[gSnake.location.length - 1])

  addFood()
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
