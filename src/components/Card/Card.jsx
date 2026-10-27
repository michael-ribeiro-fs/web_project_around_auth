import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import RemoveCard from "../RemoveCard/RemoveCard";

function Card({
  card,
  onCardClick,
  onCardLike,
  onCardDelete,
  onOpenPopup,
  onClosePopup,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const isLiked = card.isLiked ?? false;
  const isOwn = card.owner === currentUser?._id;

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onOpenPopup({
      title: "Tem certeza?",
      contentClassName: "popup__content_type_confirmation",
      children: (
        <RemoveCard
          card={card}
          onConfirm={onCardDelete}
          onClose={onClosePopup}
        />
      ),
    });
  }

  const { name, link } = card;

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onCardClick(card)}
      />
      {isOwn && (
        <button
          aria-label="Excluir cartão"
          className="card__delete-button"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-wrapper">
          <button
            aria-label="Curtir"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className="card__like-count">{isLiked ? 1 : 0}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
