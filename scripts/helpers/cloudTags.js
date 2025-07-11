'use strict'

hexo.extend.helper.register('cloudTags', function (options = {}) {
  const env = this
  let { source, minfontsize, maxfontsize, limit, unit = 'px', orderby, order } = options

  if (limit > 0) {
    source = source.limit(limit)
  }

  const sizes = [...new Set(source.map(tag => tag.length).sort((a, b) => a - b))]

  const getRandomColor = () => {
    const randomColor = () => Math.floor(Math.random() * 201)
    const r = randomColor()
    const g = randomColor()
    const b = randomColor()
    return `rgb(${Math.max(r, 50)}, ${Math.max(g, 50)}, ${Math.max(b, 50)})`
  }

  const generateStyle = (size, unit) =>
    `font-size: ${parseFloat(size.toFixed(2)) + unit}; color: ${getRandomColor()};`

  const length = sizes.length - 1
  const result = source.sort(orderby, order).map(tag => {
    const ratio = length ? sizes.indexOf(tag.length) / length : 0
    const size = minfontsize + ((maxfontsize - minfontsize) * ratio)
    const style = generateStyle(size, unit)
    return `<a href="${env.url_for(tag.path)}" style="${style}">${tag.name} <span class="tag-count">(${tag.length})</span></a>`
  }).join('')

  return result
}) 