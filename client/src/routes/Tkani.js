import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useRef, useEffect } from "react";
import { useAsyncError, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { goods } from "../data/GoodsJSON";
import NewArrayByCount from "../Services/Array";
import strCut from "../Services/StrCutLimits";
import AddToCart from "../components/AddToCart";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
const cookies = new Cookies();

function Tkani(props) {
  useTitle("Каталог")

  const params = useParams();
  const [backData, setBackData] = useState();
  const location = useLocation();
  const [category, setCategory] = useState(location.state?.category);
  const [sortDirection, setSortDirection] = useState("up");
  const [cartData, setCartData] = useState("initial");
  const [cartPrice, setCartPrice] = useState(0);

  const [pullMenuMob, setPullMenuMob] = useState("");
  const [pull, setPull] = useState("");
  const [arrayCount, setArrayCount] = useState(NewArrayByCount(goods));
  const [filterColorData, setFilterColorData] = useState();
  const [filterMemoryData, setFilterMemoryData] = useState();

  const [filterColor, setFilterColor] = useState([]);
  const [filterMemory, setFilterMemory] = useState([]);

  const [price, setPrice] = useState({ min: null, max: null });

  const categoryData = {
    category: params.category,
  };
  const [checkData, setCheckData] = useState(0);

  let priceInputRequestTimeout = null;
  function updatePrice(data) {
    clearTimeout(priceInputRequestTimeout);
    priceInputRequestTimeout = setTimeout(() => {
      setPrice(data);
    }, 300);
  }

  useEffect(() => {
    fetch("/goodsCategory", {
      method: "POST",
      body: JSON.stringify(categoryData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBackData(data);
      });
    fetch("/goodsFilterColor", {
      method: "POST",
      body: JSON.stringify(categoryData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFilterColorData(data);
      });
    fetch("/goodsFilterMemory", {
      method: "POST",
      body: JSON.stringify(categoryData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFilterMemoryData(data);
      });
  }, [category]);

  useEffect(() => {
    fetch("/goodsFilterMemory", {
      method: "POST",
      body: JSON.stringify({
        ...categoryData,
        price,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFilterMemoryData(data);
      });
  }, [price]);

  useEffect(() => {
    console.log(filterColor, filterMemory, price);
    if (
      backData ||
      filterColor.length > 0 ||
      filterMemory.length > 0 ||
      price.min ||
      price.max
    ) {
      const categoryDataFilter = {
        category: params.category,
        color: filterColor,
        memory: filterMemory.filter((item) =>
          filterMemoryData.some((i) => i.memory === item)
        ),
        sort: sortDirection,
        price: price,
      };
      fetch("/goodsCategoryFilter", {
        method: "POST",
        body: JSON.stringify(categoryDataFilter),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setBackData(data);
        });
    } else {
      if (sortDirection == "up") {
        // if (typeof backData == "undefined" && cartData == "initial") {
        fetch("/goodsCategory", {
          method: "POST",
          body: JSON.stringify(categoryData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setBackData(data);
          });
        // }
      } else {
        // if (checkData == 0) {
        console.log("yes");
        fetch("/goodsCategoryDesc", {
          method: "POST",
          body: JSON.stringify(categoryData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setBackData(data);
            setCheckData(1);
          });
        // }
      }
    }
  }, [category, filterColor, filterMemory, sortDirection, price]);

  if (
    cartData == "initial" &&
    typeof backData == "undefined" &&
    cartPrice == 0
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
  const [cartCount, setCartCount] = useState(0);
  if (
    cartCount == 0 &&
    typeof backData == "undefined" &&
    cartData == "initial"
  ) {
    if (cookies.get("id")) {
      fetch("/getUserByID")
        .then((response) => response.json())
        .then((data) => {
          setCartCount(data.cart.split(", ").length - 1);
          //setBackData(data);
        });
    } else {
      if (cookies.get("cart")) {
        setTimeout(() => {
          if (cartCount == 0)
            setCartCount(cookies.get("cart").split("_").length - 1);
          //setBackData(data);
        }, 1);
      }
    }
  }

  const searchRef = useRef();
  return (
    <div className="wrapper">
      <Header
        cartPrice={typeof cartPrice == "undefined" ? "" : cartPrice}
        pull={pull}
        setPull={setPull}
        pullMenuMob={pullMenuMob}
        setPullMenuMob={setPullMenuMob}
        route={"tkani"}
        setCategory={setCategory}
        cartCount={cartCount}
        searchRef={searchRef}
        setBackData={setBackData}
        isSearch={1}
      />

      <div
        className={
          pull == "" && pullMenuMob == ""
            ? "tkani__main_section-active"
            : "tkani__main_section"
        }
      >
        <div className="tkani__container">
          <div className="tkani__navigation">
            <Link to={"/"}>
              <div className="tkani__navigation__back-btn">Назад</div>
            </Link>
            <ul className="tkani__navigation__chapter-list">
              <li className="tkani__navigation__chapter__item">Каталог</li>
              <li className="tkani__navigation__chapter__item">Техника</li>
              <li className="tkani__navigation__chapter__item">
                {params.category}
              </li>
            </ul>
          </div>
          <div className="tkani__main">
            <div className="tkani__main__sidebar">
              <div className="tkani__main__sidebar__filter">
                <span className="tkani__filter__title">Фильтры</span>
                <div className="tkani__filter__list">
                  <div className="tkani__filter__item">
                    <span className="tkani__filter__item__title">Цвет</span>
                    <div className="tkani__filter__item__inner">
                      <div className="tkani__filter__item__inner-flex">
                        {typeof filterColorData == "undefined"
                          ? ""
                          : filterColorData.map((item) => {
                              return (
                                <label className="tkani__filter__item__inner__label">
                                  <input
                                    type="checkbox"
                                    onChange={() => {
                                      console.log("change");
                                      let copy = Object.assign([], filterColor);
                                      const indexOfItem = copy.indexOf(
                                        item.color
                                      );
                                      if (indexOfItem == -1) {
                                        copy.push(item.color);
                                      } else {
                                        copy.splice(indexOfItem, 1);
                                      }
                                      setFilterColor(copy);
                                    }}
                                    className="tkani__filter__item__inner__check__input"
                                  />
                                  <div className="tkani__filter__item__inner__check__box"></div>
                                  <span className="tkani__filter__item__inner__label__text">
                                    {item.color}
                                  </span>
                                </label>
                              );
                            })}
                      </div>
                    </div>
                  </div>
                  <div className="tkani__filter__item">
                    <span className="tkani__filter__item__title">Память</span>
                    <div className="tkani__filter__item__inner">
                      <div className="tkani__filter__item__inner-flex">
                        <div className="tkani__filter__item__inner-left flex-wrap">
                          {typeof filterMemoryData == "undefined"
                            ? ""
                            : filterMemoryData.map((item) => {
                                item = item.memory;
                                let item_memory = item;
                                if (
                                  Number(item) % 1024 == 0 &&
                                  Number(item) >= 1024
                                ) {
                                  item = `${item / 1024}TB`;
                                } else {
                                  item = `${item}GB`;
                                }
                                return (
                                  <label className="tkani__filter__item__inner__label">
                                    <input
                                      type="checkbox"
                                      onChange={() => {
                                        console.log("click");
                                        let copy = Object.assign(
                                          [],
                                          filterMemory
                                        );
                                        const indexOfItem =
                                          copy.indexOf(item_memory);
                                        if (indexOfItem == -1) {
                                          copy.push(item_memory);
                                        } else {
                                          copy.splice(indexOfItem, 1);
                                        }
                                        setFilterMemory(copy);
                                      }}
                                      className="tkani__filter__item__inner__check__input"
                                      checked={
                                        filterMemory.indexOf(item_memory) == -1
                                          ? false
                                          : true
                                      }
                                    />
                                    <div className="tkani__filter__item__inner__check__box"></div>
                                    <span className="tkani__filter__item__inner__label__text">
                                      {item}
                                    </span>
                                  </label>
                                );
                              })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tkani__filter__item">
                    <span className="tkani__filter__item__title">Цена</span>
                    <div className="tkani__filter__item__inner">
                      <div className="tkani__filter__item__inner-flex">
                        <div className="tkani__filter__item__inner-left flex-wrap">
                          <label className="tkani__filter__item__inner__label tkani__filter__item__inner__label-price">
                            <span>От: </span>
                            <input
                              type="text"
                              name="min"
                              onInput={(e) => {
                                console.log("ok");
                                let copy = Object.assign({}, price);
                                copy.min = e.target.value;
                                updatePrice(copy);
                              }}
                              className="tkani__filter__item__inner__price-input"
                            />
                          </label>
                          <div className="tkani__filter__item__inner__label-separator"></div>
                          <label className="tkani__filter__item__inner__label tkani__filter__item__inner__label-price">
                            <span>До: </span>
                            <input
                              type="text"
                              name="max"
                              onInput={(e) => {
                                console.log("ok");
                                let copy = Object.assign({}, price);
                                copy.max = e.target.value;
                                updatePrice(copy);
                              }}
                              className="tkani__filter__item__inner__price-input"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tkani__main__content">
              <div
                className="tkani__main__sort"
                onClick={() => {
                  setSortDirection(sortDirection == "up" ? "down" : "up");
                }}
              >
                <span className="tkani__main__sort__text">Сортировать по:</span>
                <span className="tkani__main__sort__text text-red">
                  {sortDirection == "up" ? "Цене ↑" : "Цене ↓"}
                </span>
              </div>
              {typeof backData == "undefined"
                ? ""
                : backData.map((good, key) => {
                    let title = strCut(good.full_name, 50);
                    return (
                      <div className="home__goods__item">
                        <Link to={"/good/" + good.ID}>
                          <div
                            className="home__goods__item__image"
                            style={{
                              backgroundImage: `url(../images/good/goods_image/${
                                good.images_name.split(", ")[0]
                              }.webp)`,
                            }}
                          ></div>
                        </Link>
                        <Link to={"/good/" + good.ID}>
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
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Tkani;
