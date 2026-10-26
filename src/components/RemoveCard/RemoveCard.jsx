function RemoveCard({ card, onConfirm, onClose }) {
  const handleConfirm = () => {
    onConfirm(card);
    onClose();
  };

  return (
    <>
      <p className="popup__text">Deseja realmente excluir este cartão?</p>
      <button
        className="button popup__button popup__button_confirm"
        onClick={handleConfirm}
      >
        Sim, excluir
      </button>
    </>
  );
}

export default RemoveCard;
