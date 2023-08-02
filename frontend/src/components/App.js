import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import { useState, useEffect } from "react";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { CurrentCardsContext } from "../contexts/CurrentCardsContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import PopupWithConfirm from "./PopupWithConfirm.js";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import auth from "../utils/MestoAuth.js";
import { useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentCards, setCurrentCards] = useState([]);
  const [isPopupWithConfirmOpen, setPopupWithConfirmOpen] = useState(false);
  const [cardForDelete, setCardForDelete] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const [isSuccessfullSign, setIsSuccessfullSign] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === true) {
      api
        .getUserData()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
      api
        .getCards()
        .then((data) => {
          setCurrentCards(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [isLoggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCurrentCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function handleCardDelete(evt) {
    evt.preventDefault();
    setIsLoading(true);
    api
      .deleteCard(cardForDelete._id)
      .then(() => {
        const newCards = currentCards.filter((element) => element !== cardForDelete);
        setCurrentCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceOpen(true);
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarOpen(false);
    setEditProfileOpen(false);
    setAddPlaceOpen(false);
    setSelectedCard({});
    setImagePopupOpen(false);
    setPopupWithConfirmOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editUserData(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .editAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addCard(data)
      .then((newCard) => {
        setCurrentCards([newCard, ...currentCards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDeleteConfirmation(card) {
    setCardForDelete(card);
    setPopupWithConfirmOpen(true);
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then(() => {
          setLoggedIn(true);
          setUserData(email)
          navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((user) => {
        setIsSuccessfullSign(true);
        navigate("/sign-in");
        handleInfoTooltipOpen();
      })
      .catch((err) => {
        console.log(err.message);
        setIsSuccessfullSign(false);
        handleInfoTooltipOpen();
      });
  }

  function verifyToken() {
    auth
      .checkToken()
      .then((data) => {
        if (data) {
          setUserData(data.email);
          setLoggedIn(true);
          navigate("/");
        } else {
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        console.log(err.message);
      });
  }

  useEffect(() => {
    verifyToken();
    setUserData();
  }, []);

  function handleSignOut() {
    auth.logout()
      .then(() => {
        setLoggedIn(false);
        navigate('/sign-in');
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentCardsContext.Provider value={currentCards}>
        <div className="page">
          <Header
            isLoggedIn={isLoggedIn}
            userData={userData}
            onSignOut={handleSignOut}
          />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ProtectedRoute
                    element={
                      <Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        user={currentUser}
                        cards={currentCards}
                        onCardLike={handleCardLike}
                        onCardDeleteRequest={handleCardDeleteConfirmation}
                      />
                    }
                    isLoggedIn={isLoggedIn}
                  />
                  <Footer />
                </>
              }
            />
            <Route
              path="/sign-in"
              element={<Login handleLogin={handleLogin} />}
            />

            <Route
              path="/sign-up"
              element={<Register handleRegister={handleRegister} />}
            />
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route path="*" element={<Navigate to={"/sign-in"} />} />
          </Routes>
        </div>
        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          renderLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          renderLoading={isLoading}
        />

        <PopupWithConfirm
          isOpen={isPopupWithConfirmOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          renderLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          renderLoading={isLoading}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSuccessfull={isSuccessfullSign}
          onClose={closeAllPopups}
        />
      </CurrentCardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
