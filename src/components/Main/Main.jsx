import { useState } from "react";
import avatar from "../../images/avatar.jpg";

// Importação dos componentes
import Popup from "../Popup/Popup";
import Card from "../Card/Card";
import NewCard from "../NewCard/NewCard";
import EditProfile from "../EditProfile/EditProfile";
import EditAvatar from "../EditAvatar/EditAvatar";
import ImagePopup from "../ImagePopup/ImagePopup";
import RemoveCard from "../RemoveCard/RemoveCard";

const initialCards = [
  {
    isLiked: false,
    _id: "5d1f0611d321eb4bdcd707dd",
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    isLiked: false,
    _id: "5d1f064ed321eb4bdcd707de",
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
];

export default function Main() {
  // Estado que controla qual popup está aberto e o seu conteúdo
  const [popup, setPopup] = useState(null);

  // Função para fechar qualquer popup (setando o estado para null)
  function handleClosePopup() {
    setPopup(null);
  }

  // Definição dos objetos de configuração dos popups
  // Passamos handleClosePopup para os componentes que precisam de fechar o modal internamente
  const newCardPopup = { title: "Novo local", children: <NewCard /> };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };
  const editAvatarPopup = {
    title: "Alterar foto do perfil",
    children: <EditAvatar />,
  };
  const removeCardPopup = {
    title: "",
    children: <RemoveCard onClose={handleClosePopup} />,
  };

  // Função genérica para abrir popups de formulário
  function handleOpenPopup(data) {
    setPopup(data);
  }

  // Abre o popup de imagem com os dados do card
  function handleCardClick(card) {
    setPopup({
      title: null,
      children: <ImagePopup name={card.name} link={card.link} />,
    });
  }

  // Abre o popup de confirmação de remoção
  function handleCardDeleteClick() {
    setPopup(removeCardPopup);
  }

  return (
    <main className='content'>
      {/* Seção de Perfil */}
      <section className='profile page__section'>
        <div className='profile__avatar-container'>
          <img src={avatar} alt='Avatar' className='profile__image' />
          <div
            className='profile__avatar-overlay'
            onClick={() => handleOpenPopup(editAvatarPopup)}
          ></div>
        </div>

        <div className='profile__info'>
          <h1 className='profile__title'>Jacques Cousteau</h1>
          <button
            className='profile__edit-button'
            type='button'
            onClick={() => handleOpenPopup(editProfilePopup)}
          ></button>
          <p className='profile__description'>Explorador</p>
        </div>

        <button
          className='profile__add-button'
          type='button'
          onClick={() => handleOpenPopup(newCardPopup)}
        ></button>
      </section>

      {/* Seção de Cartões */}
      <section className='cards page__section'>
        <ul className='cards__list'>
          {initialCards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardDelete={handleCardDeleteClick}
            />
          ))}
        </ul>
      </section>

      {/* Componente Popup Único (Renderização Condicional) */}
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
