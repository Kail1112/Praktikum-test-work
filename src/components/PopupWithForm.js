import {Popup} from './';

export default class PopupWithForm extends Popup {
  #onSubmit = (e) => e
  #_form = undefined

  constructor (selector, callback) {
    super(selector)
    Object.prototype.toString.call(callback) === '[object Function]' && ( this.#onSubmit = callback )
    this.#_form = this._popup.querySelector('.popup__form')
    this.#_form !== undefined && this.#_form.addEventListener('submit', (e) => {
      e.preventDefault()
      this._callback(this.#onSubmit(this.#_getInputValues()))
      this.close()
    })
  }

  #_getInputValues () {
    if (this.#_form !== undefined) {
      const callbackMap = (input) => {
        const name = input.getAttribute('name'), value = input.value
        return {name, value}
      }
      return Array.prototype.map.call(this.#_form.querySelectorAll('.popup__input'), callbackMap)
    }
  }

  #clearForm () {
    this.#_form.querySelectorAll('.popup__input').forEach(input => input.value !== '' && ( input.value = '' ))
  }

  setValueInput (info) {
    if (Array.isArray(info)) {
      info.forEach(data => {
        const {selector, value} = data
        const inputElement = this.#_form.querySelector(`${selector}.popup__input`)
        if (inputElement !== undefined)
          inputElement.value = value
      })
    } else throw new Error('Ошибка, переданы данные не того формата')
  }

  close () {
    if (this._popup !== undefined) {
      this._popup.classList.contains('popup_is-opened') && this._popup.classList.remove('popup_is-opened')
      document.removeEventListener('keyup', (e) => this._handleEscClose(e, this));
      this.#clearForm()
      this._callback(this._popup)
    } else throw new Error('Нету селектора попапа')
  }
}
