import React, { useContext } from "react";
import AppContext from "../context";

// Компонент корзинной информации

const Info = ({ title, description, image }) => {
  const { setCartOpened } = useContext(AppContext);
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width={120} src={image} alt="empty" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => setCartOpened(false)} className="greenButton">
        <img
          src="https://raw.githubusercontent.com/Archakov06/react-sneakers/019a5194ed0e93295298a624ba3aa222ee617533/public/img/arrow.svg"
          alt="arrow"
        />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
