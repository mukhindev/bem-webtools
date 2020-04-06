const parser = (html) => {
  let json = []

  const parser = html.match(/class=".*?"/g)
  const structure = parser.map(el => {
    const rg = /class="|"/g
    if (el.includes(' ')) return el.replace(rg, '').split(' ')
    return el.replace(rg, '')
  }).flat()
  const classes = new Set(structure)

  // Блоки
  classes.forEach(el => {
    const rgBlock = /__|_/
    if (!rgBlock.test(el)) json.push({ block: el, elems: [], mods: [] })
  })

  // Модификаторы блоков
  classes.forEach(el => {
    const rgBlockMod = /-[a-z]+_{1}[a-z]|^[a-z]+_{1}[a-z]/
    if (rgBlockMod.test(el)) {
      const blockName = el.replace(/_.+/, '')
      const block = json.find(el => el.block === blockName)
      block.mods.push(el)
    }
  })

  // Элементы
  classes.forEach(el => {
    const rgElem = /__[a-z-]+$/
    if (rgElem.test(el)) {
      const blockName = el.replace(/__.+/, '')
      const block = json.find(el => el.block === blockName)
      block.elems.push({ elem: el, mods: [] })
    } 
  })

  // Модификаторы элементов
  classes.forEach(el => {
    const rgElemMod = /__[a-z]+_/
    if (rgElemMod.test(el)) {
      const blockName = el.replace(/_.+/, '')
      const elemName = el.replace(/_[a-z]+$|_[a-z]+_[a-z]+$/, '')
      const block = json.find(el => el.block === blockName)
      const elem = block.elems.find(el => el.elem === elemName)
      elem.mods.push(el)
    }
  })

  return JSON.stringify(json, null, 2)
}

export default{
  parser
}