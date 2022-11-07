import Header from "../components/Header";
import Footer from "../components/Footer";
import FooterMob from "../components/FooterMob";
import { useState } from "react";
import { Link } from "react-router-dom";
import GoodSlider from "../components/GoodSlider";
import { goods } from "../data/GoodsJSON";
import NewArrayByCount from "../Services/Array";
import GoodMobile from "../components/GoodMobile";

function Good() {
  const [pullMenuMob, setPullMenuMob] = useState("");
  const [pull, setPull] = useState("");
  const [img, setImg] = useState(0);
  const [goodCount, setGoodCount] = useState(0);
  const [goodSlider, setGoodSlider] = useState("");
  const [arrayCount, setArrayCount] = useState(NewArrayByCount(goods));
  const image_arr = [
    "images/good/good_image_1.png",
    "images/good/good_image_2.jpg",
    "images/good/good_image_3.jpg",
    "images/good/good_image_4.jpg",
  ];
  return (
    <div className="wrapper">
      <GoodSlider
        goodSlider={goodSlider}
        setGoodSlider={setGoodSlider}
        img={img}
        setImg={setImg}
        image_arr={image_arr}
      />
      <Header
        cartPrice={2120}
        pull={pull}
        setPull={setPull}
        pullMenuMob={pullMenuMob}
        setPullMenuMob={setPullMenuMob}
      />
      <div
        className={
          pull == "" && pullMenuMob == ""
            ? "good__main-section-active"
            : "good__main-section"
        }
      >
        <div className="good__container">
          <div class="tkani__navigation">
            <Link to={"/tkani"} state={{ chapter: "Спальня" }}>
              <div class="tkani__navigation__back-btn">Назад</div>
            </Link>
            <ul class="tkani__navigation__chapter-list">
              <li class="tkani__navigation__chapter__item good__nav__item">
                Каталог
              </li>
              <li class="tkani__navigation__chapter__item good__nav__item">
                Спальня
              </li>
              <li class="tkani__navigation__chapter__item good__nav__item">
                Постельное белье
              </li>
              <li class="tkani__navigation__chapter__item good__nav__item">
                Комплект постельного белья
              </li>
            </ul>
          </div>
          <div className="good__main">
            <div className="good__main__image">
              <div className="good__main__image__sidebar">
                <img
                  src="../images/good/arrow_up.svg"
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
                            backgroundImage: "url(../" + item + ")",
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
                <img
                  src="../images/good/arrow_down.svg"
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
                onClick={() => {
                  setGoodSlider(" goodSlider-active");
                }}
              >
                <img src={image_arr[img]} />
              </div>
              <div className="good__main__down">
                <div className="good__main__down__left">
                  <p className="good__main__down__left__title">
                    Подушка Memory Foam Roller
                  </p>
                  <p className="good__main__down__left__subtitle">
                    Артикул: 40893654
                  </p>
                  <div className="good__main__down__left__price">
                    <div className="good__main__down__left__wish">
                      <div className="good__main__wish__price">
                        <p className="good__main__wish__price__title">2120 ₽</p>
                        <p className="good__main__wish__price__subtitle">
                          2430 ₽
                        </p>
                      </div>
                    </div>
                    <div className="good__main__down__head">
                      <div className="good__main__down__choice">
                        <div className="good__main__down__count">
                          <img
                            src="../images/good/minus.svg"
                            onClick={() => {
                              if (goodCount != 0) {
                                setGoodCount(goodCount - 1);
                              }
                            }}
                          />
                          <span className="cart__main__content__item__count-price__bottom-btn-cnt unselectable">
                            {goodCount}
                          </span>
                          <img
                            src="../images/good/plus.svg"
                            onClick={() => {
                              setGoodCount(goodCount + 1);
                            }}
                          />
                        </div>
                      </div>
                      <div className="good__main__staff">
                        <div className="good__main__staff__price">
                          <span>товара на: </span>
                          <span>{goodCount * 2120} р.</span>
                        </div>
                        <div className="good__main__staff__btn">
                          <span className="good__main__staff__btn__title">
                            В корзину
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="good__main__down__left__wish">
                    <div className="good__main__down__info">
                      <span>цвет</span>
                      <div className="good__main__down__color">
                        <div className="good__main__down__color__left"></div>
                        <div className="good__main__down__color__right"></div>
                      </div>
                    </div>
                    <div className="good__main__down__size">
                      <span>размер</span>
                      <div className="good__main__down__size__box">
                        <div className="good__main__down__size__item">
                          <span> 115×205 см</span>
                        </div>
                        <div className="good__main__down__size__item">
                          <span> 115×205 см</span>
                        </div>
                        <div className="good__main__down__size__item">
                          <span> 115×205 см</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
                <div className="good__main__down__right">
                  <p className="good__main__down__right__title">Описание</p>
                  <div className="good__main__down__right__content">
                    <p>
                      Подушка «Memory Foam Roller», два валика под шею - 13 и 11
                      см. Наполнитель - инновационная пена последнего поколения
                      из модифицированного пенополиуретана. Два ролика в подушке
                      сделаны для того, чтобы вы сами могли регулировать, как
                      вам удобнее на ней спать или сидеть. Хоть на боку, хоть на
                      спине – устраивайтесь поудобнее!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="good__reviews">
            <p className="good__reviews__title">Похожие товары</p>
            <div className="good__reviews__btn">
              <span>Смотреть всё</span>
            </div>
          </div>
          <div className="home__goods__list good__list">
            {goods.map((good, key) => {
              return (
                <div className="home__goods__item">
                  <Link to={"/good"}>
                    <div className="home__goods__item__image"></div>
                  </Link>
                  <Link to={"/good"}>
                    <div className="home__goods__item__info">
                      <div className="home__goods__item__price">
                        <span className="home__goods__item__price__title">
                          {good.price} ₽
                        </span>
                        <span className="home__goods__item__price__subtitle">
                          {good.old_price} ₽
                        </span>
                      </div>
                      <p className="home__goods__item__info__title">
                        {good.type} “{good.title}”{" "}
                      </p>
                    </div>
                  </Link>
                  <div className="home__goods__item__bottom">
                    <div className="home__goods__item__bottom__left">
                      <img
                        src="../images/home/minus_icon.svg"
                        onClick={() => {
                          let copy = Object.assign([], arrayCount);
                          let index = key;
                          if (copy[index] > 0) {
                            copy[index] -= 1;
                          }
                          setArrayCount(copy);
                        }}
                      />
                      <span>{arrayCount[key]}</span>
                      <img
                        src="../images/home/plus_icon.svg"
                        onClick={() => {
                          let copy = Object.assign([], arrayCount);
                          let index = key;
                          copy[index] += 1;
                          setArrayCount(copy);
                        }}
                      />
                    </div>
                    <img src="../images/home/cart.svg" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <GoodMobile />
      </div>
      <Footer />
      <FooterMob cartPrice={212000} />
    </div>
  );
}

export default Good;
