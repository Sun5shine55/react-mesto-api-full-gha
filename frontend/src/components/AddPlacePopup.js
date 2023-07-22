import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace, renderLoading }) {
  const addPlaceName = React.useRef();
  const addPlaceLink = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      placename: addPlaceName.current.value,
      link: addPlaceLink.current.value,
    });
  }

  useEffect(() => {
    addPlaceName.current.value = "";
    addPlaceLink.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      loadingButtonText="Создание..."
      renderLoading={renderLoading}
      buttonText="Создать"
    >
      <input
        type="text"
        ref={addPlaceName}
        name="placename"
        id="placename"
        className="popup__field popup__field_type_place-name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      ></input>
      <span className="popup__item-error popup__item-error_field_place-name"></span>
      <input
        type="url"
        ref={addPlaceLink}
        name="link"
        id="link"
        className="popup__field popup__field_type_place-link"
        placeholder="Ссылка на картинку"
        required
      ></input>
      <span className="popup__item-error popup__item-error_field_place-link"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
