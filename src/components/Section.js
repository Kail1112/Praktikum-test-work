export default class Section {
  constructor (config = {items: [], renderer: () => null}, selector) {
    const {items, renderer} = config
    this._render = renderer
    this._items = items
    /**
     * Нужно исправить
     * В задании не указано, что элементом по-умолчанию должен быть корень документа
     * https://www.notion.so/8-5-48c79edf7848471db4246525602502f0#f48b32c4e3c145d1a79b02c802c1d6c3
     */
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
