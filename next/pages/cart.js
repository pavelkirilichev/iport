import Header from "../components/Header";
import Footer from "../components/Footer";
import Orders from "../components/Orders";
import { useState, useEffect } from "react";
import FooterMob from "../components/FooterMob";
import strCut from "../Services/StrCutLimits";
import Cookies from "universal-cookie";
import UpdateCart from "../components/UpdateCart";
import Link from "next/link";
import { useTitle } from "../hooks/useTitle";
const cookies = new Cookies();

function Cart() {
  useTitle("Личный кабинет")
  
  const [pullMenuMob, setPullMenuMob] = useState("");
  const [pull, setPull] = useState("");

  const [chapter, setChapter] = useState("cart");

  const [backData, setBackData] = useState();

  const [cartData, setCartData] = useState("initial");
  const [cartPrice, setCartPrice] = useState(0);
  if (cartData == "initial" && typeof backData == "undefined") {
    console.log("test");
    fetch("/api/cart")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCartData(data);
        let cart_summ = 0;
        data.map((good) => {
          cart_summ += good.price * good.count;
        });
        setCartPrice(cart_summ);
      });
  }
  const [cartCount, setCartCount] = useState(0);
  if (cartCount == 0 && typeof backData == "undefined") {
    if (cookies.get("id")) {
      fetch("/api/getUserByID")
        .then((response) => response.json())
        .then((data) => {
          setCartCount(data.cart.split(", ").length - 1);
          setBackData(data);
        });
    } else {
      if (cookies.get("cart")) {
        setTimeout(() => {
          if (cartCount == 0)
            setCartCount(cookies.get("cart").split("_").length - 1);
        }, 1);
      }
    }
  }

  if (typeof cartData != "undefined") {
    return (
      <div className="wrapper">
        <Header
          cartPrice={typeof cartPrice == "undefined" ? "" : cartPrice}
          pull={pull}
          setPull={setPull}
          pullMenuMob={pullMenuMob}
          setPullMenuMob={setPullMenuMob}
          cartCount={cartCount}
        />
        <div
          className={
            pull == "" && pullMenuMob == "" ? "cart__main-active" : "cart__main"
          }
        >
          <div className="cart__container">
            <div className="cart__row">
              {typeof backData == "undefined" ||
              cookies.get("id") == undefined ||
              cookies.get("pass") == undefined ? (
                ""
              ) : (
                <div className="cart__row__sidebar">
                  <div className="cart__row__sidebar__info">
                    <img
                      src="./images/cart/profile_icon.svg"
                      className="cart__profile__icon"
                    />

                    <div className="cart__info__title">
                      <span className="cart__info__main-title">
                        {backData.initials}
                      </span>
                      <span className="cart__info__subtitle">
                        {backData.mail}
                      </span>
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
                      <span className="cart__menu__item__title">
                        Мои заказы
                      </span>
                    </li>
                    <li
                      className="cart__menu__item"
                      style={{ display: "none" }}
                    >
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
              )}
              <div className="cart__row__main">
                {chapter == "cart" ? (
                  <div className="cart__main__inner">
                    <div className="cart__main__header">
                      <span className="cart__main__header__title">Корзина</span>
                      {cartCount > 0 ? (
                        <div className="cart__main__header__btn-div">
                          <Link href={"/mo"}>
                            <div className="cart__main__header__order">
                              <span className="cart__main__header__order__title">
                                Оформить заказ
                              </span>
                              <span className="cart__main__header__order__price-cart">
                                {typeof cartPrice == "undefined"
                                  ? ""
                                  : cartPrice}
                                ₽
                              </span>
                              <img
                                className="cart__main__header__order__img"
                                src="../images/cart/cart_icon-light.png"
                              />
                            </div>
                          </Link>

                          <div
                            className="cart__main__header__del-cart"
                            onClick={() => {
                              setCartPrice(0);
                              setCartCount();
                              setCartData("delete");
                              UpdateCart(0, 0, 2);
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
                      ) : (
                        ""
                      )}
                      <div className="cart__main__header__total">
                        <span className="cart__main__header__total__title">
                          Итого:
                        </span>
                        <span className="cart__main__header__total__count">
                          {typeof cartPrice == "undefined" ? "" : cartPrice}₽
                        </span>
                      </div>
                    </div>
                    <div className="cart__main__content">
                      <ul className="cart__main__content__list">
                        {cartData == "initial" || cartData == "delete"
                          ? ""
                          : cartData.map((good, key) => {
                              let title = strCut(good.full_name, 20);
                              return (
                                <div className="cart__main__content__item">
                                  <span className="cart__main__content__item__num">
                                    {key + 1}
                                  </span>
                                  <Link href={"/good/" + good.ID}>
                                    <div
                                      className="cart__main__content__item__img-div"
                                      style={{
                                        backgroundImage: `url(../images/good/goods_image/${
                                          good.images_name.split(", ")[0]
                                        }.webp)`,
                                      }}
                                    ></div>
                                  </Link>
                                  <div className="cart__main__content__item__info">
                                    <span className="cart__main__content__item__info__title">
                                      {title}
                                    </span>
                                    <div className="cart__main__content__item__info__content">
                                      <p>
                                        артикул: <span>{good.articul}</span>
                                      </p>
                                      <p>
                                        цвет: <span>{good.color}</span>
                                      </p>
                                      <p>
                                        память: <span>{good.memory}GB</span>
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
                                          {good.old_price != 0
                                            ? `${good.old_price}₽`
                                            : ""}{" "}
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
                                          console.log("minus");
                                          if (good.count == 1) {
                                            setCartData(
                                              cartData.filter(
                                                (good_el) =>
                                                  good_el.ID != good.ID
                                              )
                                            );
                                            setCartCount(0);
                                            UpdateCart(good.ID, 0, 1);
                                          }
                                          if (good.count != 1) {
                                            good.count -= 1;
                                            setCartData(
                                              cartData.map((element) => {
                                                if (element.ID == good.ID) {
                                                  // объект найден
                                                  return good; // делаем замену
                                                } else {
                                                  // объект не найде
                                                  return element; // возвращаем старый объект
                                                }
                                              })
                                            );
                                            UpdateCart(good.ID, good.count, 0);
                                          } else {
                                            setCartData(
                                              cartData.filter(
                                                (good_el) =>
                                                  good_el.ID != good.ID
                                              )
                                            );
                                            setCartCount(cartCount - 1);
                                            UpdateCart(good.ID, 0, 1);
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
                                          setCartData(
                                            cartData.map((element) => {
                                              if (element.ID == good.ID) {
                                                return good;
                                              } else {
                                                // объект не найде
                                                return element; // возвращаем старый объект
                                              }
                                            })
                                          );
                                          UpdateCart(good.ID, good.count, 0);
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
                                      console.log("minus");

                                      setCartData(
                                        cartData.filter(
                                          (good_el) => good_el.ID != good.ID
                                        )
                                      );

                                      UpdateCart(good.ID, 0, 1);
                                      setCartPrice(cartPrice - good.price);
                                      setCartCount(cartCount - 1);

                                      //setCartCount(cartCount - 1);
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
}

export default Cart;
