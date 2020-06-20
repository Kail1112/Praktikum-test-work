export default class Section {
  constructor (config = {items: [], renderer: () => null}, selector) {
    const {items, renderer} = config
    this._render = renderer
    this._items = items
    this._selector = selector || document.documentElement
    this.render()
  }

  render () {
    if (this._render.length > 0) {
      this._items.length > 0 && this._items.forEach(element => {
        this.addItem(this._render(element))
      })
    } else throw new Error('Функция для рендера элементов не установлена')
  }

  addItem (nodeElement) {
    if (Object.prototype.toString.call(nodeElement) === '[object HTMLDivElement]') {
      return this._selector.appendChild(nodeElement)
    } else throw new Error('Элемент не является node елементом')
  }
}
