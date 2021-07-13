import {Popup} from './'

export default class PopupWithImage extends Popup {
  #imageElement = undefined
  #imageCaption = undefined

  constructor (selector = '') {
    super(selector)
    this.#imageElement = this._popup.querySelector('.popup__image')
    this.#imageCaption = this._popup.querySelector('.popup__caption')
  }

  /**
   * Можно лучше
   * Пользователю лучше отображать или пустые значения или
   * более понятные тексты, вместо 'undefined'
   * Лучше не передавать значение по-умолчанию и корректно обработать
   * вывод текста в элемент
   */
  open (image = 'undefined', title = 'undefined') {
    /**
     * Можно лучше
     * Проверять наличие элемента лучше в констукторе
     * Позволит избежать лишних перепроверок
     */
    if (this._popup !== undefined) {
      if (!this._popup.classList.contains('popup_is-opened')) {
        this._popup.classList.add('popup_is-opened')
        if (this.#imageElement !== undefined) {
          this.#imageElement.src = ''
          this.#imageElement.src = image;
          this.#imageElement.alt = `Изображение ${image}`;
        }
        this.#imageCaption !== undefined && ( this.#imageCaption.textContent = title )
        document.addEventListener('keyup', (e) => this._handleEscClose(e, this))
      }
    /**
     * Можно лучше
     * Текст ошибки не соответсвует смыслу проверки
     * Проверяется наличие элемента, а не селектора
     */
    } else throw new Error('Нету селектора попапа')
  }
}
