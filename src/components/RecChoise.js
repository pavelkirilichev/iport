function RecChoise() {
  return (
    <div className="rec">
      <img src="../images/recovery/shield.svg" className="rec__logo" />
      <span className="rec__title">Восстановление</span>
      <span className="rec__subtitle">Что вы хотите восстановить?</span>
      <div className="reg__form__buttons rec__row__btn">
        <button className="reg__form__btn rec__btn">Пароль</button>
        <button className="reg__form__btn rec__btn">Логин</button>
      </div>
      <button className="reg__form__btn rec__btn rec__btn-bottom">Назад</button>
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

export default RecChoise;
