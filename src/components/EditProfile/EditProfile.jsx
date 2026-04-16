export default function EditProfile() {
  return (
    <form className="popup__form" name="edit-profile" noValidate>
      <label className="popup__field">
        <input
          className="popup__input"
          id="owner-name"
          maxLength="40"
          minLength="2"
          name="name"
          placeholder="Nome"
          required
          type="text"
        />
        <span className="popup__error" id="owner-name-error"></span>
      </label>
      
      <label className="popup__field">
        <input
          className="popup__input"
          id="owner-description"
          maxLength="200"
          minLength="2"
          name="description"
          placeholder="Sobre mim"
          required
          type="text"
        />
        <span className="popup__error" id="owner-description-error"></span>
      </label>
      
      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}