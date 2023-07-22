import imgBtnEditProfile from "../images/pencil.svg";
import imgBtnAddCard from "../images/add-button-plus.svg";

import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { CurrentCardsContext } from "../contexts/CurrentCardsContext.js";
import Card from "./Card.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDeleteRequest,
}) {
  const currentUser = useContext(CurrentUserContext);
  const cards = useContext(CurrentCardsContext);

  return (
    <main>
      <section className="profile">
        <button className="profile__avatar-editbutton" onClick={onEditAvatar}>
          <img
            className="profile__avatar"
            src={`${currentUser.avatar}`}
            alt="Аватар профиля"
          ></img>
          <div className="profile__edit-avatar"></div>
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__myself">{currentUser.about}</p>
          <button
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
          >
            <img
              className="profile__pencil"
              src={imgBtnEditProfile}
              alt="Кнопка редактирования профиля"
            ></img>
          </button>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        >
          <img
            className="profile__plus"
            src={imgBtnAddCard}
            alt="Кнопка добавления карточки"
          ></img>
        </button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              user={currentUser}
              onCardLike={onCardLike}
              onCardDelete={onCardDeleteRequest}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
export default Main;
