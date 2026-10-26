import { useEffect } from "react";

function Popup({ title, children, onClose, contentClassName }) {
  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [onClose]);

  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  const contentClasses = `popup__content ${title === null ? "popup__content_content_image" : ""} ${contentClassName || ""}`;

  return (
    <div className="popup popup_is-opened" onClick={handleOverlayClick}>
      <div className={contentClasses.trim()}>
        <button className="popup__close" type="button" onClick={onClose} />
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}

export default Popup;
