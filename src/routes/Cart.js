import Header from "../components/Header";
import Footer from "../components/Footer";
import Orders from "../components/Orders";
import { useState } from "react";
import FooterMob from "../components/FooterMob";
import strCut from "../Services/StrCutLimits";

const goods = [
  {
    id: 0,
    name: 'Apple iPhone 13 (6.1", 128GB, темная ночь)',
    article_num: "121231311231",
    color: "белый",
    size: "60 x 40 x 12",
    price: 2120,
    old_price: 2430,
    count: 1,
    src: "good_1.jpg",
  },
  {
    id: 1,
    name: "2020 Apple MacBook Air 13.3″ серый космос (Apple M1, 8Gb, SSD 256Gb, M1 (7 GPU))",
    article_num: "121231311231",
    color: "белый",
    size: "60 x 40 x 12",
    price: 2120,
    old_price: 2430,
    count: 1,
    src: "good_2.jpg",
  },
];

function Cart() {
  const [pullMenuMob, setPullMenuMob] = useState("");
  const [pull, setPull] = useState("");
  const [goodsState, setGoodsState] = useState(goods);
  const [cartPrice, setCartPrice] = useState(4240);
  const [chapter, setChapter] = useState("cart");
  return (
    <div className="wrapper">
      <Header
        cartPrice={cartPrice}
        pull={pull}
        setPull={setPull}
        pullMenuMob={pullMenuMob}
        setPullMenuMob={setPullMenuMob}
      />
      <div
        className={
          pull == "" && pullMenuMob == "" ? "cart__main-active" : "cart__main"
        }
      >
        <div className="cart__container">
          <div className="cart__row">
            <div className="cart__row__sidebar">
              <div className="cart__row__sidebar__info">
                <img
                  src="./images/cart/profile_icon.svg"
                  className="cart__profile__icon"
                />
                <div className="cart__info__title">
                  <span className="cart__info__main-title">Пользователь</span>
                  <span className="cart__info__subtitle">8 909 999 99 99</span>
                </div>
              </div>
              <ul className="cart__menu">
                <li
                  className="cart__menu__item"
                  onClick={() => {
                    setChapter("cart");
                  }}
                >
                  <div className="cart__menu__item__icon">
                    <img src="../images/cart/cart_icon.png" />
                  </div>
                  <span className="cart__menu__item__title">Корзина</span>
                </li>
                <li
                  className="cart__menu__item"
                  onClick={() => {
                    setChapter("orders");
                  }}
                >
                  <div className="cart__menu__item__icon">
                    <img src="../images/cart/receipt_icon.png" />
                  </div>
                  <span className="cart__menu__item__title">Мои заказы</span>
                </li>
                <li className="cart__menu__item">
                  <div className="cart__menu__item__icon">
                    <img src="../images/cart/user_icon.png" />
                  </div>
                  <div className="cart__menu__item__div">
                    <span className="cart__menu__item__title">
                      Личные данные
                    </span>
                    <span className="cart__menu__item__subtitle">
                      сменить пароль
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="cart__row__main">
              {chapter == "cart" ? (
                <div className="cart__main__inner">
                  <div className="cart__main__header">
                    <span className="cart__main__header__title">Корзина</span>
                    <div className="cart__main__header__btn-div">
                      <div className="cart__main__header__order">
                        <span className="cart__main__header__order__title">
                          Оформить заказ
                        </span>
                        <span className="cart__main__header__order__price-cart">
                          {cartPrice}₽
                        </span>
                        <img
                          className="cart__main__header__order__img"
                          src="../images/cart/cart_icon-light.png"
                        />
                      </div>
                      <div
                        className="cart__main__header__del-cart"
                        onClick={() => {
                          setCartPrice(0);
                          setGoodsState([]);
                        }}
                      >
                        <span className="cart__main__header__del-cart__title">
                          Очистить корзину
                        </span>
                        <img
                          className="cart__main__header__del-cart__img"
                          src="../images/cart/close_icon.png"
                        />
                      </div>
                    </div>
                    <div className="cart__main__header__total">
                      <span className="cart__main__header__total__title">
                        Итого:
                      </span>
                      <span className="cart__main__header__total__count">
                        {cartPrice}₽
                      </span>
                    </div>
                  </div>
                  <div className="cart__main__content">
                    <ul className="cart__main__content__list">
                      {goodsState.map((good, key) => {
                        let title = strCut(good.name, 20);
                        return (
                          <div className="cart__main__content__item">
                            <span className="cart__main__content__item__num">
                              {key + 1}
                            </span>
                            <div
                              className="cart__main__content__item__img-div"
                              style={{
                                backgroundImage:
                                  "url(../images/good/goods_image/" +
                                  good.src +
                                  ")",
                              }}
                            ></div>
                            <div className="cart__main__content__item__info">
                              <span className="cart__main__content__item__info__title">
                                {title}
                              </span>
                              <div className="cart__main__content__item__info__content">
                                <p>
                                  артикул: <span>{good.article_num}</span>
                                </p>
                                <p>
                                  цвет: <span>{good.color}</span>
                                </p>
                                <p>
                                  размер: <span>{good.size}</span>
                                </p>
                              </div>
                            </div>
                            <div className="cart__main__content__item__count-price">
                              <div className="cart__main__content__item__count-price__top">
                                <div className="cart__main__content__item__price-count">
                                  <span className="cart__main__content__item__price-count__title">
                                    {good.price} ₽
                                  </span>
                                  <span className="cart__main__content__item__price-count__subtitle">
                                    {good.old_price} ₽
                                  </span>
                                </div>
                                <span className="cart__main__content__item__count">
                                  <span className="cart__main__content__item__count__title">
                                    шт
                                  </span>
                                </span>
                              </div>
                              <div className="cart__main__content__item__count-price__bottom">
                                <div
                                  className="cart__main__content__item__count-price__bottom-btn cart__btn-minus unselectable"
                                  onClick={() => {
                                    if (good.count != 1) {
                                      good.count -= 1;

                                      setGoodsState(
                                        goodsState.map((element) => {
                                          if (element.id == good.id) {
                                            // объект найден
                                            return good; // делаем замену
                                          } else {
                                            // объект не найде
                                            return element; // возвращаем старый объект
                                          }
                                        })
                                      );
                                    } else {
                                      setGoodsState(
                                        goodsState.filter(
                                          (good_el) => good_el.id != good.id
                                        )
                                      );
                                    }
                                    setCartPrice(cartPrice - good.price);
                                  }}
                                ></div>
                                <span className="cart__main__content__item__count-price__bottom-btn-cnt unselectable">
                                  {good.count}
                                </span>
                                <div
                                  className="cart__main__content__item__count-price__bottom-btn cart__btn-plus unselectable"
                                  onClick={() => {
                                    good.count += 1;
                                    setGoodsState(
                                      goodsState.map((element) => {
                                        if (element.id == good.id) {
                                          return good;
                                        } else {
                                          // объект не найде
                                          return element; // возвращаем старый объект
                                        }
                                      })
                                    );
                                    setCartPrice(cartPrice + good.price);
                                  }}
                                ></div>
                              </div>
                            </div>
                            <div className="cart__main__content__item__itog">
                              <span className="cart__main__content__item__itog__title">
                                Итого:
                              </span>
                              <span className="cart__main__content__item__itog__count">
                                {good.count * good.price}₽
                              </span>
                              <img src="../images/cart/cart_icon.png" />
                            </div>
                            <img
                              className="cart__main__header__del-cart__img"
                              src="../images/cart/close_icon.png"
                              onClick={() => {
                                setGoodsState(
                                  goodsState.filter(
                                    (good_el) => good_el.id != good.id
                                  )
                                );
                                setCartPrice(
                                  cartPrice - good.count * good.price
                                );
                              }}
                            />
                          </div>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ) : (
                <Orders />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FooterMob cartPrice={212000} />
    </div>
  );
}

export default Cart;
