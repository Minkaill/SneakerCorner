import React, { useContext } from "react";
import Card from "../components/Card";
import AppContext from "../context";

// Компонент Домашней страницы

const Home = ({
  items,
  cartItems,
  searchValue,
  setSearchValue,
  onAddFavorites,
  isLoading,
  onAddToCart,
  onChangeSearchInput,
  favorites,
}) => {
  const { isItemAdded } = useContext(AppContext);
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        loading={isLoading}
        favorited={favorites.some((obj) => Number(obj.id) === Number(item.id))}
        added={isItemAdded(item && item.id)}
        cartItems={cartItems}
        onAddFavorite={(obj) => onAddFavorites(obj)}
        onClickPlus={(obj) => onAddToCart(obj)}
        {...item}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="main_logo"></div>
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex align-center ">
          <img
            width={13}
            height={13}
            src="https://raw.githubusercontent.com/Archakov06/react-sneakers/019a5194ed0e93295298a624ba3aa222ee617533/public/img/search.svg"
            alt="search"
          />
          {searchValue && (
            <img
              width={18}
              height={18}
              onClick={() => setSearchValue("")}
              className="clear cu-p"
              src="https://raw.githubusercontent.com/Archakov06/react-sneakers/019a5194ed0e93295298a624ba3aa222ee617533/public/img/btn-remove.svg"
              alt="clear"
            />
          )}
          <input
            placeholder="Поиск..."
            onChange={onChangeSearchInput}
            value={searchValue}
          />
        </div>
      </div>
      <div className="sneakers d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
};

export default Home;
