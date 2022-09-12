'use strict'

const FOOD_IMG = `<div class="food">🍎</div>`
const POWER_IMG = `<div class="food">🍌</div>`

const EMPTY = ''

var biteSound = new Audio('./sound/bite.mp3')

var intervalId
var intervalId2
var gBoard

var gGame = {
  score: 0,
  isOn: false,
  speed: 150,
  foodPos: {
    i: 5,
    j: 10,
  },
}

function setSpeed(speed) {
  gGame.speed = speed
}

function init() {
  gGame.score = 0

  gBoard = buildBoard(16, 0)
  createSnake(gBoard)

  printMat(gBoard, '.board-container')
  intervalId = setInterval(() => {
    moveSnake()
  }, gGame.speed)
  intervalId2 = setInterval(() => {
    addPowerFood()
  }, 20000)
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
  board[gGame.foodPos.i][gGame.foodPos.j] = FOOD_IMG
  return board
}

function moveSnake() {
  if (!gDiraction) return

  var nextLocation = getNextLocation(gDiraction)

  if (
    nextLocation.i > gBoard.length - 1 ||
    nextLocation.j > gBoard[0].length - 1 ||
    nextLocation.i < 0 ||
    nextLocation.j < 0
  ) {
    nextCell = ''
    if (nextLocation.i > gBoard.length - 1) {
      // going down
      nextLocation.i = 0
    }
    if (nextLocation.j > 15) {
      // going right
      nextLocation.j = 0
    }
    if (nextLocation.i < 0) {
      //go up
      nextLocation.i = gBoard.length - 1
      // nextLocation.i = 15
    }
    if (nextLocation.j < 0) {
      // go left
      nextLocation.j = gBoard[0].length - 1
      // nextLocation.j = 15
    }
  }

  var nextCell = gBoard[nextLocation.i][nextLocation.j]

  if (nextCell === FOOD_IMG) {
    increaseSnake()
    biteSound.play()
    gGame.score = gGame.score + 10
    document.querySelector('.score').innerText = gGame.score
  }
  if (nextCell === POWER_IMG) {
    // increaseSnake()
    biteSound.play()
    gGame.score = gGame.score + 1
    document.querySelector('.score').innerText = gGame.score
  }

  if (nextCell === SNAKE) {
    gameOver()
    return
  }

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

function addFood() {
  var randEmptyCell = getRandEmptyLocation()

  gBoard[randEmptyCell.i][randEmptyCell.j] = FOOD_IMG
  // dom
  renderCell(randEmptyCell, FOOD_IMG)
}

function addPowerFood() {
  var randEmptyCell = getRandEmptyLocation()

  gBoard[randEmptyCell.i][randEmptyCell.j] = POWER_IMG
  // dom
  renderCell(randEmptyCell, POWER_IMG)
}

function getRandEmptyLocation() {
  var emptiesCells = []
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] === '') emptiesCells.push({ i, j })
    }
  }

  var randCellIdx = getRandomIntInclusive(0, emptiesCells.length)
  var randCell = emptiesCells[randCellIdx]
  return randCell
}

function gameOver() {
  gGame.isOn = false

  gDiraction = ''
  alert('Game over')
  clearInterval(intervalId)
  clearInterval(intervalId2)
  init()
}

function setDiraction(ev) {
  if (ev.code === 'ArrowUp' && gDiraction === 'ArrowDown') return
  if (ev.code === 'ArrowDown' && gDiraction === 'ArrowUp') return
  if (ev.code === 'ArrowLeft' && gDiraction === 'ArrowRight') return
  if (ev.code === 'ArrowRight' && gDiraction === 'ArrowLeft') return

  if (ev.code === 'Space') {
    gameOver()
    return
  }

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
