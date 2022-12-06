import React, { useContext, useState } from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import AppContext from '../../context';

// Компонент товаров

const Card = ({
  id,
  title,
  price,
  onClickPlus,
  added = false,
  onAddFavorite,
  favorited = false,
  image,
  loading = false,
}) => {
  const {isItemAdded} = useContext(AppContext)
  const [isFavorite, setIsFavorite] = useState(favorited);
  const obj = { id, parentId: id, title, price, image }

  console.log(title, isItemAdded(id));

  const handlePlus = () => {
    onClickPlus(obj);
  };

  const handleLike = () => {
    setIsFavorite(!isFavorite);
    onAddFavorite(obj);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 150 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="170" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="191" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="231" rx="5" ry="5" width="85" height="20" />
          <rect x="118" y="219" rx="5" ry="5" width="32" height="32" />
          <rect x="0" y="0" rx="10" ry="10" width="150" height="155" />
        </ContentLoader>
      ) : (
        <>
          {onAddFavorite && <div className={styles.favorite}>
            <img
              onClick={handleLike}
              src={isFavorite ? "https://raw.githubusercontent.com/Archakov06/react-sneakers/019a5194ed0e93295298a624ba3aa222ee617533/public/img/liked.svg" : "https://raw.githubusercontent.com/Archakov06/react-sneakers/019a5194ed0e93295298a624ba3aa222ee617533/public/img/unliked.svg"}
              alt="like"
            />
          </div>}
          <img width="100%" height={135} src={image} alt="logo" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>
                {price} руб<div className=""></div>
              </b>
            </div>
            {onClickPlus && <img
              className={styles.plus}
              onClick={handlePlus}
              src={isItemAdded(id) ? "https://raw.githubusercontent.com/Archakov06/react-sneakers/019a5194ed0e93295298a624ba3aa222ee617533/public/img/btn-checked.svg" : "https://raw.githubusercontent.com/Archakov06/react-sneakers/019a5194ed0e93295298a624ba3aa222ee617533/public/img/btn-plus.svg"}
              alt="logo"
            />}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
