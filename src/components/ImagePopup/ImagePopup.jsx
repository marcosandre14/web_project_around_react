import React from "react";

export default function ImagePopup(props) {
  // name e link vêm do cartão que foi clicado
  const { name, link } = props;

  return (
    <>
      <img className='popup__image' src={link} alt={name} />
      <p className='popup__caption'>{name}</p>
    </>
  );
}
