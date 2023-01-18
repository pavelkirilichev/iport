import { useEffect, useState } from "react";
import strCut from "../Services/StrCutLimits";

const orders = [
  {
    id: 0,
    name: 'Apple iPhone 13 (6.1", 128GB, темная ночь)',
    article_num: "121231311231",
    color: "белый",
    size: "60 x 40 x 12",
    price: 2120,
    old_price: 2430,
    count: 1,
    src: "good_1.jpg",
  },
  {
    id: 1,
    name: "2020 Apple MacBook Air 13.3″ серый космос (Apple M1, 8Gb, SSD 256Gb, M1 (7 GPU))",
    article_num: "121231311231",
    color: "белый",
    size: "60 x 40 x 12",
    price: 2120,
    old_price: 2430,
    count: 1,
    src: "good_2.jpg",
  },
];

function MoreDetails({ MD, setMD, orders, orderID }) {
  const getOrder = (id) => orders.find(o => o.ID === id) || {}
  const getGoodsJSONData = (localOrder) => {
    if (!localOrder) return []
    
    return localOrder.goods ? localOrder.goods.split(', ').filter(s => s).map(s => JSON.parse(s)) : []
  }
  const [order, setOrder] = useState({})
  const [goods, setGoods] = useState([])
  const [goodsJSONData, setGoodsJSONData] = useState([])

  useEffect(() => {
    const localOrder = getOrder(orderID)
    setOrder(localOrder)
    setGoodsJSONData(getGoodsJSONData(localOrder))
  }, [orderID])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orderGoods`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        goods: goodsJSONData
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setGoods(data);
      });
  }, [goodsJSONData])

  return (
    <div
      className={"md_dark" + MD}
      id="md__dark"
      onClick={(e) => {
        if (e.target.id == "md__dark") {
          setMD("");
        }
      }}
    >
      <div className="md__main">
        <img
          src="./images/cart/close_icon.png"
          className="md__main__close-icon"
          onClick={() => {
            setMD("");
          }}
        />
        <div className="md__header">
          <div className="cart__main__content__item order__item md__item">
            <div className="order__left__info">
              <span className="cart__main__content__item__num">1</span>
              <p className="order__title md__order__title">
                Ваш заказ <br />
                №{order.ID}
              </p>
            </div>

            <div className="cart__main__content__item__info order__info md__info">
              <div className="cart__main__content__item__info__content order__info__content">
                <p>
                  Номер заказа: <span>{order.ID}</span>
                </p>
                <p>
                  Дата заказа: <span>{order.date}</span>
                </p>
                <p>
                  Адрес заказа: <span>{order.adress}</span>
                </p>
              </div>
            </div>
            <span className="order__status__title md__status">{order.status}</span>
            <div className="order__itog__info md__itog">
              <div className="order__itog__info__more-detail md__more-detail">
                подробнее
              </div>
              <div className="order__itog__info__price md__itog__price">
                <span className="order__itog__info__price__title">
                  сумма заказа
                </span>
                <span className="order__itog__info__price__count">{order.summ}₽</span>
              </div>
            </div>
          </div>
        </div>
        <div className="md__main__goods">
          <ul className="md__main__goods__list">
            {goods.map((good, key) => {
              let good_memory = good.memory;
              if (
                Number(good_memory) % 1024 == 0 &&
                Number(good_memory) >= 1024
              ) {
                good_memory = `${good_memory / 1024}TB`;
              } else {
                good_memory = `${good_memory}GB`;
              }
              let title = strCut(good.full_name, 20);
              return (
                <li className="md__main__goods__item">
                  <div className="md__main__goods__item__inner">
                    <span className="md__goods__item__num">{key + 1}</span>
                    <div
                      className="cart__main__content__item__img-div md__item__img"
                      style={{
                        backgroundImage:
                          "url(../images/good/goods_image/" + good.src + ")",
                      }}
                    ></div>
                    <p className="md__goods__item__title">{title}</p>
                    <div className="cart__main__content__item__info__content md__item__info">
                      <p>
                        артикул: <span>{good.article_num}</span>
                      </p>
                      <p>
                        цвет: <span>{good.color}</span>
                      </p>
                      <p>
                        память: <span>{good_memory}</span>
                      </p>
                    </div>
                    <span className="cart__main__content__item__count md__count">
                      {good.count}
                      <span className="cart__main__content__item__count__title">
                        шт
                      </span>
                    </span>
                    <span className="cart__main__content__item__price-count__title md__price">
                      {good.price}₽
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MoreDetails;
