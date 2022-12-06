import React, { useState } from "react";
import axios from "axios";

import Info from "../Info";
import { useCart } from "../../hooks/useCart";

import styles from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Компонент корзины

const Drawer = ({ onClose, onRemoveItem, items = [], opened }) => {
  const { cartItems, totalPrice, setCartItems } = useCart();
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://6387c6dfd9b24b1be3f96c37.mockapi.io/orders",
        {
          items: cartItems,
        }
      );

      setOrderId(data.id);
      setCartItems([]);
      setIsOrderComplete(true);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://6387c6dfd9b24b1be3f96c37.mockapi.io/cart/" + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      alert("Ошибка при создании заказа");
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2 className="mb-30">
          Корзина{" "}
          <img
            className="removeBtn "
            src="https://raw.githubusercontent.com/Archakov06/react-sneakers/019a5194ed0e93295298a624ba3aa222ee617533/public/img/btn-remove.svg"
            alt="remove"
            onClick={onClose}
          />
        </h2>

        {items.length > 0 ? (
          <>
            <div className="items flex">
              {items.map((obj) => {
                return (
                  <div key={obj.id} className="cartItem d-flex align-center">
                    <div
                      style={{ backgroundImage: `url(${obj.image})` }}
                      className="cartItemImg"
                    ></div>

                    <div className="mr-20 flex">
                      <p className="mb-5">{obj.title}</p>
                      <b>{obj.price} руб.</b>
                    </div>
                    <img
                      className="removeBtn "
                      src="https://raw.githubusercontent.com/Archakov06/react-sneakers/019a5194ed0e93295298a624ba3aa222ee617533/public/img/btn-remove.svg"
                      alt="remove"
                      onClick={() => onRemoveItem(obj.id)}
                    />
                  </div>
                );
              })}
            </div>

            <div className="cartTotalBlock">
              <ul>
                <li className="d-flex">
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб. </b>
                </li>

                <li className="d-flex">
                  <span>Налог 5%</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ <img src="https://raw.githubusercontent.com/Archakov06/react-sneakers/019a5194ed0e93295298a624ba3aa222ee617533/public/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш закза #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={
              isOrderComplete
                ? "https://github.com/Archakov06/react-sneakers/blob/master/public/img/complete-order.jpg?raw=true"
                : "https://github.com/Archakov06/react-sneakers/blob/master/public/img/empty-cart.jpg?raw=true"
            }
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
