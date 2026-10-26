import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import Header from "./Header/Header";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  const [popup, setPopup] = useState(null);

  const [cards, setCards] = useState([]);

  async function handleCardLike(card) {
    const isLiked = card.isLiked;
    try {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);
      setCards((state) => state.filter((c) => c._id !== card._id));
    } catch (err) {
      console.error(err);
    }
  }

  const handleOpenPopup = (popupConfig) => {
    setPopup(popupConfig);
  };

  const handleClosePopup = () => {
    setPopup(null);
  };

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => setCurrentUser(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => setCards(data))
      .catch((err) => console.error(err));
  }, []);

  const handleUpdateUser = async (data) => {
    try {
      const newUser = await api.editProfile(data.name, data.about);
      setCurrentUser(newUser);
      handleClosePopup();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateAvatar = async (data) => {
    try {
      const newUser = await api.editAvatar(data.avatar);
      setCurrentUser(newUser);
      handleClosePopup();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddPlaceSubmit = async (data) => {
    try {
      const newCard = await api.addCard(data.name, data.link);
      setCards([newCard, ...cards]);
      handleClosePopup();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = ({ email, password }) => {
    console.log("[TODO Bloco 4] login:", email, password);
  };

  const handleRegister = ({ email, password }) => {
    console.log("[TODO Bloco 4] register:", email, password);
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page__content">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                popup={popup}
                onOpenPopup={handleOpenPopup}
                onClosePopup={handleClosePopup}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onAddPlaceSubmit={handleAddPlaceSubmit}
              />
            }
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
