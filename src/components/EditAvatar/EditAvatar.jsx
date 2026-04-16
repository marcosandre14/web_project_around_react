export default function EditAvatar() {
  return (
    <form className='popup__form' name='edit-avatar' noValidate>
      <label className='popup__field'>
        <input
          className='popup__input'
          id='avatar-url'
          name='avatar'
          placeholder='Link da foto'
          required
          type='url'
        />
        <span className='popup__error' id='avatar-url-error'></span>
      </label>

      <button className='button popup__button' type='submit'>
        Salvar
      </button>
    </form>
  );
}
