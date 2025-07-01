let setupBtn = document.getElementById("setupBtn")

let maxHeight = window.innerHeight
let maxWidth = window.innerWidth
let backgroundImage = null
let gameObj = {
  score: 0,
  duck: {
    size: {
      h: "100px",
      w: "100px"
    },
    element: document.createElement("img")
  },
  getNewPos: function() {
    let newX = Math.floor(Math.random() * (maxWidth - parseInt(this.duck.size.w)))
    let newY = Math.floor(Math.random() * (maxHeight - parseInt(this.duck.size.h)))
    
    return {x: newX, y: newY}
  },
  start: async function() {
    
    this.gameInterval = setInterval(async function() {
      await gameTick()
    }, this.speed * 1000)
    setTimeout(function() {
      clearInterval(gameObj.gameInterval)
      gameObj.duck.element.removeEventListener("click", handleClick)
      gameObj.duck.element.remove()

      let presentScore = document.createElement("div")
      presentScore.className = "info"
      presentScore.innerHTML = "<h2>You got " + gameObj.score + " points! </h2><br />"
      let btn = document.createElement("button")
      btn.innerHTML = "Reset game"
      btn.onclick = resetGame

      presentScore.appendChild(btn)

      gameObj.area.appendChild(presentScore)
    }, this.duration * 1000)
  }
}


/**
 * Resets the game.
 */
function resetGame() {
  window.location.reload()
}


/**
 * Updates the score.
 */
async function handleClick() {
  gameObj.score++
  console.log(`Point!, Total: ${gameObj.score}`)
}


/**
 * Updates the position each game tick.
 */
async function gameTick() {
  let pos = gameObj.getNewPos()
  
  gameObj.duck.element.style.position = "absolute"
  gameObj.duck.element.style.top = pos.y + "px"
  gameObj.duck.element.style.left = pos.x + "px"
  
  gameObj.area.appendChild(gameObj.duck.element)
}


/**
 * Fetches the chosen background.
 * @param {number} bg The chosen background. 
 */
async function getBackground(bg) {
  document.body.innerHTML = "<h1>Please wait...</h1>"
  
  let temp = await fetch(`https://raw.githubusercontent.com/webtec-2024/teacher/refs/heads/main/kmom06/backgrounds/${bg}.jpg`)
  let blob = await temp.blob()
  backgroundImage = URL.createObjectURL(blob)

  document.body.style.backgroundImage = `url(${backgroundImage})`
  document.body.classList.add("background")

  document.body.innerHTML = ""
}


/**
 * Fetches the duck image and sets url and size.
 * Also adds the eventlistener.
 */
async function getDuck() {
  let temp = await fetch(`https://raw.githubusercontent.com/webtec-2024/teacher/refs/heads/main/kmom06/duck/duck.png`)
  let blob = await temp.blob()

  gameObj.duck.element.src = URL.createObjectURL(blob)
  gameObj.duck.element.style.height = gameObj.duck.size.h
  gameObj.duck.element.style.width = gameObj.duck.size.w

  gameObj.duck.element.addEventListener("click", handleClick)
}


/**
 * Handles the game setup.
 */
async function setupGame() {
  gameObj.area = document.body
  gameObj.speed = parseInt(document.getElementById("speed").value)
  gameObj.duration = parseInt(document.getElementById("duration").value)
  gameObj.background = await getBackground(parseInt(document.getElementById("bg").value))

  await getDuck()

  let counter = 3
  let initTimer = setInterval(function() {
      gameObj.area.innerHTML = `<div class="info"><h1>Starting in ${counter}...</h1></div>`
      counter--
      if (counter === -1) {
        clearInterval(initTimer)
        gameObj.area.innerHTML = ""
        gameObj.start()
      }
    }, 1000)
}


setupBtn.addEventListener("click", setupGame)
