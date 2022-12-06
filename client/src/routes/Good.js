import Header from "../components/Header";
import Footer from "../components/Footer";
import FooterMob from "../components/FooterMob";
import { useState } from "react";
import { Link } from "react-router-dom";
import GoodSlider from "../components/GoodSlider";
import { goods } from "../data/GoodsJSON";
import NewArrayByCount from "../Services/Array";
import GoodMobile from "../components/GoodMobile";
import { useParams } from "react-router-dom";
import AddToCart from "../components/AddToCart";
import Cookies from "universal-cookie";
import strCut from "../Services/StrCutLimits";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();

// Get ID from URL

function Good() {
  const navigate = useNavigate();
  const params = useParams();
  const goodID = params.id;
  const [backData, setBackData] = useState();
  const [cartCount, setCartCount] = useState(0);

  //console.log(params);
  const [pullMenuMob, setPullMenuMob] = useState("");
  const [pull, setPull] = useState("");
  const [img, setImg] = useState(0);
  const [goodCount, setGoodCount] = useState(1);
  const [goodSlider, setGoodSlider] = useState("");
  const [arrayCount, setArrayCount] = useState(NewArrayByCount(goods));
  const image_arr = [
    "../images/good/goods_image/good_1.jpg",
    "../images/good/goods_image/good_2.jpg",
    "../images/good/goods_image/good_3.jpg",
    "../images/good/goods_image/good_4.jpg",
  ];
  const idData = {
    id: goodID,
  };
  if (typeof backData == "undefined") {
    fetch("/goodID", {
      method: "POST",
      body: JSON.stringify(idData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBackData(data);
      });
  }
  const [cartData, setCartData] = useState("initial");
  const [cartPrice, setCartPrice] = useState(0);
  if (
    cartData == "initial" &&
    typeof backData == "undefined" &&
    cartCount == 0
  ) {
    console.log("test");
    fetch("/cart")
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
  if (cookies.get("id") && cartCount == 0 && cartData == "initial") {
    fetch("/getUserByID")
      .then((response) => response.json())
      .then((data) => {
        setCartCount(data.cart.split(", ").length - 1);
        console.log(cartCount);
      });
  } else {
    console.log("cho za huinya");
    if (
      cookies.get("cart") &&
      cartCount == 0 &&
      typeof cookies.get("id") == "undefined"
    ) {
      setTimeout(() => {
        if (cartCount == 0)
          setCartCount(cookies.get("cart").split("_").length - 1);
      }, 1);
    }
  }
  if (typeof backData != "undefined") {
    return (
      <div className="wrapper">
        <Header
          cartPrice={typeof cartPrice == "undefined" ? "" : cartPrice}
          pull={pull}
          setPull={setPull}
          pullMenuMob={pullMenuMob}
          setPullMenuMob={setPullMenuMob}
          cartCount={cartCount}
          setBackData={setBackData}
          isSearch={0}
        />
        <div
          className={
            pull == "" && pullMenuMob == ""
              ? "good__main-section-active"
              : "good__main-section"
          }
        >
          <div className="good__container">
            <div className="tkani__navigation">
              <Link to={"/"}>
                <div className="tkani__navigation__back-btn">Назад</div>
              </Link>
              <ul className="tkani__navigation__chapter-list">
                <li className="tkani__navigation__chapter__item good__nav__item">
                  Каталог
                </li>
                <li className="tkani__navigation__chapter__item good__nav__item">
                  Техника
                </li>
                <li className="tkani__navigation__chapter__item good__nav__item">
                  {backData.model}
                </li>
              </ul>
            </div>
            {typeof backData == "undefined" ? (
              ""
            ) : (
              <div className="good__main">
                <div className="good__main__image">
                  <div className="good__main__image__sidebar">
                    <img
                      src="/images/good/arrow_up.svg"
                      onClick={() => {
                        if (img == 0) {
                          setImg(image_arr.length - 1);
                        } else {
                          setImg(img - 1);
                        }
                      }}
                    />
                    <div className="good__main__image__sidebar__slider">
                      {image_arr.map((item, key) => {
                        return (
                          <div className="good__main__image__sidebar__slider__item">
                            {key == img ? (
                              <div className="good__main__slider__img-active"></div>
                            ) : (
                              ""
                            )}
                            <div
                              className="good__main__slider__img"
                              style={{
                                backgroundImage: `url(../images/good/goods_image/${
                                  backData.images_name.split(", ")[key]
                                }.webp)`,
                              }}
                            ></div>
                          </div>
                        );
                      })}
                    </div>
                    <img
                      src="/images/good/arrow_down.svg"
                      onClick={() => {
                        if (img == image_arr.length - 1) {
                          setImg(0);
                        } else {
                          setImg(img + 1);
                        }
                      }}
                    />
                  </div>
                  <div
                    className="good__main__image__content"
                    style={{
                      backgroundImage: `url(../images/good/goods_image/${
                        backData.images_name.split(", ")[img]
                      }.webp)`,
                    }}
                    onClick={() => {
                      setGoodSlider(" goodSlider-active");
                    }}
                  ></div>
                  <div className="good__main__down">
                    <div className="good__main__down__left">
                      <p className="good__main__down__left__title">
                        {backData.full_name}
                      </p>
                      <p className="good__main__down__left__subtitle">
                        Артикул: {backData.articul}
                      </p>
                      <div className="good__main__down__left__price">
                        <div className="good__main__down__left__wish">
                          <div className="good__main__wish__price">
                            <p className="good__main__wish__price__title">
                              {backData.price} ₽
                            </p>
                            {backData.old_price > 0 ? (
                              <p className="good__main__wish__price__subtitle">
                                {backData.old_price} ₽
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="good__main__down__head">
                          <div className="good__main__staff">
                            <div
                              className="good__main__staff__btn"
                              onClick={() => {
                                if (goodCount > 0) {
                                  if (cartCount != 0) {
                                    //setCartCount(cartCount + 1);
                                  }
                                  AddToCart(
                                    backData.ID,
                                    goodCount,
                                    setCartCount
                                  );
                                  setCartPrice(
                                    cartPrice + backData.price * goodCount
                                  );
                                  //window.location.reload();
                                }
                              }}
                            >
                              <span className="good__main__staff__btn__title">
                                В корзину
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="good__main__down__left__wish">
                        <div className="good__main__down__size">
                          <span>цвет</span>
                          <div className="good__main__down__size__box">
                            <div className="good__main__down__size__item color-iport-border-2">
                              <span className="color-iport">
                                {backData.color}
                              </span>
                            </div>
                            {backData.other_colors.split(", ").map((item) => {
                              return (
                                <div
                                  className="good__main__down__size__item"
                                  onClick={() => {
                                    const data = {
                                      goodValue: backData.memory,
                                      model: backData.model,
                                      type: "color",
                                      value: item,
                                    };
                                    fetch("/goodsOther", {
                                      method: "POST",
                                      body: JSON.stringify(data),
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                    })
                                      .then((response) => response.json())
                                      .then((data) => {
                                        navigate("/good/" + data.ID);
                                        setBackData(data);
                                      });
                                  }}
                                >
                                  <span>{item}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="good__main__down__size">
                          <span>память</span>
                          <div className="good__main__down__size__box">
                            <div className="good__main__down__size__item color-iport-border-2">
                              <span className="color-iport">
                                {Number(backData.memory) % 1024 == 0 &&
                                Number(backData.memory) >= 1024
                                  ? backData.memory / 1024 + "TB"
                                  : backData.memory + "GB"}
                              </span>
                            </div>
                            {backData.other_memory.split(", ").map((item) => {
                              item = Number(item);
                              let item_data = item;
                              console.log(item);
                              if (item % 1024 == 0 && item >= 1024) {
                                item = `${item / 1024}TB`;
                              } else {
                                item = `${item}GB`;
                              }
                              return (
                                <div
                                  className="good__main__down__size__item"
                                  onClick={() => {
                                    const data = {
                                      goodValue: backData.color,
                                      model: backData.model,
                                      type: "memory",
                                      value: item_data,
                                    };
                                    fetch("/goodsOther", {
                                      method: "POST",
                                      body: JSON.stringify(data),
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                    })
                                      .then((response) => response.json())
                                      .then((data) => {
                                        navigate("/good/" + data.ID);
                                        setBackData(data);
                                      });
                                  }}
                                >
                                  <span>{item}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="good__main__down__right">
                      <p className="good__main__down__right__title">Описание</p>
                      <div className="good__main__down__right__content">
                        <p>{backData.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <GoodMobile />
        </div>
        <Footer />
        <FooterMob cartPrice={212000} />
      </div>
    );
  }
}

export default Good;
