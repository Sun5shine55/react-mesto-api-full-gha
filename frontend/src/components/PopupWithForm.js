import { usePopupClose } from "../hooks/usePopupClose";

function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
  loadingButtonText,
  renderLoading,
}) {
  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""} `}>
      <div className="popup__container">
        <h2 className="popup__title">{`${title}`}</h2>
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <form className="popup__form" name={`${name}`} onSubmit={onSubmit}>
          {children}
          <button className="popup__save-button" id="addcard" type="submit">
            {renderLoading ? loadingButtonText : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
