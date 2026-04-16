import React, { useEffect } from "react";

export default function Popup(props) {
  const { onClose, title, children } = props;

  // Fecha o popup ao pressionar a tecla "Escape"
  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    // Remove o ouvinte quando o componente é desmontado para evitar fugas de memória
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [onClose]);

  // Fecha o popup apenas se o clique for no fundo escuro (overlay)
  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  // Identificadores para classes CSS baseados no componente filho
  const isImage = children.type.name === "ImagePopup";
  const isConfirmation = children.type.name === "RemoveCard";

  return (
    <div className='popup' onClick={handleOverlayClick}>
      <div
        className={`popup__content 
          ${isImage ? "popup__content_content_image" : ""} 
          ${isConfirmation ? "popup__content_type_confirmation" : ""}`}
      >
        <button
          aria-label='Close modal'
          className='popup__close'
          type='button'
          onClick={onClose}
        />

        {/* Título dinâmico (ex: Editar Perfil) */}
        {title && <h3 className='popup__title'>{title}</h3>}

        {children}
      </div>
    </div>
  );
}
