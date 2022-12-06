import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";

// Компонент заказов

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://6387c6dfd9b24b1be3f96c37.mockapi.io/orders"
        );
        setOrders(data.map((obj) => obj.items).flat());
        setIsLoading(false);
      } catch (error) {
        alert("Не удалось запросить даннык из заказа");
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>

      <div className="sneakers d-flex flex-wrap">
        {(isLoading ? [...Array(4)] : orders).map((item, index) => {
          return (
            <Card
              key={index}
              loading={isLoading}
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
