let watermark = {}

let setWatermark = (idNum, str, leftNum) => {
  let id = idNum

  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }

  let can = document.createElement('canvas')
  const len = str.length
  can.width = 140*len/6
  can.height = 130

  let cans = can.getContext('2d')
  cans.rotate(-20 * Math.PI / 180)
  cans.font = '20px Vedana'
  cans.fillStyle = 'rgba(255, 255, 255, 0.20)'
  cans.textAlign = 'left'
  cans.textBaseline = 'Middle'
  cans.fillText(str, can.width / 20, can.height )

  let div = document.createElement('div')
  div.id = id
  div.style.pointerEvents = 'none'
  div.style.top = '-20px'
  div.style.left = leftNum + 'px'
  div.style.position = 'fixed'
  div.style.zIndex = '100000'
  div.style.width = document.documentElement.clientWidth  + 'px'
  div.style.height = document.documentElement.clientHeight  + 'px'
  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
  document.body.appendChild(div)
  return id
}

// 该方法只允许调用一次
watermark.set = (idNum, str, leftNum) => {
  let id = setWatermark(idNum, str, leftNum)
  setInterval(() => {
    if (document.getElementById(id) === null) {
      id = setWatermark(idNum, str, leftNum)
    }
  }, 2000)
  window.onresize = () => {
    setWatermark(idNum, str, leftNum)
  }
}

export default watermark
