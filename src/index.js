import './pages/index.css';
import {UserInfo, PopupWithForm, PopupWithImage, Card, FormValidator} from './components';

/*
* Редактирование пользователя
* */
const selectorUserName = document.querySelector('.profile__title')
const selectorUserInfo = document.querySelector('.profile__description')
const editUserInfoBtn = document.querySelector('.profile__edit-button')

const user = new UserInfo({name: selectorUserName, info: selectorUserInfo})

const onSubmitUserPopup = (info) => {
  const [info1, info2] = info
  const {value: name} = info1
  const {value: description} = info2
  user.setUserInfo(name, description)
}

const userPopup = new PopupWithForm('.popup_type_edit', onSubmitUserPopup)
editUserInfoBtn.addEventListener('click', () => {
  const {name, info} = user.getUserInfo()
  userPopup.setValueInput([
    {selector: '#owner-name', value: name},
    {selector: '#owner-description', value: info}
  ])
  userPopup.open()
})
/*
* Редактирование пользователя - END
* */

/*
* Добавление новых мест
* */
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const placesWrap = document.querySelector('.places__list');
const cardSelector = '.card-template';

const selectorBtnAddPlace = document.querySelector('.profile__add-button')
const imagePopup = new PopupWithImage('.popup_type_image')
const openPopupImageFunction = imagePopup.open.bind(imagePopup)

const renderCard = (data, wrap) => {
  const card = new Card(data, cardSelector, openPopupImageFunction);
  wrap.prepend(card.getView());
};

// Инициализация
initialCards.forEach((data) => {
  renderCard(data, placesWrap)
});

const onSubmitPlacePopup = (info) => {
  const [place, url] = info
  const {value: placeValue} = place
  const {name: urlName, value: urlValue} = url
  let result = {}
  result['name'] = placeValue
  result[urlName] = urlValue
  renderCard(result, placesWrap)
}

const addPlacePopup = new PopupWithForm('.popup_type_new-card', onSubmitPlacePopup)

selectorBtnAddPlace.addEventListener('click', () => addPlacePopup.open())
/*
* Добавление новых мест - END
* */

/*
* Валидатор форм
* */
const defaultFormConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const checkFormEditUser = new FormValidator(defaultFormConfig, userPopup.get())
const checkFormAddPlace = new FormValidator(defaultFormConfig, addPlacePopup.get())

checkFormEditUser.enableValidation()
checkFormAddPlace.enableValidation()
/*
* Валидатор форм - END
* */
