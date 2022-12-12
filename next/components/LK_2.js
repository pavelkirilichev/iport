import SidabarFilter from "./SidebarFilter";

function LK_2({ setChapter }) {
  return (
    <div className="lk-clients__main">
      <div className="lk-clients__sidebar">
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
            <div className="lk-clients__sidebar__menu__item lk-clients__sidebar__menu__item-active">
              <div className="lk-clients__sidebar__menu__item__count">
                <span>8</span>
              </div>
              <img src="/images/lk/order_w_icon.svg" />
              <span className="lk-clients__sidebar__menu__item__title">
                Заказы
              </span>
            </div>
            <div className="lk-clients__sidebar__menu__item">
              <img
                src="/images/lk/delivery_icon.svg"
                style={{ marginTop: 3.5, marginRight: 1 }}
              />
              <span className="lk-clients__sidebar__menu__item__title">
                Доставка
              </span>
            </div>
            <div className="lk-clients__sidebar__menu__item">
              <img src="/images/lk/report_icon.svg" />
              <span className="lk-clients__sidebar__menu__item__title">
                Отчеты
              </span>
            </div>
            <div className="lk-clients__sidebar__menu__item">
              <img src="/images/lk/box_icon.svg" />
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
              <img src="/images/lk/users_icon.svg" style={{ marginTop: 3 }} />
              <span className="lk-clients__sidebar__menu__item__title">
                Клиенты
              </span>
            </div>
            <div className="lk-clients__sidebar__menu__item">
              <img src="/images/lk/goods_icon.svg" />
              <span className="lk-clients__sidebar__menu__item__title">
                Товары
              </span>
            </div>
            <div className="lk-clients__sidebar__menu__item">
              <img src="/images/lk/mail_icon.svg" style={{ marginTop: 2 }} />
              <span className="lk-clients__sidebar__menu__item__title">
                Отзывы
              </span>
            </div>
          </div>
        </div>
        <div className="lk-clients__sidebar__bottom">
          <SidabarFilter />
        </div>
      </div>
      <div className="lk-clients__content">
        <div className="lk-clients__content__header">
          <button className="lk-clients__content__header__btn">По дате</button>
          <div className="lk-clients__content__header__input-sec">
            <input
              className="lk-clients__content__header__input"
              placeholder="номер заказа / наименование фирмы / "
            />
            <img src="/images/lk/search_icon.svg" />
          </div>

          <button className="lk-clients__content__header__btn">
            Все заказы
          </button>
          <button className="lk-clients__content__header__btn">
            Новые заказы
          </button>
        </div>
        <div className="lk-order__content__main">
          <div
            className="lk-order__content__main__item"
            onClick={() => {
              setChapter(3);
            }}
          >
            <div className="lk-order__content__main__item__top">
              <div className="lk-order__content__item__top__info">
                <div className="lk-order__content__item__top__subtitle-sec">
                  <span className="lk-order__content__item__top__subtitle">
                    ааа-10001200120012
                  </span>
                  <span className="lk-order__content__item__top__subtitle">
                    от 01.01.0001
                  </span>
                </div>
                <span className="lk-order__content__item__top__title">
                  Наименование фирмы
                </span>
              </div>
              <div className="lk-order__content__item__top__count">
                <span className="lk-order__content__item__top__count__title">
                  35 000
                </span>
                <span className="lk-order__content__item__top__count__subtitle">
                  n позиций
                </span>
              </div>
            </div>
            <div className="lk-order__content__main__item__bottom">
              <span className="lk-order__content__main__item__bottom__content">
                Не назначено <span className="lk-order__slash-orange">/</span>{" "}
                Не назначено
              </span>
              <span className="lk-order__content__main__item__bottom__content">
                Статус <span className="lk-order__slash-orange">/</span> Статус{" "}
                <span className="lk-order__slash-orange">/</span> Статус
              </span>
            </div>
          </div>
          <div
            className="lk-order__content__main__item"
            onClick={() => {
              setChapter(3);
            }}
          >
            <div className="lk-order__content__main__item__top">
              <div className="lk-order__content__item__top__info">
                <div className="lk-order__content__item__top__subtitle-sec">
                  <span className="lk-order__content__item__top__subtitle">
                    ааа-10001200120012
                  </span>
                  <span className="lk-order__content__item__top__subtitle">
                    от 01.01.0001
                  </span>
                </div>
                <span className="lk-order__content__item__top__title">
                  Наименование фирмы
                </span>
              </div>
              <div className="lk-order__content__item__top__count">
                <span className="lk-order__content__item__top__count__title">
                  35 000
                </span>
                <span className="lk-order__content__item__top__count__subtitle">
                  n позиций
                </span>
              </div>
            </div>
            <div className="lk-order__content__main__item__bottom">
              <span className="lk-order__content__main__item__bottom__content">
                Не назначено <span className="lk-order__slash-orange">/</span>{" "}
                Не назначено
              </span>
              <span className="lk-order__content__main__item__bottom__content">
                Статус <span className="lk-order__slash-orange">/</span> Статус{" "}
                <span className="lk-order__slash-orange">/</span> Статус
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LK_2;
