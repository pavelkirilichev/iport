import { useState } from "react";
import Link from "next/link";
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
          <Link href="/catalog/phone">
            <li>iPhone</li>
          </Link>
          <Link href="/catalog/mac">
            <li>Mac</li>
          </Link>
          <Link href="/catalog/ipad">
            <li>iPad</li>
          </Link>
          <Link href="/catalog/watch">
            <li>Watch</li>
          </Link>
          <Link href="/catalog/accsessuari">
            <li>Аксессуары</li>
          </Link>
        </ul>
        <ul className="footer__list">
          <li className="footer__list__unshow-main"></li>
          <Link href="/catalog/multimedia">
            <li>Мультимедиа</li>
          </Link>
          <Link href="/catalog/gadgets">
            <li>Гаджеты</li>
          </Link>
          <Link href="/catalog/smart_home">
            <li>Умный дом</li>
          </Link>
          <Link href="/catalog/consoles">
            <li>Консоли и видеоигры</li>
          </Link>
          <Link href="/catalog/discount">
            <li>Discount</li>
          </Link>
        </ul>
        <ul className="footer__list">
          <li className="footer__list__main">Клиентам</li>
          <Link href="/cart">
            <li>Личный кабинет</li>
          </Link>
          <li
            onClick={() => {
              setModal("reg");
            }}
          >
            Регистрация
          </li>
          <Link href="/cart">
            <li>Мои заказы</li>
          </Link>
          <Link href="/cart">
            <li>Корзина</li>
          </Link>
        </ul>
        <ul className="footer__list">
          <li className="footer__list__main">Контакты</li>
          <li>О нас</li>
          <li>example@gmail.com</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
