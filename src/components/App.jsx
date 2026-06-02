import { useState, useEffect } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ImagePopup from "./ImagePopup/ImagePopup";

function App() {
  // Estados globais da aplicação
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  // Estados de controle de abertura dos Popups (Modais)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  // Estado que monitora requisições assíncronas ativas para alterar os botões de submit
  const [isLoading, setIsLoading] = useState(false);

  // Busca informações do perfil do usuário logado na montagem do componente
  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error("Erro ao carregar dados do usuário:", err);
      });
  }, []);

  // Busca os cartões iniciais cadastrados no servidor na montagem do componente
  useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.error("Erro ao carregar os cartões iniciais:", err);
      });
  }, []);

  // Funções controladoras de abertura dos popups
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Captura o cartão que o usuário deseja remover e abre o popup de confirmação
  function handleCardDeleteClick(card) {
    setCardToDelete(card);
    setIsConfirmDeletePopupOpen(true);
  }

  // Função centralizada responsável por redefinir os estados e fechar qualquer modal ativo
  function closeAllPopups() {
    setSelectedCard(null);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setCardToDelete(null);
  }

  // Intercala o estado de curtidas (Like/Dislike) enviando o inverso reativo do estado atual
  async function handleCardLike(card, isLiked) {
    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error("Erro ao atualizar curtida:", error));
  }

  // Executa a deleção definitiva após a aprovação no popup de confirmação
  async function handleConfirmDeleteSubmit(event) {
    event.preventDefault();
    if (!cardToDelete) return;
    setIsLoading(true);

    await api
      .deleteCard(cardToDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
        closeAllPopups();
      })
      .catch((error) => console.error("Erro ao deletar o cartão:", error))
      .finally(() => setIsLoading(false));
  }

  // Atualiza os dados de nome e descrição do perfil
  const handleUpdateUser = (inputData) => {
    setIsLoading(true);
    api
      .setUserInfo(inputData)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((error) => console.error("Erro ao atualizar perfil:", error))
      .finally(() => setIsLoading(false));
  };

  // Atualiza a imagem de avatar de perfil do usuário
  const handleUpdateAvatar = (inputData) => {
    setIsLoading(true);
    api
      .setUserAvatar(inputData)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((error) => console.error("Erro ao atualizar avatar:", error))
      .finally(() => setIsLoading(false));
  };

  // Cria e adiciona um novo cartão no topo da grade
  const handleAddPlaceSubmit = (inputData) => {
    setIsLoading(true);
    api
      .addCard(inputData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.error("Erro ao adicionar novo lugar:", error))
      .finally(() => setIsLoading(false));
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <div className='page'>
        <div className='page__content'>
          <Header />

          <Main
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteClick}
            onCardClick={handleCardClick}
            onEditProfileClick={handleEditProfileClick}
            onEditAvatarClick={handleEditAvatarClick}
            onAddPlaceClick={handleAddPlaceClick}
            isEditProfilePopupOpen={isEditProfilePopupOpen}
            isEditAvatarPopupOpen={isEditAvatarPopupOpen}
            isAddPlacePopupOpen={isAddPlacePopupOpen}
            isConfirmDeletePopupOpen={isConfirmDeletePopupOpen}
            isLoading={isLoading}
            onCloseAllPopups={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
            onConfirmDeleteSubmit={handleConfirmDeleteSubmit}
          />

          <Footer />

          {selectedCard && (
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          )}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
