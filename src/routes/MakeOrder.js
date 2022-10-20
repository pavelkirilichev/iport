import Header from "../components/Header";
import Footer from "../components/Footer";
import FooterMob from "../components/FooterMob";
import { useCallback, useState } from "react";

function MakeOrder() {
  const [buyer, setBuyer] = useState("company");
  const [delivery, setDelivery] = useState("local");
  const [payment, setPayment] = useState("online");
  const [paymentSystem, setPaymentSystem] = useState("card");
  const [pullMenuMob, setPullMenuMob] = useState("");
  const [pull, setPull] = useState("");

  function BuyerDate() {
    return (
      <div className="mo__content__left__information__container">
        {buyer == "company" ? (
          <div className="mo__content__left__information__face">
            <div
              className="mo__content__left__information__face__left"
              onClick={() => {
                setBuyer("person");
              }}
            >
              <span className="mo__header__left__information__person">
                Физическое лицо
              </span>
            </div>
            <div
              className="mo__content__left__information__face__right"
              onClick={() => {
                setBuyer("compeny");
              }}
            >
              <span className="mo__header__left__information__person">
                Юридическое лицо
              </span>
            </div>
          </div>
        ) : (
          <div className="mo__content__left__information__face">
            <div
              className="mo__content__left__information__face__right"
              onClick={() => {
                setBuyer("person");
              }}
            >
              <span className="mo__header__left__information__person">
                Физическое лицо
              </span>
            </div>
            <div
              className="mo__content__left__information__face__left"
              onClick={() => {
                setBuyer("company");
              }}
            >
              <span className="mo__header__left__information__person">
                Юридическое лицо
              </span>
            </div>
          </div>
        )}
        {buyer == "company" ? (
          <div className="mo__content__left__entry">
            <div classname="mo__content__left__require">
              <div className="mo__content__left__require__personal">
                <span className="mo__content__left__require__title">ИНН</span>
                <input className="mo__content__left__require__input" />
              </div>
              <div className="mo__content__left__require__personal">
                <span className="mo__content__left__require__title">
                  Контактный номер телефона
                </span>
                <input className="mo__content__left__require__input" />
              </div>
            </div>
            <div classname="mo__content__left__require">
              <div className="mo__content__left__require__personal">
                <span className="mo__content__left__require__title">КПП</span>
                <input className="mo__content__left__require__input" />
              </div>
              <div className="mo__content__left__require__personal">
                <span className="mo__content__left__require__title">
                  E-mail (не обязательно)
                </span>
                <input className="mo__content__left__require__input" />
              </div>
            </div>
          </div>
        ) : (
          <div className="mo__content__left__entry">
            <div classname="mo__content__left__require">
              <div className="mo__content__left__require__personal">
                <span className="mo__content__left__require__title">
                  Контактный номер телефона
                </span>
                <input
                  className="mo__content__left__require__input"
                  style={{ width: 225 }}
                />
              </div>
            </div>
            <div classname="mo__content__left__require">
              <div className="mo__content__left__require__personal">
                <span className="mo__content__left__require__title">
                  E-mail (не обязательно)
                </span>
                <input
                  className="mo__content__left__require__input"
                  style={{ width: 225 }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  function Delivery() {
    return (
      <div className="mo__content__right">
        <span className="mo__content__left__information__topic">
          Выбирете способ получения
        </span>
        <span className="mo__content__right__title">В г. Какой-то</span>
        {delivery == "local" ? (
          <div className="mo__content__right__express">
            <div
              className="mo__content__left__information__face__right"
              onClick={() => {
                setDelivery("local");
              }}
            >
              <span className="mo__header__left__information__person">
                Самовывоз
              </span>
            </div>
            <div
              className="mo__content__left__information__face__left"
              onClick={() => {
                setDelivery("adress");
              }}
            >
              <span className="mo__header__left__information__person">
                Доставка
              </span>
            </div>
          </div>
        ) : (
          <div className="mo__content__right__express">
            <div
              className="mo__content__left__information__face__left"
              onClick={() => {
                setDelivery("local");
              }}
            >
              <span className="mo__header__left__information__person">
                Самовывоз
              </span>
            </div>
            <div
              className="mo__content__left__information__face__right"
              onClick={() => {
                setDelivery("adress");
              }}
            >
              <span className="mo__header__left__information__person">
                Доставка
              </span>
            </div>
          </div>
        )}
        {delivery == "local" ? (
          <div className="mo__content__right__geo">
            <div className="mo__content__right__geo__position">
              <div className="mo__content__right__geo__info">
                <div className="mo__content__right__geo__info__up">
                  <span className="mo__content__right__factory">
                    Производство
                  </span>
                  <span className="mo__content__right__adress">
                    Новоалтайск, ул. Павла Корчагина, 21
                  </span>
                </div>
                <div className="mo__content__right__geo__info__down">
                  <span className="mo__content__right__timer">
                    Пн-сб с 10:00 до 16:00
                  </span>
                  <span className="mo__content__right__timer">
                    Самовывоз:
                    <br />
                    Завтра с 10:00
                  </span>
                </div>
              </div>
              <div className="mo__content__left__information__face__left">
                <span className="mo__header__left__information__person">
                  Выбрать другой
                </span>
              </div>
            </div>
            <img src="./images/make_order/location.png" />
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

  function Payment() {
    return (
      <div className="mo__content__payment">
        <span className="mo__content__left__information__topic">
          Выбирете способ оплаты
        </span>
        {payment == "online" ? (
          <div className="mo__content__left__information__face">
            <div
              className="mo__content__left__information__face__left"
              onClick={() => {
                setPayment("local");
              }}
            >
              <span className="mo__header__left__information__person">
                При получении
              </span>
            </div>
            <div
              className="mo__content__left__information__face__right"
              onClick={() => {
                setPayment("online");
              }}
            >
              <span className="mo__header__left__information__person">
                Онлайн
              </span>
            </div>
          </div>
        ) : (
          <div className="mo__content__left__information__face">
            <div
              className="mo__content__left__information__face__right"
              onClick={() => {
                setPayment("local");
              }}
            >
              <span className="mo__header__left__information__person">
                При получении
              </span>
            </div>
            <div
              className="mo__content__left__information__face__left"
              onClick={() => {
                setPayment("online");
              }}
            >
              <span className="mo__header__left__information__person">
                Онлайн
              </span>
            </div>
          </div>
        )}

        {payment == "online" ? (
          <div className="mo__content__payment__methods">
            <div className="mo__content__payment__methods__checkbox">
              {paymentSystem == "card" ? (
                <div className="mo__content__payment__check">
                  <div className="mo__content__payment__check__circle">
                    <div className="mo__content__payment__check__point"></div>
                  </div>
                  <div className="mo__content__payment__check__circle"></div>
                </div>
              ) : (
                <div className="mo__content__payment__check">
                  <div className="mo__content__payment__check__circle"></div>
                  <div className="mo__content__payment__check__circle">
                    <div className="mo__content__payment__check__point"></div>
                  </div>
                </div>
              )}

              <div className="mo__content__payment__title">
                <span
                  className="mo__header__left__information__person"
                  onClick={() => {
                    setPaymentSystem("card");
                  }}
                >
                  Банковская карта
                </span>
                <span
                  className="mo__header__left__information__person"
                  onClick={() => {
                    setPaymentSystem("account");
                  }}
                >
                  Расчетный счет
                </span>
              </div>
            </div>
            <div className="mo__content__payment__atribut">
              <img src="./images/make_order/mastercard.svg" />
              <img src="./images/make_order/visa.svg" />
              <img src="./images/make_order/mir.svg" />
            </div>
          </div>
        ) : (
          <div style={{ height: 90 }}></div>
        )}

        <div className="mo__content__payment__confirm">
          <span className="mo__header__left__information__person">
            Подтвердить заказ
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Header cartPrice={2120} pull={pull} setPull={setPull} pullMenuMob={pullMenuMob} setPullMenuMob={setPullMenuMob}/>
      <div className={(pull == "" && pullMenuMob == "") ? "mo__section-active" : "mo__section"}>
        <div className="mo__main">
          <div className="mo__header">
            <span className="mo__name__header">Оформление заказа</span>
            <div className="mo__header__time">
              <div className="mo__header__time__up">
                <span className="mo__header__time__up__title">
                  Номер заказа:
                </span>
                <span className="mo__header__time__up__title">121123</span>
              </div>
              <div className="mo__header__time__up">
                <span className="mo__header__time__up__title">
                  Дата заказа:
                </span>
                <span className="mo__header__time__up__title">12.12.2022</span>
              </div>
            </div>
            <div className="mo__header__essential">
              <div className="mo__header__essential__detailed">
                <span className="mo__header__time__up__title">подробнее</span>
              </div>
              <div className="mo__header__essential__amount">
                <span className="mo__header__time__up__title">
                  сумма заказа
                </span>
                <span>2120₽</span>
              </div>
              <div className="mo__header__essential__cancel">
                <span>Отмена</span>
                <img src="./images/make_order/Close.svg" />
              </div>
            </div>
          </div>
          <div className="mo__content">
            <div className="mo__content__positions">
              <div className="mo__content__left">
                <div className="mo__content__left__number">
                  <img
                    className="mo__content__left__number__first"
                    src="./images/make_order/icon_1_.svg"
                  />
                  <div
                    className={
                      buyer == "company"
                        ? "mo__content__left__number__line"
                        : "mo__content__left__number__line mo__line-132"
                    }
                  ></div>
                  <img
                    className="mo__content__left__number__first"
                    src="./images/make_order/icon_2_.svg"
                  />
                  <div className="mo__content__left__number__line mo__line-283"></div>
                  <img
                    className="mo__content__left__number__first"
                    src="./images/make_order/final.svg"
                  />
                </div>
                <div className="mo__content__left__information">
                  <span className="mo__content__left__information__topic">
                    Данные покупателя
                  </span>
                  <BuyerDate />
                  <Delivery />
                  <Payment />
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
