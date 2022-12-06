function RecMail() {
  return (
    <div className="rec">
      <img src="/images/recovery/shield.svg" className="rec__logo" />
      <span className="rec__title">Восстановление</span>
      <div className="rec__input__div">
        <span className="rec__input__title">
          Введите почту или номер телефона
        </span>
        <input className="rec__input" />
      </div>
      <div className="reg__form__buttons rec__row__btn rec__mail__row__btn">
        <button className="reg__form__btn rec__btn">Далее</button>
        <button className="reg__form__btn rec__btn">Назад</button>
      </div>
      <div className="reg__footer rec__footer">
        <span className="reg__footer__content">
          © 2010-2018 <br />
          Торговая марка «Свит»
        </span>
        <span className="reg__footer__content">
          Пользовательское <br />
          соглашение
        </span>
      </div>
    </div>
  );
}

export default RecMail;
