import SidabarFilter from "./SidebarFilter";

function LK_3({ setChapter }) {
  return (
    <div className="lk-clients__main">
      <div className="lk-clients__sidebar lk__side__big">
        <div className="lk-clients__sidebar__top">
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
          <div className="lk-clients__sidebar__top__menu">
            <div
              className="lk-clients__sidebar__menu__item lk-clients__sidebar__menu__item-active"
              onClick={() => {
                setChapter(2);
              }}
            >
              <div className="lk-clients__sidebar__menu__item__count">
                <span>8</span>
              </div>
              <img src="../images/lk/order_w_icon.svg" />
              <span className="lk-clients__sidebar__menu__item__title">
                Заказы
              </span>
            </div>
            <div className="lk-clients__sidebar__menu__item">
              <img
                src="../images/lk/delivery_icon.svg"
                style={{ marginTop: 3.5, marginRight: 1 }}
              />
              <span className="lk-clients__sidebar__menu__item__title">
                Доставка
              </span>
            </div>
            <div className="lk-clients__sidebar__menu__item">
              <img src="../images/lk/report_icon.svg" />
              <span className="lk-clients__sidebar__menu__item__title">
                Отчеты
              </span>
            </div>
            <div className="lk-clients__sidebar__menu__item">
              <img src="../images/lk/box_icon.svg" />
              <span className="lk-clients__sidebar__menu__item__title">
                Отгрузка
              </span>
            </div>
            <div
              className="lk-clients__sidebar__menu__item"
              onClick={() => {
                setChapter(1);
              }}
            >
              <img src="../images/lk/users_icon.svg" style={{ marginTop: 3 }} />
              <span className="lk-clients__sidebar__menu__item__title">
                Клиенты
              </span>
            </div>
            <div className="lk-clients__sidebar__menu__item">
              <img src="../images/lk/goods_icon.svg" />
              <span className="lk-clients__sidebar__menu__item__title">
                Товары
              </span>
            </div>
            <div className="lk-clients__sidebar__menu__item">
              <img src="../images/lk/mail_icon.svg" style={{ marginTop: 2 }} />
              <span className="lk-clients__sidebar__menu__item__title">
                Отзывы
              </span>
            </div>
          </div>
        </div>
        <div className="lk-order_inner__main__responsible">
          <div className="lk-order_inner__main__responsible__item">
            <div className="lk-order_inner__main__responsible__item-left">
              <img src="../images/lk/user_icon-big.png" />
              <div className="lk-order_inner__main__responsible__item__info">
                <span className="lk-clients__content__main__item__top__subtitle lk-order_inner__content__main__item__top__subtitle">
                  Основной менеджер
                </span>
                <span className="lk-clients__content__main__item__top__title">
                  Менеджер продажи
                </span>
                <span className="lk-clients__content__main__item__bottom__phone lk-order_inner__content__main__item__bottom__phone">
                  8 (999) 999-99-99
                </span>
              </div>
            </div>
            <img src="../images/lk/reveal.png" className="lk__reveal" />
          </div>
          <div className="lk-order_inner__main__responsible__item">
            <div className="lk-order_inner__main__responsible__item-left">
              <img src="../images/lk/user_icon-big.png" />
              <div className="lk-order_inner__main__responsible__item__info">
                <span className="lk-clients__content__main__item__top__subtitle lk-order_inner__content__main__item__top__subtitle">
                  Менеджер заказа
                </span>
                <span className="lk-clients__content__main__item__top__title">
                  Менеджер продажи
                </span>
                <span className="lk-clients__content__main__item__bottom__phone lk-order_inner__content__main__item__bottom__phone">
                  8 (999) 999-99-99
                </span>
              </div>
            </div>
            <img src="../images/lk/reveal.png" className="lk__reveal" />
          </div>
        </div>
        <div className="lk__side__notes">
          <div className="lk__side__notes__main">
            <span className="lk__side__notes__title">Заметки</span>
          </div>
          <div className="lk__side__notes__messager">
            <div className="lk__side__notes__chat">
              <div className="lk__side__notes__message">
                <span>Пользователь</span>
                <span>
                  Сообщение сообщение тут новое сообщение сообщение новое и
                  Сообщение сообщение тут новое сообщение сообщение.
                </span>
                <span>от 11.11.2022 в 8:00</span>
              </div>
              <div className="lk__side__notes__message">
                <span>Пользователь</span>
                <span>
                  Сообщение сообщение тут новое сообщение сообщение новое и
                  Сообщение сообщение тут новое сообщение сообщение.
                </span>
                <span>от 11.11.2022 в 8:00</span>
              </div>
            </div>
            <div className="lk__side__notes__sent">
              <input placeholder="Сообщение" />
              <img src="../images/lk/sent_icon.svg" />
            </div>
          </div>
        </div>
        <div className="lk__side__notes lk__side__reviews">
          <div className="lk__side__notes__main">
            <span className="lk__side__notes__title">Отзывы клиентов</span>
          </div>
          <div className="lk__side__notes__messager">
            <div className="lk__side__notes__chat">
              <div className="lk__side__notes__message lk__side__reviews__message">
                <span>Пользователь</span>
                <span>Отзыв клиента</span>
                <span>от 11.11.2022 в 8:00</span>
              </div>
              <div className="lk__side__notes__message lk__side__reviews__message lk__side__message__right">
                <span>Пользователь</span>
                <span>ответ менеджера</span>
                <span>от 11.11.2022 в 8:00</span>
              </div>
            </div>
            <div className="lk__side__notes__sent">
              <input placeholder="Сообщение" />
              <img src="../images/lk/sent_icon.svg" />
            </div>
          </div>
        </div>
      </div>
      <div className="lk-clients__content">
        <div className="lk-clients__content__header">
          <button
            className="lk-clients__content__header__btn lk__btn-160"
            onClick={() => {
              setChapter(2);
            }}
          >
            Назад
          </button>
          <button className="lk-clients__content__header__btn lk__btn-260">
            Статус заказа
          </button>
        </div>
        <div className="lk-order_inner__main">
          <div className="lk-order_inner__main__info">
            <div className="lk-order_inner__main__info__left">
              <div className="lk-clients__content__main__item__top">
                <img src="../images/lk/user_icon.png" />
                <div className="lk-clients__content__main__item__top__info">
                  <span className="lk-clients__content__main__item__top__title">
                    Наименование фирмы
                  </span>
                  <span className="lk-clients__content__main__item__top__subtitle">
                    Фамилия Имя Отчество
                  </span>
                </div>
              </div>
              <div className="lk-order_inner__main__info__left__bottom">
                <span className="lk-clients__content__main__item__bottom__phone">
                  8 (999) 999-99-99
                </span>
                <button className="lk-order_inner__main__info__left__bottom__btn">
                  О клиенте
                </button>
              </div>
            </div>
            <div className="lk-order_inner__main__info__right">
              <div className="lk-order_inner__main__info__right__top">
                <div className="lk-order_inner__main__info__right__top__left">
                  <span className="lk-order_inner__main__info__right__top__left__title">
                    Ааа-10001200120012
                  </span>
                  <span className="lk-order_inner__main__info__right__top__left__subtitle">
                    от 01.01.0001
                  </span>
                </div>
                <div className="lk-order_inner__main__info__right__top__right">
                  <span className="lk-order_inner__main__info__right__top__right__title">
                    Актуален:
                  </span>
                  <span className="lk-order_inner__main__info__right__top__right__subtitle">
                    ещё 2 дня
                  </span>
                </div>
              </div>
              <div className="lk-order_inner__main__info__right__bottom">
                <span className="lk-order_inner__main__info__right__bottom__title">
                  Продлить
                </span>
                <button className="lk-order_inner__main__info__right__bottom__btn">
                  с сохранением
                </button>
                <button className="lk-order_inner__main__info__right__bottom__btn">
                  с перерасчетом
                </button>
              </div>
            </div>
          </div>
          <div className="lk-order_inner__main__bottom">
            <div className="lk-order_inner__main__bottom__shipment">
              <span className="lk-order_inner__main__bottom__shipment__title">
                Отгрузка
              </span>
              <div className="lk-order_inner__main__bottom__shipment__inner">
                <span>25.04.22</span>
              </div>
            </div>
            <div className="lk-order_inner__main__bottom__right">
              <div className="lk-order_inner__main__bottom__shipment lk-order_inner__main__bottom__status">
                <span className="lk-order_inner__main__bottom__shipment__title">
                  Статус оплаты
                </span>
                <img src="../images/lk/edit_icon.svg" />
              </div>
              <div className="lk-order_inner__main__bottom__shipment lk-order_inner__main__bottom__status">
                <span className="lk-order_inner__main__bottom__shipment__title">
                  Статус оплаты
                </span>
                <img src="../images/lk/edit_icon.svg" />
              </div>
            </div>
          </div>
          <div className="lk-order_inner__main__goods">
            <div className="lk-order_inner__main__goods__header">
              <span className="lk-order_inner__main__goods__header__title">
                <span className="lk__orange-600">NN</span> товаров
              </span>
              <div className="lk-order_inner__main__goods__header__count">
                <span className="lk-order_inner__main__goods__header__title">
                  на{" "}
                  <span className="lk__orange-600 lk-order_inner__main__goods__header__count__span">
                    35 000
                  </span>
                </span>
                <div className="lk-order_inner__main__goods__header__count__images">
                  <img src="../images/lk/prod_icon.svg" />
                  <img src="../images/lk/reserve_icon.svg" />
                </div>
              </div>
            </div>
            <div className="lk-order_inner__main__goods__list">
              <div className="lk-order_inner__main__goods__item">
                <img
                  className="lk-order_inner__main__goods__item__img"
                  src="../images/lk/pilow_good.png"
                />
                <div className="lk-order_inner__main__goods__item__info">
                  <span className="lk-order_inner__main__goods__item__info__title">
                    Подушка Memory <br /> Foam Roller
                  </span>
                  <div className="lk-order_inner__main__goods__item__info__bottom__list">
                    <div className="lk-order_inner__main__goods__item__info__bottom">
                      <span>Артикул: </span>
                      <span>121231311231</span>
                    </div>
                    <div className="lk-order_inner__main__goods__item__info__bottom">
                      <span>цвет: </span>
                      <span>белый</span>
                    </div>
                    <div className="lk-order_inner__main__goods__item__info__bottom">
                      <span>размер: </span>
                      <span>60 x 40 x 12</span>
                    </div>
                  </div>
                </div>
                <div className="lk-order_inner__main__goods__item__price">
                  <div className="lk-order_inner__main__goods__item__price__top">
                    <div className="lk-order_inner__main__goods__item__price__top__title">
                      <span>2120 ₽</span>
                      <span>шт</span>
                    </div>
                    <span className="lk-order_inner__main__goods__item__price__top__subtitle">
                      2430 ₽
                    </span>
                  </div>
                  <div className="lk-order_inner__main__goods__item__price__bottom">
                    <div className="lk-order_inner__main__goods__item__price__bottom__count">
                      <img src="../images/lk/minus.svg" />
                      <span>2</span>
                      <img src="../images/lk/plus.svg" />
                    </div>
                    <div className="lk-order_inner__main__goods__item__price__bottom__info">
                      <span>В наличии:</span>
                      <span>2120 шт.</span>
                    </div>
                  </div>
                </div>
                <div className="lk-order_inner__main__goods__item__result">
                  <div className="lk-order_inner__main__goods__item__result__top">
                    <img src="../images/lk/fabric.svg" />
                    <img src="../images/lk/reserve.svg" />
                  </div>
                  <div className="lk-order_inner__main__goods__item__result__bottom">
                    <span>Итого:</span>
                    <span>4240₽</span>
                  </div>
                </div>
                <img
                  src="../images/lk/close.svg"
                  className="lk-order_inner__main__goods__item__close"
                />
              </div>
            </div>
            <img
              src="../images/lk/arrow_down.svg"
              className="lk-order_inner__main__goods__arrow"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default LK_3;
