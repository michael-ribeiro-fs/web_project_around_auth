import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import * as auth from "../utils/auth";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Register from "./Register/Register";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const [tooltip, setTooltip] = useState({ isOpen: false, isSuccess: true });
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const getToken = () => localStorage.getItem("jwt");

  // === Montagem: verifica token e carrega cards ===
  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      setIsAuthChecked(true);
      return;
    }

    auth
      .checkToken(jwt)
      .then((res) => {
        setIsLoggedIn(true);
        setEmail(res.data.email);
        setCurrentUser(res.data);
        return api.getInitialCards(jwt);
      })
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
      })
      .finally(() => {
        setIsAuthChecked(true);
      });
  }, []);

  // === Auth ===
  const handleRegister = ({ email: userEmail, password }) => {
    auth
      .register(userEmail, password)
      .then(() => {
        setTooltip({ isOpen: true, isSuccess: true });
        setTimeout(() => {
          setTooltip({ isOpen: false, isSuccess: true });
          navigate("/signin");
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
        setTooltip({ isOpen: true, isSuccess: false });
      });
  };

  const handleLogin = ({ email: userEmail, password }) => {
    auth
      .authorize(userEmail, password)
      .then((data) => {
        if (!data.token) throw new Error("Token não recebido");
        localStorage.setItem("jwt", data.token);
        return auth.checkToken(data.token);
      })
      .then((res) => {
        setIsLoggedIn(true);
        setEmail(res.data.email);
        setCurrentUser(res.data);
        return api.getInitialCards(getToken());
      })
      .then((cardsData) => {
        setCards(cardsData);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setTooltip({ isOpen: true, isSuccess: false });
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    setEmail("");
    setCards([]);
    navigate("/signin");
  };

  // === Cards ===
  const handleCardLike = async (card) => {
    try {
      const newCard = await api.changeLikeCardStatus(
        card._id,
        !card.isLiked,
        getToken(),
      );
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCardDelete = async (card) => {
    try {
      await api.deleteCard(card._id, getToken());
      setCards((state) => state.filter((c) => c._id !== card._id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddPlaceSubmit = async (data) => {
    try {
      const newCard = await api.addCard(data.name, data.link, getToken());
      setCards([newCard, ...cards]);
      handleClosePopup();
    } catch (err) {
      console.error(err);
    }
  };

  // === Pop-ups ===
  const handleOpenPopup = (popupConfig) => setPopup(popupConfig);
  const handleClosePopup = () => setPopup(null);

  // === Perfil (esperado falhar no backend atual — instruções §5) ===
  const handleUpdateUser = async (data) => {
    try {
      const newUser = await api.editProfile(data.name, data.about, getToken());
      setCurrentUser(newUser);
      handleClosePopup();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateAvatar = async (data) => {
    try {
      const newUser = await api.editAvatar(data.avatar, getToken());
      setCurrentUser(newUser);
      handleClosePopup();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className="page__content">
        <Header
          email={email}
          isLoggedIn={isLoggedIn}
          onSignOut={handleSignOut}
        />
        {!isAuthChecked ? null : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Main
                    popup={popup}
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="/signin" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/signup"
              element={<Register onRegister={handleRegister} />}
            />
          </Routes>
        )}
        <Footer />
        <InfoTooltip
          isOpen={tooltip.isOpen}
          isSuccess={tooltip.isSuccess}
          onClose={() => setTooltip({ isOpen: false, isSuccess: true })}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
