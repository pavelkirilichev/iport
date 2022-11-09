import Catalog from "./Catalog";
import { useState } from "react";
import { Link } from "react-router-dom";
import { catalog } from "../data/CatalogJSON";

function Header({
  cartPrice,
  pull,
  setPull,
  pullMenuMob,
  setPullMenuMob,
  route,
  setChapterTkani,
}) {
  const [catalogChapter, setCatalogChapter] = useState("");
  const [catalogMenuImgActive, setCatalogMenuImgActive] = useState("");

  const [catalogMenuImgOne, setCatalogMenuImgOne] = useState("");
  const [catalogMenuImgTwo, setCatalogMenuImgTwo] = useState("");
  const [catalogMenuImgThree, setCatalogMenuImgThree] = useState("");

  const [catalogBlurActive, setCatalogBlurActive] = useState("");

  const [catalogMenuMobOne, setCatalogMenuMobOne] = useState("");
  const [catalogMenuMobTwo, setCatalogMenuMobTwo] = useState("");
  const [catalogMenuMobThree, setCatalogMenuMobThree] = useState("");

  return (
    <header className="header">
      <div className="header-pc">
        <nav className="nav-top">
          <div className="header__container">
            <div className="nav-top__row">
              <div className="nav-top__left">
                <div className="nav-top__city">
                  <span className="nav-top__city-text">Новоалтайск</span>
                  <img
                    src="./images/header/geo_icon.svg"
                    className="nav-top__city-img"
                  />
                </div>
              </div>
              <div className="nav-top__right">
                <div className="nav-top__right__info">
                  <img
                    src="./images/header/info_icon.svg"
                    className="nav-top__mail-img"
                  />
                  <span className="nav-top__info-text">О нас</span>
                </div>
                <div className="nav-top__right__email">
                  <img
                    src="./images/header/mail_icon.svg"
                    className="nav-top__mail-img"
                  />
                  <span className="nav-top__mail-text">svit22@mail.ru</span>
                </div>
                <div className="nav-top__right__phone">
                  <img
                    src="./images/header/phone_icon.svg"
                    className="nav-top__phone-img"
                  />
                  <span className="nav-top__phone-text">+7-3852-570-722</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <nav className="nav-bottom">
          <div className="header__container">
            <div className="nav-bottom__row">
              <div className="nav-bottom__row__left">
                <Link to="/">
                  <img
                    src="./images/header/logo.svg"
                    className="nav-bottom__logo"
                  />
                </Link>
                <div
                  className="nav-bottom__burger"
                  onClick={() => {
                    setPull(pull == "" ? " pull__active" : "");
                    setCatalogMenuImgOne("");
                    setCatalogMenuImgTwo("");
                    setCatalogMenuImgThree("");
                    setCatalogChapter("");
                    setCatalogBlurActive("");
                  }}
                >
                  <span>Каталог</span>
                  <img
                    src="./images/header/burger.svg"
                    className="nav-bottom__burger-img"
                  />
                </div>
              </div>
              <div className="nav-bottom__search">
                <img
                  src="./images/header/search.png"
                  className="nav-bottom__search-img"
                />
              </div>
              <div className="nav-bottom__row-right">
                <div className="nav-bottom__row-right__icons">
                  <div
                    className="nav-bottom__burger"
                    style={{ marginRight: 30 }}
                  >
                    <span>Войти</span>
                    <img
                      src="./images/header/user.svg"
                      className="nav-bottom__burger-img"
                    />
                  </div>
                  <div className="nav-bottom__row-right__icon cart-icon">
                    <Link to="/cart">
                      <img
                        src="./images/header/cart.svg"
                        className="nav-bottom__row-right__icon-img cart-icon-img"
                      />
                    </Link>
                  </div>
                </div>
                <span className="nav-bottom__cart-price">{cartPrice}₽</span>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <Catalog
        setPull={setPull}
        pull={pull}
        setCatalogChapter={setCatalogChapter}
        catalogChapter={catalogChapter}
        setCatalogBlurActive={setCatalogBlurActive}
        catalogBlurActive={catalogBlurActive}
        catalogMenuImgOne={catalogMenuImgOne}
        setCatalogMenuImgOne={setCatalogMenuImgOne}
        catalogMenuImgTwo={catalogMenuImgTwo}
        setCatalogMenuImgTwo={setCatalogMenuImgTwo}
        catalogMenuImgThree={catalogMenuImgThree}
        setCatalogMenuImgThree={setCatalogMenuImgThree}
        route={route}
        setChapterTkani={setChapterTkani}
      />
      <div className="header-mobile">
        <nav className="nav-mobile">
          <img src="./images/header/logo_mobile.svg" />
          <div className="nav-mobile__search">
            <img
              src="./images/header/search.png"
              className="nav-mobile__search-img"
            />
          </div>
          <img
            src="./images/header/burger_mobile.svg"
            className="nav-mobile__burger"
            onClick={() => {
              setPullMenuMob(
                pullMenuMob == "" ? " pull-menu-mobile__active" : ""
              );
              setCatalogChapter("");
            }}
          />
        </nav>
      </div>
      <div className={"pull-menu-mobile" + pullMenuMob}>
        <div className="pull-menu-mobile__inner">
          <span className="pull-menu-mobile__title">Каталог</span>
          <ul className="pull-menu-mobile__list">
            <li className="pull-menu-mobile__item__container">
              <div
                className="pull-menu-mobile__item"
                onClick={() => {
                  if (catalogMenuImgOne == "") {
                    setCatalogMenuImgTwo(" pull-catalog-disable");
                    setCatalogMenuImgThree(" pull-catalog-disable");
                    setTimeout(() => {
                      setCatalogMenuImgOne(" pull-catalog-active");
                    }, 50);
                    setTimeout(() => {
                      setCatalogMenuImgTwo("");
                      setCatalogMenuImgThree("");
                    }, 500);
                  } else if (catalogMenuImgOne == " pull-catalog-active") {
                    setCatalogMenuImgOne(" pull-catalog-disable");
                    setTimeout(() => {
                      setCatalogMenuImgOne("");
                    }, 500);
                  } else {
                  }
                }}
              >
                <span>Техника</span>
                <img
                  src="./images/header/mobile_arrow.png"
                  className="pull-menu-mobile__item-img"
                />
              </div>

              <div className={"pull-catalog__list" + catalogMenuImgOne}>
                {catalog
                  .filter((item) => item.type === "bedroom")
                  .map((catalogItem) => {
                    return (
                      <div className="pull-catalog__item-mobile">
                        <span>{catalogItem.title}</span>
                      </div>
                    );
                  })}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
