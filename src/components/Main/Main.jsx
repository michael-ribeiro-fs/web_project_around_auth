import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import avatar from "../../images/avatar.jpg";
import editIcon from "../../images/edit-icon.svg";
import EditProfile from "../EditProfile/EditProfile";
import EditAvatar from "../EditAvatar/EditAvatar";
import NewCard from "../NewCard/NewCard";
import ImagePopup from "../ImagePopup/ImagePopup";
import Card from "../Card/Card";
import Popup from "../Popup/Popup";

function Main({
  popup,
  onOpenPopup,
  onClosePopup,
  cards,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleEditProfile = () => {
    onOpenPopup({
      title: "Editar perfil",
      children: <EditProfile />,
    });
  };

  const handleEditAvatar = () => {
    onOpenPopup({
      title: "Alterar foto de perfil",
      children: <EditAvatar />,
    });
  };

  const handleAddCard = () => {
    onOpenPopup({
      title: "Novo local",
      children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
    });
  };

  const handleCardClick = (card) => {
    onOpenPopup({
      title: null,
      children: <ImagePopup card={card} />,
    });
  };

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__avatar-container" onClick={handleEditAvatar}>
          <img
            className="profile__image"
            src={currentUser?.avatar || avatar}
            alt="Avatar"
          />
          <div className="profile__avatar-edit-overlay">
            <img
              src={editIcon}
              alt="Editar avatar"
              className="profile__avatar-edit-icon"
            />
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser?.name}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={handleEditProfile}
          />
          <p className="profile__description">{currentUser?.about}</p>
        </div>
        <button
          aria-label="Adicionar cartão"
          className="profile__add-button"
          type="button"
          onClick={handleAddCard}
        />
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onOpenPopup={onOpenPopup}
              onClosePopup={onClosePopup}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup
          onClose={onClosePopup}
          title={popup.title}
          contentClassName={popup.contentClassName}
        >
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;
