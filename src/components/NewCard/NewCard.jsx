import { useRef } from "react";

function NewCard({ onAddPlaceSubmit }) {
  const nameRef = useRef(null);
  const linkRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlaceSubmit({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  };

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_type_card-name"
        placeholder="Título"
        type="text"
        ref={nameRef}
        required
      />
      <input
        className="popup__input popup__input_type_url"
        placeholder="Link da imagem"
        type="url"
        ref={linkRef}
        required
      />
      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}

export default NewCard;
