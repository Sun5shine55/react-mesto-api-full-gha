import { usePopupClose } from "../hooks/usePopupClose.js";

function ImagePopup({ isOpen, card, onClose }) {
  usePopupClose(card.link, onClose);

  return (
    <div className={`popup popup_image ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container-image">
        <img
          className="popup__image"
          src={`${card.link}`}
          alt={`${card.name}`}
        ></img>
        <button
          className="popup__close"
          id="imageclose"
          onClick={onClose}
        ></button>
        <p className="popup__title-image">{`${card.name}`}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
