let $start = document.querySelector('#start-game')
let $stop = document.querySelector('#stop-game')
let $game = document.querySelector('.content-header__game')

let score = 0

$start.addEventListener('click', startGame)
$stop.addEventListener('click', stopGame)
$game.addEventListener('click', handleBoxClick)

function startGame() {
    $start.classList.add('display-none')
    $game.classList.add('background-white')
    renderBox()

}

function stopGame() {
    $start.classList.remove('display-none')
    $game.classList.remove('background-white')
}

function handleBoxClick(event) {
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
    box.style.top =  getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.style.borderRadius = getRandom(0, roundSize) + 'px'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}