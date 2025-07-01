let box = document.getElementById("box")
let selected = document.getElementsByClassName("selected")
let colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]

/**
 * Centers the box on page.
 */
function centerBox() {
  box.style.left = (window.innerWidth / 2) - (box.clientWidth / 2) + "px"
  box.style.top = (window.innerHeight / 2) - (box.clientHeight / 2) + "px"
}


/**
 * Toggles the classname selected.
 * @param {Event} event The mouse event.
 */
function toggleSelected(event) {
  event.target.classList.toggle("selected")
}


/**
 * Animates the element on doubleclick.
 * @param {Event} event The mouse event.
 */
function doubleClick(event) {
  event.target.classList.add("animateSize")
  event.target.style.width = "2px"
  event.target.style.height = "2px"

  setTimeout(function() {
    event.target.remove()
  }, 2000)
}



/**
 * Toggles the classname circle on selected elements.
 */
function toggleCircle() {
  for (const item of selected) {
    item.classList.toggle("circle")
  }
}



/**
 * Changes color on selected elements.
 */
function changeColor() {
  for (const item of selected) {
    if (item.classList.contains("red")) {
      item.classList.remove("red")
      item.classList.add("orange")
    } else if (item.classList.contains("orange")) {
      item.classList.remove("orange")
      item.classList.add("yellow")
    } else if (item.classList.contains("yellow")) {
      item.classList.remove("yellow")
      item.classList.add("green")
    } else if (item.classList.contains("green")) {
      item.classList.remove("green")
      item.classList.add("blue")
    } else if (item.classList.contains("blue")) {
      item.classList.remove("blue")
      item.classList.add("indigo")
    } else if (item.classList.contains("indigo")) {
      item.classList.remove("indigo")
      item.classList.add("violet")
    } else if (item.classList.contains("violet")) {
      item.classList.remove("violet")
      item.classList.add("red")
    } 
  }
}


/**
 * Selects all elements.
 */
function selectAll() {
  let all = document.querySelectorAll(".box")

  for (const box of all) {
    box.classList.add("selected")
  }
}



/**
 * Deselects all elements.
 */
function deselectAll() {
  let all = document.querySelectorAll(".selected")

  for (const box of all) {
    box.classList.remove("selected")
  }
}


/**
 * Removes all selected elements.
 */
function removeAllSelected() {
  let all = document.querySelectorAll(".selected")

  for (const box of all) {
    box.remove()
  }
}


/**
 * Creates a random element.
 */
function createRandom() {
  let circleOrNot = Math.floor(Math.random() * 2)

  let newEl = document.createElement("div")
  newEl.classList.add("box")
  newEl.classList.add(colors[Math.floor(Math.random() * colors.length-1)])
 
  if (circleOrNot) {
    newEl.classList.add("circle")
  }
  
  
  newEl.addEventListener("click", toggleSelected)
  newEl.addEventListener("dblclick", doubleClick)
  
  document.body.appendChild(newEl)

  let newTop = Math.floor(Math.random() * (window.innerHeight - newEl.clientHeight))
  let newLeft = Math.floor(Math.random() * (window.innerWidth - newEl.clientWidth))
  
  newEl.style.top = newTop + "px"
  newEl.style.left = newLeft + "px"
}


/**
 * Moves the selected elements.
 * @param {number} y The step on y axis.
 * @param {number} x The step on x axis.
 */
function move(y, x) {
  let all = document.getElementsByClassName("selected")

  for (const box of all) {
    let newY = parseFloat(box.style.top) + y
    let newX = parseFloat(box.style.left) + x

    if ((newY+box.clientHeight) <= window.innerHeight && newY >= 0) {
      box.style.top = newY + "px"
    }
    if ((newX+box.clientWidth) <= window.innerWidth && newX >= 0) {
      box.style.left = newX + "px"
    }
  }
}


/**
 * Handles the keydown event.
 * @param {Event} event Keyboard event 
 */
function keyboardPress(event) {
  let key = event.key
  let step = 10

  switch (key) {
    case "e":
      toggleCircle()
      break
    case "r":
      changeColor()
      break
    case "i":
      selectAll()
      break
    case "u":
      deselectAll()
      break
    case "y":
      removeAllSelected()
      break
    case "p":
      createRandom()
      break
    case "ArrowUp":   
      move(-step, 0)
      break
    case "ArrowDown":   
      move(step, 0)
      break
    case "ArrowLeft":   
      move(0, -step)
      break
    case "ArrowRight":   
      move(0, step)
      break
  }
}

centerBox()

window.addEventListener("resize", centerBox)
box.addEventListener("click", toggleSelected)
box.addEventListener("dblclick", doubleClick)

document.addEventListener("keydown", keyboardPress)