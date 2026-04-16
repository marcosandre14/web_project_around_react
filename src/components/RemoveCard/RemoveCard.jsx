import React from "react";

export default function RemoveCard({ onClose }) {
  // Função que lida com o clique no botão "Sim"
  const handleSubmit = (evt) => {
    evt.preventDefault(); // Impede o navegador de recarregar a página

    console.log("Iniciando exclusão do card...");

    if (onClose) {
      onClose();
    }
  };

  return (
    <form className='popup__form' onSubmit={handleSubmit}>
      <h3 className='popup__title popup__title_type_confirmation'>
        Tem certeza?
      </h3>
      <button className='button popup__button' type='submit'>
        Sim
      </button>
    </form>
  );
}
