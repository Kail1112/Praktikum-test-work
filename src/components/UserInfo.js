/**
 * Можно лучше
 * название метода не соответсвует его предназначению
 */
const catchError = (el1, el2) => {
  if (el1 !== undefined && el2 !== undefined) {
    return true
  } else throw new Error('Ошибка, отсутствуют селекторы')
}

export default class UserInfo {
  #elementName = undefined
  #elementInfo = undefined

  constructor (elements) {
    if (Object.prototype.toString.call(elements) === '[object Object]') {
      try {
        const {name, info} = elements
        this.#elementName = name
        this.#elementInfo = info
      } catch (e) {
        throw new Error('Ошибка, в конструктор переданы не те данные')
      }
    } else throw new Error('Ошибка, в конструктор переданы данные не того формата')
  }

  getUserInfo () {
    /**
     * Можно лучше
     * Лишние перепроверки свойств класса
     * Корректность переданных элементов проверяется в контсрукторе,
     * при правильном использовании класса, не должно возникать такой ситуации,
     * когда this.#elementName, this.#elementInfo будут пустыми
     */
    if (catchError(this.#elementName, this.#elementInfo)) {
      return {name: this.#elementName.innerText, info: this.#elementInfo.innerText}
    }
  }

  setUserInfo (name = '', info = '') {
    this.#elementName.innerText = name
    this.#elementInfo.innerText = info
    /**
     * Можно лучше
     * Лишние перепроверки свойств класса
     * Корректность переданных элементов проверяется в контсрукторе,
     * при правильном использовании класса, не должно возникать такой ситуации,
     * когда this.#elementName, this.#elementInfo будут пустыми
     */
    if (catchError(this.#elementName, this.#elementInfo)) {
    }
  }
}
