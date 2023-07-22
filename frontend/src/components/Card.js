import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === props.user._id);

  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_type_color"
  }`;

  return (
    <li className="card">
      <img
        className="card__photo"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleCardClick}
      ></img>
      {isOwn && (
        <button
          className="card__delete"
          type="button"
          onClick={handleCardDelete}
        ></button>
      )}
      <div className="card__label">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__counter-like">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
          ></button>
          <p className="card__likecounter">{[props.card.likes.length]}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
