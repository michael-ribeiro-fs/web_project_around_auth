import RemoveCard from "../RemoveCard/RemoveCard";

function Card({
  card,
  onCardClick,
  onCardLike,
  onCardDelete,
  onOpenPopup,
  onClosePopup,
}) {
  const isLiked = card.isLiked ?? false;

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
      <button
        aria-label="Excluir cartão"
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Curtir"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}

export default Card;
