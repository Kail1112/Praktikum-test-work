const handleEscClose = (e, callback = {close: () => null}) => {
  e.preventDefault();
  /**
   * Нужно исправить
   * Не должно быть "магических чисел", нужно использовать константы
   * для улучшения читабельности кода
   */
  e.which === 27 && callback.close()
}

export default class Popup {
  _popup = undefined
  _callback = () => null

  constructor (selector = '') {
    this._popup = ((selector) => {
      if (selector ?? undefined) {
        const collection = document.querySelectorAll(selector)
        return collection.length > 0 ? collection[collection.length - 1] : undefined
      } else return undefined
    })(selector)
    if (this._popup !== undefined) {
      const closeBtn = this._popup.querySelector('.popup__close') ?? false
      closeBtn && closeBtn.addEventListener('click', () => this.close())
    }
  }

  open () {
    if (this._popup !== undefined) {
      if (!this._popup.classList.contains('popup_is-opened')) {
        this._popup.classList.add('popup_is-opened')
      /**
       * Нужно исправить
       * Адрес обработчика нигде не сохраняется, удалить такого слушателя при закрытии попапа не получится
       */
        document.addEventListener('keyup', (e) => this._handleEscClose(e, this))
      }
    } else throw new Error('Нету селектора попапа')
  }

  close () {
    if (this._popup !== undefined) {
      this._popup.classList.contains('popup_is-opened') && this._popup.classList.remove('popup_is-opened')
      /**
       * Нужно исправить
       * Удаляется другой коллбэк, который существует только в контексте document.removeEventListener
       * Вместо необходимого
       */
      document.removeEventListener('keyup', (e) => this._handleEscClose(e, this));
      this._callback(this._popup)
    } else throw new Error('Нету селектора попапа')
  }

  _handleEscClose (e, callback = () => null) {
    handleEscClose(e, callback)
  }

  set setEventListeners (func) {
    if (Object.prototype.toString.call(func) === '[object Function]') {
      this._callback !== func && ( this._callback = func )
    } else throw new Error('Ошибка, в метод setEventListeners передана не функция')
  }

  get () {
    return this._popup
  }
}
