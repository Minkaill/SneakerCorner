import axios from "axios";
import Drawer from "./components/Drawer";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cartOpened, setCartOpened] = useState(false);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesReponse, itemsResponse] =
          await Promise.all([
            axios.get("https://6387c6dfd9b24b1be3f96c37.mockapi.io/cart"),
            axios.get("https://6387c6dfd9b24b1be3f96c37.mockapi.io/favorites"),
            axios.get("https://6387c6dfd9b24b1be3f96c37.mockapi.io/items"),
          ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesReponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Не удалось получить данные");
      }
    }
    fetchData();
  }, []);

  const onRemoveItem = async (id) => {
    try {
      await axios.delete(
        `https://6387c6dfd9b24b1be3f96c37.mockapi.io/cart/${id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("Не удалось удалить товар из корзины");
    }
  };

  const onAddToCart = async (obj) => {
    const findItem = cartItems.find(
      (itemObj) => Number(itemObj.parentId) === Number(obj.id)
    );
    try {
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://6387c6dfd9b24b1be3f96c37.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://6387c6dfd9b24b1be3f96c37.mockapi.io/cart",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Ошибка при добавлении товара в корзину");
    }
  };

  const onAddFavorites = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        await axios.delete(
          `https://6387c6dfd9b24b1be3f96c37.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://6387c6dfd9b24b1be3f96c37.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в избранное");
    }
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        setCartItems,
        setCartOpened,
        isItemAdded,
        onAddToCart,
        onAddFavorites,
        cartItems,
        favorites,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemoveItem={onRemoveItem}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/SneakerCorner"
            element={
              <Home
                isLoading={isLoading}
                cartItems={cartItems}
                favorites={favorites}
                onChangeSearchInput={onChangeSearchInput}
                onAddToCart={onAddToCart}
                onAddFavorites={onAddFavorites}
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                onAddToCart={onAddToCart}
                items={favorites}
                onAddFavorites={onAddFavorites}
              />
            }
          />

          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
