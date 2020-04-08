const parser = (html) => {
  if (html === '') return { ok: false, message: 'Ничего не введено' }

  let bem = []
  let notbem = []

  const parser = html.match(/class=".*?"/g)
  if (parser === null) return { ok: false, message: 'Пока нет классов' }
  const structure = parser.map(el => {
    const rg = /class="|"/g
    if (el.includes(' ')) return el.replace(rg, '').split(' ')
    return el.replace(rg, '')
  }).flat()
  const classes = new Set(structure)

  // Блоки
  classes.forEach(el => {
    const rgBlock = /__|_/
    if (!rgBlock.test(el)) bem.push({ block: el, elems: [], mods: [] })
  })

  // Модификаторы блоков
  classes.forEach(el => {
    const rgBlockMod = /-[a-z]+_{1}[a-z]|^[a-z]+_{1}[a-z]/
    if (rgBlockMod.test(el)) {
      const blockName = el.replace(/_.+/, '')
      const block = bem.find(el => el.block === blockName)
      if (!block) {
        notbem.push(el)
        return
      }
      block.mods.push(el)
    }
  })

  // Элементы
  classes.forEach(el => {
    const rgElem = /__[a-z-]+$/
    if (rgElem.test(el)) {
      const blockName = el.replace(/__.+/, '')
      const block = bem.find(el => el.block === blockName)
      if (!block) {
        notbem.push(el)
        return
      }
      block.elems.push({ elem: el, mods: [] })
    } 
  })

  // Модификаторы элементов
  classes.forEach(el => {
    const rgElemMod = /__[a-z]+_/
    if (rgElemMod.test(el)) {
      const blockName = el.replace(/_.+/, '')
      const elemName = el.replace(/_[a-z]+$|_[a-z]+_[a-z]+$/, '')
      const block = bem.find(el => el.block === blockName)
      if (!block) {
        notbem.push(el)
        return
      }
      const elem = block.elems.find(el => el.elem === elemName)
      if (!elem) {
        notbem.push(el)
        return
      }
      elem.mods.push(el)
    }
  })

  return { ok: true, message: 'Результат', bem, notbem }
}

export {
  parser
}
