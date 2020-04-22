const parser = (html) => {
  if (html === '') return {
    ok: false, 
    errors: [{ class: null, message: 'Нет кода' }],
    bem: null
  }

  let bem = { blocks: [] }
  let errors = []

  const parser = html.match(/class=".*?"/g)
  if (parser === null) return {
    ok: false, 
    errors: [{ class: null, message: 'Не найдено классов' }],
    bem: null
  }
  const structure = parser.map(el => {
    const rg = /class="|"/g
    if (el.includes(' ')) return el.replace(rg, '').split(' ')
    return el.replace(rg, '')
  }).flat()
  const classes = new Set(structure)

  // БЛОКИ
  classes.forEach(el => {
    const rgBlock = /__|_/
    if (!rgBlock.test(el)) bem.blocks.push({
      class: el,
      folder: el,
      file: `${el}.css`,
      elements: [],
      mods: [],
      imports: [],
      folders: []
    })
  })

  // МОДИФИКАТОРЫ БЛОКОВ
  classes.forEach(el => {
    const rgBlockMod = /-[a-z]+_{1}[a-z]|^[a-z]+_{1}[a-z]/
    if (rgBlockMod.test(el)) {
      const blockName = el.replace(/_.+/, '')
      const block = bem.blocks.find(el => el.folder === blockName)
      if (!block) {
        errors.push({ class: el, message: 'Не найден блок' })
        return
      }
      const folder = `_${el.replace(/^.*?(__).*?_|^.*?_|_.*?$/g, '')}`
      const file = `${el}.css`
      block.mods.push({ class: el, folder, file })
      block.imports.push(`@import './${folder}/${file}';`)
      block.folders.push(folder)
    }
  })

  // ЭЛЕМЕНТЫ БЛОКОВ
  classes.forEach(el => {
    const rgElem = /__[a-z-]+$/
    if (rgElem.test(el)) {
      const blockName = el.replace(/__.+/, '')
      const block = bem.blocks.find(el => el.class === blockName)
      if (!block) {
        errors.push({ class: el, message: 'Не найден блок' })
        return
      }
      const folder = `__${el.replace(/^.*?__/, '')}`
      const file = `${el}.css`
      block.elements.push({ class: el, folder, file, mods: [] })
      block.imports.unshift(`@import './${folder}/${file}';`)
      block.folders.push(folder)
    } 
  })

  // МОДИФИКАТОРЫ ЭЛЕМЕНТОВ
  classes.forEach(el => {
    const rgElemMod = /__[a-z]+_/
    if (rgElemMod.test(el)) {
      const blockName = el.replace(/_.+/, '')
      const elemName = el.replace(/_[a-z]+$|_[a-z]+_[a-z]+$/, '')
      const block = bem.blocks.find(el => el.class === blockName)
      if (!block) {
        errors.push({ class: el, message: 'Не найден блок' })
        return
      }
      const elem = block.elements.find(el => el.class === elemName)
      if (!elem) {
        errors.push({ class: el, message: 'Не найден элемент' })
        return
      }
      const folder = `_${el.replace(/^.*?(__).*?_|^.*?_|_.*?$/g, '')}`
      const file = `${el}.css`
      const folderElem = elem.folder
      elem.mods.push({ class: el, folder, file })
      block.imports.push(`@import './${folderElem}/${folder}/${file}';`)
      block.folders.push(`${folderElem}/${folder}`)
    }
  })

  return { ok: true, errors, bem }
}

export {
  parser
}
