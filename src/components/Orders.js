import { useState } from "react";
import MoreDetails from "./MoreDetails";

const orders = [
  {
    num_order: 1,
    id_order: 121123,
    date: "12.12.2022",
    adress: "куда-то",
    summ: "2120",
    status: "Ожидает подтверждения",
  },
  {
    num_order: 2,
    id_order: 121124,
    date: "13.12.2022",
    adress: "куда-то подальше отсюда",
    summ: "3700",
    status: "В обработке",
  },
];
function Orders() {
  const [MD, setMD] = useState("");
  return (
    <div className="cart__main__inner">
      <div className="cart__main__header">
        <span className="cart__main__header__title">Заказы</span>
      </div>
      <div className="cart__main__content order__content">
        <ul className="cart__main__content__list">
          {orders.map((order, key) => {
            return (
              <div className="cart__main__content__item order__item">
                <div className="order__left__info">
                  <span className="cart__main__content__item__num">
                    {key + 1}
                  </span>
                  <p className="order__title">
                    Ваш заказ <br />№{order.num_order}
                  </p>
                </div>

                <div className="cart__main__content__item__info order__info">
                  <div className="cart__main__content__item__info__content order__info__content">
                    <p>
                      Номер заказа: <span>{order.id_order}</span>
                    </p>
                    <p>
                      Дата заказа: <span>{order.date}</span>
                    </p>
                    <p>
                      Адрес заказа: <span>{order.adress}</span>
                    </p>
                  </div>
                </div>
                <span className="order__status__title">{order.status}</span>
                <div className="order__itog__info">
                  <div
                    className="order__itog__info__more-detail"
                    onClick={() => {
                      setTimeout(() => {
                        setMD(" md_dark-active md_main-active");
                      }, 100);
                    }}
                  >
                    подробнее
                  </div>
                  <div className="order__itog__info__price">
                    <span className="order__itog__info__price__title">
                      сумма заказа
                    </span>
                    <span className="order__itog__info__price__count">
                      {order.summ}₽
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
      <MoreDetails MD={MD} setMD={setMD} />
    </div>
  );
}

export default Orders;
