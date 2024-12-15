const socket = io()

document.body.style.overflow = "hidden"

socket.on("worldSize", (data, callback) => {
  makeWorldGrid(data)
  callback()
})

socket.on("worldInfo", (data) => {
  let blocks = data.blocks
  let players = data.players

  placeBlocks(blocks, (callback) => {
    placePlayers(players)
  })
})

// ----

function makeWorldGrid(data) {
  let map = document.getElementById("map").style

  console.log(data.x, data.y)

  map.display = "grid"
  map.gridRow = data.x
  map.gridColumn = data.y

  map.gridTemplateRows = `repeat(${data.x}, 50px)`
  map.gridTemplateColumns = `repeat(${data.y}, 50px)`


}

function placeBlocks(blockArray, callback) {
  for (let i = 0; i < blockArray.length; i++) {
    let block = blockarray[i]

    let newBlock = document.createElement(`block${i}`)
    newBlock.id =
  }
}
