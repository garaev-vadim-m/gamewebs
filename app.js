let $start = document.querySelector('#start-game')
let $stop = document.querySelector('#stop-game')
let $game = document.querySelector('.content-header__game')
let $time = document.querySelector('#time-game')
let $result = document.querySelector('#result-game')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $gameTime = document.querySelector('#time-game-checked')

let score = 0
let isGameStarted = false

$start.addEventListener('click', startGame)
$stop.addEventListener('click', stopGame)
$game.addEventListener('click', handleBoxClick)

$gameTime.addEventListener('input', setGameTime)

function startGame() {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')

    isGameStarted = true
    $start.classList.add('display-none')
    $game.classList.add('background-white')

    let interval = setInterval(function () {
        let time = parseFloat($time.textContent)
        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)

    renderBox()
}

function setGameTime() {
    let time = +$gameTime.value
    $time.textContent = time.toFixed(1)
}

function setGameScore() {
    $result.textContent = score.toString()
}

function endGame() {
    isGameStarted = false
    setGameScore()
    stopGame()
}

function stopGame() {
    setGameScore()
    $gameTime.removeAttribute('disabled')
    $start.classList.remove('display-none')
    $game.classList.remove('background-white')
    $game.innerHTML = ''
    $timeHeader.classList.add('display-none')
    $resultHeader.classList.remove('display-none')
}

function handleBoxClick(event) {
    if(!isGameStarted) {
        return
    }
    if (event.target.dataset.box) {
        score++
        renderBox()
    }
}

function renderBox() {
    $game.innerHTML = ''
    let box = document.createElement('div')
    let boxSize = getRandom(30, 100)
    let roundSize = getRandom(5, 100)
    let gameSize = $game.getBoundingClientRect()
    let maxTop = gameSize.height - boxSize
    let maxLeft = gameSize.width - boxSize

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = '#000'
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.style.borderRadius = getRandom(0, roundSize) + 'px'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}