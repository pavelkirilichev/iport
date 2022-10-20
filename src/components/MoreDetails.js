import { useState } from "react";

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

function MoreDetails({ MD, setMD }) {
  return (
    <div
      className={"md_dark" + MD}
      id="md__dark"
      onClick={(e) => {
        if (e.target.id == "md__dark") {
          setMD("");
        }
      }}
    >
      <div className="md__main">
        <img
          src="./images/cart/close_icon.png"
          className="md__main__close-icon"
          onClick={() => {
            setMD("");
          }}
        />
        <div className="md__header">
          <div className="cart__main__content__item order__item md__item">
            <div className="order__left__info">
              <span className="cart__main__content__item__num">1</span>
              <p className="order__title md__order__title">
                Ваш заказ <br />
                №1
              </p>
            </div>

            <div className="cart__main__content__item__info order__info md__info">
              <div className="cart__main__content__item__info__content order__info__content">
                <p>
                  Номер заказа: <span>121123</span>
                </p>
                <p>
                  Дата заказа: <span>12.12.2022</span>
                </p>
                <p>
                  Адрес заказа: <span>куда-то</span>
                </p>
              </div>
            </div>
            <span className="order__status__title md__status">Доставлен</span>
            <div className="order__itog__info md__itog">
              <div className="order__itog__info__more-detail md__more-detail">
                подробнее
              </div>
              <div className="order__itog__info__price md__itog__price">
                <span className="order__itog__info__price__title">
                  сумма заказа
                </span>
                <span className="order__itog__info__price__count">2120₽</span>
              </div>
            </div>
          </div>
        </div>
        <div className="md__main__goods">
          <ul className="md__main__goods__list">
            <li className="md__main__goods__item">
              <div className="md__main__goods__item__inner">
                <span className="md__goods__item__num">1</span>
                <div className="cart__main__content__item__img-div mp__item__img">
                  <img src="./images/cart/goods/image.png"></img>
                </div>
                <p className="md__goods__item__title">
                  Подушка <br /> Memory Foam Roller
                </p>
                <div className="cart__main__content__item__info__content md__item__info">
                  <p>
                    артикул: <span>121231311231</span>
                  </p>
                  <p>
                    цвет: <span>белый</span>
                  </p>
                  <p>
                    размер: <span>60 x 40 x 12</span>
                  </p>
                </div>
                <span className="cart__main__content__item__count md__count">
                  1
                  <span className="cart__main__content__item__count__title">
                    шт
                  </span>
                </span>
                <span className="cart__main__content__item__price-count__title md__price">
                  2120 ₽
                </span>
              </div>
            </li>
            <li className="md__main__goods__item">
              <div className="md__main__goods__item__inner">
                <span className="md__goods__item__num">1</span>
                <div className="cart__main__content__item__img-div mp__item__img">
                  <img src="./images/cart/goods/image.png"></img>
                </div>
                <p className="md__goods__item__title">
                  Подушка <br /> Memory Foam Roller
                </p>
                <div className="cart__main__content__item__info__content md__item__info">
                  <p>
                    артикул: <span>121231311231</span>
                  </p>
                  <p>
                    цвет: <span>белый</span>
                  </p>
                  <p>
                    размер: <span>60 x 40 x 12</span>
                  </p>
                </div>
                <span className="cart__main__content__item__count md__count">
                  1
                  <span className="cart__main__content__item__count__title">
                    шт
                  </span>
                </span>
                <span className="cart__main__content__item__price-count__title md__price">
                  2120 ₽
                </span>
              </div>
            </li>
            <li className="md__main__goods__item">
              <div className="md__main__goods__item__inner">
                <span className="md__goods__item__num">1</span>
                <div className="cart__main__content__item__img-div mp__item__img">
                  <img src="./images/cart/goods/image.png"></img>
                </div>
                <p className="md__goods__item__title">
                  Подушка <br /> Memory Foam Roller
                </p>
                <div className="cart__main__content__item__info__content md__item__info">
                  <p>
                    артикул: <span>121231311231</span>
                  </p>
                  <p>
                    цвет: <span>белый</span>
                  </p>
                  <p>
                    размер: <span>60 x 40 x 12</span>
                  </p>
                </div>
                <span className="cart__main__content__item__count md__count">
                  1
                  <span className="cart__main__content__item__count__title">
                    шт
                  </span>
                </span>
                <span className="cart__main__content__item__price-count__title md__price">
                  2120 ₽
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MoreDetails;
