import { useRef, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const avatar = avatarRef.current.value;
    handleUpdateAvatar({ avatar });
  };

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_type_avatar"
        placeholder="Link da imagem"
        type="url"
        ref={avatarRef}
        required
      />
      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}

export default EditAvatar;
