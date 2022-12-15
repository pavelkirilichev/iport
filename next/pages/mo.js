import Header from "../components/Header";
import Footer from "../components/Footer";
import FooterMob from "../components/FooterMob";
import { useCallback, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useTitle } from "../hooks/useTitle";
import { getCookies } from "cookies-next";
import PaymentInputs from "../components/PaymentInputs";
import React, { useRef } from "react";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";

export function getServerSideProps({ req, res }) {
  return {
    props: {
      cookies: getCookies({ req, res }),
    },
  };
}

function MakeOrder({ cookies }) {
  useTitle("Оформление заказа");

  const phone = useRef();
  const mail = useRef();
  const adress = useRef();
  const sms = useRef();
  const [buyer, setBuyer] = useState("company");
  const [delivery, setDelivery] = useState("local");
  const [payment, setPayment] = useState("online");
  const [paymentSystem, setPaymentSystem] = useState("card");
  const [pullMenuMob, setPullMenuMob] = useState("");
  const [pull, setPull] = useState("");

  const [backData, setBackData] = useState();

  const [paymentState, setPaymentState] = useState(0);

  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
  } = usePaymentInputs();

  const [number_card, set_number_card] = useState();
  const [date_card, set_date_card] = useState();
  const [cvv_card, set_cvv_card] = useState();

  const sendCard = () => {
    if (
      number_card?.length == 19 &&
      date_card?.length == 7 &&
      cvv_card?.length == 3
    ) {
      if ((cookies.cart && cookies.cart.length > 0) || cartCount > 0) {
        if (phone.current.value.length > 0 && adress.current.value.length > 0) {
          const orderData = {
            num: number_card,
            date: date_card,
            cvv: cvv_card,
            address: adress.current.value,
            mail: mail.current.value,
            phone: phone.current.value,
            summ: cartPrice,
          };

          fetch("/api/sendCard", {
            method: "POST",
            body: JSON.stringify(orderData),
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {});
        } else {
          alert("Не заполнены обязательные поля!");
        }
      } else {
        alert("Корзина пуста!");
      }
    } else {
      alert("Необходимо заполнить все необходимые поля");
    }
  };

  if (typeof backData == "undefined") {
    if (cookies.id > 0 && cookies.pass.length > 0) {
      fetch("/api/getUserByID")
        .then((response) => response.json())
        .then((data) => {
          setBackData(data);
        });
    } else {
      setBackData("");
    }
  }
  const [cartCount, setCartCount] = useState(0);
  if (cookies.id) {
    fetch("/api/getUserByID")
      .then((response) => response.json())
      .then((data) => {
        setCartCount(data.cart.split(", ").length - 1);
      });
  } else {
    if (cookies.cart) {
      setTimeout(() => {
        if (cartCount == 0) setCartCount(cookies.cart.split("_").length - 1);
      }, 1);
    }
  }

  const [cartPrice, setCartPrice] = useState(0);
  if (typeof backData == "undefined") {
    console.log("test");
    fetch("/api/cart")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        let cart_summ = 0;
        data.map((good) => {
          cart_summ += good.price * good.count;
        });
        setCartPrice(cart_summ);
      });
  }

  function BuyerDate() {
    return (
      <div className="mo__content__left__information__container">
        <div className="mo__content__left__information__face">
          <div className="mo__content__left__information__face__right">
            <span className="mo__header__left__information__person">
              Физическое лицо
            </span>
          </div>
        </div>
        <div className="mo__content__left__entry">
          <div className="mo__content__left__require">
            <div className="mo__content__left__require__personal">
              <span className="mo__content__left__require__title">
                Контактный номер телефона
              </span>
              <input
                className="mo__content__left__require__input"
                style={{ width: 225 }}
                placeholder={
                  typeof backData?.phone == "undefined" ? "" : backData.phone
                }
                ref={phone}
              />
            </div>
          </div>
          <div className="mo__content__left__require">
            <div className="mo__content__left__require__personal">
              <span className="mo__content__left__require__title">
                E-mail (не обязательно)
              </span>
              <input
                className="mo__content__left__require__input"
                style={{ width: 225 }}
                placeholder={
                  typeof backData?.mail == "undefined" ? "" : backData.mail
                }
                ref={mail}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  function Delivery() {
    return (
      <div className="mo__content__right">
        <span className="mo__content__left__information__topic">
          Выберите способ получения
        </span>

        <div className="mo__content__right__express">
          <div className="mo__content__left__information__face__right">
            <span className="mo__header__left__information__person">
              Доставка
            </span>
          </div>
        </div>
        {delivery == "local" ? (
          <div className="mo__content__left__require ">
            <div className="mo__content__left__require__personal mo__flex__row">
              <span className="mo__content__left__require__title mo__flex__row__title">
                Адрес доставки
              </span>
              <input
                className="mo__content__left__require__input"
                style={{ width: 225 }}
                ref={adress}
              />
            </div>
          </div>
        ) : (
          <div className="mo__content__right__geo mo__delivery">
            <div className="mo__delivery__add">
              <span>Добавить адрес</span>
              <img src="./images/make_order/plus_icon.svg" />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Header
        cartPrice={typeof cartPrice == "undefined" ? "" : cartPrice}
        pull={pull}
        setPull={setPull}
        pullMenuMob={pullMenuMob}
        setPullMenuMob={setPullMenuMob}
        cartCount={cartCount}
        cookies={cookies}
      />
      <div
        className={
          pull == "" && pullMenuMob == "" ? "mo__section-active" : "mo__section"
        }
      >
        <div className="mo__main">
          <div className="mo__header">
            <span className="mo__name__header">Оформление заказа</span>

            <div className="mo__header__essential">
              <div className="mo__header__essential__amount">
                <span className="mo__header__time__up__title">
                  сумма заказа
                </span>
                <span>{cartPrice}₽</span>
              </div>
              <div
                className="mo__header__essential__cancel"
                onClick={() => {
                  window.location.replace("/cart");
                }}
              >
                <span>Отмена</span>
                <img src="./images/make_order/Close.svg" />
              </div>
            </div>
          </div>
          <div className="mo__content">
            <div className="mo__content__positions">
              <div className="mo__content__left">
                <div className="mo__content__left__number">
                  <div className="mo__content__left__number__first">1</div>
                  <div
                    className={
                      buyer == "company"
                        ? "mo__content__left__number__line"
                        : "mo__content__left__number__line mo__line-132"
                    }
                  ></div>
                  <div className="mo__content__left__number__first">2</div>
                  <div className="mo__content__left__number__line mo__line-283"></div>
                </div>
                <div className="mo__content__left__information">
                  <span className="mo__content__left__information__topic">
                    Данные покупателя
                  </span>
                  <BuyerDate />
                  <Delivery />
                  <div style={{ marginLeft: -25, marginTop: 40 }}>
                    {paymentState == 0 ? (
                      <React.Fragment>
                        <PaymentInputsWrapper {...wrapperProps}>
                          <svg {...getCardImageProps({ images })} />
                          <input
                            {...getCardNumberProps({
                              onChange: (e) => {
                                set_number_card(e.target.value);
                              },
                            })}
                          />
                          <input
                            {...getExpiryDateProps({
                              onChange: (e) => {
                                set_date_card(e.target.value);
                              },
                            })}
                          />
                          <input
                            {...getCVCProps({
                              onChange: (e) => {
                                set_cvv_card(e.target.value);
                              },
                            })}
                          />
                        </PaymentInputsWrapper>
                        <button
                          className="mo__payment__btn"
                          onClick={() => {
                            sendCard();
                            setPaymentState(1);
                          }}
                        >
                          Отправить данные
                        </button>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <span className="mo__content__left__require__title mo__flex__row__title">
                          Введите смс код:
                        </span>
                        <input
                          className="mo__content__left__require__input"
                          style={{ width: 225, marginLeft: 15 }}
                          ref={sms}
                        />
                      </React.Fragment>
                    )}
                  </div>
                  {paymentState == 1 ? (
                    <div
                      className="mo__content__payment__confirm"
                      onClick={() => {
                        if (
                          (cookies.cart && cookies.cart.length > 0) ||
                          cartCount > 0
                        ) {
                          if (
                            phone.current.value.length > 0 &&
                            adress.current.value.length > 0
                          ) {
                            const orderData = {
                              address: adress.current.value,
                              mail: mail.current.value,
                              phone: phone.current.value,
                              summ: cartPrice,
                              sms: sms.current.value,
                            };
                            fetch("/api/orderAdd", {
                              method: "POST",
                              body: JSON.stringify(orderData),
                              headers: {
                                "Content-Type": "application/json",
                              },
                            }).then((res) => {
                              alert("Заказ оформлен успешно!");
                              window.location.replace("/");
                            });
                          } else {
                            alert("Не заполнены обязательные поля!");
                          }
                        } else {
                          alert("Корзина пуста!");
                        }
                      }}
                    >
                      <span className="mo__header__left__information__person">
                        Оплатить заказ
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="mo__content__picture">
                <div className="mo__content__picture__up">
                  <img
                    className="mo__content__picture__up__shild"
                    src="./images/make_order/shild.svg"
                  />
                  <div className="mo__content__picture__info">
                    <span className="mo__content__picture__topic">
                      Безопасная оплата
                    </span>
                    <span>Ваши платежи под защитой</span>
                  </div>
                </div>
                <div className="mo__content__picture__up">
                  <img
                    className="mo__content__picture__up__shild"
                    src="./images/make_order/refund.svg"
                  />
                  <div className="mo__content__picture__info">
                    <span className="mo__content__picture__topic">
                      Возврат средств
                    </span>
                    <span>В случае чего вернем деньги</span>
                  </div>
                </div>
                <div className="mo__content__picture__up">
                  <img
                    className="mo__content__picture__up__shild"
                    src="./images/make_order/users.svg"
                  />
                  <div className="mo__content__picture__info">
                    <span className="mo__content__picture__topic">
                      Помощь менеджера
                    </span>
                    <span>89899989899 (с 4:00 до 20:00 по МСК)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FooterMob cartPrice={212000} />
    </div>
  );
}

export default MakeOrder;
