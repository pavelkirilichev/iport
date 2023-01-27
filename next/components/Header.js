import Catalog from "./Catalog";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { catalog } from "../data/CatalogJSON";
import RegForm from "./RegForm";
import LoginForm from "./LoginForm";
import Cookies from "universal-cookie";
import CityModal from "./CityModal";
import { getCookie, getCookies } from "cookies-next";

function Header({
  cartPrice,
  pull,
  setPull,
  pullMenuMob,
  setPullMenuMob,
  route,
  setCategory,
  cartCount,
  searchRef,
  setBackData,
  isSearch,
  cookies,
}) {
  const [catalogChapter, setCatalogChapter] = useState("");
  const [catalogMenuImgActive, setCatalogMenuImgActive] = useState("");

  const [catalogMenuImgOne, setCatalogMenuImgOne] = useState(
    " pull-catalog-active"
  );
  const [catalogMenuImgTwo, setCatalogMenuImgTwo] = useState("");
  const [catalogMenuImgThree, setCatalogMenuImgThree] = useState("");

  const [catalogBlurActive, setCatalogBlurActive] = useState("");

  const [catalogMenuMobOne, setCatalogMenuMobOne] = useState("");
  const [catalogMenuMobTwo, setCatalogMenuMobTwo] = useState("");
  const [catalogMenuMobThree, setCatalogMenuMobThree] = useState("");

  const [modal, setModal] = useState();
  const [cookiesState, setCookiesState] = useState(cookies);
  const city = cookies.city ? cookies.city : "Москва";
  const [cityState, setCity] = useState(city);

  return (
    <header className="header">
      {modal === "login" ? <LoginForm modal={modal} setModal={setModal} /> : ""}
      {modal === "reg" ? <RegForm modal={modal} setModal={setModal} /> : ""}
      {modal === "city" ? (
        <CityModal modal={modal} setModal={setModal} setCity={setCity} />
      ) : (
        ""
      )}

      <div className="header-pc">
        <nav className="nav-top">
          <div className="header__container">
            <div className="nav-top__row">
              <div className="nav-top__left">
                <div
                  className="nav-top__city"
                  onClick={() => {
                    setModal("city");
                  }}
                >
                  <span className="nav-top__city-text">{cityState}</span>
                  <img
                    src="/images/header/geo_icon.svg"
                    className="nav-top__city-img"
                  />
                </div>
              </div>
              <div className="nav-top__right">
                <div className="nav-top__right__info">
                  <img
                    src="/images/header/info_icon.svg"
                    className="nav-top__mail-img"
                  />
                  <span className="nav-top__info-text">О нас</span>
                </div>
                <div className="nav-top__right__email">
                  <img
                    src="/images/header/mail_icon.svg"
                    className="nav-top__mail-img"
                  />
                  <span className="nav-top__mail-text">info@itsstore.ru</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <nav className="nav-bottom">
          <div className="header__container">
            <div className="nav-bottom__row">
              <div className="nav-bottom__row__left">
                <Link href="/">
                  <img
                    src="/images/header/logo.svg"
                    className="nav-bottom__logo"
                    onClick={() => {
                      setPull("");
                    }}
                  />
                </Link>
                <div
                  className="nav-bottom__burger"
                  onClick={() => {
                    setPull(pull == "" ? " pull__active" : "");
                    setCatalogMenuImgTwo("");
                    setCatalogMenuImgThree("");
                    setCatalogChapter("");
                    setCatalogBlurActive("");
                  }}
                >
                  <span>Каталог</span>
                  <img
                    src="/images/header/burger.svg"
                    className="nav-bottom__burger-img"
                  />
                </div>
              </div>
              {isSearch == 1 ? (
                <div className="nav-bottom__search">
                  <input
                    className="nav-bottom__search__input"
                    ref={searchRef}
                    onInput={() => {
                      console.log(searchRef.current.value);
                      const searchData = {
                        search: searchRef.current.value,
                      };
                      fetch(`${process.env.NEXT_PUBLIC_API_URL}/goodsSearch`, {
                        method: "POST",
                        body: JSON.stringify(searchData),
                        headers: {
                          "Content-Type": "application/json",
                        },
                      })
                        .then((response) => response.json())
                        .then((data) => {
                          setBackData(data);
                        });
                    }}
                  />
                  <img
                    src="/images/header/search.png"
                    className="nav-bottom__search-img"
                  />
                </div>
              ) : (
                ""
              )}

              <div className="nav-bottom__row-right">
                <div className="nav-bottom__row-right__icons">
                  {cookiesState.id > 0 && cookiesState.pass.length > 0 ? (
                    <Link href="/cart">
                      <div
                        className="nav-bottom__burger"
                        style={{ marginRight: 30 }}
                      >
                        <span>Кабинет</span>
                        <img
                          src="/images/header/user.svg"
                          className="nav-bottom__burger-img"
                        />
                      </div>
                    </Link>
                  ) : (
                    <div
                      className="nav-bottom__burger"
                      style={{ marginRight: 30 }}
                      onClick={() => {
                        setModal("login");
                      }}
                    >
                      <span>Войти</span>
                      <img
                        src="/images/header/user.svg"
                        className="nav-bottom__burger-img"
                      />
                    </div>
                  )}
                  <Link href="/cart">
                    <div className="nav-bottom__row-right__icon cart-icon">
                      <img
                        src="/images/header/cart.svg"
                        className="nav-bottom__row-right__icon-img cart-icon-img"
                      />
                      {cartCount > 0 && cartPrice > 0 ? (
                        <div className="lk-clients__sidebar__menu__item__count">
                          <span>{cartCount}</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </Link>
                </div>
                <span className="nav-bottom__cart-price">
                  {cartPrice > 0 ? cartPrice : 0}₽
                </span>
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
        setCategory={setCategory}
        setBackData={setBackData}
      />
      <div className="header-mobile">
        <nav className="nav-mobile">
          <img src="/images/header/logo_mobile.svg" />
          <div className="nav-mobile__search">
            <img
              src="/images/header/search.png"
              className="nav-mobile__search-img"
            />
          </div>
          <img
            src="/images/header/burger_mobile.svg"
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
                  src="/images/header/mobile_arrow.png"
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
