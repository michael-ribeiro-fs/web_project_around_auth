import { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name || "");
  const [description, setDescription] = useState(currentUser.about || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({ name, about: description });
  };

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_type_name"
        placeholder="Nome"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="popup__input popup__input_type_description"
        placeholder="Sobre mim"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}

export default EditProfile;
