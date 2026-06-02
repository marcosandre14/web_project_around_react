import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Card from "../Card/Card";

export default function Main({
  cards,
  onCardLike,
  onCardDelete,
  onCardClick,
  onEditProfileClick,
  onEditAvatarClick,
  onAddPlaceClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className='content'>
      <section className='profile page__section'>
        <div className='profile__avatar-container'>
          <img
            src={currentUser?.avatar}
            alt={`Avatar de ${currentUser?.name}`}
            className='profile__image'
          />
          <div
            className='profile__avatar-overlay'
            onClick={onEditAvatarClick}
          ></div>
        </div>

        <div className='profile__info'>
          <h1 className='profile__title'>{currentUser?.name}</h1>
          <button
            className='profile__edit-button'
            type='button'
            onClick={onEditProfileClick}
          />
          <p className='profile__description'>{currentUser?.about}</p>
        </div>

        <button
          className='profile__add-button'
          type='button'
          onClick={onAddPlaceClick}
        />
      </section>

      <section className='cards page__section'>
        <ul className='cards__list'>
          {cards.map((card) => {
            const isCardLiked = card.isLiked || false;

            return (
              <Card
                key={card._id}
                card={card}
                isLiked={isCardLiked}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
