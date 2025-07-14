// const lightPalletes = [["#F8FFE5", "#06D6A0"], ["#FCF7F8", "#A31621"], ["#EAECC6", "#2BC0E4"]]
// const darkPalletes = [["#F87060", "#102542"], ["#928DAB", "#1F1C2C"], ["rgb(25, 25, 25)", "whitesmoke"]]

const lightPalletes = [
  ["#F8FFE5", "#06D6A0"],      // mint on ivory
  ["#FCF7F8", "#A31621"],      // soft pink & crimson
  ["#EAECC6", "#2BC0E4"],      // pale yellow & blue
  ["#FFFBE6", "#FF6B6B"],      // cream & coral
  ["#F0F4EF", "#0E79B2"],      // light gray & strong blue
  ["#F7F9FC", "#3D5A80"],      // icy white & steel blue
  ["#FFF5F3", "#FF7E67"]       // very light rose & salmon
]

const darkPalletes = [
  ["#F87060", "#102542"],      // orange & navy
  ["#928DAB", "#1F1C2C"],      // lavender & dark violet
  ["rgb(25, 25, 25)", "whitesmoke"], // minimal black & white
  ["#2D2D2D", "#E94560"],      // dark gray & neon red
  ["#1E1E24", "#FFBD39"],      // near black & amber
  ["#121212", "#BB86FC"],      // material dark & violet
  ["#1B262C", "#0F4C75"],      // deep blue tones
]

let currentTheme = "dark"

function switchTheme() {
  currentTheme == "dark" ? currentTheme = "light" : currentTheme = "dark"

  const themeBtn = document.getElementById('theme_btn')
  currentTheme == "dark" ? themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i></button>' : themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i></button>'
  
  updatePalette()
}

let defaultWidth
function updatePalette() {
  const palette = document.getElementById('themePallete')

  const currentArray = currentTheme == "dark" ? darkPalletes : lightPalletes

  const itemCount = currentArray.length || 0
  const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize)
  const itemWidth = 2 * remToPx
  const gap = 10
  const padding = 5
  defaultWidth = 2.5 * remToPx

  const finalWidth = (itemCount * itemWidth) + ((itemCount - 1) * gap) + (4 * padding)

  palette.style.width = `${finalWidth}px`
  palette.innerHTML = ""

  for (let color of currentArray) {
    let newColor = document.createElement("div")
    newColor.setAttribute("class", "themeColor")
    newColor.onclick = () => setColor(color)
    newColor.style.backgroundImage = `linear-gradient(45deg, ${color[0]}, ${color[1]})`
    palette.appendChild(newColor)
  }
}

document.getElementById('theme').addEventListener('mouseover', function () {
  const currentWidth = parseFloat(document.getElementById('themePallete').style.width)
  if (currentWidth > defaultWidth) return // Only update if open
  updatePalette()
})
document.getElementById('theme').addEventListener('mouseleave', function () {
  document.getElementById('themePallete').style.width = defaultWidth + "px"
  document.getElementById('themePallete').innerHTML = ""
})

function setColor(colors) {
  console.log(colors, colors[0], colors[1])
  if (document.documentElement.style.getPropertyValue('--primary-color') == colors[0] && document.documentElement.style.getPropertyValue('--secundary-color') == colors[1]) {
    document.documentElement.style.setProperty('--secundary-color', colors[0].toString())
    document.documentElement.style.setProperty('--primary-color', colors[1].toString())
  } else {
    document.documentElement.style.setProperty('--primary-color', colors[0].toString())
    document.documentElement.style.setProperty('--secundary-color', colors[1].toString())
  }

}

/*
Themes:

- Main button: Show primary and secundary color on button and theme icon (light: sun, dark: moon)
  When clicked, switch between themes (light and dark)
- Theme Pallete: Shows when hovering the main button, only shows color palletes from the current theme (light, dark)
*/