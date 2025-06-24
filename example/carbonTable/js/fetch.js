let selectBox = document.getElementById("year")
let tableBody = document.getElementById("tableBody")
let url = "https://raw.githubusercontent.com/webtec-2024/teacher/refs/heads/main/kmom05/data/"


for (let i = 1900; i < 2020; i++) {
  let opt = document.createElement("option")
  opt.value = i
  opt.innerHTML = i
  selectBox.appendChild(opt)
}

selectBox.addEventListener("change", fetchData)

function addToTable(country, data) {
  tableBody.innerHTML += `
      <tr>
        <td>${country}</td>
        <td class="checkThese">${data.co2}</td>
        <td>${data.co2_per_capita}</td>
        <td>${data.oil_co2}</td>
      </tr>`
  
}

function setWinner(co2s) {
  co2s.sort(function(a, b) {
    return a - b;
  })
  
  let checkThese = document.getElementsByClassName("checkThese")

  for (let i = 0; i < checkThese.length; i++) {
    if (parseFloat(checkThese[i].innerHTML) === co2s[0]) {
      checkThese[i].classList.add("winner")
    }
  }
}

async function fetchData() {
  let co2s = []
  
  tableBody.innerHTML = "<h1>Loading...</h1>"
  
  let sweden = await (await fetch(url+"sweden.json")).json()
  let norway = await (await fetch(url+"norway.json")).json()
  let denmark = await (await fetch(url+"denmark.json")).json()
  
  tableBody.innerHTML = ""

  for (let i = 0; i < 120; i++) {
    if (sweden.data[i].year === parseInt(selectBox.value)) {
      addToTable("Sweden", sweden.data[i])
      co2s.push(sweden.data[i].co2)
    }
    if (norway.data[i].year === parseInt(selectBox.value)) {
      addToTable("Norway", norway.data[i])
      co2s.push(norway.data[i].co2)
    }
    if (denmark.data[i].year === parseInt(selectBox.value)) {
      addToTable("Denmark", denmark.data[i])
      co2s.push(denmark.data[i].co2)
    }
  }
  setWinner(co2s)
}
