'use strict'

const FOOD_IMG = `<div class="food">🍎</div>`
const SNAKE = `<div class="snake"></div>`
const EMPTY = ''

var gBoard

var gGame = {
  score: 0,
  amountOffood: -1,
  isOn: false,
  speed: 150,
}

function init() {
  gGame.score = 0

  gBoard = buildBoard(15, 0)
  createSnake(gBoard)

  printMat(gBoard, '.board-container')
  var intervalId = setInterval(() => {
    moveSnake()
  }, gGame.speed)
  gGame.isOn = true
}

function buildBoard(size, addWidth = 4) {
  var board = []
  for (var i = 0; i < size; i++) {
    board.push([])
    for (var j = 0; j < size + addWidth; j++) {
      board[i][j] = ''
    }
  }

  return board
}

function moveSnake() {
  if (!gDiraction) return

  var nextLocation = getNextLocation(gDiraction)

  // moving from corrent position:
  // update the model
  gBoard[gSnake.location[gSnake.location.length - 1].i][
    gSnake.location[gSnake.location.length - 1].j
  ] = EMPTY
  // update the DOM

  renderCell(gSnake.location[gSnake.location.length - 1], EMPTY)

  gSnake.location.unshift({
    i: nextLocation.i,
    j: nextLocation.j,
  })

  gSnake.location.pop()

  gBoard[gSnake.location[0].i][gSnake.location[0].j] = SNAKE
  // update the DOM
  renderCell(gSnake.location[0], SNAKE)
}

function setDiraction(ev) {
  if (ev.code === 'ArrowUp' && gDiraction === 'ArrowDown') return
  if (ev.code === 'ArrowDown' && gDiraction === 'ArrowUp') return
  if (ev.code === 'ArrowLeft' && gDiraction === 'ArrowRight') return
  if (ev.code === 'ArrowRight' && gDiraction === 'ArrowLeft') return
  switch (ev.code) {
    case 'ArrowUp':
      gDiraction = 'ArrowUp'
      break
    case 'ArrowDown':
      gDiraction = 'ArrowDown'
      break
    case 'ArrowLeft':
      gDiraction = 'ArrowLeft'
      break
    case 'ArrowRight':
      gDiraction = 'ArrowRight'
      break
    default:
      return null
  }
}
