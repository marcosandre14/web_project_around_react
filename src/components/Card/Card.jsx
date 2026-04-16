import React from "react";

export default function Card(props) {
  // Extrai dados do cartão e as funções de clique vindas do Main
  const { name, link } = props.card;
  const { onCardClick, onCardDelete } = props;

  return (
    <li className='card'>
      {/* Clique na imagem abre o ImagePopup */}
      <img
        className='card__image'
        src={link}
        alt={name}
        onClick={() => onCardClick(props.card)}
      />

      {/* Clique na lixeira abre o RemoveCard */}
      <button
        aria-label='Delete card'
        className='card__delete-button'
        type='button'
        onClick={onCardDelete}
      />

      <div className='card__description'>
        <h2 className='card__title'>{name}</h2>

        <button
          aria-label='Like card'
          type='button'
          className='card__like-button'
        />
      </div>
    </li>
  );
}
