import Popup from "../Popup/Popup";

function InfoTooltip({ isOpen, isSuccess, onClose }) {
  if (!isOpen) return null;

  return (
    <Popup
      title=""
      onClose={onClose}
      contentClassName="popup__content_type_tooltip"
    >
      <div className="info-tooltip">
        <div
          className={`info-tooltip__icon info-tooltip__icon_${
            isSuccess ? "success" : "error"
          }`}
        />
        <p className="info-tooltip__text">
          {isSuccess
            ? "Vitória! Você precisa se registrar ou fazer login."
            : "Ops, algo saiu de errado! Por favor, tente novamente."}
        </p>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
