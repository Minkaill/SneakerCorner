import React from "react";
import { Link } from "react-router-dom";
import { useCart } from '../hooks/useCart';

// Компонент шапки

const Header = (props) => {
  const { totalPrice } = useCart()

  return (
    <header className="d-flex p-40 justify-between align-center">
      <Link to="/SneakerCorner">
        <div className="d-flex">
          <img
            width={45}
            height={45}
            src="https://cdn-icons-png.flaticon.com/512/2589/2589903.png"
            alt="logo"
          />
          <div>
            <h3 className="text-uppercase">Sneaker Corner</h3>
            <p className="opacity-5">Магазин спортивных кроссовок</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={props.onClickCart}>
        <img width={18} height={18} src="https://raw.githubusercontent.com/Archakov06/react-sneakers/019a5194ed0e93295298a624ba3aa222ee617533/public/img/cart.svg" alt="logo" />
          <span>
            <b>{totalPrice} руб.</b>
          </span>
        </li>
        <li className="mr-30 cu-p">
          <Link to="/favorites">
            <img width={20} height={20} src="https://raw.githubusercontent.com/Archakov06/react-sneakers/019a5194ed0e93295298a624ba3aa222ee617533/public/img/heart.svg" alt="logo" />
          </Link>
        </li>
        <li>
          <Link to="/orders">
          <img width={18} height={18} src="https://raw.githubusercontent.com/Archakov06/react-sneakers/019a5194ed0e93295298a624ba3aa222ee617533/public/img/user.svg" alt="logo" />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
