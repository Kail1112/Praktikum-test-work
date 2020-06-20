import {Popup} from './'

export default class PopupWithImage extends Popup {
  #imageElement = undefined
  #imageCaption = undefined

  constructor (selector = '') {
    super(selector)
    this.#imageElement = this._popup.querySelector('.popup__image')
    this.#imageCaption = this._popup.querySelector('.popup__caption')
  }

  open (image = 'undefined', title = 'undefined') {
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
    } else throw new Error('Нету селектора попапа')
  }
}
