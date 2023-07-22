import imgProfileAvatar from "../images/jack-iv-kusto.jpg";
import imgBtnEditProfile from "../images/pencil.svg";
import imgBtnAddCard from "../images/add-button-plus.svg";

function Profile() {
  return (
    <section className="profile">
      <button className="profile__avatar-editbutton">
        <img
          className="profile__avatar"
          src={imgProfileAvatar}
          alt="Фото аватар"
        ></img>
        <div className="profile__edit-avatar"></div>
      </button>
      <div className="profile__info">
        <h1 className="profile__name"></h1>
        <p className="profile__myself"></p>
        <button className="profile__edit-button" type="button">
          <img
            className="profile__pencil"
            src={imgBtnEditProfile}
            alt="Кнопка редактирования профиля"
          ></img>
        </button>
      </div>
      <button className="profile__add-button" type="button">
        <img
          className="profile__plus"
          src={imgBtnAddCard}
          alt="Кнопка добавления карточки"
        ></img>
      </button>
    </section>
  );
}

export default Profile;
