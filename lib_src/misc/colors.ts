// TODO make sure rgb2hex returns string

export function getColors(selectors: { [P: string]: string }) {
  // const grammar = atom.grammars.grammarForScopeName("source.julia")
  const styled: { [P: string]: HTMLSpanElement } = {}
  const color: { [P: string]: string } = {}

  const div = document.createElement("div")
  div.classList.add("editor", "editor-colors", "julia-syntax-color-selector")

  for (const style in selectors) {
    const child = document.createElement("span")
    child.innerText = "foo"
    child.classList.add(...selectors[style])
    div.appendChild(child)
    styled[style] = child
  }

  document.body.appendChild(div)
  // wait till rendered?
  for (const style in selectors) {
    // TODO do we need try catch
    try {
      color[style] = rgb2hex(window.getComputedStyle(styled[style]).color)
    } catch (e) {
      console.error(e)
    }
  }
  color.background = rgb2hex(window.getComputedStyle(div).backgroundColor)
  document.body.removeChild(div)

  return color
}

function rgb2hex(rgb: string) {
  if (rgb.search("rgb") === -1) {
    return rgb
  } else {
    const rgb_match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/)

    if (rgb_match) {
    return hex(rgb_match[1]) + hex(rgb_match[2]) + hex(rgb_match[3])
    } else {
      console.warn(rgb.concat("rgb_match is undefined!"))
      return undefined
    }
  }
}

function hex(x: string) {
  return ("0" + parseInt(x, 10).toString(16)).slice(-2)
}