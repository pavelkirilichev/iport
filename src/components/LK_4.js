import SidabarFilter from "./SidebarFilter";

function LK_4({ setChapter }) {
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
            <div
              className="lk-clients__sidebar__menu__item"
              onClick={() => {
                setChapter(2);
              }}
            >
              <div className="lk-clients__sidebar__menu__item__count">
                <span>8</span>
              </div>
              <img src="../images/lk/order_icon.svg" />
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
              className="lk-clients__sidebar__menu__item lk-clients__sidebar__menu__item-active"
              onClick={() => {
                setChapter(1);
              }}
            >
              <img
                src="../images/lk/users_w_icon.svg"
                style={{ marginTop: 3 }}
              />
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
        <div className="lk-clients__sidebar__bottom">
          <SidabarFilter />
        </div>
      </div>
      <div className="lk-clients__content">
        <div className="lk-clients__content__header">
          <button
            className="lk-clients__content__header__btn lk__btn_orange_160"
            onClick={() => {
              setChapter(1);
            }}
          >
            Назад
          </button>
        </div>
        <div className="lk-clients__content__main">
          <div className="lk-comp__main">
            <div className="lk-comp__main__left">
              <img src="../images/lk/company_logo.png" />
              <div className="lk-comp__main__left__info">
                <span className="lk-comp__main__left__name">
                  Наименование фирмы{" "}
                </span>
                <span className="lk-comp__main__left__fio">
                  Фамилия Имя Отчество{" "}
                </span>
                <span className="lk-comp__main__left__phone">
                  8 (999) 999-99-99
                </span>
                <span className="lk-comp__main__left__num">12-30-22</span>
              </div>
            </div>
            <div className="lk-comp__main__right">
              <div className="lk-comp__main__right__info">
                <div className="lk-comp__main__right__info__item">
                  <span className="lk-comp__main__right__info__item-red">
                    ИНН:
                  </span>
                  <span className="lk-comp__main__right__info__item-black">
                    325507450247
                  </span>
                </div>
                <div className="lk-comp__main__right__info__item">
                  <span className="lk-comp__main__right__info__item-red">
                    КПП:
                  </span>
                  <span className="lk-comp__main__right__info__item-black">
                    325507450247
                  </span>
                </div>
              </div>
              <div className="lk-comp__main__right__bottom">
                <span className="lk-comp__main__right__bottom__title">
                  Покупатель
                </span>
                <img src="../images/lk/company_arrow_down.svg" />
              </div>
            </div>
          </div>
          <div className="lk-comp__info__list">
            <div className="lk-comp__info__item">
              <div className="lk-comp__info__item__info">
                <p className="lk-comp__main__right__info__item-red">
                  Юридический адрес:
                </p>
                <p className="lk-comp__main__right__info__item-black">
                  Россия, Алтайский Край, г. Новоалтайск, ул. Павла-Корчагина
                  21в.
                </p>
              </div>
              <div className="lk-comp__info__item__info">
                <p className="lk-comp__main__right__info__item-red">
                  Фактический адрес:
                </p>
                <p className="lk-comp__main__right__info__item-black">
                  Россия, Алтайский Край, г. Новоалтайск, ул. Павла-Корчагина
                  21в.
                </p>
              </div>
              <img
                src="../images/lk/company_pen.svg"
                className="lk-comp__info__item__pen"
              />
            </div>
            <div className="lk-comp__info__item">
              <div className="lk-comp__info__item__info">
                <p className="lk-comp__main__right__info__item-red">
                  Юридический адрес:
                </p>
                <p className="lk-comp__main__right__info__item-black">
                  Россия, Алтайский Край, г. Новоалтайск, ул. Павла-Корчагина
                  21в.
                </p>
              </div>
              <div className="lk-comp__info__item__info">
                <p className="lk-comp__main__right__info__item-red">
                  Фактический адрес:
                </p>
                <p className="lk-comp__main__right__info__item-black">
                  Россия, Алтайский Край, г. Новоалтайск, ул. Павла-Корчагина
                  21в.
                </p>
              </div>
              <img
                src="../images/lk/company_pen.svg"
                className="lk-comp__info__item__pen"
              />
            </div>
            <div className="lk-comp__info__item">
              <div className="lk-comp__info__item__info">
                <p className="lk-comp__main__right__info__item-red">
                  Юридический адрес:
                </p>
                <p className="lk-comp__main__right__info__item-black">
                  Россия, Алтайский Край, г. Новоалтайск, ул. Павла-Корчагина
                  21в.
                </p>
              </div>
              <div className="lk-comp__info__item__info">
                <p className="lk-comp__main__right__info__item-red">
                  Фактический адрес:
                </p>
                <p className="lk-comp__main__right__info__item-black">
                  Россия, Алтайский Край, г. Новоалтайск, ул. Павла-Корчагина
                  21в.
                </p>
              </div>
              <img
                src="../images/lk/company_pen.svg"
                className="lk-comp__info__item__pen"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LK_4;
