import React, { useContext } from "react";
import Card from "../components/Card";
import AppContext from "../context";

// Компонент Избранных

const Favorites = ({ items, onAddFavorites }) => {
  const { favorites } = useContext(AppContext);
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>

      <div className="sneakers d-flex flex-wrap">
        {favorites.map((item, index) => {
          return (
            <Card
              key={index}
              favorited={true}
              onAddFavorite={onAddFavorites}
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
