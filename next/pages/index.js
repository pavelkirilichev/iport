import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeMob from "../components/HomeMob";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { goods } from "../data/GoodsJSON";
import strCut from "../Services/StrCutLimits";
import AddToCart from "../components/AddToCart";
import { useTitle } from "../hooks/useTitle";
import Head from "next/head";
// import Cookies from "universal-cookie";
// const cookies = new Cookies();
import { getCookie, getCookies } from "cookies-next";

export function getServerSideProps({ req, res }) {
  return {
    props: {
      cookies: getCookies({ req, res }),
    },
  };
}

function Home({ cookies }) {
  useTitle("Главная");

  const [backData, setBackData] = useState();
  const [cartCount, setCartCount] = useState(0);
  const [goodsAll, setGoodsAll] = useState(0);
  const searchRef = useRef();

  const [pullMenuMob, setPullMenuMob] = useState("");
  const [pull, setPull] = useState("");
  const [cartData, setCartData] = useState("initial");
  const [cartPrice, setCartPrice] = useState(0);

  if (cartData == "initial" && typeof backData == "undefined") {
    console.log("test");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`)
      .then((response) => response.json())
      .then((data) => {
        setCartData(data);

        let cart_summ = 0;
        data.map((good) => {
          cart_summ += good.price * good.count;
        });
        setCartPrice(cart_summ);
      });
  }
  if (typeof backData == "undefined" && cartData == "initial") {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/goodsLimit`)
      .then((response) => response.json())
      .then((data) => {
        setBackData(data);
      });
  }
  if (cartCount == 0 && typeof backData == "undefined") {
    if (getCookie("id")) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/getUserByID`)
        .then((response) => response.json())
        .then((data) => {
          setCartCount(data.cart.split(", ").length - 1);
        });
    } else {
      if (getCookie("cart")) {
        setTimeout(() => {
          if (cartCount == 0)
            setCartCount(getCookie("cart").split("_").length - 1);
        }, 1);
      }
    }
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
        searchRef={searchRef}
        setBackData={setBackData}
        isSearch={1}
        cookies={cookies}
      />
      <div
        className={
          pull == "" && pullMenuMob == "" ? "home__main-active" : "home__main"
        }
      >
        <div className="home__main__image"></div>
        <section className="home__container">
          <div className="home__goods">
            <span className="home__goods__title">Лучшие цены на сайте</span>
            <HomeMob />
            <div className="home__goods__list">
              {typeof backData == "undefined"
                ? ""
                : backData.map((good, key) => {
                    let title = strCut(good.full_name, 50);
                    return (
                      <div className="home__goods__item">
                        <Link href={"/good/" + good.ID}>
                          <div
                            className="home__goods__item__image"
                            style={{
                              backgroundImage: `url(../images/good/goods_image/${
                                good.images_name.split(", ")[0]
                              }.webp)`,
                            }}
                          ></div>
                        </Link>
                        <Link href={"/good/" + good.ID}>
                          <div className="home__goods__item__info">
                            <div className="home__goods__item__price">
                              <span className="home__goods__item__price__title">
                                {good.price} ₽
                              </span>
                              <span className="home__goods__item__price__subtitle">
                                {good.old_price != 0
                                  ? `${good.old_price}₽`
                                  : ""}
                              </span>
                            </div>
                            <p className="home__goods__item__info__title">
                              {title}
                            </p>
                          </div>
                        </Link>
                        <div
                          className="home__goods__item__bottom"
                          onClick={(event) => {
                            AddToCart(good.ID, 1, setCartCount);
                            setCartPrice(cartPrice + good.price);
                            let copy = { ID: good.ID };
                            cartData.push(copy);
                          }}
                        >
                          {cartData != "initial" &&
                          cartData.length > 0 &&
                          cartData.filter((item) => item.ID == good.ID).length >
                            0 ? (
                            <div className="home__goods__item__bottom__left">
                              <span>Добавлено</span>
                            </div>
                          ) : (
                            <div className="home__goods__item__bottom__left">
                              <span>В корзину</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
          {goodsAll == 0 ? (
            <div
              className="home__view-all"
              onClick={() => {
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/goods`)
                  .then((response) => response.json())
                  .then((data) => {
                    setBackData(data);
                    setGoodsAll(1);
                  });
              }}
            >
              <span>Смотреть всё</span>
            </div>
          ) : (
            ""
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
