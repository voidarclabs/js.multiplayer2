const socket = io()

document.body.style.overflow = "hidden"

socket.on("worldSize", (data) => {
  let map = document.getElementById("map").style

  console.log(data.x, data.y)

  map.display = "grid"
  map.gridRow = data.x
  map.gridColumn = data.y

  map.gridTemplateRows = `repeat(${data.x}, 50px)`
  map.gridTemplateColumns = `repeat(${data.y}, 50px)`

})
