import { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegForm from "./RegForm";

function Footer() {
  const [modal, setModal] = useState();
  return (
    <div className="footer">
      {modal === "login" ? <LoginForm modal={modal} setModal={setModal} /> : ""}
      {modal === "reg" ? <RegForm modal={modal} setModal={setModal} /> : ""}

      <div className="footer__content">
        <ul className="footer__list">
          <li className="footer__list__main">Каталог</li>
          <Link to="/catalog/phone">
            <li>iPhone</li>
          </Link>
          <Link to="/catalog/mac">
            <li>Mac</li>
          </Link>
          <Link to="/catalog/ipad">
            <li>iPad</li>
          </Link>
          <Link to="/catalog/watch">
            <li>Watch</li>
          </Link>
          <Link to="/catalog/accsessuari">
            <li>Аксессуары</li>
          </Link>
        </ul>
        <ul className="footer__list">
          <li className="footer__list__unshow-main"></li>
          <Link to="/catalog/multimedia">
            <li>Мультимедиа</li>
          </Link>
          <Link to="/catalog/gadgets">
            <li>Гаджеты</li>
          </Link>
          <Link to="/catalog/smart_home">
            <li>Умный дом</li>
          </Link>
          <Link to="/catalog/consoles">
            <li>Консоли и видеоигры</li>
          </Link>
          <Link to="/catalog/discount">
            <li>Discount</li>
          </Link>
        </ul>
        <ul className="footer__list">
          <li className="footer__list__main">Клиентам</li>
          <Link to="/cart">
            <li>Личный кабинет</li>
          </Link>
          <li
            onClick={() => {
              setModal("reg");
            }}
          >
            Регистрация
          </li>
          <Link to="/cart">
            <li>Мои заказы</li>
          </Link>
          <Link to="/cart">
            <li>Корзина</li>
          </Link>
        </ul>
        <ul className="footer__list">
          <li className="footer__list__main">Контакты</li>
          <li>О нас</li>
          <li>info@itsstore.ru</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
